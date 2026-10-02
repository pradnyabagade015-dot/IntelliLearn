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
import { ProgressBar } from '@/components/ProgressBar';
import { apiService } from '@/services/api';
import { ProgressSummary, StudentProfile, SubjectDetailed } from '@/constants/chapters';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressScreen() {
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [detailedSub, setDetailedSub] = useState<SubjectDetailed | null>(null);

  useEffect(() => {
    apiService.getProgressSummary().then(setProgress);
    apiService.getStudentProfile().then(setStudent);
    apiService.getDetailedSubject('env-2993512').then(setDetailedSub);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Learning Analytics"
        subtitle="Environmental Science • Semester IV EXTC Tracking"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Progress Card */}
        <View style={styles.mainCard}>
          <View style={styles.mainTopRow}>
            <View>
              <Text style={styles.mainTitle}>Syllabus Completion</Text>
              <Text style={styles.mainSubtitle}>Course Code: 2993512 • 6 Units</Text>
            </View>
            <View style={styles.mainPercentBadge}>
              <Text style={styles.mainPercentText}>{progress?.overallPercentage || 65}%</Text>
            </View>
          </View>
          <ProgressBar
            progress={progress?.overallPercentage || 65}
            color={Colors.primary}
            height={10}
          />

          <View style={styles.overviewGrid}>
            <View style={styles.gridItem}>
              <Ionicons name="time" size={18} color={Colors.primary} />
              <Text style={styles.gridVal}>{progress?.weeklyCompletedHours || 18.5} hrs</Text>
              <Text style={styles.gridLbl}>Study Time</Text>
            </View>
            <View style={styles.gridItem}>
              <Ionicons name="leaf" size={18} color={Colors.primary} />
              <Text style={styles.gridVal}>{progress?.streakCount || 6} Days</Text>
              <Text style={styles.gridLbl}>Eco Streak</Text>
            </View>
            <View style={styles.gridItem}>
              <Ionicons name="checkmark-done-circle" size={18} color={Colors.secondary} />
              <Text style={styles.gridVal}>{progress?.accuracyRate || 92}%</Text>
              <Text style={styles.gridLbl}>Quiz Accuracy</Text>
            </View>
          </View>
        </View>

        {/* Module-Wise Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Unit-Wise Syllabus Progress</Text>
          {detailedSub?.modules.map((m, idx) => {
            const modProgress = m.isCompleted ? 100 : idx === 4 ? 60 : 20;
            return (
              <View key={m.id} style={styles.moduleRow}>
                <View style={styles.moduleRowHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modName}>Unit {m.moduleNumber}: {m.title.replace(/Unit [I|V|X]+ [–|-] /, '')}</Text>
                    <Text style={styles.modHours}>{m.hours} Hours • {m.topics.length} Topics</Text>
                  </View>
                  <Text style={styles.modPercent}>{modProgress}%</Text>
                </View>
                <ProgressBar progress={modProgress} color={Colors.primary} height={6} />
              </View>
            );
          })}
        </View>

        {/* Weekly Study Goals */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Weekly Study Goal</Text>
            <Text style={styles.goalValue}>
              {student?.studyHoursThisWeek || 18.5} / 20 hrs
            </Text>
          </View>
          <ProgressBar
            progress={((student?.studyHoursThisWeek || 18.5) / 20) * 100}
            color={Colors.primary}
            height={8}
          />
          <Text style={styles.goalTip}>
            {"🌿 Great progress! Just 1.5 more hours to complete this week's target."}
          </Text>
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
  mainCard: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mainTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  mainSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  mainPercentBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  mainPercentText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  overviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  gridItem: {
    alignItems: 'center',
    gap: 4,
  },
  gridVal: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  gridLbl: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  section: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  moduleRow: {
    gap: 6,
  },
  moduleRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  modHours: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  modPercent: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  goalCard: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 10,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  goalValue: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  goalTip: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
});
