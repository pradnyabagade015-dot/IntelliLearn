import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { CodeSnippetView } from '@/components/CodeSnippetView';
import { RegisterMatchView } from '@/components/RegisterMatchView';
import { authService } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';
import {
  ChallengeMode,
  MissingCodeQuestion,
  FindErrorQuestion,
  MatchRegistersQuestion,
  MISSING_CODE_QUESTIONS,
  FIND_ERROR_QUESTIONS,
  MATCH_REGISTERS_QUESTIONS,
  checkFillInBlank,
  shuffleArray,
} from '@/constants/challengeData';
import { useStudySession, progressService } from '@/services/progress';

export default function ChallengePlayScreen() {
  useStudySession('challenge', 'micro-2304112');
  const params = useLocalSearchParams<{ mode?: ChallengeMode; unit?: string }>();
  const mode: ChallengeMode = params.mode || 'missing_code';
  const unitFilter = params.unit && params.unit !== 'all' ? parseInt(params.unit, 10) : null;

  // Filter question bank based on selected unit
  const rawQuestions = useMemo(() => {
    let pool: (MissingCodeQuestion | FindErrorQuestion | MatchRegistersQuestion)[] = [];
    if (mode === 'missing_code') {
      pool = MISSING_CODE_QUESTIONS;
    } else if (mode === 'find_error') {
      pool = FIND_ERROR_QUESTIONS;
    } else {
      pool = MATCH_REGISTERS_QUESTIONS;
    }

    if (unitFilter !== null) {
      pool = pool.filter((q) => q.unitNumber === unitFilter);
    }
    return pool;
  }, [mode, unitFilter]);

  const [sessionKey, setSessionKey] = useState(0);
  const questions = useMemo(() => {
    // When sessionKey updates, produce a new shuffled ordering
    if (sessionKey < 0) return rawQuestions;
    return shuffleArray(rawQuestions);
  }, [rawQuestions, sessionKey]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Answering state
  const [selectedMcqOption, setSelectedMcqOption] = useState<number | null>(null);
  const [fillInText, setFillInText] = useState('');
  const [selectedFaultyLine, setSelectedFaultyLine] = useState<number | null>(null);
  const [selectedFixOption, setSelectedFixOption] = useState<number | null>(null);

  // Submission & Scoring state
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [scoredQuestions, setScoredQuestions] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [showReview, setShowReview] = useState(false);

  const resetQuestionState = () => {
    setSelectedMcqOption(null);
    setFillInText('');
    setSelectedFaultyLine(null);
    setSelectedFixOption(null);
    setIsAnswerSubmitted(false);
    setIsCurrentCorrect(false);
  };

  // If question pool is empty
  if (!questions || questions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header showBack title="Coding Challenge" />
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBox}>
            <Ionicons name="folder-open-outline" size={36} color={Colors.textSecondary} />
          </View>
          <Text style={styles.emptyTitle}>No Questions Found</Text>
          <Text style={styles.emptySub}>
            There are no questions in this mode for the selected syllabus unit.
          </Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.replace('/challenge' as any)}
          >
            <Ionicons name="arrow-back" size={16} color="#FFFFFF" />
            <Text style={styles.backBtnText}>Choose Another Unit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  // Check Answer Handler
  const handleCheckAnswer = () => {
    if (isAnswerSubmitted) return;

    let correct = false;

    if (currentQ.mode === 'missing_code') {
      const q = currentQ as MissingCodeQuestion;
      if (q.type === 'multiple_choice') {
        if (selectedMcqOption === null) return;
        correct = selectedMcqOption === q.correctAnswerIndex;
      } else {
        if (!fillInText.trim()) return;
        correct = checkFillInBlank(fillInText, q.acceptedAnswers || []);
      }
    } else if (currentQ.mode === 'find_error') {
      const q = currentQ as FindErrorQuestion;
      // Valid if user identified the correct fix option
      if (selectedFixOption === null) return;
      correct = selectedFixOption === q.correctOptionIndex;
    }

    setIsCurrentCorrect(correct);
    setIsAnswerSubmitted(true);

    // Prevent duplicate points for the same question
    if (correct && !scoredQuestions[currentQ.id]) {
      setScore((prev) => prev + 1);
      setScoredQuestions((prev) => ({ ...prev, [currentQ.id]: true }));
    }
  };

  // Handler for Mode C (Match Registers & Functions completion)
  const handleMatchComplete = (totalPairs: number, attempts: number) => {
    if (isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    // If completed within reasonable attempts (e.g. at most 2 extra tries)
    const isGoodScore = attempts <= totalPairs + 2;
    setIsCurrentCorrect(isGoodScore);

    if (!scoredQuestions[currentQ.id]) {
      setScore((prev) => prev + 1);
      setScoredQuestions((prev) => ({ ...prev, [currentQ.id]: true }));
    }
  };

  // Move to Next Question or Finish
  const handleNext = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      resetQuestionState();
    } else {
      // Calculate XP and save result
      const finalScore = score;
      const totalQ = questions.length;
      const xp = Math.max(25, Math.round((finalScore / totalQ) * 100));
      setEarnedXp(xp);

      // Award XP to profile
      const user = await authService.getCurrentUser();
      if (user) {
        await authService.updateProfile({
          totalXp: (user.totalXp || 0) + xp,
          quizzesTaken: (user.quizzesTaken || 0) + 1,
        });
      }

      await progressService.recordChallengeResult(mode, finalScore, totalQ);

      setIsCompleted(true);
    }
  };

  // Restart Challenge
  const handleRestart = () => {
    setSessionKey((k) => k + 1);
    setCurrentIndex(0);
    resetQuestionState();
    setScore(0);
    setScoredQuestions({});
    setIsCompleted(false);
    setShowReview(false);
  };

  // Mode Title Helper
  const getModeTitle = () => {
    switch (mode) {
      case 'missing_code':
        return 'Mode A — Complete Missing Code';
      case 'find_error':
        return 'Mode B — Find Programming Error';
      case 'match_registers':
        return 'Mode C — Match Registers & Peripherals';
    }
  };

  // -------------------------------------------------------------
  // RESULTS VIEW
  // -------------------------------------------------------------
  if (isCompleted) {
    const totalQuestions = questions.length;
    const correctCount = score;
    const wrongCount = totalQuestions - score;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header showBack title="Challenge Results" subtitle={getModeTitle()} />
        <ScrollView contentContainerStyle={styles.resultScroll}>
          <View style={styles.resultCard}>
            <Text style={styles.resultEmoji}>
              {percentage >= 80 ? '⚡' : percentage >= 50 ? '🛠️' : '📚'}
            </Text>
            <Text style={styles.resultTitle}>
              {percentage >= 80
                ? 'Master MCU Architect!'
                : percentage >= 50
                ? 'Solid Embedded Logic!'
                : 'Keep Practicing Assembly!'}
            </Text>
            <Text style={styles.resultSubtitle}>
              Microcontrollers (2304112) • {getModeTitle()}
            </Text>

            {/* Score Circle */}
            <View style={styles.scoreCircle}>
              <Text style={styles.scorePercent}>{percentage}%</Text>
              <Text style={styles.scoreFraction}>
                {score} / {totalQuestions} Correct
              </Text>
            </View>

            {/* Breakdown Stats */}
            <View style={styles.breakdownGrid}>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownVal}>{totalQuestions}</Text>
                <Text style={styles.breakdownLbl}>Total Items</Text>
              </View>
              <View style={styles.breakdownDivider} />
              <View style={styles.breakdownItem}>
                <Text style={[styles.breakdownVal, { color: Colors.primary }]}>{correctCount}</Text>
                <Text style={styles.breakdownLbl}>Correct</Text>
              </View>
              <View style={styles.breakdownDivider} />
              <View style={styles.breakdownItem}>
                <Text style={[styles.breakdownVal, { color: Colors.danger }]}>{wrongCount}</Text>
                <Text style={styles.breakdownLbl}>Incorrect</Text>
              </View>
            </View>

            {/* XP Award Pill */}
            <View style={styles.xpRewardBox}>
              <Ionicons name="trophy" size={20} color="#D97706" />
              <Text style={styles.xpRewardText}>+{earnedXp} XP Added to Student Profile</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.resultBtnRow}>
              <TouchableOpacity
                style={styles.retryBtn}
                onPress={handleRestart}
                activeOpacity={0.8}
              >
                <Ionicons name="refresh" size={16} color="#FFFFFF" />
                <Text style={styles.retryBtnText}>Play Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reviewBtn}
                onPress={() => setShowReview(!showReview)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={showReview ? 'eye-off-outline' : 'eye-outline'}
                  size={16}
                  color={Colors.primaryDark}
                />
                <Text style={styles.reviewBtnText}>
                  {showReview ? 'Hide Explanations' : 'Review Answers'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.exitBtn}
              onPress={() => router.replace('/challenge' as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.exitBtnText}>Back to Challenge Hub</Text>
            </TouchableOpacity>
          </View>

          {/* Detailed Question Review List */}
          {showReview && (
            <View style={styles.reviewList}>
              <Text style={styles.reviewHeading}>Question & Concept Review</Text>
              {questions.map((q, idx) => (
                <View key={q.id} style={styles.reviewCard}>
                  <View style={styles.reviewCardHeader}>
                    <View style={styles.reviewBadge}>
                      <Text style={styles.reviewBadgeText}>Q{idx + 1}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.reviewTitle}>{q.title}</Text>
                      <Text style={styles.reviewSyllabus}>{q.syllabusRef}</Text>
                    </View>
                  </View>

                  <Text style={styles.reviewPrompt}>{q.prompt}</Text>

                  {/* Mode Specific Correct Answer */}
                  {q.mode === 'missing_code' && (
                    <View style={styles.reviewAnswerBox}>
                      <Text style={styles.reviewAnswerLbl}>Correct Code / Answer:</Text>
                      <Text style={styles.reviewAnswerVal}>
                        {q.type === 'multiple_choice'
                          ? q.options?.[q.correctAnswerIndex ?? 0]
                          : q.acceptedAnswers?.join(' OR ')}
                      </Text>
                    </View>
                  )}

                  {q.mode === 'find_error' && (
                    <View style={styles.reviewAnswerBox}>
                      <Text style={styles.reviewAnswerLbl}>
                        Faulty Line {q.faultyLineNumber}: {q.codeLines[q.faultyLineIndex]}
                      </Text>
                      <Text style={styles.reviewAnswerVal}>
                        Fix: {q.options[q.correctOptionIndex]}
                      </Text>
                    </View>
                  )}

                  <View style={styles.reviewExplBox}>
                    <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
                    <Text style={styles.reviewExplText}>{q.explanation}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // -------------------------------------------------------------
  // ACTIVE GAMEPLAY VIEW
  // -------------------------------------------------------------
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Header */}
      <Header
        showBack
        title={getModeTitle()}
        subtitle={`Question ${currentIndex + 1} of ${questions.length} • Unit ${currentQ.unitNumber}`}
      />

      {/* Progress Bar */}
      <ProgressBar progress={progressPercent} height={6} />

      <ScrollView contentContainerStyle={styles.playScroll}>
        {/* Unit & Syllabus Badge */}
        <View style={styles.metaBadgeRow}>
          <View style={styles.unitBadge}>
            <Text style={styles.unitBadgeText}>Unit {currentQ.unitNumber}</Text>
          </View>
          <Text style={styles.syllabusRefText}>{currentQ.syllabusRef}</Text>
          <View
            style={[
              styles.diffBadge,
              currentQ.difficulty === 'Easy'
                ? { backgroundColor: '#DCFCE7' }
                : currentQ.difficulty === 'Medium'
                ? { backgroundColor: '#FEF3C7' }
                : { backgroundColor: '#FEE2E2' },
            ]}
          >
            <Text
              style={[
                styles.diffBadgeText,
                currentQ.difficulty === 'Easy'
                  ? { color: '#15803D' }
                  : currentQ.difficulty === 'Medium'
                  ? { color: '#B45309' }
                  : { color: '#B91C1C' },
              ]}
            >
              {currentQ.difficulty}
            </Text>
          </View>
        </View>

        {/* Question Prompt */}
        <Text style={styles.questionTitle}>{currentQ.title}</Text>
        <Text style={styles.questionPrompt}>{currentQ.prompt}</Text>

        {/* MODE A: COMPLETE MISSING CODE */}
        {currentQ.mode === 'missing_code' && (
          <View style={styles.modeSection}>
            <CodeSnippetView
              codeSnippet={(currentQ as MissingCodeQuestion).codeSnippet}
              missingPlaceholder="___"
            />

            {(currentQ as MissingCodeQuestion).type === 'multiple_choice' ? (
              <View style={styles.optionsList}>
                {(currentQ as MissingCodeQuestion).options?.map((opt, idx) => {
                  const isSelected = selectedMcqOption === idx;
                  const isCorrectOpt =
                    idx === (currentQ as MissingCodeQuestion).correctAnswerIndex;

                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.optionCard,
                        isSelected && styles.optionCardSelected,
                        isAnswerSubmitted && isCorrectOpt && styles.optionCardCorrect,
                        isAnswerSubmitted && isSelected && !isCorrectOpt && styles.optionCardWrong,
                      ]}
                      onPress={() => !isAnswerSubmitted && setSelectedMcqOption(idx)}
                      activeOpacity={0.8}
                      disabled={isAnswerSubmitted}
                    >
                      <View style={styles.optLetterBadge}>
                        <Text style={styles.optLetterText}>
                          {String.fromCharCode(65 + idx)}
                        </Text>
                      </View>
                      <Text style={styles.optCodeText}>{opt}</Text>
                      {isAnswerSubmitted && isCorrectOpt && (
                        <Ionicons name="checkmark-circle" size={18} color="#15803D" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrectOpt && (
                        <Ionicons name="close-circle" size={18} color="#DC2626" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              // Fill in the blank
              <View style={styles.fillBlankContainer}>
                <Text style={styles.fillBlankLabel}>
                  Type the missing instruction / operand:
                </Text>
                <TextInput
                  style={[
                    styles.fillInput,
                    isAnswerSubmitted &&
                      (isCurrentCorrect ? styles.fillInputCorrect : styles.fillInputWrong),
                  ]}
                  value={fillInText}
                  onChangeText={setFillInText}
                  placeholder="e.g. SETB TR0 or MOV A, @R0"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  editable={!isAnswerSubmitted}
                />
                {(currentQ as MissingCodeQuestion).hint && !isAnswerSubmitted && (
                  <View style={styles.hintBox}>
                    <Ionicons name="bulb-outline" size={14} color="#D97706" />
                    <Text style={styles.hintText}>
                      {(currentQ as MissingCodeQuestion).hint}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}

        {/* MODE B: FIND PROGRAMMING ERROR */}
        {currentQ.mode === 'find_error' && (
          <View style={styles.modeSection}>
            <Text style={styles.modeSubtitle}>
              1. Tap any line in the code to inspect, or select the line with the bug:
            </Text>
            <CodeSnippetView
              codeLines={(currentQ as FindErrorQuestion).codeLines}
              interactiveLines={true}
              selectedLineIndex={selectedFaultyLine}
              onSelectLine={(lineIdx) => {
                if (!isAnswerSubmitted) {
                  setSelectedFaultyLine(lineIdx);
                }
              }}
            />

            <Text style={[styles.modeSubtitle, { marginTop: 12 }]}>
              2. Choose the correct architectural fix:
            </Text>
            <View style={styles.optionsList}>
              {(currentQ as FindErrorQuestion).options.map((opt, idx) => {
                const isSelected = selectedFixOption === idx;
                const isCorrectFix = idx === (currentQ as FindErrorQuestion).correctOptionIndex;

                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.optionCard,
                      isSelected && styles.optionCardSelected,
                      isAnswerSubmitted && isCorrectFix && styles.optionCardCorrect,
                      isAnswerSubmitted && isSelected && !isCorrectFix && styles.optionCardWrong,
                    ]}
                    onPress={() => !isAnswerSubmitted && setSelectedFixOption(idx)}
                    activeOpacity={0.8}
                    disabled={isAnswerSubmitted}
                  >
                    <View style={styles.optLetterBadge}>
                      <Text style={styles.optLetterText}>
                        {String.fromCharCode(65 + idx)}
                      </Text>
                    </View>
                    <Text style={styles.optCodeText}>{opt}</Text>
                    {isAnswerSubmitted && isCorrectFix && (
                      <Ionicons name="checkmark-circle" size={18} color="#15803D" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrectFix && (
                      <Ionicons name="close-circle" size={18} color="#DC2626" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* MODE C: MATCH REGISTERS & FUNCTIONS */}
        {currentQ.mode === 'match_registers' && (
          <View style={styles.modeSection}>
            <RegisterMatchView
              key={currentQ.id}
              items={(currentQ as MatchRegistersQuestion).items}
              onComplete={handleMatchComplete}
              isAnswerSubmitted={isAnswerSubmitted}
            />
          </View>
        )}

        {/* POST-SUBMISSION FEEDBACK BANNER */}
        {isAnswerSubmitted && (
          <View
            style={[
              styles.feedbackCard,
              isCurrentCorrect ? styles.feedbackCardCorrect : styles.feedbackCardWrong,
            ]}
          >
            <View style={styles.feedbackHeader}>
              <Ionicons
                name={isCurrentCorrect ? 'checkmark-circle' : 'close-circle'}
                size={22}
                color={isCurrentCorrect ? '#15803D' : '#DC2626'}
              />
              <Text
                style={[
                  styles.feedbackTitle,
                  { color: isCurrentCorrect ? '#15803D' : '#DC2626' },
                ]}
              >
                {isCurrentCorrect ? 'Correct!' : 'Incorrect'}
              </Text>
            </View>

            {/* If wrong in Mode A, show correct answer */}
            {!isCurrentCorrect && currentQ.mode === 'missing_code' && (
              <View style={styles.correctAnswerReveal}>
                <Text style={styles.revealLabel}>Correct Answer:</Text>
                <Text style={styles.revealCode}>
                  {(currentQ as MissingCodeQuestion).type === 'multiple_choice'
                    ? (currentQ as MissingCodeQuestion).options?.[
                        (currentQ as MissingCodeQuestion).correctAnswerIndex ?? 0
                      ]
                    : (currentQ as MissingCodeQuestion).acceptedAnswers?.[0]}
                </Text>
              </View>
            )}

            {/* If wrong in Mode B, show faulty line info */}
            {!isCurrentCorrect && currentQ.mode === 'find_error' && (
              <View style={styles.correctAnswerReveal}>
                <Text style={styles.revealLabel}>
                  Faulty Line {(currentQ as FindErrorQuestion).faultyLineNumber}:
                </Text>
                <Text style={styles.revealCode}>
                  {(currentQ as FindErrorQuestion).errorDescription}
                </Text>
              </View>
            )}

            <Text style={styles.explanationText}>{currentQ.explanation}</Text>

            {/* Corrected snippet for Mode B */}
            {currentQ.mode === 'find_error' && (
              <View style={styles.correctedCodeBox}>
                <Text style={styles.correctedCodeLbl}>Corrected Code Snippet:</Text>
                <Text style={styles.correctedCodeText}>
                  {(currentQ as FindErrorQuestion).correctedSnippet}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* BOTTOM ACTION BUTTONS */}
        <View style={styles.bottomBar}>
          {!isAnswerSubmitted ? (
            currentQ.mode !== 'match_registers' ? (
              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  // Disable if incomplete
                  (currentQ.mode === 'missing_code' &&
                    (currentQ as MissingCodeQuestion).type === 'multiple_choice' &&
                    selectedMcqOption === null) ||
                  (currentQ.mode === 'missing_code' &&
                    (currentQ as MissingCodeQuestion).type === 'fill_in_blank' &&
                    !fillInText.trim()) ||
                  (currentQ.mode === 'find_error' && selectedFixOption === null)
                    ? styles.submitBtnDisabled
                    : null,
                ]}
                onPress={handleCheckAnswer}
                activeOpacity={0.8}
                disabled={
                  (currentQ.mode === 'missing_code' &&
                    (currentQ as MissingCodeQuestion).type === 'multiple_choice' &&
                    selectedMcqOption === null) ||
                  (currentQ.mode === 'missing_code' &&
                    (currentQ as MissingCodeQuestion).type === 'fill_in_blank' &&
                    !fillInText.trim()) ||
                  (currentQ.mode === 'find_error' && selectedFixOption === null)
                }
              >
                <Text style={styles.submitBtnText}>Check Answer</Text>
                <Ionicons name="checkmark-sharp" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            ) : null
          ) : (
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.nextBtnText}>
                {currentIndex + 1 < questions.length ? 'Next Question' : 'View Results'}
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          )}
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
  playScroll: {
    padding: 16,
    paddingBottom: 40,
    gap: 12,
  },
  metaBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  unitBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  unitBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  syllabusRefText: {
    fontSize: 11,
    color: Colors.textMuted,
    flex: 1,
  },
  diffBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  diffBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  questionPrompt: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  modeSection: {
    marginVertical: 4,
  },
  modeSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  optionsList: {
    gap: 8,
    marginTop: 8,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    gap: 10,
  },
  optionCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#EBF5EE',
  },
  optionCardCorrect: {
    borderColor: '#86EFAC',
    backgroundColor: '#F0FDF4',
  },
  optionCardWrong: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  optLetterBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optLetterText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textSecondary,
  },
  optCodeText: {
    fontFamily: 'Courier',
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  fillBlankContainer: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 8,
    marginTop: 8,
  },
  fillBlankLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  fillInput: {
    fontFamily: 'Courier',
    fontSize: 15,
    fontWeight: '700',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    color: Colors.text,
  },
  fillInputCorrect: {
    borderColor: '#86EFAC',
    backgroundColor: '#F0FDF4',
  },
  fillInputWrong: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3C740',
    padding: 8,
    borderRadius: 8,
  },
  hintText: {
    fontSize: 11,
    color: '#92400E',
    flex: 1,
  },
  feedbackCard: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    gap: 8,
    marginTop: 10,
  },
  feedbackCardCorrect: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  feedbackCardWrong: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feedbackTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  correctAnswerReveal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  revealLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.danger,
    marginBottom: 2,
  },
  revealCode: {
    fontFamily: 'Courier',
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
  },
  explanationText: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.text,
  },
  correctedCodeBox: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  correctedCodeLbl: {
    fontSize: 10,
    fontWeight: '800',
    color: '#38BDF8',
    marginBottom: 4,
  },
  correctedCodeText: {
    fontFamily: 'Courier',
    fontSize: 11,
    color: '#E2E8F0',
    lineHeight: 15,
  },
  bottomBar: {
    marginTop: 14,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    gap: 8,
  },
  submitBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryDark,
    borderRadius: 14,
    paddingVertical: 14,
    gap: 8,
  },
  nextBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  // Results view styles
  resultScroll: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  resultCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  resultEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },
  resultSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: 16,
    textAlign: 'center',
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.primary,
    marginBottom: 16,
  },
  scorePercent: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.primaryDark,
  },
  scoreFraction: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  breakdownGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 14,
  },
  breakdownItem: {
    alignItems: 'center',
  },
  breakdownVal: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  breakdownLbl: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  breakdownDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
  },
  xpRewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  xpRewardText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#92400E',
  },
  resultBtnRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginBottom: 10,
  },
  retryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
  },
  retryBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  reviewBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  reviewBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  exitBtn: {
    paddingVertical: 8,
  },
  exitBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  reviewList: {
    gap: 12,
  },
  reviewHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  reviewCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 8,
  },
  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reviewBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  reviewBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  reviewTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
  },
  reviewSyllabus: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  reviewPrompt: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  reviewAnswerBox: {
    backgroundColor: '#F0FDF4',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  reviewAnswerLbl: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  reviewAnswerVal: {
    fontFamily: 'Courier',
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  reviewExplBox: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 8,
  },
  reviewExplText: {
    fontSize: 11,
    lineHeight: 15,
    color: Colors.textSecondary,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 40,
    gap: 12,
  },
  emptyIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  emptySub: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    marginTop: 8,
  },
  backBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
