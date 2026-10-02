import { mockStudent, StudentProfile } from '@/constants/chapters';

let currentStudent: StudentProfile = { ...mockStudent };
let isAuthenticated = true;

export const authService = {
  async login(email: string, _password: string): Promise<StudentProfile> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    isAuthenticated = true;
    currentStudent = {
      ...currentStudent,
      name: email.split('@')[0] || currentStudent.name,
    };
    return currentStudent;
  },

  async signup(data: {
    name: string;
    email: string;
    password: string;
    department?: string;
    rollNo?: string;
  }): Promise<StudentProfile> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    isAuthenticated = true;
    currentStudent = {
      ...currentStudent,
      name: data.name || 'EXTC Engineer',
      department: data.department || 'EXTC Engineering',
      rollNo: data.rollNo || '22EXTC099',
    };
    return currentStudent;
  },

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    isAuthenticated = false;
  },

  async getCurrentUser(): Promise<StudentProfile | null> {
    return isAuthenticated ? currentStudent : null;
  },

  async updateProfile(updates: Partial<StudentProfile>): Promise<StudentProfile> {
    currentStudent = { ...currentStudent, ...updates };
    return currentStudent;
  },

  isLoggedIn(): boolean {
    return isAuthenticated;
  },
};
