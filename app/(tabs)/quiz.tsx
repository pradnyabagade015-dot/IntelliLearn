import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { QuizCard } from '@/components/QuizCard';
import { apiService } from '@/services/api';
import { DailyQuiz, StudentProfile } from '@/constants/chapters';
import { Ionicons } from '@expo/vector-icons';

export default function QuizHubScreen() {
  const [quizzes, setQuizzes] = useState<DailyQuiz[]>([]);
  const [student, setStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    apiService.getAllQuizzes().then(setQuizzes);
    apiService.getStudentProfile().then(setStudent);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Business Model Quizzes"
        subtitle="Practice University Exam questions on Entrepreneurship, IPR, BMC & Digital Business"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* XP & Stats Header */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="trophy" size={20} color="#D97706" />
            </View>
            <View>
              <Text style={styles.statVal}>{student?.totalXp || 1950} XP</Text>
              <Text style={styles.statLbl}>Business Model XP</Text>
            </View>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: Colors.primaryLight }]}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.statVal}>{student?.quizzesTaken || 19}</Text>
              <Text style={styles.statLbl}>Quizzes Solved</Text>
            </View>
          </View>
        </View>

        {/* Available Quizzes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Model Development Quizzes</Text>
          {quizzes.map((q) => (
            <QuizCard key={q.id} quiz={q} />
          ))}
        </View>

        {/* Study Tip Card */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={24} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>University Exam Preparation Tip</Text>
            <Text style={styles.tipDesc}>
              In Mumbai University exams for Business Model Development (2994511), drawing structured diagrams like the 9-block Business Model Canvas, Seed-to-IPO funding lifecycle, and statutory patent filing steps fetches maximum marks!
            </Text>
          </View>
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
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statVal: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  statLbl: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.cardBorder,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primaryDark,
    marginBottom: 2,
  },
  tipDesc: {
    fontSize: 12,
    color: Colors.primaryDark,
    lineHeight: 17,
  },
});
