import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CodeSnippetViewProps {
  codeSnippet?: string;
  codeLines?: string[];
  highlightLineIndex?: number;
  selectedLineIndex?: number | null;
  onSelectLine?: (index: number) => void;
  interactiveLines?: boolean;
  missingPlaceholder?: string;
}

export function CodeSnippetView({
  codeSnippet,
  codeLines,
  highlightLineIndex,
  selectedLineIndex,
  onSelectLine,
  interactiveLines = false,
  missingPlaceholder = '___',
}: CodeSnippetViewProps) {
  const lines = codeLines || (codeSnippet ? codeSnippet.split('\n') : []);

  // Format single line content with simple assembly syntax highlighting
  const renderLineContent = (lineText: string, isBlankHighlighted: boolean) => {
    // Check if line contains the missing placeholder '___'
    if (isBlankHighlighted && lineText.includes(missingPlaceholder)) {
      const parts = lineText.split(missingPlaceholder);
      return (
        <Text style={styles.codeText}>
          <Text style={getSyntaxColor(parts[0])}>{parts[0]}</Text>
          <Text style={styles.blankHighlight}> [ ??? ] </Text>
          {parts[1] && <Text style={getSyntaxColor(parts[1])}>{parts[1]}</Text>}
        </Text>
      );
    }

    // Normal line styling
    return <Text style={[styles.codeText, getSyntaxColor(lineText)]}>{lineText}</Text>;
  };

  const getSyntaxColor = (text: string) => {
    const trimmed = text.trim();
    if (trimmed.startsWith(';')) {
      return styles.commentColor;
    }
    if (trimmed.endsWith(':')) {
      return styles.labelColor;
    }
    if (
      trimmed.startsWith('MOV') ||
      trimmed.startsWith('ADD') ||
      trimmed.startsWith('SUB') ||
      trimmed.startsWith('SETB') ||
      trimmed.startsWith('CLR') ||
      trimmed.startsWith('JNB') ||
      trimmed.startsWith('JB') ||
      trimmed.startsWith('DJNZ') ||
      trimmed.startsWith('LDR') ||
      trimmed.startsWith('STR') ||
      trimmed.startsWith('BL') ||
      trimmed.startsWith('BX') ||
      trimmed.startsWith('RETI') ||
      trimmed.startsWith('MUL')
    ) {
      return styles.mnemonicColor;
    }
    return styles.defaultColor;
  };

  return (
    <View style={styles.container}>
      {/* Code Window Header */}
      <View style={styles.windowHeader}>
        <View style={styles.dotsRow}>
          <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
          <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
          <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
        </View>
        <View style={styles.titleBadge}>
          <Ionicons name="hardware-chip-outline" size={12} color="#94A3B8" />
          <Text style={styles.windowTitle}>MCU Assembly Source</Text>
        </View>
        <Text style={styles.langTag}>ASM</Text>
      </View>

      {/* Code Editor Body */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollBody}
      >
        <View style={styles.linesContainer}>
          {lines.map((line, idx) => {
            const isSelected = selectedLineIndex === idx;
            const isHighlighted = highlightLineIndex === idx;
            const isBlankLine = line.includes(missingPlaceholder);

            const lineContent = (
              <View
                key={idx}
                style={[
                  styles.lineRow,
                  isHighlighted && styles.highlightedLineRow,
                  isSelected && styles.selectedLineRow,
                  isBlankLine && styles.blankLineRow,
                ]}
              >
                <View style={styles.lineNumberCol}>
                  <Text
                    style={[
                      styles.lineNumber,
                      isSelected && styles.selectedLineNumber,
                      isBlankLine && styles.blankLineNumber,
                    ]}
                  >
                    {idx + 1}
                  </Text>
                </View>

                <View style={styles.codeTextCol}>
                  {renderLineContent(line, isBlankLine)}
                </View>

                {interactiveLines && (
                  <View style={styles.selectIndicatorCol}>
                    {isSelected ? (
                      <Ionicons name="checkmark-circle" size={16} color="#EF4444" />
                    ) : (
                      <Ionicons name="ellipse-outline" size={14} color="#475569" />
                    )}
                  </View>
                )}
              </View>
            );

            if (interactiveLines && onSelectLine) {
              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.7}
                  onPress={() => onSelectLine(idx)}
                >
                  {lineContent}
                </TouchableOpacity>
              );
            }

            return lineContent;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  windowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  titleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  windowTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.2,
  },
  langTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#38BDF8',
    backgroundColor: '#0369A130',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  scrollBody: {
    minWidth: '100%',
  },
  linesContainer: {
    paddingVertical: 10,
    minWidth: '100%',
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  highlightedLineRow: {
    backgroundColor: '#33415580',
  },
  selectedLineRow: {
    backgroundColor: '#EF444425',
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  blankLineRow: {
    backgroundColor: '#0284C720',
    borderLeftWidth: 3,
    borderLeftColor: '#38BDF8',
  },
  lineNumberCol: {
    width: 28,
    alignItems: 'flex-end',
    marginRight: 12,
  },
  lineNumber: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  selectedLineNumber: {
    color: '#F87171',
    fontWeight: '800',
  },
  blankLineNumber: {
    color: '#38BDF8',
    fontWeight: '800',
  },
  codeTextCol: {
    flex: 1,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 13,
    lineHeight: 18,
    color: '#E2E8F0',
  },
  defaultColor: {
    color: '#E2E8F0',
  },
  mnemonicColor: {
    color: '#38BDF8',
    fontWeight: '700',
  },
  commentColor: {
    color: '#64748B',
    fontStyle: 'italic',
  },
  labelColor: {
    color: '#FBBF24',
    fontWeight: '700',
  },
  blankHighlight: {
    backgroundColor: '#F59E0B',
    color: '#0F172A',
    fontWeight: '900',
    borderRadius: 4,
  },
  selectIndicatorCol: {
    marginLeft: 12,
    paddingRight: 4,
  },
});
