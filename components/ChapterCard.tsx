import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { Subject } from '@/constants/chapters';
import { ProgressBar } from '@/components/ProgressBar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface ChapterCardProps {
  subject: Subject;
  onPress?: () => void;
}

export function ChapterCard({ subject, onPress }: ChapterCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/chapter/${subject.id}`);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.75}
    >
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{subject.icon || '💼'}</Text>
        </View>
        <View style={styles.badgeRow}>
          <View style={styles.creditBadge}>
            <Text style={styles.creditText}>{subject.credits} Credits</Text>
          </View>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{subject.code}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {subject.name}
      </Text>
      <Text style={styles.professorText} numberOfLines={1}>
        {subject.professor}
      </Text>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>
            {subject.completedModules} of {subject.totalModules} modules completed
          </Text>
          <Text style={styles.progressPercent}>{subject.progress}%</Text>
        </View>
        <ProgressBar
          progress={subject.progress}
          color={Colors.primary}
          height={6}
        />
      </View>

      {subject.nextTopic && (
        <View style={styles.nextTopicRow}>
          <Ionicons name="rocket-outline" size={14} color={Colors.primary} />
          <Text style={styles.nextTopicText} numberOfLines={1}>
            Up next: {subject.nextTopic}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  iconText: {
    fontSize: 22,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  creditBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  creditText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  codeBadge: {
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  codeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  professorText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  progressSection: {
    marginTop: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  nextTopicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  nextTopicText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    flex: 1,
  },
});
