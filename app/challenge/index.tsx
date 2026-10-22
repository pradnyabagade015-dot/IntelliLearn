import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  ChallengeMode,
  MISSING_CODE_QUESTIONS,
  FIND_ERROR_QUESTIONS,
  MATCH_REGISTERS_QUESTIONS,
} from '@/constants/challengeData';

interface ModeCardInfo {
  mode: ChallengeMode;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  features: string[];
  questionCount: number;
  avgTime: string;
  accentColor: string;
}

const MODES: ModeCardInfo[] = [
  {
    mode: 'missing_code',
    icon: 'code-slash',
    title: 'Mode A — Complete Missing Code',
    badge: 'SYNTAX & LOGIC',
    badgeColor: '#E0F2FE',
    accentColor: '#0284C7',
    description:
      'Analyze incomplete 8051 & ARM7 assembly routines and supply the missing opcode, operand, or directive.',
    features: [
      'Multiple-choice & fill-in-the-blank questions',
      '8051 timers, baud reload values & arithmetic',
      'ARM7 barrel shifter & branch instructions',
    ],
    questionCount: MISSING_CODE_QUESTIONS.length,
    avgTime: '6 mins',
  },
  {
    mode: 'find_error',
    icon: 'bug',
    title: 'Mode B — Find Programming Error',
    badge: 'DEBUGGING',
    badgeColor: '#FEE2E2',
    accentColor: '#DC2626',
    description:
      'Spot the intentional bug in real assembly code snippets. Identify the faulty line and select the architectural fix.',
    features: [
      'Interactive line selection and visual inspection',
      'Addressing mode mismatches (Direct vs Immediate)',
      'Interrupt return (RET vs RETI) & flag polling logic',
    ],
    questionCount: FIND_ERROR_QUESTIONS.length,
    avgTime: '7 mins',
  },
  {
    mode: 'match_registers',
    icon: 'git-compare',
    title: 'Mode C — Match Registers & Peripherals',
    badge: 'ARCHITECTURE',
    badgeColor: '#FEF3C7',
    accentColor: '#D97706',
    description:
      'Connect syllabus-supported microcontroller SFRs, interface pins, and ARM7 core registers with their exact hardware functions.',
    features: [
      'Dynamic two-column interactive touch-matching',
      '8051 TMOD, TCON, SBUF, SCON, ALE, /PSEN',
      'ARM7 R14 (LR), CPSR, and modern MCU platforms',
    ],
    questionCount: MATCH_REGISTERS_QUESTIONS.length,
    avgTime: '5 mins',
  },
];

