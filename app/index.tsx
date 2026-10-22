import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Center Hero */}
        <View style={styles.centerSection}>
          <View style={styles.logoBadge}>
            <Ionicons name="school" size={42} color={Colors.primary} />
          </View>

          <Text style={styles.brandTitle}>IntelliLearn</Text>
          <Text style={styles.tagline}>Learn smarter with AI</Text>

          <View style={styles.coursePill}>
            <Text style={styles.coursePillText}>EXTC Semester IV • Microcontrollers (2304112)</Text>
          </View>

          <Text style={styles.description}>
            Your AI-powered learning companion for Semester IV
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/login')}
            activeOpacity={0.85}
          >
            <Text style={styles.loginButtonText}>Login</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => router.push('/signup')}
            activeOpacity={0.85}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.guestLink}
            onPress={() => router.replace('/(tabs)/home')}
            activeOpacity={0.7}
          >
            <Text style={styles.guestLinkText}>Explore as Guest Student</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 36,
    justifyContent: 'space-between',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 24,
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.6,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 6,
    marginBottom: 16,
  },
  coursePill: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 16,
  },
  coursePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 290,
  },
  buttonSection: {
    width: '100%',
    gap: 12,
    paddingBottom: 8,
  },
  loginButton: {
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
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  signupButton: {
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  signupButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  guestLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  guestLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});
