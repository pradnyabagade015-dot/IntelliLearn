import { mockStudent, StudentProfile } from '@/constants/chapters';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  department: string;
  rollNo: string;
  semester: string;
  profile: StudentProfile;
}

/**
 * Standard pure-TypeScript SHA-256 implementation (FIPS PUB 180-4 compliant).
 * Requires no external packages or native crypto modules; runs universally in React Native, Web, and Node.
 */
export function sha256(input: string): string {
  const ascii = unescape(encodeURIComponent(input));

  function rightRotate(value: number, amount: number): number {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i: number;
  let j: number;
  let result = '';
  const words: number[] = [];
  const asciiBitLength = ascii[lengthProperty] * 8;
  const hash: number[] = [];
  const k: number[] = [];
  let primeCounter = 0;
  const isComposite: Record<number, number> = {};

  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  let paddedAscii = ascii + '\x80';
  while ((paddedAscii[lengthProperty] % 64) - 56) {
    paddedAscii += '\x00';
  }

  for (i = 0; i < paddedAscii[lengthProperty]; i++) {
    j = paddedAscii.charCodeAt(i);
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }

  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength | 0;

  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0);
    hash.length = 8;
    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15];
      const w2 = w[i - 2];
      const a = hash[0];
      const e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

      hash.unshift((temp1 + temp2) | 0);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }

  return result;
}

/**
 * Generates a unique 32-character hex salt.
 */
export function generateSalt(): string {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    const bytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(bytes);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  let salt = '';
  for (let i = 0; i < 32; i++) {
    salt += Math.floor(Math.random() * 16).toString(16);
  }
  return salt;
}

/**
 * Produces a salted SHA-256 hash.
 */
export function hashPassword(password: string, salt: string): string {
  return sha256(salt + ':' + password);
}

const STORAGE_USERS_KEY = '@intellilearn_users';
const STORAGE_SESSION_KEY = '@intellilearn_session';

// Pre-seeded default student account (password: 'password123' stored as salted hash)
const DEFAULT_SALT = 'e4a2c1f9d8b7e6a5c4b3a2d1e0f9b8a7';
const DEFAULT_SEED_USER: UserRecord = {
  id: 'usr-student-001',
  name: 'Alex Sharma',
  email: 'student@engg.mu.ac.in',
  passwordHash: 'b0cd68375566577db543ede863c1ed54896086fcaf1c83f89de274099bb8b1a8',
  salt: DEFAULT_SALT,
  department: 'EXTC Engineering',
  rollNo: '22EXTC042',
  semester: 'Semester IV',
  profile: {
    ...mockStudent,
    name: 'Alex Sharma',
    email: 'student@engg.mu.ac.in',
    department: 'EXTC Engineering',
    rollNo: '22EXTC042',
    semester: 'Semester IV',
  },
};

let inMemoryUsers: UserRecord[] = [DEFAULT_SEED_USER];
let currentStudent: StudentProfile | null = null;
let isAuthenticated = false;

type AuthListener = (user: StudentProfile | null) => void;
const listeners: Set<AuthListener> = new Set();

function notifySubscribers(user: StudentProfile | null): void {
  listeners.forEach((listener) => {
    try {
      listener(user);
    } catch {
      // Ignore listener error
    }
  });
}

function loadStoredUsers(): UserRecord[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(STORAGE_USERS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    }
  } catch {
    // Ignore storage errors and fall back to memory
  }
  return inMemoryUsers;
}

function persistUsers(users: UserRecord[]): void {
  inMemoryUsers = users;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    }
  } catch {
    // Ignore storage errors
  }
}

function persistSession(user: UserRecord | null): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (user) {
        window.localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user.profile));
      } else {
        window.localStorage.removeItem(STORAGE_SESSION_KEY);
      }
    }
  } catch {
    // Ignore storage errors
  }
}

