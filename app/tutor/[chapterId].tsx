import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { ChatBubble } from '@/components/ChatBubble';
import {
  generateTutorResponse,
  getInitialTutorGreeting,
  SUGGESTED_PROMPTS,
  ChatMessage,
  TopicContext,
} from '@/services/ai';
import { businessModelSubject, microcontrollerSubject, Module, Topic, SubjectDetailed } from '@/constants/chapters';
import { Ionicons } from '@expo/vector-icons';
import { useStudySession } from '@/services/progress';

function getSubjectForChapterId(chapterId?: string): SubjectDetailed {
  if (chapterId && (chapterId.toLowerCase().includes('micro') || chapterId === '2304112')) {
    return microcontrollerSubject;
  }
  return businessModelSubject;
}

function findTopic(activeSubject: SubjectDetailed, topicNumber?: string): { topic: Topic; moduleTitle: string } {
  if (topicNumber) {
    for (const mod of activeSubject.modules) {
      const found = mod.topics.find((t: Topic) => t.topicNumber === topicNumber);
      if (found) {
        return { topic: found, moduleTitle: mod.title };
      }
    }
  }
  return {
    topic:
      activeSubject.modules[0]?.topics[0] ||
      activeSubject.modules[1]?.topics[0],
    moduleTitle:
      activeSubject.modules[0]?.title || activeSubject.name,
  };
}

let messageSeq = 0;
function createMessageId(prefix: string): string {
  messageSeq += 1;
  return `${prefix}-${messageSeq}`;
}

