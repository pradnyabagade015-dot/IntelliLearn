import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { ChatMessage } from '@/services/ai';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user';

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <Text key={idx} style={[styles.header3, isUser && styles.userText]}>
            {line.replace('### ', '')}
          </Text>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <Text key={idx} style={[styles.boldText, isUser && styles.userText]}>
            {line.replace(/\*\*/g, '')}
          </Text>
        );
      }
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <Text key={idx} style={[styles.bulletPoint, isUser && styles.userText]}>
            {line}
          </Text>
        );
      }
      if (line.trim() === '---') {
        return <View key={idx} style={styles.divider} />;
      }
      if (line.trim() === '') {
        return <View key={idx} style={styles.emptyLine} />;
      }

      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <Text key={idx} style={[styles.bodyText, isUser && styles.userText]}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <Text key={pIdx} style={styles.inlineBold}>
                  {part.slice(2, -2)}
                </Text>
              );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <Text key={pIdx} style={styles.inlineItalic}>
                  {part.slice(1, -1)}
                </Text>
              );
            }
            return part;
          })}
        </Text>
      );
    });
  };

  return (
    <View style={[styles.wrapper, isUser ? styles.userWrapper : styles.aiWrapper]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🌱</Text>
        </View>
      )}

      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        {renderFormattedText(message.text)}
        <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.aiTimestamp]}>
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 12,
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },
  aiWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  avatarText: {
    fontSize: 16,
  },
  bubble: {
    maxWidth: '85%',
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: Colors.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  header3: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 6,
  },
  boldText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    marginVertical: 2,
  },
  bulletPoint: {
    fontSize: 13,
    color: Colors.text,
    marginVertical: 2,
    lineHeight: 19,
  },
  bodyText: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 19,
  },
  inlineBold: {
    fontWeight: '700',
  },
  inlineItalic: {
    fontStyle: 'italic',
    color: Colors.textSecondary,
  },
  userText: {
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: 8,
  },
  emptyLine: {
    height: 6,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: '#D1FAE5',
  },
  aiTimestamp: {
    color: Colors.textMuted,
  },
});
