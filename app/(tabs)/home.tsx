import React, { useCallback, useEffect, useState } from 'react';
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
import { authService } from '@/services/auth';
import { StudentProfile } from '@/constants/chapters';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface FeatureItem {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  route: string;
  badge?: string;
  iconBg: string;
  borderColor: string;
}

const FEATURE_CARDS: FeatureItem[] = [
  {
    id: 'chapters',
    emoji: '📚',
    title: 'Learn Chapters',
    subtitle: 'Explore the 6 official syllabus units and structured topic notes',
    route: '/(tabs)/chapters',
    iconBg: '#EBF5EE',
    borderColor: '#D1E7D6',
  },
  {
    id: 'tutor',
    emoji: '🤖',
    title: 'AI Tutor',
    subtitle: 'Chat with AI for 5 & 10-mark model answers, definitions and revisions',
    route: '/tutor/bmd-2994511',
    badge: 'LIVE AI',
    iconBg: '#E6FFFA',
    borderColor: '#CCFBF1',
  },
  {
    id: 'doubt',
    emoji: '💬',
    title: 'Ask a Doubt',
    subtitle: 'Get instant direct answers, explanations, examples & exam points',
    route: '/doubt',
    badge: 'INSTANT',
    iconBg: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  {
    id: 'challenge',
    emoji: '⚡',
    title: 'MCU Coding Challenge',
    subtitle: 'Practice missing code, find bugs & match registers for 8051 and ARM7',
    route: '/challenge',
    badge: 'NEW',
    iconBg: '#E0F2FE',
    borderColor: '#BAE6FD',
  },
  {
    id: 'quiz',
    emoji: '📝',
    title: 'Take Quiz',
    subtitle: 'Practice unit-wise quizzes and test your exam readiness',
    route: '/(tabs)/quiz',
    iconBg: '#EFF6FF',
    borderColor: '#DBEAFE',
  },
  {
    id: 'progress',
    emoji: '📊',
    title: 'My Progress',
    subtitle: 'Check your syllabus completion rate, streaks and study hours',
    route: '/(tabs)/progress',
    iconBg: '#F3E8FF',
    borderColor: '#E9D5FF',
  },
];

export default function HomeScreen() {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.subscribe((user) => {
      setStudent(user);
    });
    return unsubscribe;
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      authService.getCurrentUser().then((data) => {
        if (isMounted) setStudent(data);
      });
      return () => {
        isMounted = false;
      };
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    const data = await authService.getCurrentUser();
    setStudent(data);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greetingTitle}>
            {student?.name ? `Hello, ${student.name} 👋` : 'Hello, Student 👋'}
          </Text>
          <Text style={styles.greetingSub}>Welcome to your AI study portal</Text>
        </View>

        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => router.push('/(tabs)/profile')}
          activeOpacity={0.8}
        >
          <Ionicons name="person-circle-outline" size={34} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        {/* Semester IV Subjects Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Enrolled Subjects (Semester IV)</Text>
          <Text style={styles.sectionSubtitle}>Select a subject to start learning</Text>
        </View>

        {/* Subject Card 1: Microcontrollers */}
        <View style={[styles.courseBanner, { borderColor: '#BAE6FD' }]}>
          <View style={styles.courseHeaderRow}>
            <View style={[styles.courseTag, { backgroundColor: '#E0F2FE' }]}>
              <Text style={[styles.courseTagText, { color: '#0369A1' }]}>⚡ EXTC Core</Text>
            </View>
            <Text style={styles.courseCodeText}>Course Code: 2304112 • 3 Credits</Text>
          </View>

          <Text style={styles.courseTitle}>Microcontrollers</Text>
          <Text style={styles.courseDesc}>
            University of Mumbai EXTC • 8051, ARM7TDMI, Memory & Peripherals
          </Text>

          <View style={styles.subjectActionsRow}>
            <TouchableOpacity
              style={[styles.subjectActionBtn, { backgroundColor: Colors.primary }]}
              onPress={() => router.push('/chapter/micro-2304112')}
              activeOpacity={0.8}
            >
              <Ionicons name="book-outline" size={15} color="#FFFFFF" />
              <Text style={styles.subjectActionBtnText}>Notes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.subjectActionBtn, { backgroundColor: '#0284C7' }]}
              onPress={() => router.push('/tutor/micro-2304112')}
              activeOpacity={0.8}
            >
              <Ionicons name="sparkles" size={15} color="#FFFFFF" />
              <Text style={styles.subjectActionBtnText}>AI Tutor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.subjectActionBtn, { backgroundColor: '#7C3AED' }]}
              onPress={() => router.push('/challenge' as any)}
              activeOpacity={0.8}
            >
              <Ionicons name="terminal" size={15} color="#FFFFFF" />
              <Text style={styles.subjectActionBtnText}>Challenge</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subject Card 2: Business Model Development */}
        <View style={styles.courseBanner}>
          <View style={styles.courseHeaderRow}>
            <View style={styles.courseTag}>
              <Text style={styles.courseTagText}>💼 Management</Text>
            </View>
            <Text style={styles.courseCodeText}>Course Code: 2994511 • 2 Credits</Text>
          </View>

          <Text style={styles.courseTitle}>Business Model Development</Text>
          <Text style={styles.courseDesc}>
            University of Mumbai • Entrepreneurship, IPR, BMC & Digital Models
          </Text>

          <View style={styles.subjectActionsRow}>
            <TouchableOpacity
              style={[styles.subjectActionBtn, { backgroundColor: Colors.primary }]}
              onPress={() => router.push('/chapter/bmd-2994511')}
              activeOpacity={0.8}
            >
              <Ionicons name="book-outline" size={15} color="#FFFFFF" />
              <Text style={styles.subjectActionBtnText}>Study Notes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.subjectActionBtn, { backgroundColor: Colors.secondary }]}
              onPress={() => router.push('/tutor/bmd-2994511')}
              activeOpacity={0.8}
            >
              <Ionicons name="sparkles" size={15} color="#FFFFFF" />
              <Text style={styles.subjectActionBtnText}>AI Tutor</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feature Cards Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Learning Tools</Text>
          <Text style={styles.sectionSubtitle}>Select an activity to get started</Text>
        </View>

        {/* Feature Cards Grid/List */}
        <View style={styles.cardsContainer}>
          {FEATURE_CARDS.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.featureCard, { borderColor: card.borderColor }]}
              onPress={() => router.push(card.route as any)}
              activeOpacity={0.8}
            >
              <View style={[styles.cardIconBox, { backgroundColor: card.iconBg }]}>
                <Text style={styles.cardEmoji}>{card.emoji}</Text>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  {card.badge ? (
                    <View style={styles.badgePill}>
                      <Text style={styles.badgePillText}>{card.badge}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.cardSubtitle} numberOfLines={2}>
                  {card.subtitle}
                </Text>
              </View>

              <View style={styles.cardArrow}>
                <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
              </View>
            </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  headerLeft: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.4,
  },
  greetingSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  profileBtn: {
    padding: 2,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 36,
    gap: 16,
  },
  courseBanner: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  courseHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  courseTag: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  courseTagText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  courseCodeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  courseDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  subjectActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  subjectActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
  },
  subjectActionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  sectionHeader: {
    marginTop: 4,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  cardsContainer: {
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
    minHeight: 88,
  },
  cardIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardEmoji: {
    fontSize: 26,
  },
  cardContent: {
    flex: 1,
    paddingRight: 6,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  badgePill: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  cardArrow: {
    marginLeft: 4,
  },
});
