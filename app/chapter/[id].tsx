import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { apiService } from '@/services/api';
import {
  SubjectDetailed,
  Module,
  Topic,
} from '@/constants/chapters';
import { Ionicons } from '@expo/vector-icons';
import { useStudySession, progressService } from '@/services/progress';

export default function ChapterDetailScreen() {
  const params = useLocalSearchParams<{ id?: string; topicNumber?: string }>();
  const currentSubjectId = params.id || 'bmd-2994511';
  useStudySession('chapter_notes', currentSubjectId);

  const [detailedSubject, setDetailedSubject] = useState<SubjectDetailed | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'notes' | 'info'>('syllabus');
  const [completedTopicNumbers, setCompletedTopicNumbers] = useState<string[]>([]);

  const loadCompletion = useCallback(async () => {
    try {
      const m = await progressService.getSubjectMetrics(currentSubjectId);
      setCompletedTopicNumbers(m.completedTopicNumbers);
    } catch {
      // Ignore
    }
  }, [currentSubjectId]);

  useEffect(() => {
    const unsub = progressService.subscribe(() => {
      loadCompletion();
    });
    return unsub;
  }, [loadCompletion]);

  const handleToggleTopic = async (topicNumber: string) => {
    await progressService.toggleTopicCompletion(currentSubjectId, topicNumber);
    loadCompletion();
  };

  useEffect(() => {
    const fetchSubject = async () => {
      const subjectId = params.id || 'bmd-2994511';
      const [det, m] = await Promise.all([
        apiService.getDetailedSubject(subjectId),
        progressService.getSubjectMetrics(subjectId),
      ]);
      if (m) {
        setCompletedTopicNumbers(m.completedTopicNumbers);
      }
      if (det) {
        setDetailedSubject(det);

        if (params.topicNumber) {
          for (const m of det.modules) {
            const found = m.topics.find((t) => t.topicNumber === params.topicNumber);
            if (found) {
              setSelectedModule(m);
              setSelectedTopic(found);
              setActiveTab('notes');
              return;
            }
          }
        }

        setSelectedModule(det.modules[0] || null);
        setSelectedTopic(det.modules[0]?.topics[0] || null);
      }
    };
    fetchSubject();
  }, [params.id, params.topicNumber]);

  const openAiTutorForTopic = (topic: Topic) => {
    router.push({
      pathname: '/tutor/[chapterId]',
      params: {
        chapterId: detailedSubject?.id || params.id || 'bmd-2994511',
        topicNumber: topic.topicNumber,
        topicTitle: topic.title,
        moduleName: selectedModule?.title || detailedSubject?.name || 'Subject',
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        showBack
        title={detailedSubject?.name || 'Subject Details'}
        subtitle={`Course Code: ${detailedSubject?.code || '2994511'} • Semester IV EXTC`}
        rightAction={
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            {detailedSubject?.code === '2304112' && (
              <TouchableOpacity
                style={styles.challengeHeaderBtn}
                onPress={() => router.push('/challenge' as any)}
              >
                <Ionicons name="terminal" size={13} color="#FFFFFF" />
                <Text style={styles.tutorHeaderBtnText}>Challenge</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.tutorHeaderBtn}
              onPress={() => router.push(`/tutor/${detailedSubject?.id || params.id || 'bmd-2994511'}` as any)}
            >
              <Ionicons name="sparkles" size={13} color="#FFFFFF" />
              <Text style={styles.tutorHeaderBtnText}>AI Tutor</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'syllabus' && styles.activeTabBtn]}
          onPress={() => setActiveTab('syllabus')}
        >
          <Text style={[styles.tabText, activeTab === 'syllabus' && styles.activeTabText]}>
            Units & Topics
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'notes' && styles.activeTabBtn]}
          onPress={() => setActiveTab('notes')}
        >
          <Text style={[styles.tabText, activeTab === 'notes' && styles.activeTabText]}>
            Study Notes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'info' && styles.activeTabBtn]}
          onPress={() => setActiveTab('info')}
        >
          <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>
            Syllabus Scheme
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Microcontroller Coding Challenge Banner */}
        {detailedSubject?.code === '2304112' && (
          <View style={styles.challengeBanner}>
            <View style={styles.challengeBannerLeft}>
              <View style={styles.challengeBadge}>
                <Ionicons name="terminal" size={18} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.challengeBannerTitle}>MCU Coding Challenge</Text>
                  <View style={styles.newBadgePill}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </View>
                </View>
                <Text style={styles.challengeBannerSub}>
                  Practice Mode A (Missing Code), Mode B (Find Error) & Mode C (Match Registers)
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.challengeBannerBtn}
              onPress={() => router.push('/challenge' as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.challengeBannerBtnText}>Start</Text>
              <Ionicons name="arrow-forward" size={13} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* SYLLABUS TAB */}
        {activeTab === 'syllabus' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionHeading}>Official 6 Syllabus Units (49 Topics)</Text>
            {detailedSubject?.modules.map((mod) => (
              <View key={mod.id} style={styles.moduleCard}>
                <TouchableOpacity
                  style={styles.moduleHeader}
                  onPress={() =>
                    setSelectedModule(selectedModule?.id === mod.id ? null : mod)
                  }
                  activeOpacity={0.75}
                >
                  <View style={styles.moduleHeaderLeft}>
                    <View style={styles.moduleBadge}>
                      <Text style={styles.moduleBadgeText}>U{mod.moduleNumber}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.moduleTitle}>{mod.title}</Text>
                      <Text style={styles.moduleMeta}>
                        {mod.hours} Hours • {mod.topics.length} Topics • {mod.loMapping}
                      </Text>
                    </View>
                  </View>
                  <Ionicons
                    name={selectedModule?.id === mod.id ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={Colors.textSecondary}
                  />
                </TouchableOpacity>

                {selectedModule?.id === mod.id && (
                  <View style={styles.topicsList}>
                    {mod.topics.map((top) => {
                      const isTopCompleted = completedTopicNumbers.includes(top.topicNumber);
                      return (
                        <TouchableOpacity
                          key={top.id}
                          style={[
                            styles.topicItem,
                            selectedTopic?.id === top.id && styles.activeTopicItem,
                          ]}
                          onPress={() => {
                            setSelectedTopic(top);
                            setActiveTab('notes');
                          }}
                        >
                          <View style={styles.topicLeft}>
                            <View
                              style={[
                                styles.topicNumBadge,
                                isTopCompleted && styles.topicNumBadgeCompleted,
                              ]}
                            >
                              {isTopCompleted ? (
                                <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                              ) : (
                                <Text style={styles.topicNum}>{top.topicNumber}</Text>
                              )}
                            </View>
                            <Text
                              style={[
                                styles.topicTitle,
                                isTopCompleted && styles.topicTitleCompleted,
                              ]}
                              numberOfLines={2}
                            >
                              {top.title}
                            </Text>
                          </View>
                          <View style={styles.topicActions}>
                            <TouchableOpacity
                              style={styles.topicTutorBtn}
                              onPress={() => openAiTutorForTopic(top)}
                            >
                              <Ionicons name="sparkles" size={14} color={Colors.primary} />
                            </TouchableOpacity>
                            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* STUDY NOTES TAB */}
        {activeTab === 'notes' && (
          <View style={styles.tabContent}>
            {selectedTopic ? (
              <View style={styles.notesContainer}>
                {/* Topic Header Banner */}
                <View style={styles.topicBanner}>
                  <View style={styles.topicBadgeRow}>
                    <View style={styles.topicBadge}>
                      <Text style={styles.topicBadgeText}>Topic {selectedTopic.topicNumber}</Text>
                    </View>
                    {completedTopicNumbers.includes(selectedTopic.topicNumber) && (
                      <View style={styles.completedBadgePill}>
                        <Ionicons name="checkmark-circle" size={13} color="#15803D" />
                        <Text style={styles.completedBadgePillText}>Completed</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.topicHeaderTitle}>{selectedTopic.title}</Text>

                  <View style={styles.topicBannerActionRow}>
                    <TouchableOpacity
                      style={[
                        styles.toggleCompleteBtn,
                        completedTopicNumbers.includes(selectedTopic.topicNumber) &&
                          styles.toggleCompleteBtnDone,
                      ]}
                      onPress={() => handleToggleTopic(selectedTopic.topicNumber)}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name={
                          completedTopicNumbers.includes(selectedTopic.topicNumber)
                            ? 'checkmark-circle'
                            : 'checkmark-circle-outline'
                        }
                        size={17}
                        color={
                          completedTopicNumbers.includes(selectedTopic.topicNumber)
                            ? '#15803D'
                            : Colors.primary
                        }
                      />
                      <Text
                        style={[
                          styles.toggleCompleteBtnText,
                          completedTopicNumbers.includes(selectedTopic.topicNumber) &&
                            styles.toggleCompleteBtnTextDone,
                        ]}
                      >
                        {completedTopicNumbers.includes(selectedTopic.topicNumber)
                          ? 'Completed'
                          : 'Mark Completed'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.askAiTutorBanner}
                      onPress={() => openAiTutorForTopic(selectedTopic)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="sparkles" size={15} color="#FFFFFF" />
                      <Text style={styles.askAiTutorBannerText}>
                        Ask AI Tutor
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 1. Simple Definition */}
                <View style={styles.noteSection}>
                  <View style={styles.noteSectionHeader}>
                    <Text style={styles.noteSectionEmoji}>💡</Text>
                    <Text style={styles.noteSectionTitle}>1. Simple Definition</Text>
                  </View>
                  <Text style={styles.noteText}>{selectedTopic.notes.simpleDefinition}</Text>
                </View>

                {/* 2. Brief Explanation */}
                <View style={styles.noteSection}>
                  <View style={styles.noteSectionHeader}>
                    <Text style={styles.noteSectionEmoji}>📖</Text>
                    <Text style={styles.noteSectionTitle}>2. Brief Explanation</Text>
                  </View>
                  <Text style={styles.noteText}>{selectedTopic.notes.detailedExplanation}</Text>
                </View>

                {/* 3. Important Points */}
                <View style={styles.noteSection}>
                  <View style={styles.noteSectionHeader}>
                    <Text style={styles.noteSectionEmoji}>📌</Text>
                    <Text style={styles.noteSectionTitle}>3. Important Points</Text>
                  </View>
                  {selectedTopic.notes.importantPoints.map((point, pIdx) => (
                    <View key={pIdx} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{point}</Text>
                    </View>
                  ))}
                </View>

                {/* Architecture & Concept Diagram */}
                {Boolean(selectedTopic.notes.diagram) && (
                  <View style={[styles.noteSection, { backgroundColor: '#0F172A', borderColor: '#334155' }]}>
                    <View style={styles.noteSectionHeader}>
                      <Text style={styles.noteSectionEmoji}>📐</Text>
                      <Text style={[styles.noteSectionTitle, { color: '#38BDF8' }]}>
                        Architecture & Concept Diagram
                      </Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.diagramScroll}>
                      <Text style={styles.diagramText}>{selectedTopic.notes.diagram}</Text>
                    </ScrollView>
                  </View>
                )}

                {/* 4. Real-World Example */}
                <View style={[styles.noteSection, { backgroundColor: Colors.primaryLight }]}>
                  <View style={styles.noteSectionHeader}>
                    <Text style={styles.noteSectionEmoji}>🏢</Text>
                    <Text style={[styles.noteSectionTitle, { color: Colors.primaryDark }]}>
                      4. Real-World Example
                    </Text>
                  </View>
                  <Text style={[styles.noteText, { color: Colors.primaryDark }]}>
                    {selectedTopic.notes.simpleRealWorldExample}
                  </Text>
                </View>

                {/* 5. Exam Point */}
                <View style={[styles.noteSection, { backgroundColor: '#FEF3C7' }]}>
                  <View style={styles.noteSectionHeader}>
                    <Text style={styles.noteSectionEmoji}>🎯</Text>
                    <Text style={[styles.noteSectionTitle, { color: '#92400E' }]}>
                      5. Important Exam Point
                    </Text>
                  </View>
                  {selectedTopic.notes.examOrientedPoints.map((pt, idx) => (
                    <View key={idx} style={styles.bulletRow}>
                      <Text style={[styles.bulletDot, { color: '#92400E' }]}>{idx + 1}.</Text>
                      <Text style={[styles.bulletText, { color: '#78350F' }]}>{pt}</Text>
                    </View>
                  ))}
                </View>

                {/* 6. University Exam Questions */}
                <View style={[styles.noteSection, { backgroundColor: Colors.secondaryLight }]}>
                  <View style={styles.noteSectionHeader}>
                    <Text style={styles.noteSectionEmoji}>📝</Text>
                    <Text style={[styles.noteSectionTitle, { color: Colors.secondaryDark }]}>
                      6. Mumbai University Exam Questions
                    </Text>
                  </View>
                  {selectedTopic.notes.possibleExamQuestions.map((q, idx) => (
                    <View key={idx} style={styles.bulletRow}>
                      <Text style={[styles.bulletDot, { color: Colors.secondaryDark }]}>Q{idx + 1}:</Text>
                      <Text style={[styles.bulletText, { color: Colors.secondaryDark, fontWeight: '700' }]}>
                        {q}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.emptyNotes}>
                <Text style={styles.emptyEmoji}>📋</Text>
                <Text style={styles.emptyTitle}>Select a topic to read study notes</Text>
                <TouchableOpacity
                  style={styles.selectTopicBtn}
                  onPress={() => setActiveTab('syllabus')}
                >
                  <Text style={styles.selectTopicBtnText}>Browse Syllabus Topics</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* INFO TAB */}
        {activeTab === 'info' && (
          <View style={styles.tabContent}>
            {detailedSubject && (
              <View style={styles.infoContainer}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoHeading}>Course Details ({detailedSubject.code})</Text>
                  <View style={styles.infoPair}>
                    <Text style={styles.infoKey}>Vertical / Stream:</Text>
                    <Text style={styles.infoVal}>{detailedSubject.vertical}</Text>
                  </View>
                  <View style={styles.infoPair}>
                    <Text style={styles.infoKey}>Credits:</Text>
                    <Text style={styles.infoVal}>{detailedSubject.credits} Credits</Text>
                  </View>
                  <View style={styles.infoPair}>
                    <Text style={styles.infoKey}>Examination Scheme:</Text>
                    <Text style={styles.infoVal}>25 TW + 75 Exam = 100 Marks</Text>
                  </View>
                  <View style={styles.infoPair}>
                    <Text style={styles.infoKey}>Prerequisite:</Text>
                    <Text style={styles.infoVal}>{detailedSubject.prerequisite}</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <Text style={styles.infoHeading}>Course Objectives</Text>
                  {detailedSubject.labObjectives.map((obj, i) => (
                    <Text key={i} style={styles.objText}>
                      • {obj}
                    </Text>
                  ))}
                </View>

                <View style={styles.infoCard}>
                  <Text style={styles.infoHeading}>Recommended Textbooks</Text>
                  {detailedSubject.textbooks.map((bk, i) => (
                    <Text key={i} style={styles.objText}>
                      {i + 1}. {bk}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tutorHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  challengeHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  tutorHeaderBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  challengeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    gap: 8,
  },
  challengeBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  challengeBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  challengeBannerSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 14,
    marginTop: 2,
  },
  newBadgePill: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  newBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  challengeBannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 3,
  },
  challengeBannerBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    paddingHorizontal: 16,
  },
  tabBtn: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabBtn: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.primary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  tabContent: {
    gap: 12,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  moduleCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
    marginBottom: 8,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  moduleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  moduleBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  moduleBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  moduleMeta: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  topicsList: {
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    backgroundColor: Colors.backgroundAlt,
    paddingVertical: 4,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  activeTopicItem: {
    backgroundColor: Colors.primaryLight,
  },
  topicLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  topicNumBadge: {
    minWidth: 26,
    height: 20,
    borderRadius: 6,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  topicNumBadgeCompleted: {
    backgroundColor: '#16A34A',
  },
  topicNum: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  topicTitle: {
    fontSize: 13,
    color: Colors.text,
    flex: 1,
    fontWeight: '600',
  },
  topicTitleCompleted: {
    color: Colors.textSecondary,
  },
  topicActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  topicTutorBtn: {
    backgroundColor: Colors.primaryLight,
    padding: 6,
    borderRadius: 8,
  },
  notesContainer: {
    gap: 14,
  },
  topicBanner: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 8,
  },
  topicBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topicBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  topicBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  completedBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  completedBadgePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
  },
  topicHeaderTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.text,
  },
  topicBannerActionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  toggleCompleteBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  toggleCompleteBtnDone: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  toggleCompleteBtnText: {
    color: Colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
  },
  toggleCompleteBtnTextDone: {
    color: '#15803D',
  },
  askAiTutorBanner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  askAiTutorBannerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  noteSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 8,
  },
  noteSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  noteSectionEmoji: {
    fontSize: 16,
  },
  noteSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  noteText: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 20,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-start',
  },
  bulletDot: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  bulletText: {
    fontSize: 13,
    color: Colors.text,
    flex: 1,
    lineHeight: 18,
  },
  emptyNotes: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  emptyEmoji: {
    fontSize: 36,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  selectTopicBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  selectTopicBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  infoContainer: {
    gap: 12,
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 10,
  },
  infoHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  infoPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  infoKey: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  infoVal: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  objText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  diagramScroll: {
    marginVertical: 4,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 12,
  },
  diagramText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 11,
    lineHeight: 16,
    color: '#38BDF8',
  },
});
