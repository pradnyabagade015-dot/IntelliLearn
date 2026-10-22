import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { QuizCard } from '@/components/QuizCard';
import { apiService } from '@/services/api';
import { DailyQuiz, StudentProfile } from '@/constants/chapters';
import { useFocusEffect, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function QuizHubScreen() {
  const [quizzes, setQuizzes] = useState<DailyQuiz[]>([]);
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'micro' | 'bmd'>('all');

  useEffect(() => {
    apiService.getAllQuizzes().then(setQuizzes);
    apiService.getStudentProfile().then(setStudent);
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      apiService.getStudentProfile().then((data) => {
        if (isMounted) setStudent(data);
      });
      return () => {
        isMounted = false;
      };
    }, [])
  );

  const filteredQuizzes = quizzes.filter((q) => {
    if (activeFilter === 'micro') return q.subjectCode === '2304112';
    if (activeFilter === 'bmd') return q.subjectCode === '2994511';
    return true;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Semester IV Practice Quizzes"
        subtitle="Mumbai University exam mock tests for EXTC Engineering & Management"
      />

      {/* Subject Filter Pills */}
      <View style={styles.subjectSelectorRow}>
        <TouchableOpacity
          style={[
            styles.subjectPill,
            activeFilter === 'all' && styles.subjectPillActive,
          ]}
          onPress={() => setActiveFilter('all')}
        >
          <Text
            style={[
              styles.subjectPillText,
              activeFilter === 'all' && styles.subjectPillTextActive,
            ]}
          >
            All Quizzes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.subjectPill,
            activeFilter === 'micro' && styles.subjectPillActive,
          ]}
          onPress={() => setActiveFilter('micro')}
        >
          <Text
            style={[
              styles.subjectPillText,
              activeFilter === 'micro' && styles.subjectPillTextActive,
            ]}
          >
            ⚡ Microcontrollers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.subjectPill,
            activeFilter === 'bmd' && styles.subjectPillActive,
          ]}
          onPress={() => setActiveFilter('bmd')}
        >
          <Text
            style={[
              styles.subjectPillText,
              activeFilter === 'bmd' && styles.subjectPillTextActive,
            ]}
          >
            💼 Business Model
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* XP & Stats Header */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="trophy" size={20} color="#D97706" />
            </View>
            <View>
              <Text style={styles.statVal}>{student?.totalXp || 1950} XP</Text>
              <Text style={styles.statLbl}>Semester IV XP</Text>
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

        {/* Microcontroller Coding Challenge Banner */}
        {(activeFilter === 'all' || activeFilter === 'micro') && (
          <TouchableOpacity
            style={styles.challengeCard}
            onPress={() => router.push('/challenge' as any)}
            activeOpacity={0.8}
          >
            <View style={styles.challengeTopRow}>
              <View style={styles.challengeTag}>
                <Ionicons name="terminal" size={13} color="#0369A1" />
                <Text style={styles.challengeTagText}>Interactive Coding Challenge</Text>
              </View>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW</Text>
              </View>
            </View>

            <Text style={styles.challengeTitle}>Microcontroller Coding Arena (2304112)</Text>
            <Text style={styles.challengeSub}>
              Practice Mode A (Complete Missing Code), Mode B (Find Error), and Mode C (Match Registers).
            </Text>

            <View style={styles.challengeFooter}>
              <Text style={styles.challengeMeta}>3 Modes • 18+ Challenges • 8051 & ARM7</Text>
              <View style={styles.challengeStartBtn}>
                <Text style={styles.challengeStartText}>Enter Arena</Text>
                <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Available Quizzes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {activeFilter === 'micro'
              ? 'Microcontrollers (2304112) Practice Tests'
              : activeFilter === 'bmd'
              ? 'Business Model (2994511) Practice Tests'
              : 'All Available Practice Tests'}
          </Text>
          {filteredQuizzes.map((q) => (
            <QuizCard key={q.id} quiz={q} />
          ))}
        </View>

        {/* Study Tip Card */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={24} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>University Exam Preparation Tip</Text>
            <Text style={styles.tipDesc}>
              {activeFilter === 'micro'
                ? 'In Mumbai University Microcontrollers (2304112) exams, always draw pin/block diagrams with register banks, pin functions (PSEN*, ALE, EA*), and show complete baud rate calculation formulas for full marks!'
                : 'In Mumbai University exams for Business Model Development (2994511), drawing structured diagrams like the 9-block Business Model Canvas, Seed-to-IPO funding lifecycle, and statutory patent filing steps fetches maximum marks!'}
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
  subjectSelectorRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
  subjectPill: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectPillActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  subjectPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  subjectPillTextActive: {
    color: Colors.primaryDark,
    fontWeight: '800',
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
  challengeCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 8,
  },
  challengeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  challengeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  challengeTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0369A1',
  },
  newBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  challengeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  challengeSub: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
  },
  challengeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: 4,
  },
  challengeMeta: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  challengeStartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 4,
  },
  challengeStartText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
