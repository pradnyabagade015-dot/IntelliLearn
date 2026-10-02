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
import { businessModelSubject, Module, Topic } from '@/constants/chapters';
import { Ionicons } from '@expo/vector-icons';

function findTopic(topicNumber?: string): { topic: Topic; moduleTitle: string } {
  if (topicNumber) {
    for (const mod of businessModelSubject.modules) {
      const found = mod.topics.find((t: Topic) => t.topicNumber === topicNumber);
      if (found) {
        return { topic: found, moduleTitle: mod.title };
      }
    }
  }
  return {
    topic:
      businessModelSubject.modules[0]?.topics[0] ||
      businessModelSubject.modules[1]?.topics[0],
    moduleTitle:
      businessModelSubject.modules[0]?.title || 'Unit I: Introduction to Entrepreneurship',
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

  const initialContext = findTopic(params.topicNumber);
  const [currentTopic, setCurrentTopic] = useState<Topic>(initialContext.topic);
  const [currentModuleName, setCurrentModuleName] = useState<string>(initialContext.moduleTitle);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const ctx: TopicContext = {
      subjectName: 'Business Model Development',
      courseCode: '2994511',
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
      subjectName: 'Business Model Development',
      courseCode: '2994511',
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
        subjectName: 'Business Model Development',
        courseCode: '2994511',
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
        title="Business Model AI Tutor"
        subtitle="Business Model Development (2994511)"
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
          <Text style={styles.contextIconText}>💼</Text>
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
          <Text style={styles.selectorHeader}>Select Business Model Development Topic:</Text>
          <ScrollView style={{ maxHeight: 240 }}>
            {businessModelSubject.modules.map((m: Module) => (
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
              <Text style={styles.typingText}>AI Tutor is referencing 2994511 syllabus notes...</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  switchTopicBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  contextBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    gap: 10,
  },
  contextIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  contextIconText: {
    fontSize: 16,
  },
  contextModuleText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  contextTopicText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
  },
  topicSelectorBox: {
    backgroundColor: Colors.card,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  selectorHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  selectorModuleGroup: {
    marginBottom: 8,
  },
  selectorModuleTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  selectorTopicItem: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  selectorTopicActive: {
    backgroundColor: Colors.primaryLight,
  },
  selectorTopicText: {
    fontSize: 12,
    color: Colors.text,
  },
  selectorTopicActiveText: {
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  promptsContainer: {
    backgroundColor: Colors.card,
    paddingVertical: 8,
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 6,
  },
  promptEmoji: {
    fontSize: 13,
  },
  promptLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  messagesList: {
    paddingVertical: 12,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  typingText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 14,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.cardBorder,
  },
});
