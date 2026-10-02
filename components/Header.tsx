import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  studentName?: string;
  streakDays?: number;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  studentName = 'Alex',
  streakDays = 6,
  showBack = false,
  onBackPress,
  rightAction,
}: HeaderProps) {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.brandRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeEmoji}>💼</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>IntelliLearn</Text>
              <Text style={styles.brandSub}>Business Model Dev • EXTC</Text>
            </View>
          </View>
        )}

        <View style={styles.rightGroup}>
          {rightAction ? (
            rightAction
          ) : (
            <View style={styles.streakBadge}>
              <Text style={styles.streakEmoji}>⚡</Text>
              <Text style={styles.streakText}>{streakDays}d Streak</Text>
            </View>
          )}
        </View>
      </View>

      {title ? (
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>{title}</Text>
          {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        </View>
      ) : (
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>
            Welcome back, <Text style={styles.nameHighlight}>{studentName}</Text> 👋
          </Text>
          <Text style={styles.semesterTag}>
            Business Model Development (2994511) • EXTC Semester IV
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  logoBadgeEmoji: {
    fontSize: 20,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  brandSub: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  streakEmoji: {
    fontSize: 13,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  titleSection: {
    marginTop: 12,
  },
  titleText: {
    fontSize: 21,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.4,
  },
  subtitleText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  greetingSection: {
    marginTop: 10,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
  },
  nameHighlight: {
    color: Colors.primary,
  },
  semesterTag: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
