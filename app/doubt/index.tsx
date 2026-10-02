import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { solveDoubt } from '@/services/ai';
import { mockDoubtSolver } from '@/constants/chapters';
import { Ionicons } from '@expo/vector-icons';

const SAMPLE_DOUBTS = [
  {
    category: '💰 Start-up Financing',
    query: 'What is the difference between an Angel Investor and a Venture Capitalist?',
  },
  {
    category: '⚖️ IPR & Patents',
    query: 'Explain the 3 statutory patentability criteria under Indian Patent Law.',
  },
  {
    category: '🚀 Lean Startup & MVP',
    query: 'What is a Minimum Viable Product (MVP) and how does it prevent startup failure?',
  },
  {
    category: '📊 Business Model Canvas',
    query: 'Explain the 9 building blocks of Alexander Osterwalder’s Business Model Canvas.',
  },
  {
    category: '📈 Unit Economics & BEP',
    query: 'What is Break-Even Point (BEP) in startup unit economics and how is it calculated?',
  },
  {
    category: '🏭 MSME & Institutions',
    query: 'What is the revised 2020 MSME classification criteria and role of SIDBI/NABARD?',
  },
];

export default function DoubtSolverScreen() {
  const [question, setQuestion] = useState('');
  const [solution, setSolution] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentDoubts, setRecentDoubts] = useState(mockDoubtSolver.recentDoubts);

  const handleSolve = async (customQ?: string) => {
    const queryToSolve = customQ || question;
    if (!queryToSolve.trim() || isLoading) return;

    setIsLoading(true);
    setSolution(null);
    try {
      const sol = await solveDoubt(queryToSolve, undefined, 'Business Model Development');
      setSolution(sol);
      setRecentDoubts((prev) => [
        {
          id: `d-${Date.now()}`,
          question: queryToSolve.trim(),
          subject: 'Business Model Development (2994511)',
          status: 'Resolved',
          timeAgo: 'Just now',
        },
        ...prev.filter((d) => d.question !== queryToSolve.trim()),
      ]);
    } catch {
      setSolution('Could not resolve doubt. Please check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sampleText: string) => {
    setQuestion(sampleText);
    handleSolve(sampleText);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        showBack
        title="AI Doubt Solver"
        subtitle="Direct answers, explanations & exam points for Business Model Development"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Input Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardLabel}>Ask Your Business Model Doubt:</Text>
            {question ? (
              <TouchableOpacity onPress={() => setQuestion('')}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <TextInput
            style={styles.textArea}
            placeholder="Type your question (e.g. Difference between Angel and VC? How to draw BMC? What is Section 3 in Patents Act?)..."
            placeholderTextColor={Colors.textMuted}
            value={question}
            onChangeText={setQuestion}
            multiline
            numberOfLines={4}
          />

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.scanBtn}
              onPress={() => {
                const sample = 'What is the statutory patentability criteria under Indian Patent Law?';
                setQuestion(sample);
                handleSolve(sample);
              }}
              activeOpacity={0.75}
            >
              <Ionicons name="camera-outline" size={18} color={Colors.primary} />
              <Text style={styles.scanBtnText}>Scan Question / Topic</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.solveBtn,
                (!question.trim() || isLoading) && styles.solveBtnDisabled,
              ]}
              onPress={() => handleSolve()}
              disabled={!question.trim() || isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="sparkles" size={16} color="#FFFFFF" />
                  <Text style={styles.solveBtnText}>Solve with AI</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Solution Box */}
        {solution && (
          <View style={styles.solutionCard}>
            <View style={styles.solutionHeader}>
              <View style={styles.solutionBadge}>
                <Ionicons name="checkmark-circle" size={18} color={Colors.primary} />
                <Text style={styles.solutionBadgeText}>Verified Syllabus Solution</Text>
              </View>
              <Text style={styles.solutionCode}>Course Code: 2994511</Text>
            </View>
            <Text style={styles.solutionText}>{solution}</Text>
          </View>
        )}

        {/* Quick Sample Doubts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked University Doubts</Text>
          <Text style={styles.sectionSub}>Tap any question below for an instant step-by-step model solution:</Text>
          <View style={styles.sampleGrid}>
            {SAMPLE_DOUBTS.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.sampleCard}
                onPress={() => handleSelectSample(item.query)}
                activeOpacity={0.7}
              >
                <Text style={styles.sampleCategory}>{item.category}</Text>
                <Text style={styles.sampleQueryText} numberOfLines={2}>
                  {item.query}
                </Text>
                <View style={styles.sampleActionRow}>
                  <Text style={styles.sampleActionText}>Solve now</Text>
                  <Ionicons name="arrow-forward" size={12} color={Colors.primary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Doubts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Resolved Doubts</Text>
          {recentDoubts.map((doubt) => (
            <TouchableOpacity
              key={doubt.id}
              style={styles.recentItem}
              onPress={() => handleSelectSample(doubt.question)}
              activeOpacity={0.7}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.recentQ} numberOfLines={2}>
                  {doubt.question}
                </Text>
                <Text style={styles.recentMeta}>
                  {doubt.subject} • {doubt.timeAgo}
                </Text>
              </View>
              <View style={styles.resolvedBadge}>
                <Text style={styles.resolvedText}>{doubt.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingBottom: 36,
    gap: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
  },
  clearText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  textArea: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    gap: 10,
  },
  scanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  scanBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  solveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  solveBtnDisabled: {
    backgroundColor: Colors.cardBorder,
  },
  solveBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  solutionCard: {
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.card,
    gap: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  solutionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  solutionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  solutionBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  solutionCode: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  solutionText: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 21,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  sectionSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  sampleGrid: {
    gap: 8,
  },
  sampleCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 4,
  },
  sampleCategory: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  sampleQueryText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
    lineHeight: 16,
  },
  sampleActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  sampleActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    justifyContent: 'space-between',
    gap: 10,
  },
  recentQ: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  recentMeta: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  resolvedBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  resolvedText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
});
