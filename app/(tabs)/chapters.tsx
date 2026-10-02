import React, { useEffect, useState } from 'react';
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
import { Header } from '@/components/Header';
import { apiService } from '@/services/api';
import { SubjectDetailed, Module } from '@/constants/chapters';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type FilterType = 'All' | 'Unit 1: Nature' | 'Unit 2: Resources' | 'Unit 3: Ecosystems' | 'Unit 4: Biodiversity' | 'Unit 5: Pollution' | 'Unit 6: Social Issues';

export default function ChaptersScreen() {
  const [subject, setSubject] = useState<SubjectDetailed | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');

  useEffect(() => {
    apiService.getDetailedSubject('env-2993512').then(setSubject);
  }, []);

  const getFilteredModules = (): Module[] => {
    if (!subject) return [];

    return subject.modules.filter((m) => {
      // Filter category match
      if (selectedFilter === 'Unit 1: Nature' && m.moduleNumber !== 1) return false;
      if (selectedFilter === 'Unit 2: Resources' && m.moduleNumber !== 2) return false;
      if (selectedFilter === 'Unit 3: Ecosystems' && m.moduleNumber !== 3) return false;
      if (selectedFilter === 'Unit 4: Biodiversity' && m.moduleNumber !== 4) return false;
      if (selectedFilter === 'Unit 5: Pollution' && m.moduleNumber !== 5) return false;
      if (selectedFilter === 'Unit 6: Social Issues' && m.moduleNumber !== 6) return false;

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const moduleMatch = m.title.toLowerCase().includes(query);
        const topicMatch = m.topics.some(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            t.topicNumber.toLowerCase().includes(query) ||
            t.notes.simpleDefinition.toLowerCase().includes(query)
        );
        return moduleMatch || topicMatch;
      }

      return true;
    });
  };

  const filteredModules = getFilteredModules();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Environmental Syllabus"
        subtitle="Course Code: 2993512 • 6 Official Units • University of Mumbai"
      />

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search syllabus topics, ecosystems, pollution..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {(
            [
              'All',
              'Unit 1: Nature',
              'Unit 2: Resources',
              'Unit 3: Ecosystems',
              'Unit 4: Biodiversity',
              'Unit 5: Pollution',
              'Unit 6: Social Issues',
            ] as const
          ).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterPill,
                selectedFilter === filter && styles.activeFilterPill,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.syllabusOverviewCard}>
          <View style={styles.overviewHeader}>
            <Text style={styles.overviewTitle}>🌿 Environmental Science (2993512)</Text>
            <View style={styles.creditTag}>
              <Text style={styles.creditTagText}>2 Credits</Text>
            </View>
          </View>
          <Text style={styles.overviewDesc}>
            Official University of Mumbai EXTC Semester IV syllabus covering Multidisciplinary Nature, Natural Resources, Ecosystems, Biodiversity, Environmental Pollution, and Social Issues.
          </Text>
          <TouchableOpacity
            style={styles.openDetailBtn}
            onPress={() => router.push('/chapter/env-2993512')}
            activeOpacity={0.8}
          >
            <Text style={styles.openDetailBtnText}>Open Full Topic Notes Explorer</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.countText}>
          Showing {filteredModules.length} of {subject?.modules.length || 6} Syllabus Units
        </Text>

        {filteredModules.map((mod) => (
          <View key={mod.id} style={styles.moduleCard}>
            <View style={styles.moduleCardHeader}>
              <View style={styles.modBadge}>
                <Text style={styles.modBadgeText}>U{mod.moduleNumber}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.modTitle}>{mod.title}</Text>
                <Text style={styles.modMeta}>
                  {mod.hours} Teaching Hours • {mod.topics.length} Syllabus Topics • {mod.loMapping}
                </Text>
              </View>
            </View>

            <View style={styles.topicsList}>
              {mod.topics.map((top) => (
                <TouchableOpacity
                  key={top.id}
                  style={styles.topicRow}
                  onPress={() =>
                    router.push({
                      pathname: '/chapter/[id]',
                      params: { id: 'env-2993512', topicNumber: top.topicNumber },
                    })
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.topicNum}>{top.topicNumber}</Text>
                  <Text style={styles.topicTitle} numberOfLines={2}>
                    {top.title}
                  </Text>
                  <TouchableOpacity
                    style={styles.tutorIconBtn}
                    onPress={() =>
                      router.push({
                        pathname: '/tutor/[chapterId]',
                        params: { chapterId: 'env-2993512', topicNumber: top.topicNumber },
                      })
                    }
                  >
                    <Ionicons name="sparkles" size={14} color={Colors.primary} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {filteredModules.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No topics matched your search</Text>
            <Text style={styles.emptyDesc}>
              {'Try searching with terms like "Ecosystem", "Biodiversity", "Global warming", "Ozone", or "EPA".'}
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
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    gap: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    height: 42,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  activeFilterPill: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
  },
  syllabusOverviewCard: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  creditTag: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  creditTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  overviewDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  openDetailBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  openDetailBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginTop: 4,
  },
  moduleCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  moduleCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    backgroundColor: Colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  modBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  modBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  modTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  modMeta: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  topicsList: {
    paddingVertical: 4,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F8F3',
    gap: 10,
  },
  topicNum: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    width: 24,
  },
  topicTitle: {
    fontSize: 13,
    color: Colors.text,
    flex: 1,
    fontWeight: '500',
  },
  tutorIconBtn: {
    backgroundColor: Colors.primaryLight,
    padding: 6,
    borderRadius: 8,
  },
  emptyState: {
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
    fontWeight: '700',
    color: Colors.text,
  },
  emptyDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
});