export const authService = {
  /**
   * Subscribe to authentication and profile changes.
   * Immediately calls the listener with the current active user or null.
   */
  subscribe(listener: AuthListener): () => void {
    listeners.add(listener);
    listener(isAuthenticated ? currentStudent : null);
    return () => {
      listeners.delete(listener);
    };
  },

  /**
   * Log in using email and password.
   * Rejects wrong email or wrong password with a unified "Invalid email or password." error.
   */
  async login(email: string, password: string): Promise<StudentProfile> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      throw new Error('Please enter both your email and password.');
    }

    const users = loadStoredUsers();
    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const computedHash = hashPassword(password, user.salt);
    if (computedHash !== user.passwordHash) {
      throw new Error('Invalid email or password.');
    }

    isAuthenticated = true;
    currentStudent = { ...user.profile };
    persistSession(user);
    notifySubscribers(currentStudent);
    return currentStudent;
  },

  /**
   * Sign up a new student account.
   * Enforces non-duplicate email, generates salt, and stores salted password hash.
   */
  async signup(data: {
    name: string;
    email: string;
    password: string;
    department?: string;
    rollNo?: string;
  }): Promise<StudentProfile> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalizedEmail = data.email.trim().toLowerCase();
    const name = data.name.trim();

    if (!name) {
      throw new Error('Please enter your full name.');
    }
    if (!normalizedEmail) {
      throw new Error('Please enter your email address.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      throw new Error('Please enter a valid email address.');
    }
    if (!data.password || data.password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const users = loadStoredUsers();
    const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const salt = generateSalt();
    const passwordHash = hashPassword(data.password, salt);

    const newProfile: StudentProfile = {
      id: 'usr-' + Date.now(),
      name,
      email: normalizedEmail,
      department: data.department?.trim() || 'EXTC Engineering',
      rollNo: data.rollNo?.trim() || `22EXTC${Math.floor(100 + Math.random() * 900)}`,
      semester: 'Semester IV',
      totalXp: 100,
      streakDays: 1,
      quizzesTaken: 0,
      doubtsResolved: 0,
      studyHoursThisWeek: 0,
      semesterProgress: 0,
    };

    const newUser: UserRecord = {
      id: newProfile.id,
      name,
      email: normalizedEmail,
      passwordHash,
      salt,
      department: newProfile.department,
      rollNo: newProfile.rollNo,
      semester: 'Semester IV',
      profile: newProfile,
    };

    users.push(newUser);
    persistUsers(users);

    isAuthenticated = true;
    currentStudent = newProfile;
    persistSession(newUser);
    notifySubscribers(currentStudent);
    return currentStudent;
  },

  /**
   * Log out the current user session.
   */
  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    isAuthenticated = false;
    currentStudent = null;
    persistSession(null);
    notifySubscribers(null);
  },

  /**
   * Retrieves the current authenticated student profile.
   */
  async getCurrentUser(): Promise<StudentProfile | null> {
    if (!isAuthenticated && typeof window !== 'undefined' && window.localStorage) {
      try {
        const session = window.localStorage.getItem(STORAGE_SESSION_KEY);
        if (session) {
          currentStudent = JSON.parse(session);
          isAuthenticated = true;
        }
      } catch {
        // Ignore
      }
    }
    return isAuthenticated ? currentStudent : null;
  },

  /**
   * Return a neutral guest profile for unauthenticated visitors.
   */
  getGuestProfile(): StudentProfile {
    return {
      id: 'guest',
      name: 'Guest Student',
      rollNo: 'GUEST',
      semester: 'Semester IV',
      department: 'EXTC Engineering',
      totalXp: 0,
      streakDays: 0,
      quizzesTaken: 0,
      doubtsResolved: 0,
      studyHoursThisWeek: 0,
      semesterProgress: 0,
    };
  },

  /**
   * Updates fields on the current student profile.
   */
  async updateProfile(updates: Partial<StudentProfile>): Promise<StudentProfile> {
    if (!currentStudent) {
      currentStudent = {
        id: 'usr-' + Date.now(),
        name: updates.name || 'Student',
        rollNo: updates.rollNo || '22EXTC000',
        semester: 'Semester IV',
        department: updates.department || 'EXTC Engineering',
        totalXp: updates.totalXp ?? 0,
        streakDays: updates.streakDays ?? 0,
        quizzesTaken: updates.quizzesTaken ?? 0,
        doubtsResolved: updates.doubtsResolved ?? 0,
        studyHoursThisWeek: updates.studyHoursThisWeek ?? 0,
        semesterProgress: updates.semesterProgress ?? 0,
      };
      notifySubscribers(currentStudent);
      return currentStudent;
    }
    currentStudent = { ...currentStudent, ...updates };
    const users = loadStoredUsers();
    const userIndex = users.findIndex((u) => u.profile.id === currentStudent?.id);
    if (userIndex !== -1) {
      users[userIndex].profile = currentStudent;
      persistUsers(users);
      persistSession(users[userIndex]);
    }
    notifySubscribers(currentStudent);
    return currentStudent;
  },

  /**
   * Check if a user is currently authenticated.
   */
  isLoggedIn(): boolean {
    return isAuthenticated;
  },
};