export default function AiTutorScreen() {
  const params = useLocalSearchParams<{
    chapterId: string;
    topicNumber?: string;
    topicTitle?: string;
    moduleName?: string;
  }>();

  useStudySession('tutor', params.chapterId || 'bmd-2994511');

  const activeSubject = getSubjectForChapterId(params.chapterId);
  const initialContext = findTopic(activeSubject, params.topicNumber);
  const [currentTopic, setCurrentTopic] = useState<Topic>(initialContext.topic);
  const [currentModuleName, setCurrentModuleName] = useState<string>(initialContext.moduleTitle);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const ctx: TopicContext = {
      subjectName: activeSubject.name,
      courseCode: activeSubject.code,
      moduleName: initialContext.moduleTitle,
      topicNumber: initialContext.topic.topicNumber,
      topicTitle: initialContext.topic.title,
      notes: initialContext.topic.notes,
    };
    return [
      {
        id: 'init-msg-0',
        sender: 'ai',
        text: getInitialTutorGreeting(ctx),
        timestamp: 'Just now',
      },
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSelectTopic = (topic: Topic, moduleTitle: string) => {
    setCurrentTopic(topic);
    setCurrentModuleName(moduleTitle);
    setShowTopicSelector(false);

    const context: TopicContext = {
      subjectName: activeSubject.name,
      courseCode: activeSubject.code,
      moduleName: moduleTitle,
      topicNumber: topic.topicNumber,
      topicTitle: topic.title,
      notes: topic.notes,
    };

    setMessages([
      {
        id: createMessageId('topic-change'),
        sender: 'ai',
        text: getInitialTutorGreeting(context),
        timestamp: 'Just now',
      },
    ]);
  };

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || inputText;
    if (!q.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: createMessageId('user'),
      sender: 'user',
      text: q.trim(),
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const context: TopicContext = {
        subjectName: activeSubject.name,
        courseCode: activeSubject.code,
        moduleName: currentModuleName,
        topicNumber: currentTopic.topicNumber,
        topicTitle: currentTopic.title,
        notes: currentTopic.notes,
      };

      const response = await generateTutorResponse(context, q);

      const aiMsg: ChatMessage = {
        id: createMessageId('ai'),
        sender: 'ai',
        text: response,
        timestamp: 'Now',
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errMsg: ChatMessage = {
        id: createMessageId('err'),
        sender: 'ai',
        text: 'Sorry, I encountered an issue generating a response. Please try again.',
        timestamp: 'Now',
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        showBack
        title={`${activeSubject.name} AI Tutor`}
        subtitle={`${activeSubject.name} (${activeSubject.code})`}
        rightAction={
          <TouchableOpacity
            style={styles.switchTopicBtn}
            onPress={() => setShowTopicSelector(!showTopicSelector)}
          >
            <Ionicons name="list" size={16} color={Colors.primaryDark} />
            <Text style={styles.switchTopicBtnText}>Units</Text>
          </TouchableOpacity>
        }
      />

      {/* Active Topic Banner */}
      <View style={styles.contextBanner}>
        <View style={styles.contextIconWrap}>
          <Text style={styles.contextIconText}>
            {activeSubject.code === '2304112' ? '⚡' : '💼'}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.contextModuleText} numberOfLines={1}>
            {currentModuleName}
          </Text>
          <Text style={styles.contextTopicText} numberOfLines={1}>
            Topic {currentTopic.topicNumber}: {currentTopic.title}
          </Text>
        </View>
      </View>

      {/* Topic Selector Drawer / Overlay */}
      {showTopicSelector && (
        <View style={styles.topicSelectorBox}>
          <Text style={styles.selectorHeader}>Select {activeSubject.name} Topic:</Text>
          <ScrollView style={{ maxHeight: 240 }}>
            {activeSubject.modules.map((m: Module) => (
              <View key={m.id} style={styles.selectorModuleGroup}>
                <Text style={styles.selectorModuleTitle}>{m.title}</Text>
                {m.topics.map((t: Topic) => (
                  <TouchableOpacity
                    key={t.id}
                    style={[
                      styles.selectorTopicItem,
                      currentTopic.id === t.id && styles.selectorTopicActive,
                    ]}
                    onPress={() => handleSelectTopic(t, m.title)}
                  >
                    <Text
                      style={[
                        styles.selectorTopicText,
                        currentTopic.id === t.id && styles.selectorTopicActiveText,
                      ]}
                      numberOfLines={1}
                    >
                      {t.topicNumber}. {t.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Suggestion Chips */}
      <View style={styles.promptsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.promptsScroll}
        >
          {SUGGESTED_PROMPTS.map((prompt) => (
            <TouchableOpacity
              key={prompt.id}
              style={styles.promptChip}
              onPress={() => handleSend(prompt.promptText)}
              activeOpacity={0.7}
            >
              <Text style={styles.promptEmoji}>{prompt.emoji}</Text>
              <Text style={styles.promptLabel}>{prompt.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Chat Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}

          {isTyping && (
            <View style={styles.typingIndicator}>
              <ActivityIndicator size="small" color={Colors.primary} />
              <Text style={styles.typingText}>
                AI Tutor is referencing {activeSubject.code} syllabus notes...
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder={`Ask about ${currentTopic.title}...`}
            placeholderTextColor={Colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || isTyping) && styles.sendButtonDisabled,
            ]}
            onPress={() => handleSend()}
            disabled={!inputText.trim() || isTyping}
          >
            <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  switchTopicBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  switchTopicBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  contextBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    gap: 12,
  },
  contextIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  contextIconText: {
    fontSize: 18,
  },
  contextModuleText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  contextTopicText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 1,
  },
  topicSelectorBox: {
    backgroundColor: Colors.card,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  selectorHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  selectorModuleGroup: {
    marginBottom: 10,
  },
  selectorModuleTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  selectorTopicItem: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  selectorTopicActive: {
    backgroundColor: Colors.primaryLight,
  },
  selectorTopicText: {
    fontSize: 13,
    color: Colors.text,
  },
  selectorTopicActiveText: {
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  promptsContainer: {
    backgroundColor: Colors.card,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  promptsScroll: {
    paddingHorizontal: 14,
    gap: 8,
  },
  promptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 6,
  },
  promptEmoji: {
    fontSize: 14,
  },
  promptLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  messagesList: {
    paddingVertical: 14,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginVertical: 6,
  },
  typingText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 14,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.cardBorder,
    shadowOpacity: 0,
    elevation: 0,
  },
});
