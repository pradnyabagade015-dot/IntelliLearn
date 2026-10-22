import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { apiService } from '@/services/api';
import { SubjectDetailed, Module } from '@/constants/chapters';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { progressService, SubjectMetrics } from '@/services/progress';

// Official clean titles for BMD Units
const BMD_UNIT_NAMES: Record<number, string> = {
  1: 'Introduction to Entrepreneurship',
  2: 'Entrepreneurship Development',
  3: 'Start-up Financing',
  4: 'Intellectual Property Rights',
  5: 'Business Model Development',
  6: 'Digital Business Management',
};

export default function ChaptersScreen() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('micro-2304112');
  const [subject, setSubject] = useState<SubjectDetailed | null>(null);
  const [metrics, setMetrics] = useState<SubjectMetrics | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnit, setExpandedUnit] = useState<number | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [sub, m] = await Promise.all([
        apiService.getDetailedSubject(selectedSubjectId),
        progressService.getSubjectMetrics(selectedSubjectId),
      ]);
      setSubject(sub);
      setMetrics(m);
    } catch {
      // Ignore
    }
  }, [selectedSubjectId]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      apiService.getDetailedSubject(selectedSubjectId),
      progressService.getSubjectMetrics(selectedSubjectId),
    ]).then(([sub, m]) => {
      if (isMounted) {
        setSubject(sub);
        setMetrics(m);
      }
    });

    const unsub = progressService.subscribe(() => {
      if (isMounted) {
        loadData();
      }
    });

    return () => {
      isMounted = false;
      unsub();
    };
  }, [selectedSubjectId, loadData]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const modules = subject?.modules || [];

  const getCleanUnitTitle = (m: Module) => {
    if (selectedSubjectId === 'bmd-2994511' && BMD_UNIT_NAMES[m.moduleNumber]) {
      return BMD_UNIT_NAMES[m.moduleNumber];
    }
    return m.title.replace(/^Unit\s+[IVXLCDM]+\s*[–-]\s*/i, '');
  };

  const filteredModules = modules.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const cleanTitle = getCleanUnitTitle(m).toLowerCase();
    const matchUnit = cleanTitle.includes(q) || `unit ${m.moduleNumber}`.includes(q);
    const matchTopics = m.topics.some((t) => t.title.toLowerCase().includes(q));
    return matchUnit || matchTopics;
  });

  const handleOpenUnit = (mod: Module) => {
    const firstTopicNumber = mod.topics[0]?.topicNumber;
    router.push({
      pathname: '/chapter/[id]',
      params: { id: selectedSubjectId, topicNumber: firstTopicNumber },
    });
  };

  const handleOpenTopic = (topicNumber: string) => {
    router.push({
      pathname: '/chapter/[id]',
      params: { id: selectedSubjectId, topicNumber },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Screen Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Syllabus Chapters</Text>
          <Text style={styles.headerSubtitle}>
            {subject?.name || 'Syllabus'} • Course Code: {subject?.code || '2304112'}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
          {selectedSubjectId === 'micro-2304112' && (
            <TouchableOpacity
              style={[styles.allNotesBtn, { backgroundColor: '#E0F2FE', borderColor: '#BAE6FD' }]}
              onPress={() => router.push('/challenge' as any)}
              activeOpacity={0.8}
            >
              <Ionicons name="terminal" size={15} color="#0369A1" />
              <Text style={[styles.allNotesText, { color: '#0369A1' }]}>Challenge</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.allNotesBtn}
            onPress={() =>
              router.push({
                pathname: '/chapter/[id]',
                params: { id: selectedSubjectId },
              })
            }
            activeOpacity={0.8}
          >
            <Ionicons name="book-outline" size={16} color={Colors.primaryDark} />
            <Text style={styles.allNotesText}>Full Notes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Subject Filter Pills */}
      <View style={styles.subjectSelectorRow}>
        <TouchableOpacity
          style={[
            styles.subjectPill,
            selectedSubjectId === 'micro-2304112' && styles.subjectPillActive,
          ]}
          onPress={() => {
            setSelectedSubjectId('micro-2304112');
            setExpandedUnit(null);
          }}
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
          onPress={() => {
            setSelectedSubjectId('bmd-2994511');
            setExpandedUnit(null);
          }}
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={Colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${subject?.name || 'syllabus'} topics...`}
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Units List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionHeading}>
          {subject?.name} Units (Semester IV)
        </Text>

        {filteredModules.map((mod) => {
          const unitNumber = mod.moduleNumber;
          const cleanTitle = getCleanUnitTitle(mod);
          const progress = metrics?.unitProgress[unitNumber] ?? 0;
          const isExpanded = expandedUnit === unitNumber;

          return (
            <View key={mod.id} style={styles.unitCard}>
              {/* Unit Card Header Info */}
              <View style={styles.cardMain}>
                <View style={styles.unitTopRow}>
                  <View style={styles.unitBadge}>
                    <Text style={styles.unitBadgeText}>Unit {unitNumber}</Text>
                  </View>
                  <Text style={styles.topicCountText}>
                    {mod.topics.length} Topics • {mod.hours}
                  </Text>
                </View>

                <Text style={styles.unitTitle}>{cleanTitle}</Text>

                {/* Progress Bar & Percentage */}
                <View style={styles.progressRow}>
                  <View style={styles.progressBarTrack}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${progress}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{progress}%</Text>
                </View>

                {/* Card Action Row: Topics Dropdown + Open Button */}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.toggleTopicsBtn}
                    onPress={() => setExpandedUnit(isExpanded ? null : unitNumber)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color={Colors.textSecondary}
                    />
                    <Text style={styles.toggleTopicsText}>
                      {isExpanded ? 'Hide Topics' : 'View Topics'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.openBtn}
                    onPress={() => handleOpenUnit(mod)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.openBtnText}>Open</Text>
                    <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Collapsible Topics Preview */}
              {isExpanded && (
                <View style={styles.topicsDropdown}>
                  {mod.topics.map((topic) => {
                    const isTopCompleted = metrics?.completedTopicNumbers.includes(topic.topicNumber);
                    return (
                      <TouchableOpacity
                        key={topic.id}
                        style={styles.topicItemRow}
                        onPress={() => handleOpenTopic(topic.topicNumber)}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.topicIndexBadge,
                            isTopCompleted && { backgroundColor: '#16A34A' },
                          ]}
                        >
                          {isTopCompleted ? (
                            <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                          ) : (
                            <Text style={styles.topicIndexText}>{topic.topicNumber}</Text>
                          )}
                        </View>
                        <Text
                          style={[
                            styles.topicItemTitle,
                            isTopCompleted && { color: Colors.textSecondary },
                          ]}
                          numberOfLines={2}
                        >
                          {topic.title}
                        </Text>
                        <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

        {filteredModules.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No syllabus units found</Text>
            <Text style={styles.emptySub}>
              {'Try searching for "Entrepreneurship", "Financing", "IPR", or "Digital".'}
            </Text>
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
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  allNotesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  allNotesText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: 18,
    marginTop: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    height: 44,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 36,
    gap: 14,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textSecondary,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  unitCard: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  cardMain: {
    padding: 18,
  },
  unitTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  unitBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  unitBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  topicCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  unitTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
    marginBottom: 12,
    lineHeight: 22,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  progressBarTrack: {
    flex: 1,
    height: 7,
    backgroundColor: Colors.backgroundAlt,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
    width: 38,
    textAlign: 'right',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundAlt,
    paddingTop: 12,
  },
  toggleTopicsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  toggleTopicsText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  openBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  openBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  topicsDropdown: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    paddingVertical: 6,
  },
  topicItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    gap: 10,
  },
  topicIndexBadge: {
    width: 32,
    alignItems: 'center',
  },
  topicIndexText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  topicItemTitle: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 36,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  emptySub: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
});
