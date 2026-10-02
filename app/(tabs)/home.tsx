import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { ChapterCard } from '@/components/ChapterCard';
import { QuizCard } from '@/components/QuizCard';
import { ProgressBar } from '@/components/ProgressBar';
import { apiService } from '@/services/api';
import { Subject, DailyQuiz, StudentProfile } from '@/constants/chapters';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [dailyQuiz, setDailyQuiz] = useState<DailyQuiz | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      apiService.getStudentProfile(),
      apiService.getSubjects(),
      apiService.getAllQuizzes(),
    ]).then(([stud, subs, quizzes]) => {
      if (isMounted) {
        setStudent(stud);
        setSubjects(subs);
        setDailyQuiz(quizzes[0] || null);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const [stud, subs, quizzes] = await Promise.all([
      apiService.getStudentProfile(),
      apiService.getSubjects(),
      apiService.getAllQuizzes(),
    ]);
    setStudent(stud);
    setSubjects(subs);
    setDailyQuiz(quizzes[0] || null);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        studentName={student?.name || 'Alex'}
        streakDays={student?.streakDays || 7}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        {/* Main Hero Subject Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>💼 Course Code: 2994511 • 2 Credits</Text>
            </View>
            <View style={styles.progressPercentPill}>
              <Text style={styles.progressPercentPillText}>
                {student?.semesterProgress || 68}% Done
              </Text>
            </View>
          </View>

          <Text style={styles.heroMainTitle}>Business Model Development</Text>
          <Text style={styles.heroSubtitle}>
            AI-powered learning for EXTC Semester IV students
          </Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressSubLabel}>Syllabus Completion</Text>
              <Text style={styles.progressSubValue}>4 of 6 Units</Text>
            </View>
            <ProgressBar
              progress={student?.semesterProgress || 68}
              color={Colors.primary}
              height={8}
            />
          </View>

          <View style={styles.heroStatsGrid}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatVal}>{student?.studyHoursThisWeek || 19.5}h</Text>
              <Text style={styles.heroStatLbl}>Study This Week</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatVal}>{student?.doubtsResolved || 38}</Text>
              <Text style={styles.heroStatLbl}>Doubts Solved</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatVal}>{student?.totalXp || 1950}</Text>
              <Text style={styles.heroStatLbl}>Total XP</Text>
            </View>
          </View>
        </View>

        {/* AI Action Banners */}
        <View style={styles.actionGrid}>
          {/* AI Tutor Card */}
          <TouchableOpacity
            style={[styles.actionBanner, { backgroundColor: Colors.primaryLight, borderColor: Colors.cardBorder }]}
            onPress={() => router.push('/tutor/bmd-2994511')}
            activeOpacity={0.8}
          >
            <View style={styles.actionHeader}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.primary }]}>
                <Ionicons name="sparkles" size={18} color="#FFFFFF" />
              </View>
              <View style={styles.actionLiveTag}>
                <Text style={styles.actionLiveText}>AI TUTOR</Text>
              </View>
            </View>
            <Text style={styles.actionTitle}>AI Study Tutor</Text>
            <Text style={styles.actionDesc}>
              5-mark model answers, BMC canvas, IPR patents & quick revisions.
            </Text>
            <View style={styles.actionLinkRow}>
              <Text style={[styles.actionLinkText, { color: Colors.primaryDark }]}>
                Open AI Tutor
              </Text>
              <Ionicons name="arrow-forward" size={14} color={Colors.primaryDark} />
            </View>
          </TouchableOpacity>

          {/* AI Doubt Solver Card */}
          <TouchableOpacity
            style={[styles.actionBanner, { backgroundColor: Colors.secondaryLight, borderColor: '#C7D2FE' }]}
            onPress={() => router.push('/doubt')}
            activeOpacity={0.8}
          >
            <View style={styles.actionHeader}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.secondary }]}>
                <Ionicons name="bulb" size={18} color="#FFFFFF" />
              </View>
              <View style={[styles.actionLiveTag, { backgroundColor: '#E0E7FF' }]}>
                <Text style={[styles.actionLiveText, { color: Colors.secondaryDark }]}>SOLVER</Text>
              </View>
            </View>
            <Text style={styles.actionTitle}>Doubt Solver</Text>
            <Text style={styles.actionDesc}>
              Instant answers for Angel vs VC, Patents Act 1970, MVP & unit economics.
            </Text>
            <View style={styles.actionLinkRow}>
              <Text style={[styles.actionLinkText, { color: Colors.secondaryDark }]}>
                Solve a Doubt
              </Text>
              <Ionicons name="arrow-forward" size={14} color={Colors.secondaryDark} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Daily Business Model Challenge */}
        {dailyQuiz && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Daily Quiz Challenge</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/quiz')}>
                <Text style={styles.seeAllText}>All Quizzes</Text>
              </TouchableOpacity>
            </View>
            <QuizCard quiz={dailyQuiz} />
          </View>
        )}

        {/* Official Syllabus Course */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Course Syllabus & Units</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/chapters')}>
              <Text style={styles.seeAllText}>View all 6 units</Text>
            </TouchableOpacity>
          </View>

          {subjects.map((sub) => (
            <ChapterCard key={sub.id} subject={sub} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  progressPercentPill: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressPercentPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  heroMainTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginTop: 2,
    marginBottom: 14,
  },
  progressContainer: {
    gap: 6,
    marginBottom: 14,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressSubLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  progressSubValue: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  heroStatsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  heroStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.cardBorder,
  },
  heroStatVal: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  heroStatLbl: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBanner: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLiveTag: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  actionLiveText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: 0.5,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
    marginBottom: 12,
  },
  actionLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionLinkText: {
    fontSize: 12,
    fontWeight: '800',
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
});
