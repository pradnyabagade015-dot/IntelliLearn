import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { authService } from '@/services/auth';
import { StudentProfile } from '@/constants/chapters';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [student, setStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    authService.getCurrentUser().then(setStudent);
  }, []);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out of IntelliLearn?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await authService.logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Student Profile" subtitle="EXTC Sem IV • Business Model Development" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👨‍🎓</Text>
          </View>
          <Text style={styles.userName}>{student?.name || 'Alex Sharma'}</Text>
          <Text style={styles.userBranch}>{student?.department || 'EXTC Engineering'}</Text>

          <View style={styles.badgeRow}>
            <View style={styles.pillBadge}>
              <Text style={styles.pillText}>{student?.semester || 'Semester IV'}</Text>
            </View>
            <View style={[styles.pillBadge, { backgroundColor: Colors.background }]}>
              <Text style={[styles.pillText, { color: Colors.textSecondary }]}>
                Roll: {student?.rollNo || '22EXTC042'}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>⚡</Text>
            <Text style={styles.statNum}>{student?.streakDays || 7}</Text>
            <Text style={styles.statText}>Day Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>🏆</Text>
            <Text style={styles.statNum}>{student?.totalXp || 1950}</Text>
            <Text style={styles.statText}>Total XP</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>📝</Text>
            <Text style={styles.statNum}>{student?.quizzesTaken || 19}</Text>
            <Text style={styles.statText}>Quizzes</Text>
          </View>
        </View>

        {/* Academic Details */}
        <View style={styles.menuSection}>
          <Text style={styles.menuHeader}>Academic Info (University of Mumbai)</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Course Name</Text>
            <Text style={styles.infoValue}>Business Model Development</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Course Code</Text>
            <Text style={styles.infoValue}>2994511</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>University Scheme</Text>
            <Text style={styles.infoValue}>University of Mumbai EXTC Sem IV</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Subject Credits</Text>
            <Text style={styles.infoValue}>2 Credits</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Term Work / Marks</Text>
            <Text style={styles.infoValue}>25 TW + 75 Exam = 100 Marks</Text>
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.menuSection}>
          <Text style={styles.menuHeader}>Quick Actions</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/tutor/bmd-2994511')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="sparkles" size={20} color={Colors.primary} />
              <Text style={styles.menuItemText}>Business Model AI Tutor</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/doubt')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="bulb" size={20} color={Colors.secondary} />
              <Text style={styles.menuItemText}>AI Doubt Solver</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/quiz')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="trophy" size={20} color="#D97706" />
              <Text style={styles.menuItemText}>Practice Quizzes</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color={Colors.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
  profileCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  avatarEmoji: {
    fontSize: 32,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  userBranch: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  pillBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  statNum: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  statText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 12,
  },
  menuHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dangerLight,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.danger + '30',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.danger,
  },
});
