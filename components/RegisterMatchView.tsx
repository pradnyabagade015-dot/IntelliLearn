import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { RegisterMatchItem, shuffleArray } from '@/constants/challengeData';
import { Ionicons } from '@expo/vector-icons';

interface RegisterMatchViewProps {
  items: RegisterMatchItem[];
  onComplete: (totalPairs: number, attempts: number) => void;
  isAnswerSubmitted: boolean;
}

export function RegisterMatchView({
  items,
  onComplete,
  isAnswerSubmitted,
}: RegisterMatchViewProps) {
  const shuffledDescriptions = useMemo(() => shuffleArray(items), [items]);
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchPair, setMismatchPair] = useState<{ left: string; right: string } | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const handleSelectLeft = (id: string) => {
    if (isAnswerSubmitted || matchedIds.includes(id)) return;
    setMismatchPair(null);
    setSelectedLeftId(id === selectedLeftId ? null : id);
  };

  const handleSelectRight = (id: string) => {
    if (isAnswerSubmitted || matchedIds.includes(id)) return;
    if (!selectedLeftId) return;

    const newAttempts = attemptCount + 1;
    setAttemptCount(newAttempts);

    if (selectedLeftId === id) {
      // Correct match!
      const nextMatched = [...matchedIds, id];
      setMatchedIds(nextMatched);
      setSelectedLeftId(null);
      setMismatchPair(null);

      if (nextMatched.length === items.length) {
        onComplete(items.length, newAttempts);
      }
    } else {
      // Mismatch
      setMismatchPair({ left: selectedLeftId, right: id });
      setTimeout(() => {
        setMismatchPair(null);
        setSelectedLeftId(null);
      }, 750);
    }
  };

  const isMatched = (id: string) => matchedIds.includes(id);

  return (
    <View style={styles.container}>
      <View style={styles.instructionBanner}>
        <Ionicons name="swap-horizontal" size={16} color={Colors.primary} />
        <Text style={styles.instructionText}>
          {matchedIds.length === items.length
            ? '🎉 All registers successfully matched!'
            : selectedLeftId
            ? 'Now tap the matching function on the right column:'
            : 'Tap a register on the left, then tap its function on the right:'}
        </Text>
      </View>

      {/* Progress pill */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          Matched: <Text style={styles.statusHighlight}>{matchedIds.length} / {items.length}</Text>
        </Text>
        <Text style={styles.statusText}>
          Attempts: <Text style={styles.statusHighlight}>{attemptCount}</Text>
        </Text>
      </View>

      {/* Two Column Layout */}
      <View style={styles.columnsContainer}>
        {/* Left Column: Registers / Pins */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Registers & Pins</Text>
          {items.map((item) => {
            const matched = isMatched(item.id);
            const isSelected = selectedLeftId === item.id;
            const isMismatched = mismatchPair?.left === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  styles.leftCard,
                  isSelected && styles.cardSelected,
                  matched && styles.cardMatched,
                  isMismatched && styles.cardMismatched,
                ]}
                onPress={() => handleSelectLeft(item.id)}
                activeOpacity={0.8}
                disabled={matched || isAnswerSubmitted}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={[styles.badge, { backgroundColor: matched ? '#DCFCE7' : '#F1F5F9' }]}>
                    <Text style={[styles.badgeText, { color: matched ? Colors.primary : Colors.textSecondary }]}>
                      {item.architecture}
                    </Text>
                  </View>
                  {matched ? (
                    <Ionicons name="checkmark-circle" size={18} color={Colors.primary} />
                  ) : isSelected ? (
                    <Ionicons name="radio-button-on" size={16} color={Colors.primary} />
                  ) : null}
                </View>

                <Text style={[styles.registerName, matched && styles.textMatched]}>
                  {item.name}
                </Text>
                <Text style={styles.registerCategory}>{item.category}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Right Column: Shuffled Function Descriptions */}
        <View style={[styles.column, { flex: 1.3 }]}>
          <Text style={styles.columnHeader}>Functions & Roles</Text>
          {shuffledDescriptions.map((descItem) => {
            const matched = isMatched(descItem.id);
            const isMismatched = mismatchPair?.right === descItem.id;

            return (
              <TouchableOpacity
                key={descItem.id}
                style={[
                  styles.card,
                  styles.rightCard,
                  matched && styles.cardMatched,
                  isMismatched && styles.cardMismatched,
                ]}
                onPress={() => handleSelectRight(descItem.id)}
                activeOpacity={0.8}
                disabled={matched || isAnswerSubmitted}
              >
                <View style={styles.descTopRow}>
                  {matched && (
                    <View style={styles.matchedChip}>
                      <Ionicons name="checkmark-sharp" size={12} color="#15803D" />
                      <Text style={styles.matchedChipText}>{descItem.name}</Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.descriptionText,
                    matched && styles.textMatched,
                  ]}
                  numberOfLines={4}
                >
                  {descItem.functionDescription}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  instructionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  instructionText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
    flex: 1,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  statusHighlight: {
    fontWeight: '800',
    color: Colors.primary,
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  leftCard: {
    minHeight: 82,
    justifyContent: 'center',
  },
  rightCard: {
    minHeight: 82,
    justifyContent: 'center',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  registerName: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
  },
  registerCategory: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  cardSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#EBF5EE',
    transform: [{ scale: 1.02 }],
  },
  cardMatched: {
    borderColor: '#86EFAC',
    backgroundColor: '#F0FDF4',
    opacity: 0.85,
  },
  cardMismatched: {
    borderColor: '#F87171',
    backgroundColor: '#FEF2F2',
  },
  textMatched: {
    color: '#15803D',
  },
  descTopRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 2,
  },
  matchedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    gap: 3,
    marginBottom: 4,
  },
  matchedChipText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  descriptionText: {
    fontSize: 11,
    lineHeight: 15,
    color: Colors.text,
  },
});
