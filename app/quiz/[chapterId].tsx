import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { apiService } from '@/services/api';
import { ChapterQuiz } from '@/constants/chapters';
import { Ionicons } from '@expo/vector-icons';

export default function QuizPlayerScreen() {
  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  const [quiz, setQuiz] = useState<ChapterQuiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    apiService.getQuizByChapterId(chapterId || 'bmd-2994511').then((q) => {
      if (q) {
        setQuiz(q);
        setUserAnswers(new Array(q.questions.length).fill(null));
      }
    });
  }, [chapterId]);

  if (!quiz || quiz.questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showBack title="Business Model Quiz" />
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>Loading Business Model Development quiz...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQ = quiz.questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / quiz.questions.length) * 100;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = selectedOption;
    setUserAnswers(updatedAnswers);

    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finish Quiz
      const finalScore = score + (selectedOption === currentQ.correctAnswer ? 0 : 0);
      const res = await apiService.submitQuizResult(
        chapterId || 'bmd-2994511',
        finalScore,
        quiz.questions.length
      );
      setEarnedXp(res.xpEarned);
      setIsQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers(new Array(quiz.questions.length).fill(null));
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
    setShowReview(false);
  };

  // Completed State View
  if (isQuizCompleted) {
    const totalQuestions = quiz.questions.length;
    const correctCount = score;
    const wrongCount = totalQuestions - score;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header showBack title="Quiz Summary" subtitle={quiz.subjectTitle} />
        <ScrollView contentContainerStyle={styles.resultScrollContent}>
          <View style={styles.resultCard}>
            <Text style={styles.resultEmoji}>
              {percentage >= 80 ? '🏆' : percentage >= 50 ? '💼' : '📚'}
            </Text>
            <Text style={styles.resultTitle}>
              {percentage >= 80
                ? 'Outstanding Mastery!'
                : percentage >= 50
                ? 'Good Business Model Knowledge!'
                : 'Keep Practicing Business Model Development!'}
            </Text>
            <Text style={styles.resultSubtitle}>
              Course Code: 2994511 • Business Model Development
            </Text>

            <View style={styles.scoreCircle}>
              <Text style={styles.scorePercent}>{percentage}%</Text>
              <Text style={styles.scoreFraction}>
                {score} / {totalQuestions}
              </Text>
            </View>

            {/* Score Breakdown Grid */}
            <View style={styles.breakdownGrid}>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownVal}>{totalQuestions}</Text>
                <Text style={styles.breakdownLbl}>Total Questions</Text>
              </View>
              <View style={styles.breakdownDivider} />
              <View style={styles.breakdownItem}>
                <Text style={[styles.breakdownVal, { color: Colors.primary }]}>{correctCount}</Text>
                <Text style={styles.breakdownLbl}>Correct Answers</Text>
              </View>
              <View style={styles.breakdownDivider} />
              <View style={styles.breakdownItem}>
                <Text style={[styles.breakdownVal, { color: Colors.danger }]}>{wrongCount}</Text>
                <Text style={styles.breakdownLbl}>Wrong Answers</Text>
              </View>
            </View>

            <View style={styles.xpRewardBox}>
              <Ionicons name="trophy" size={20} color="#D97706" />
              <Text style={styles.xpRewardText}>+{earnedXp} XP Added to Profile</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.resultBtnRow}>
              <TouchableOpacity
                style={styles.retryBtn}
                onPress={handleRestart}
                activeOpacity={0.8}
              >
                <Ionicons name="refresh" size={16} color={Colors.text} />
                <Text style={styles.retryBtnText}>Retry Quiz</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reviewBtn}
                onPress={() => setShowReview(!showReview)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={showReview ? 'chevron-up' : 'document-text-outline'}
                  size={16}
                  color={Colors.primaryDark}
                />
                <Text style={styles.reviewBtnText}>
                  {showReview ? 'Hide Review' : 'Review Answers'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Ask AI Tutor CTA */}
            <TouchableOpacity
              style={styles.askAiTutorCta}
              onPress={() => router.push('/tutor/bmd-2994511')}
              activeOpacity={0.85}
            >
              <Ionicons name="sparkles" size={18} color="#FFFFFF" />
              <Text style={styles.askAiTutorCtaText}>Ask AI Tutor About These Questions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backHomeLink}
              onPress={() => router.replace('/(tabs)/home')}
              activeOpacity={0.8}
            >
              <Text style={styles.backHomeLinkText}>Back to Home Dashboard</Text>
            </TouchableOpacity>
          </View>

          {/* Detailed Question Review List */}
          {showReview && (
            <View style={styles.reviewSection}>
              <Text style={styles.reviewSectionHeading}>Detailed Answer Review</Text>
              {quiz.questions.map((q, qIdx) => {
                const userAns = userAnswers[qIdx];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <View key={q.id} style={styles.reviewCard}>
                    <View style={styles.reviewCardHeader}>
                      <View
                        style={[
                          styles.reviewBadge,
                          { backgroundColor: isCorrect ? Colors.primaryLight : Colors.dangerLight },
                        ]}
                      >
                        <Ionicons
                          name={isCorrect ? 'checkmark-circle' : 'close-circle'}
                          size={16}
                          color={isCorrect ? Colors.primaryDark : Colors.danger}
                        />
                        <Text
                          style={[
                            styles.reviewBadgeText,
                            { color: isCorrect ? Colors.primaryDark : Colors.danger },
                          ]}
                        >
                          Question {qIdx + 1} • {isCorrect ? 'Correct' : 'Wrong'}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.reviewQuestionText}>{q.question}</Text>

                    <View style={styles.reviewOptionsList}>
                      {q.options.map((opt, optIdx) => {
                        const isCorrectOption = optIdx === q.correctAnswer;
                        const isUserChoice = optIdx === userAns;

                        return (
                          <View
                            key={optIdx}
                            style={[
                              styles.reviewOptionRow,
                              isCorrectOption && styles.reviewCorrectOption,
                              isUserChoice && !isCorrectOption && styles.reviewWrongOption,
                            ]}
                          >
                            <Text style={styles.reviewOptionLetter}>
                              {String.fromCharCode(65 + optIdx)}.
                            </Text>
                            <Text
                              style={[
                                styles.reviewOptionText,
                                isCorrectOption && styles.reviewCorrectOptionText,
                                isUserChoice && !isCorrectOption && styles.reviewWrongOptionText,
                              ]}
                            >
                              {opt}
                            </Text>
                            {isCorrectOption && (
                              <Ionicons name="checkmark" size={16} color={Colors.primaryDark} />
                            )}
                            {isUserChoice && !isCorrectOption && (
                              <Ionicons name="close" size={16} color={Colors.danger} />
                            )}
                          </View>
                        );
                      })}
                    </View>

                    <View style={styles.reviewExplanationBox}>
                      <Text style={styles.reviewExplanationLabel}>Explanation:</Text>
                      <Text style={styles.reviewExplanationText}>{q.explanation}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        showBack
        title="Business Model Quiz"
        subtitle={quiz.chapterTitle}
        rightAction={
          <View style={styles.questionCounterBadge}>
            <Text style={styles.questionCounterText}>
              {currentIndex + 1}/{quiz.questions.length}
            </Text>
          </View>
        }
      />

      <View style={styles.progressTrack}>
        <ProgressBar progress={progressPercent} color={Colors.primary} height={4} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Question Card */}
        <View style={styles.questionCard}>
          <View style={styles.questionBadge}>
            <Text style={styles.questionBadgeText}>Question {currentIndex + 1}</Text>
          </View>
          <Text style={styles.questionText}>{currentQ.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsList}>
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswer;

            const isAnsweredCorrect = isAnswerSubmitted && isCorrect;
            const isAnsweredWrong = isAnswerSubmitted && isSelected && !isCorrect;

            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionItem,
                  isSelected && styles.selectedOption,
                  isAnsweredCorrect && styles.correctOption,
                  isAnsweredWrong && styles.wrongOption,
                ]}
                onPress={() => handleSelectOption(idx)}
                activeOpacity={0.7}
                disabled={isAnswerSubmitted}
              >
                <View style={styles.optionLetterBadge}>
                  <Text style={styles.optionLetterText}>
                    {String.fromCharCode(65 + idx)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optionText,
                    isAnsweredCorrect && styles.correctOptionText,
                    isAnsweredWrong && styles.wrongOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explanation Card */}
        {isAnswerSubmitted && (
          <View style={styles.explanationCard}>
            <View style={styles.explanationHeader}>
              <Ionicons
                name={selectedOption === currentQ.correctAnswer ? 'checkmark-circle' : 'close-circle'}
                size={20}
                color={selectedOption === currentQ.correctAnswer ? Colors.primary : Colors.danger}
              />
              <Text
                style={[
                  styles.explanationTitle,
                  {
                    color: selectedOption === currentQ.correctAnswer ? Colors.primary : Colors.danger,
                  },
                ]}
              >
                {selectedOption === currentQ.correctAnswer ? 'Correct Answer!' : 'Incorrect'}
              </Text>
            </View>
            <Text style={styles.explanationBody}>{currentQ.explanation}</Text>
          </View>
        )}

        {/* Bottom Actions */}
        <View style={styles.footerAction}>
          {!isAnswerSubmitted ? (
            <TouchableOpacity
              style={[
                styles.actionBtn,
                selectedOption === null && styles.actionBtnDisabled,
              ]}
              onPress={handleCheckAnswer}
              disabled={selectedOption === null}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnText}>Check Answer</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnText}>
                {currentIndex + 1 === quiz.questions.length ? 'See Results' : 'Next Question'}
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
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
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  questionCounterBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  questionCounterText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  progressTrack: {
    width: '100%',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  questionCard: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  questionBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  questionBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    lineHeight: 22,
  },
  optionsList: {
    gap: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    gap: 12,
  },
  selectedOption: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  correctOption: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  wrongOption: {
    borderColor: Colors.danger,
    backgroundColor: Colors.dangerLight,
  },
  optionLetterBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  optionLetterText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textSecondary,
  },
  optionText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
    lineHeight: 19,
    fontWeight: '500',
  },
  correctOptionText: {
    color: Colors.primaryDark,
    fontWeight: '700',
  },
  wrongOptionText: {
    color: Colors.danger,
    fontWeight: '700',
  },
  explanationCard: {
    backgroundColor: Colors.backgroundAlt,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 6,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  explanationBody: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  footerAction: {
    marginTop: 8,
  },
  actionBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 14,
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  actionBtnDisabled: {
    backgroundColor: Colors.cardBorder,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  resultScrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  resultCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  resultEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
  },
  resultSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  scorePercent: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primaryDark,
  },
  scoreFraction: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  breakdownGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 16,
  },
  breakdownItem: {
    alignItems: 'center',
  },
  breakdownDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.cardBorder,
  },
  breakdownVal: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  breakdownLbl: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  xpRewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  xpRewardText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
  },
  resultBtnRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginBottom: 12,
  },
  retryBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  retryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  reviewBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primaryLight,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  reviewBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  askAiTutorCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    width: '100%',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  askAiTutorCtaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  backHomeLink: {
    marginTop: 14,
    paddingVertical: 6,
  },
  backHomeLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  reviewSection: {
    gap: 12,
  },
  reviewSectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginLeft: 4,
  },
  reviewCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 10,
  },
  reviewCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
  },
  reviewBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  reviewQuestionText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 20,
  },
  reviewOptionsList: {
    gap: 6,
  },
  reviewOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.background,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  reviewCorrectOption: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  reviewWrongOption: {
    backgroundColor: Colors.dangerLight,
    borderColor: Colors.danger,
  },
  reviewOptionLetter: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textSecondary,
  },
  reviewOptionText: {
    fontSize: 12,
    color: Colors.text,
    flex: 1,
  },
  reviewCorrectOptionText: {
    color: Colors.primaryDark,
    fontWeight: '700',
  },
  reviewWrongOptionText: {
    color: Colors.danger,
    fontWeight: '700',
  },
  reviewExplanationBox: {
    backgroundColor: Colors.backgroundAlt,
    padding: 10,
    borderRadius: 8,
    gap: 4,
    marginTop: 2,
  },
  reviewExplanationLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  reviewExplanationText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});
