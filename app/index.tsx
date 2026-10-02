import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Hero */}
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🌿</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>EXTC 4th Semester • Course Code: 2993512</Text>
          </View>
          <Text style={styles.title}>Environmental Science</Text>
          <Text style={styles.subtitle}>
            AI-powered learning for EXTC students • University of Mumbai Syllabus
          </Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.featuresSection}>
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.primaryLight }]}>
              <Text style={styles.featureEmoji}>📖</Text>
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Official 6 Syllabus Units</Text>
              <Text style={styles.featureDesc}>
                Structured notes on Natural Resources, Forest/Water/Energy, Ecosystems, Biodiversity, Pollution, and Social Issues.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.secondaryLight }]}>
              <Text style={styles.featureEmoji}>🌱</Text>
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Context-Aware AI Tutor</Text>
              <Text style={styles.featureDesc}>
                Instant 5-mark & 10-mark model answers, definitions, key exam points, and quick 60-second revisions for every topic.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#FEF3C7' }]}>
              <Text style={styles.featureEmoji}>⚡</Text>
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>AI Doubt Solver & Quizzes</Text>
              <Text style={styles.featureDesc}>
                Get direct answers, explanations, examples, and exam points for any Environmental Science query.
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace('/(tabs)/home')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Explore Environmental Science</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.authButtonsRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/login')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, styles.signupButton]}
              onPress={() => router.push('/signup')}
              activeOpacity={0.8}
            >
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 24,
    paddingVertical: 28,
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 12,
  },
  logoContainer: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 38,
  },
  badge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  badgeText: {
    color: Colors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    maxWidth: 320,
    fontWeight: '500',
  },
  featuresSection: {
    marginVertical: 20,
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  featureEmoji: {
    fontSize: 22,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  actionSection: {
    marginTop: 'auto',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  authButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  secondaryButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  signupButton: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.cardBorder,
  },
  signupButtonText: {
    color: Colors.primaryDark,
    fontSize: 14,
    fontWeight: '800',
  },
});
