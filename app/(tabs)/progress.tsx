import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { apiService } from '@/services/api';
import { SubjectDetailed } from '@/constants/chapters';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  progressService,
  SubjectMetrics,
  formatStudyTime,
} from '@/services/progress';

const WEEKLY_GOAL_SECONDS = 20 * 3600; // 20 hours

export default function ProgressScreen() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('micro-2304112');
  const [metrics, setMetrics] = useState<SubjectMetrics | null>(null);
  const [totalWeeklyStudySeconds, setTotalWeeklyStudySeconds] = useState<number>(0);
  const [detailedSub, setDetailedSub] = useState<SubjectDetailed | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [sub, m, allData] = await Promise.all([
        apiService.getDetailedSubject(selectedSubjectId),
        progressService.getSubjectMetrics(selectedSubjectId),
        progressService.getUserLearningData(),
      ]);

      setDetailedSub(sub);
      setMetrics(m);
      setTotalWeeklyStudySeconds(allData.totalStudySeconds || 0);
    } catch {
      // Fallback
    }
  }, [selectedSubjectId]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      apiService.getDetailedSubject(selectedSubjectId),
      progressService.getSubjectMetrics(selectedSubjectId),
      progressService.getUserLearningData(),
    ]).then(([sub, m, allData]) => {
      if (isMounted) {
        setDetailedSub(sub);
        setMetrics(m);
        setTotalWeeklyStudySeconds(allData.totalStudySeconds || 0);
      }
    });

    const unsubscribe = progressService.subscribe(() => {
      if (isMounted) {
        loadData();
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [selectedSubjectId, loadData]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleClearProgress = () => {
    const subjectName = detailedSub?.name || 'this subject';

    Alert.alert(
      'Reset Learning Progress?',
      `Are you sure you want to clear your completed topics, quiz records, and study time for ${subjectName}?\n\nThis will reset progress to 0%. Your account profile and login credentials will remain intact.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear Progress',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsClearing(true);
              await progressService.clearUserProgress(selectedSubjectId);
              await loadData();
              Alert.alert(
                'Progress Cleared',
                `Learning progress for ${subjectName} has been reset to 0%.`
              );
            } catch (err: any) {
              Alert.alert(
                'Reset Failed',
                err?.message || 'Could not reset progress. Please try again.'
              );
            } finally {
              setIsClearing(false);
            }
          },
        },
      ]
    );
  };

  const overallPercentage = metrics?.overallPercentage ?? 0;
  const completedTopicsCount = metrics?.completedTopicsCount ?? 0;
  const totalTopicsCount = metrics?.totalTopicsCount ?? (detailedSub?.modules.reduce((s, m) => s + m.topics.length, 0) || 0);

  const weeklyGoalPercent = Math.min(
    100,
    Math.max(0, Math.round((totalWeeklyStudySeconds / WEEKLY_GOAL_SECONDS) * 100))
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Learning Analytics"
        subtitle={`${detailedSub?.name || 'Semester IV'} • EXTC Engineering Tracking`}
      />

      {/* Subject Filter Pills */}
      <View style={styles.subjectSelectorRow}>
        <TouchableOpacity
          style={[
            styles.subjectPill,
            selectedSubjectId === 'micro-2304112' && styles.subjectPillActive,
          ]}
          onPress={() => setSelectedSubjectId('micro-2304112')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.subjectPillText,
              selectedSubjectId === 'micro-2304112' && styles.subjectPillTextActive,
            ]}
          >
            ⚡ Microcontrollers (2304112)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.subjectPill,
            selectedSubjectId === 'bmd-2994511' && styles.subjectPillActive,
          ]}
          onPress={() => setSelectedSubjectId('bmd-2994511')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.subjectPillText,
              selectedSubjectId === 'bmd-2994511' && styles.subjectPillTextActive,
            ]}
          >
            💼 Business Model (2994511)
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Progress Card */}
        <View style={styles.mainCard}>
          <View style={styles.mainTopRow}>
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text style={styles.mainTitle}>{detailedSub?.name || 'Syllabus'} Completion</Text>
              <Text style={styles.mainSubtitle}>
                Course Code: {detailedSub?.code || '2304112'} • {completedTopicsCount}/{totalTopicsCount} Topics Completed
              </Text>
            </View>
            <View style={styles.mainPercentBadge}>
              <Text style={styles.mainPercentText}>{overallPercentage}%</Text>
            </View>
          </View>

          <ProgressBar
            progress={overallPercentage}
            color={Colors.primary}
            height={10}
          />

          <View style={styles.overviewGrid}>
            <View style={styles.gridItem}>
              <Ionicons name="time" size={18} color={Colors.primary} />
              <Text style={styles.gridVal}>
                {metrics?.formattedStudyTime || '0 min'}
              </Text>
              <Text style={styles.gridLbl}>Study Time</Text>
            </View>

            <View style={styles.gridItem}>
              <Ionicons name="flash" size={18} color="#D97706" />
              <Text style={styles.gridVal}>
                {metrics?.streakCount || 0} {metrics?.streakCount === 1 ? 'Day' : 'Days'}
              </Text>
              <Text style={styles.gridLbl}>Study Streak</Text>
            </View>

            <View style={styles.gridItem}>
              <Ionicons name="checkmark-done-circle" size={18} color={Colors.secondary} />
              <Text style={styles.gridVal}>
                {metrics?.accuracyRate ? `${metrics.accuracyRate}%` : '0%'}
              </Text>
              <Text style={styles.gridLbl}>Quiz Accuracy</Text>
            </View>
          </View>
        </View>

        {/* Unit-Wise Breakdown */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Unit-Wise Syllabus Progress</Text>
            <Text style={styles.sectionBadge}>
              {detailedSub?.modules.length || 6} Units
            </Text>
          </View>

          {detailedSub?.modules.map((m) => {
            const modProgress = metrics?.unitProgress[m.moduleNumber] ?? 0;
            const completedInMod = m.topics.filter((t) =>
              metrics?.completedTopicNumbers.includes(t.topicNumber)
            ).length;

            return (
              <View key={m.id} style={styles.moduleRow}>
                <View style={styles.moduleRowHeader}>
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={styles.modName} numberOfLines={1}>
                      Unit {m.moduleNumber}: {m.title.replace(/^Unit\s+[IVXLCDM]+\s*[–-]\s*/i, '')}
                    </Text>
                    <Text style={styles.modHours}>
                      {completedInMod}/{m.topics.length} Topics • {m.hours} Hours
                    </Text>
                  </View>
                  <Text style={[styles.modPercent, modProgress === 100 && styles.modPercentDone]}>
                    {modProgress}%
                  </Text>
                </View>
                <ProgressBar
                  progress={modProgress}
                  color={modProgress === 100 ? Colors.secondary : Colors.primary}
                  height={6}
                />
              </View>
            );
          })}
        </View>

        {/* Weekly Study Goals */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View>
              <Text style={styles.goalTitle}>Weekly Study Target</Text>
              <Text style={styles.goalSub}>All active study sessions combined</Text>
            </View>
            <Text style={styles.goalValue}>
              {formatStudyTime(totalWeeklyStudySeconds)} / 20 hrs
            </Text>
          </View>

          <ProgressBar
            progress={weeklyGoalPercent}
            color={Colors.primary}
            height={8}
          />

          <Text style={styles.goalTip}>
            {totalWeeklyStudySeconds === 0
              ? '🚀 Start reading topic notes or take a quiz to begin tracking your hours!'
              : totalWeeklyStudySeconds < WEEKLY_GOAL_SECONDS
              ? `🚀 Great momentum! ${formatStudyTime(
                  WEEKLY_GOAL_SECONDS - totalWeeklyStudySeconds
                )} left to hit your weekly target.`
              : '🎉 Goal accomplished! Excellent dedication to your Semester IV preparation!'}
          </Text>
        </View>

        {/* Reset & Manage Progress Action Card */}
        <View style={styles.dangerZoneCard}>
          <View style={styles.dangerLeft}>
            <View style={styles.dangerIconBox}>
              <Ionicons name="refresh-outline" size={20} color="#DC2626" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.dangerTitle}>Clear Subject Progress</Text>
              <Text style={styles.dangerSub}>
                Reset completed topics, quiz scores & study time for {detailedSub?.name || 'this subject'}.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.clearBtn}
            onPress={handleClearProgress}
            disabled={isClearing}
            activeOpacity={0.8}
          >
            {isClearing ? (
              <ActivityIndicator size="small" color="#DC2626" />
            ) : (
              <>
                <Ionicons name="trash-outline" size={15} color="#DC2626" />
                <Text style={styles.clearBtnText}>Clear Progress</Text>
              </>
            )}
          </TouchableOpacity>
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
    gap: 10,
  },
  subjectPill: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 10,
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
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  subjectPillTextActive: {
    color: Colors.primaryDark,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  sectionBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
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
    marginTop: 1,
  },
  modPercent: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  modPercentDone: {
    color: Colors.secondary,
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
  goalSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
    fontWeight: '500',
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
    lineHeight: 16,
  },
  dangerZoneCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    gap: 12,
  },
  dangerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dangerIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#991B1B',
  },
  dangerSub: {
    fontSize: 11,
    color: '#B91C1C',
    marginTop: 2,
    lineHeight: 15,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
  },
  clearBtnText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '800',
  },
});
