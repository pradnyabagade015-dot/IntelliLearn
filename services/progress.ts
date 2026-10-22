import { useEffect, useRef, useState, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { authService } from './auth';
import {
  businessModelSubject,
  microcontrollerSubject,
  SubjectDetailed,
} from '@/constants/chapters';

export interface QuizAttemptRecord {
  quizId: string;
  score: number;
  total: number;
  completedAt: number;
}

export interface SubjectProgress {
  completedTopicNumbers: string[];
  completedQuizIds: string[];
  completedChallengeModes: string[];
  quizAttempts: QuizAttemptRecord[];
  studySeconds: number;
}

export interface UserLearningData {
  userId: string;
  totalStudySeconds: number;
  lastStudyDate: string;
  streakDays: number;
  subjects: Record<string, SubjectProgress>;
}

export interface SubjectMetrics {
  overallPercentage: number;
  completedTopicsCount: number;
  totalTopicsCount: number;
  unitProgress: Record<number, number>;
  studySeconds: number;
  formattedStudyTime: string;
  accuracyRate: number;
  streakCount: number;
  quizzesCompletedCount: number;
  completedTopicNumbers: string[];
}

const STORAGE_KEY = '@intellilearn_learning_data';

export function normalizeSubjectId(id?: string): string {
  if (!id) return 'micro-2304112';
  const lower = id.toLowerCase();
  if (lower.includes('micro') || lower === '2304112') {
    return 'micro-2304112';
  }
  return 'bmd-2994511';
}

export function getSubjectDefinition(subjectId: string): SubjectDetailed {
  const norm = normalizeSubjectId(subjectId);
  return norm === 'micro-2304112' ? microcontrollerSubject : businessModelSubject;
}

export function formatStudyTime(seconds: number): string {
  if (!seconds || seconds <= 0) {
    return '0 min';
  }
  if (seconds < 60) {
    return '< 1 min';
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours} hr ${minutes} min`;
  }
  if (hours > 0) {
    return `${hours} hr`;
  }
  return `${minutes} min`;
}

function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function createEmptySubjectProgress(): SubjectProgress {
  return {
    completedTopicNumbers: [],
    completedQuizIds: [],
    completedChallengeModes: [],
    quizAttempts: [],
    studySeconds: 0,
  };
}

function createEmptyUserData(userId: string): UserLearningData {
  return {
    userId,
    totalStudySeconds: 0,
    lastStudyDate: '',
    streakDays: 0,
    subjects: {
      'micro-2304112': createEmptySubjectProgress(),
      'bmd-2994511': createEmptySubjectProgress(),
    },
  };
}

// In-memory fallback
let inMemoryStore: Record<string, UserLearningData> = {};

function loadAllStore(): Record<string, UserLearningData> {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    }
  } catch {
    // Fall back to memory
  }
  return inMemoryStore;
}

function persistAllStore(store: Record<string, UserLearningData>): void {
  inMemoryStore = store;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }
  } catch {
    // Ignore storage errors
  }
}

type ProgressListener = () => void;
const listeners: Set<ProgressListener> = new Set();

function notifyListeners(): void {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch {
      // Ignore subscriber error
    }
  });
}

export const progressService = {
  subscribe(listener: ProgressListener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  async getActiveUserId(): Promise<string> {
    const user = await authService.getCurrentUser();
    return user?.id || 'usr-student-001';
  },

  async getUserLearningData(userId?: string): Promise<UserLearningData> {
    const effectiveUserId = userId || (await this.getActiveUserId());
    const store = loadAllStore();
    if (!store[effectiveUserId]) {
      store[effectiveUserId] = createEmptyUserData(effectiveUserId);
      persistAllStore(store);
    }
    const data = store[effectiveUserId];
    // Ensure all subjects exist
    if (!data.subjects) data.subjects = {};
    if (!data.subjects['micro-2304112']) {
      data.subjects['micro-2304112'] = createEmptySubjectProgress();
    }
    if (!data.subjects['bmd-2994511']) {
      data.subjects['bmd-2994511'] = createEmptySubjectProgress();
    }
    return data;
  },

  async getSubjectMetrics(subjectId: string, userId?: string): Promise<SubjectMetrics> {
    const norm = normalizeSubjectId(subjectId);
    const data = await this.getUserLearningData(userId);
    const subProgress = data.subjects[norm] || createEmptySubjectProgress();
    const syllabus = getSubjectDefinition(norm);

    // Flatten all topics from modules to get total topics
    let totalTopicsCount = 0;
    const unitProgress: Record<number, number> = {};

    syllabus.modules.forEach((mod) => {
      const modTopics = mod.topics || [];
      const modTopicCount = modTopics.length;
      totalTopicsCount += modTopicCount;

      if (modTopicCount === 0) {
        unitProgress[mod.moduleNumber] = 0;
      } else {
        const completedInMod = modTopics.filter((t) =>
          subProgress.completedTopicNumbers.includes(t.topicNumber)
        ).length;
        const percent = Math.round((completedInMod / modTopicCount) * 100);
        unitProgress[mod.moduleNumber] = Math.min(100, Math.max(0, percent));
      }
    });

    const completedTopicsCount = subProgress.completedTopicNumbers.length;
    const overallPercentage =
      totalTopicsCount > 0
        ? Math.min(100, Math.max(0, Math.round((completedTopicsCount / totalTopicsCount) * 100)))
        : 0;

    // Accuracy Rate from quiz attempts
    let accuracyRate = 0;
    if (subProgress.quizAttempts && subProgress.quizAttempts.length > 0) {
      const totalCorrect = subProgress.quizAttempts.reduce((acc, q) => acc + q.score, 0);
      const totalQuestions = subProgress.quizAttempts.reduce((acc, q) => acc + q.total, 0);
      if (totalQuestions > 0) {
        accuracyRate = Math.min(100, Math.max(0, Math.round((totalCorrect / totalQuestions) * 100)));
      }
    }

    return {
      overallPercentage,
      completedTopicsCount,
      totalTopicsCount,
      unitProgress,
      studySeconds: subProgress.studySeconds || 0,
      formattedStudyTime: formatStudyTime(subProgress.studySeconds || 0),
      accuracyRate,
      streakCount: Math.max(data.streakDays || 0, subProgress.studySeconds > 0 ? 1 : 0),
      quizzesCompletedCount: subProgress.completedQuizIds?.length || 0,
      completedTopicNumbers: [...subProgress.completedTopicNumbers],
    };
  },

  async isTopicCompleted(subjectId: string, topicNumber: string, userId?: string): Promise<boolean> {
    const norm = normalizeSubjectId(subjectId);
    const data = await this.getUserLearningData(userId);
    const subProgress = data.subjects[norm];
    return subProgress ? subProgress.completedTopicNumbers.includes(topicNumber) : false;
  },

  async toggleTopicCompletion(
    subjectId: string,
    topicNumber: string,
    userId?: string
  ): Promise<boolean> {
    const norm = normalizeSubjectId(subjectId);
    const effectiveUserId = userId || (await this.getActiveUserId());
    const store = loadAllStore();
    if (!store[effectiveUserId]) {
      store[effectiveUserId] = createEmptyUserData(effectiveUserId);
    }
    const data = store[effectiveUserId];
    if (!data.subjects[norm]) {
      data.subjects[norm] = createEmptySubjectProgress();
    }

    const sub = data.subjects[norm];
    const exists = sub.completedTopicNumbers.includes(topicNumber);
    let isNowCompleted: boolean;

    if (exists) {
      sub.completedTopicNumbers = sub.completedTopicNumbers.filter((t) => t !== topicNumber);
      isNowCompleted = false;
    } else {
      sub.completedTopicNumbers.push(topicNumber);
      isNowCompleted = true;
    }

    persistAllStore(store);
    notifyListeners();
    return isNowCompleted;
  },

  async recordStudyTime(
    subjectId: string,
    durationSeconds: number,
    userId?: string
  ): Promise<void> {
    if (durationSeconds <= 0) return;
    const norm = normalizeSubjectId(subjectId);
    const effectiveUserId = userId || (await this.getActiveUserId());
    const store = loadAllStore();
    if (!store[effectiveUserId]) {
      store[effectiveUserId] = createEmptyUserData(effectiveUserId);
    }
    const data = store[effectiveUserId];
    if (!data.subjects[norm]) {
      data.subjects[norm] = createEmptySubjectProgress();
    }

    // Accumulate seconds
    data.totalStudySeconds = (data.totalStudySeconds || 0) + durationSeconds;
    data.subjects[norm].studySeconds = (data.subjects[norm].studySeconds || 0) + durationSeconds;

    // Streak calculation
    const today = getTodayString();
    const yesterday = getYesterdayString();

    if (!data.lastStudyDate) {
      data.streakDays = 1;
      data.lastStudyDate = today;
    } else if (data.lastStudyDate === yesterday) {
      data.streakDays = (data.streakDays || 0) + 1;
      data.lastStudyDate = today;
    } else if (data.lastStudyDate === today) {
      // Already studied today; streak unchanged
    } else {
      // Streak broken
      data.streakDays = 1;
      data.lastStudyDate = today;
    }

    persistAllStore(store);

    // Sync with authService user profile
    const hours = Math.round((data.totalStudySeconds / 3600) * 10) / 10;
    authService.updateProfile({
      studyHoursThisWeek: hours,
      streakDays: data.streakDays,
    }).catch(() => {});

    notifyListeners();
  },

  async recordQuizResult(
    subjectId: string,
    quizId: string,
    score: number,
    total: number,
    userId?: string
  ): Promise<void> {
    const norm = normalizeSubjectId(subjectId);
    const effectiveUserId = userId || (await this.getActiveUserId());
    const store = loadAllStore();
    if (!store[effectiveUserId]) {
      store[effectiveUserId] = createEmptyUserData(effectiveUserId);
    }
    const data = store[effectiveUserId];
    if (!data.subjects[norm]) {
      data.subjects[norm] = createEmptySubjectProgress();
    }

    const sub = data.subjects[norm];
    if (!sub.completedQuizIds.includes(quizId)) {
      sub.completedQuizIds.push(quizId);
    }
    sub.quizAttempts.push({
      quizId,
      score,
      total,
      completedAt: Date.now(),
    });

    persistAllStore(store);

    // Update student profile quizzes taken
    const totalQuizzes = Object.values(data.subjects).reduce(
      (sum, s) => sum + (s.completedQuizIds?.length || 0),
      0
    );
    authService.updateProfile({
      quizzesTaken: totalQuizzes,
    }).catch(() => {});

    notifyListeners();
  },

  async recordChallengeResult(
    mode: string,
    score: number,
    total: number,
    userId?: string
  ): Promise<void> {
    const norm = 'micro-2304112';
    const effectiveUserId = userId || (await this.getActiveUserId());
    const store = loadAllStore();
    if (!store[effectiveUserId]) {
      store[effectiveUserId] = createEmptyUserData(effectiveUserId);
    }
    const data = store[effectiveUserId];
    if (!data.subjects[norm]) {
      data.subjects[norm] = createEmptySubjectProgress();
    }

    const sub = data.subjects[norm];
    if (!sub.completedChallengeModes.includes(mode)) {
      sub.completedChallengeModes.push(mode);
    }

    persistAllStore(store);
    notifyListeners();
  },

  async clearUserProgress(subjectId?: string, userId?: string): Promise<void> {
    const effectiveUserId = userId || (await this.getActiveUserId());
    const store = loadAllStore();
    if (!store[effectiveUserId]) {
      return;
    }
    const data = store[effectiveUserId];

    if (subjectId) {
      const norm = normalizeSubjectId(subjectId);
      const subSeconds = data.subjects[norm]?.studySeconds || 0;
      data.totalStudySeconds = Math.max(0, (data.totalStudySeconds || 0) - subSeconds);
      data.subjects[norm] = createEmptySubjectProgress();
    } else {
      // Clear all subjects for this user
      data.totalStudySeconds = 0;
      data.streakDays = 0;
      data.lastStudyDate = '';
      data.subjects = {
        'micro-2304112': createEmptySubjectProgress(),
        'bmd-2994511': createEmptySubjectProgress(),
      };
    }

    persistAllStore(store);

    // Sync student profile
    const hours = Math.round((data.totalStudySeconds / 3600) * 10) / 10;
    const totalQuizzes = Object.values(data.subjects).reduce(
      (sum, s) => sum + (s.completedQuizIds?.length || 0),
      0
    );
    authService.updateProfile({
      studyHoursThisWeek: hours,
      quizzesTaken: totalQuizzes,
      semesterProgress: 0,
      streakDays: data.streakDays,
    }).catch(() => {});

    notifyListeners();
  },
};

/**
 * React hook to track active study time during user interaction with a screen.
 * Automatically pauses accumulation when app goes into background/inactive,
 * and resumes when returned to foreground.
 * Commits the session duration to progressService on unmount, page change, or AppState change.
 */
export function useStudySession(activityName: string, subjectId?: string) {
  const normSubjectId = normalizeSubjectId(subjectId);
  const startTimeRef = useRef<number>(Date.now());
  const accumulatedSecondsRef = useRef<number>(0);
  const isTrackingRef = useRef<boolean>(true);

  const commitElapsed = useCallback(() => {
    if (!isTrackingRef.current) return;
    const now = Date.now();
    const elapsed = Math.floor((now - startTimeRef.current) / 1000);
    if (elapsed > 0) {
      accumulatedSecondsRef.current += elapsed;
      startTimeRef.current = now;
    }

    const totalToSave = accumulatedSecondsRef.current;
    if (totalToSave >= 2) {
      progressService.recordStudyTime(normSubjectId, totalToSave).catch(() => {});
      accumulatedSecondsRef.current = 0;
    }
  }, [normSubjectId]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    accumulatedSecondsRef.current = 0;
    isTrackingRef.current = true;

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // App returned to foreground: resume tracking
        startTimeRef.current = Date.now();
        isTrackingRef.current = true;
      } else {
        // App went to background/inactive: pause & commit elapsed time
        commitElapsed();
        isTrackingRef.current = false;
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      commitElapsed();
      subscription.remove();
    };
  }, [commitElapsed]);
}
