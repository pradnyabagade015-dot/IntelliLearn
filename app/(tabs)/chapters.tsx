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

type FilterType =
  | 'All'
  | 'Unit I: Entrepreneurship'
  | 'Unit II: Development'
  | 'Unit III: Financing'
  | 'Unit IV: IPR'
  | 'Unit V: Business Model'
  | 'Unit VI: Digital Business';

export default function ChaptersScreen() {
  const [subject, setSubject] = useState<SubjectDetailed | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');

  useEffect(() => {
    apiService.getDetailedSubject('bmd-2994511').then(setSubject);
  }, []);

  const getFilteredModules = (): Module[] => {
    if (!subject) return [];

    return subject.modules.filter((m) => {
      // Filter category match
      if (selectedFilter === 'Unit I: Entrepreneurship' && m.moduleNumber !== 1) return false;
      if (selectedFilter === 'Unit II: Development' && m.moduleNumber !== 2) return false;
      if (selectedFilter === 'Unit III: Financing' && m.moduleNumber !== 3) return false;
      if (selectedFilter === 'Unit IV: IPR' && m.moduleNumber !== 4) return false;
      if (selectedFilter === 'Unit V: Business Model' && m.moduleNumber !== 5) return false;
      if (selectedFilter === 'Unit VI: Digital Business' && m.moduleNumber !== 6) return false;

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
        title="Business Model Syllabus"
        subtitle="Course Code: 2994511 • 6 Official Units • University of Mumbai"
      />

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search syllabus topics, BMC, IPR, funding..."
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
              'Unit I: Entrepreneurship',
              'Unit II: Development',
              'Unit III: Financing',
              'Unit IV: IPR',
              'Unit V: Business Model',
              'Unit VI: Digital Business',
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
            <Text style={styles.overviewTitle}>💼 Business Model Development (2994511)</Text>
            <View style={styles.creditTag}>
              <Text style={styles.creditTagText}>2 Credits</Text>
            </View>
          </View>
          <Text style={styles.overviewDesc}>
            Official University of Mumbai EXTC Semester IV syllabus covering Entrepreneurship, MSME & Institutions, Start-up Financing, IPR & Patents, Business Model Canvas, and Digital Business Management.
          </Text>
          <TouchableOpacity
            style={styles.openDetailBtn}
            onPress={() => router.push('/chapter/bmd-2994511')}
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
                      params: { id: 'bmd-2994511', topicNumber: top.topicNumber },
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
                        params: { chapterId: 'bmd-2994511', topicNumber: top.topicNumber },
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
              {'Try searching with terms like "Patent", "Angel", "Canvas", "MSME", or "Digital".'}
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
    borderBottomColor: '#F1F5F9',
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
