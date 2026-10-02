import {
  mockSubjects,
  businessModelSubject,
  mockChapterQuizzes,
  mockDailyQuiz,
  mockDoubtSolver,
  mockProgressSummary,
  mockStudent,
  Subject,
  SubjectDetailed,
  ChapterQuiz,
  DailyQuiz,
  DoubtSolverPreview,
  ProgressSummary,
  StudentProfile,
} from '@/constants/chapters';

export const apiService = {
  async getSubjects(): Promise<Subject[]> {
    await new Promise((r) => setTimeout(r, 80));
    return mockSubjects;
  },

  async getSubjectById(id: string): Promise<Subject | undefined> {
    await new Promise((r) => setTimeout(r, 40));
    return mockSubjects.find((s) => s.id === id || s.code === id) || mockSubjects[0];
  },

  async getDetailedSubject(_id?: string): Promise<SubjectDetailed> {
    await new Promise((r) => setTimeout(r, 40));
    return businessModelSubject;
  },

  async getQuizByChapterId(chapterId: string): Promise<ChapterQuiz | undefined> {
    await new Promise((r) => setTimeout(r, 80));
    return mockChapterQuizzes[chapterId] || mockChapterQuizzes['bmd-2994511'] || mockChapterQuizzes['daily-bmd-quiz'];
  },

  async getAllQuizzes(): Promise<DailyQuiz[]> {
    await new Promise((r) => setTimeout(r, 80));
    return [
      mockDailyQuiz,
      {
        id: 'quiz-bmd-unit3',
        title: 'Start-up Financing & Unit Economics Quiz',
        subject: 'Business Model Development',
        subjectCode: '2994511',
        questionCount: 5,
        durationMinutes: 8,
        xpReward: 80,
        difficulty: 'Medium',
        topics: ['Sources of Funding', 'Debt vs Equity', 'Angel Investors & VCs', 'Break-Even Analysis'],
      },
      {
        id: 'quiz-bmd-unit4',
        title: 'IPR, Patents & Trademark Law Quiz',
        subject: 'Business Model Development',
        subjectCode: '2994511',
        questionCount: 5,
        durationMinutes: 7,
        xpReward: 90,
        difficulty: 'Hard',
        topics: ['Patents Act 1970', 'Section 3 Non-Patentability', 'Copyrights & Trademarks', 'Trade Secrets'],
      },
      {
        id: 'quiz-bmd-unit5',
        title: 'Business Model Canvas & Lean Startup Quiz',
        subject: 'Business Model Development',
        subjectCode: '2994511',
        questionCount: 5,
        durationMinutes: 8,
        xpReward: 85,
        difficulty: 'Medium',
        topics: ['9 Building Blocks', 'MVP & Prototyping', 'Freemium & SaaS Models', 'Investor Pitching'],
      },
    ];
  },

  async getStudentProfile(): Promise<StudentProfile> {
    await new Promise((r) => setTimeout(r, 40));
    return mockStudent;
  },

  async getProgressSummary(): Promise<ProgressSummary> {
    await new Promise((r) => setTimeout(r, 40));
    return mockProgressSummary;
  },

  async getDoubtSolverData(): Promise<DoubtSolverPreview> {
    await new Promise((r) => setTimeout(r, 40));
    return mockDoubtSolver;
  },

  async submitQuizResult(
    _chapterId: string,
    score: number,
    total: number
  ): Promise<{ xpEarned: number }> {
    await new Promise((r) => setTimeout(r, 150));
    const xpEarned = Math.round((score / total) * 100);
    return { xpEarned };
  },
};
