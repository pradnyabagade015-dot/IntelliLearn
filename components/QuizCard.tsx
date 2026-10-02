import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { DailyQuiz } from '@/constants/chapters';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface QuizCardProps {
  quiz: DailyQuiz;
  onPress?: () => void;
}

export function QuizCard({ quiz, onPress }: QuizCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/quiz/${quiz.id}`);
    }
  };

  const getDifficultyColor = () => {
    switch (quiz.difficulty) {
      case 'Easy':
        return Colors.primary;
      case 'Medium':
        return Colors.secondary;
      case 'Hard':
        return '#D97706';
      default:
        return Colors.primary;
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.75}
    >
      <View style={styles.topRow}>
        <View style={styles.subjectTag}>
          <Text style={styles.subjectText}>💼 {quiz.subject}</Text>
        </View>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor() + '18' },
          ]}
        >
          <Text style={[styles.difficultyText, { color: getDifficultyColor() }]}>
            {quiz.difficulty}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{quiz.title}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="help-circle-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.metaText}>{quiz.questionCount} Questions</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.metaText}>{quiz.durationMinutes} mins</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="trophy-outline" size={14} color="#D97706" />
          <Text style={styles.xpText}>+{quiz.xpReward} XP</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.topicsText} numberOfLines={1}>
          {quiz.topics.join(' • ')}
        </Text>
        <View style={styles.startBadge}>
          <Text style={styles.startBadgeText}>Start</Text>
          <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
        </View>
      </View>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectTag: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  subjectText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  xpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    gap: 8,
  },
  topicsText: {
    fontSize: 11,
    color: Colors.textMuted,
    flex: 1,
  },
  startBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  startBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