export default function ChallengeHubScreen() {
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  const startChallenge = (mode: ChallengeMode) => {
    router.push({
      pathname: '/challenge/play' as any,
      params: {
        mode,
        unit: selectedUnit !== null ? String(selectedUnit) : 'all',
      },
    });
  };

  const getFilteredCount = (mode: ChallengeMode) => {
    if (selectedUnit === null) {
      if (mode === 'missing_code') return MISSING_CODE_QUESTIONS.length;
      if (mode === 'find_error') return FIND_ERROR_QUESTIONS.length;
      return MATCH_REGISTERS_QUESTIONS.length;
    }
    if (mode === 'missing_code') {
      return MISSING_CODE_QUESTIONS.filter((q) => q.unitNumber === selectedUnit).length;
    }
    if (mode === 'find_error') {
      return FIND_ERROR_QUESTIONS.filter((q) => q.unitNumber === selectedUnit).length;
    }
    return MATCH_REGISTERS_QUESTIONS.filter((q) => q.unitNumber === selectedUnit).length;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        showBack
        title="Coding Challenge"
        subtitle="Microcontrollers (Course Code: 2304112) • Semester IV EXTC"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.heroIconBox}>
              <Ionicons name="terminal" size={24} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>Microcontroller Coding Arena</Text>
              <Text style={styles.heroSubtitle}>
                Master 8051 Assembly, ARM7 RISC Architecture & Peripheral Programming
              </Text>
            </View>
          </View>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatVal}>3</Text>
              <Text style={styles.heroStatLbl}>Challenge Modes</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatVal}>18+</Text>
              <Text style={styles.heroStatLbl}>Code Challenges</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatVal}>100 XP</Text>
              <Text style={styles.heroStatLbl}>Per Challenge</Text>
            </View>
          </View>
        </View>

        {/* Unit Filter Section */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionHeading}>Filter by Syllabus Unit</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterPillsRow}
          >
            <TouchableOpacity
              style={[
                styles.unitPill,
                selectedUnit === null && styles.unitPillActive,
              ]}
              onPress={() => setSelectedUnit(null)}
            >
              <Text
                style={[
                  styles.unitPillText,
                  selectedUnit === null && styles.unitPillTextActive,
                ]}
              >
                All Units (3–6)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.unitPill,
                selectedUnit === 3 && styles.unitPillActive,
              ]}
              onPress={() => setSelectedUnit(3)}
            >
              <Text
                style={[
                  styles.unitPillText,
                  selectedUnit === 3 && styles.unitPillTextActive,
                ]}
              >
                Unit III: 8051 Assembly
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.unitPill,
                selectedUnit === 4 && styles.unitPillActive,
              ]}
              onPress={() => setSelectedUnit(4)}
            >
              <Text
                style={[
                  styles.unitPillText,
                  selectedUnit === 4 && styles.unitPillTextActive,
                ]}
              >
                Unit IV: Timers & Serial
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.unitPill,
                selectedUnit === 5 && styles.unitPillActive,
              ]}
              onPress={() => setSelectedUnit(5)}
            >
              <Text
                style={[
                  styles.unitPillText,
                  selectedUnit === 5 && styles.unitPillTextActive,
                ]}
              >
                Unit V: ARM7 Core
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.unitPill,
                selectedUnit === 6 && styles.unitPillActive,
              ]}
              onPress={() => setSelectedUnit(6)}
            >
              <Text
                style={[
                  styles.unitPillText,
                  selectedUnit === 6 && styles.unitPillTextActive,
                ]}
              >
                Unit VI: Advanced MCUs
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Mode Cards */}
        <View style={styles.modesList}>
          <Text style={styles.sectionHeading}>Select a Challenge Mode</Text>

          {MODES.map((item) => {
            const count = getFilteredCount(item.mode);
            const isAvailable = count > 0;

            return (
              <TouchableOpacity
                key={item.mode}
                style={[styles.modeCard, !isAvailable && styles.modeCardDisabled]}
                onPress={() => isAvailable && startChallenge(item.mode)}
                activeOpacity={0.8}
                disabled={!isAvailable}
              >
                <View style={styles.modeCardHeader}>
                  <View style={[styles.modeIconBox, { backgroundColor: item.badgeColor }]}>
                    <Ionicons name={item.icon} size={22} color={item.accentColor} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={styles.modeBadgeRow}>
                      <View style={[styles.modeBadge, { backgroundColor: item.badgeColor }]}>
                        <Text style={[styles.modeBadgeText, { color: item.accentColor }]}>
                          {item.badge}
                        </Text>
                      </View>
                      <Text style={styles.modeTimeText}>⏱ {item.avgTime}</Text>
                    </View>
                    <Text style={styles.modeTitle}>{item.title}</Text>
                  </View>
                </View>

                <Text style={styles.modeDesc}>{item.description}</Text>

                <View style={styles.featuresList}>
                  {item.features.map((feat, fIdx) => (
                    <View key={fIdx} style={styles.featureItemRow}>
                      <Ionicons name="checkmark-circle" size={14} color={Colors.primary} />
                      <Text style={styles.featureText}>{feat}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modeCardFooter}>
                  <Text style={styles.questionCountText}>
                    {isAvailable ? `${count} Questions Available` : 'No questions for this unit'}
                  </Text>
                  <View
                    style={[
                      styles.startBtn,
                      { backgroundColor: isAvailable ? item.accentColor : '#94A3B8' },
                    ]}
                  >
                    <Text style={styles.startBtnText}>
                      {isAvailable ? 'Start Challenge' : 'Unavailable'}
                    </Text>
                    {isAvailable && (
                      <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Syllabus Accuracy Disclaimer Notice */}
        <View style={styles.disclaimerCard}>
          <View style={styles.disclaimerHeader}>
            <Ionicons name="shield-checkmark-outline" size={18} color={Colors.primary} />
            <Text style={styles.disclaimerTitle}>Syllabus Aligned & Safe</Text>
          </View>
          <Text style={styles.disclaimerText}>
            All assembly snippets, register configurations, and architectural questions are strictly grounded in the University of Mumbai EXTC Semester IV syllabus for Microcontrollers (Course Code: 2304112). This is a conceptual code simulator and syntax checker.
          </Text>
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
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  heroIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  heroTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
  },
  heroSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  heroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  heroStatItem: {
    alignItems: 'center',
  },
  heroStatVal: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  heroStatLbl: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.cardBorder,
  },
  filterSection: {
    gap: 8,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  filterPillsRow: {
    gap: 8,
    paddingVertical: 4,
  },
  unitPill: {
    backgroundColor: Colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  unitPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  unitPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  unitPillTextActive: {
    color: '#FFFFFF',
  },
  modesList: {
    gap: 12,
  },
  modeCard: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  modeCardDisabled: {
    opacity: 0.6,
  },
  modeCardHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  modeIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  modeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  modeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  modeTimeText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  modeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  modeDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  featuresList: {
    gap: 6,
    marginBottom: 14,
    paddingLeft: 2,
  },
  featureItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: 11,
    color: Colors.text,
    fontWeight: '500',
  },
  modeCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  questionCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 4,
  },
  startBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  disclaimerCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  disclaimerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.text,
  },
  disclaimerText: {
    fontSize: 11,
    lineHeight: 16,
    color: Colors.textSecondary,
  },
});
