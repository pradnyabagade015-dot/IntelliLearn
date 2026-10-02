import {
  mockSubjects,
  environmentalScienceSubject,
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
    return environmentalScienceSubject;
  },

  async getQuizByChapterId(chapterId: string): Promise<ChapterQuiz | undefined> {
    await new Promise((r) => setTimeout(r, 80));
    return mockChapterQuizzes[chapterId] || mockChapterQuizzes['env-2993512'] || mockChapterQuizzes['daily-env-quiz'];
  },

  async getAllQuizzes(): Promise<DailyQuiz[]> {
    await new Promise((r) => setTimeout(r, 80));
    return [
      mockDailyQuiz,
      {
        id: 'quiz-env-unit3',
        title: 'Ecosystems & Biodiversity Conservation Quiz',
        subject: 'Environmental Science',
        subjectCode: '2993512',
        questionCount: 5,
        durationMinutes: 8,
        xpReward: 80,
        difficulty: 'Medium',
        topics: ['Food Chains & Energy Flow', 'Genetic & Species Diversity', 'Biodiversity Hotspots'],
      },
      {
        id: 'quiz-env-unit6',
        title: 'Social Issues, Climate Change & EPA 1986',
        subject: 'Environmental Science',
        subjectCode: '2993512',
        questionCount: 5,
        durationMinutes: 7,
        xpReward: 90,
        difficulty: 'Hard',
        topics: ['Rainwater Harvesting', 'Global Warming & GHG', 'Acid Rain & Ozone', 'EPA 1986'],
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
