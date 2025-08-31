import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import Svg, { Path, Line, Polygon } from 'react-native-svg';

// --- Placeholder Icons (React Native SVG) ---

const PlantIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" stroke="#A3B899" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none">
    <Path d="M12 22c-2 0-3-2-3-4s1-4 3-4 3 2 3 4-1 4-3 4z" />
    <Path d="M12 14V4" />
    <Path d="M12 4c-2.2 0-4-1.8-4-4h8c0 2.2-1.8 4-4 4z" />
    <Path d="M12 10c-2.2 0-4-1.8-4-4h8c0 2.2-1.8 4-4 4z" />
  </Svg>
);

const SendIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none">
    <Line x1="22" y1="2" x2="11" y2="13" />
    <Polygon points="22 2 15 22 11 13 2 9 22 2" />
  </Svg>
);

const MicIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" stroke="#3C3C3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none">
    <Path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <Path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <Line x1="12" y1="19" x2="12" y2="23" />
  </Svg>
);

// --- Mock Data ---
const initialMessages = [
  { id: '1', text: "Hello! I'm here to listen. How are you feeling today?", sender: 'ai' },
];
const quickReplies = ["I'm feeling anxious", "I'm a bit tired", "Tell me about mindfulness"];

// --- Main Component ---
const AIChatbotScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [detectedMood, setDetectedMood] = useState('calm');
  const [showScreeningTrigger, setShowScreeningTrigger] = useState(false);
  const scrollViewRef = useRef();

  const handleSend = (text) => {
    const newText = text.trim();
    if (!newText) return;

    const newUserMessage = { id: Date.now().toString(), text: newText, sender: 'user' };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "Thanks for sharing. Could you tell me more?";
      if (newText.toLowerCase().includes('anxious') || newText.toLowerCase().includes('stressed')) {
        setDetectedMood('anxious');
        aiResponse = "It sounds like you're feeling anxious. Let's try a simple breathing exercise together.";
      } else if (newText.toLowerCase().includes('tired')) {
        setDetectedMood('tired');
        aiResponse = "I hear you're feeling tired. Rest is important. Is something draining your energy?";
      } else if (newText.toLowerCase().includes('hopeless') || newText.toLowerCase().includes('depressed')) {
        setDetectedMood('distressed');
        setShowScreeningTrigger(true);
        aiResponse = "It sounds like you are going through a very difficult time. Your feelings are valid.";
      } else {
        setDetectedMood('calm');
        setShowScreeningTrigger(false);
      }

      const newAiMessage = { id: (Date.now() + 1).toString(), text: aiResponse, sender: 'ai' };
      setMessages((prev) => [...prev, newAiMessage]);
    }, 1000);
  };

  return (
    <View style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <PlantIcon />
        <Text style={styles.headerTitle}>AI Companion</Text>
        <View style={[styles.moodIndicator, { backgroundColor: moodColors[detectedMood].bg }]}>
          <Text style={{ color: moodColors[detectedMood].text }}>Detected: {detectedMood}</Text>
        </View>
      </View>

      {/* Chat */}
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.messageRow, msg.sender === 'user' ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}>
            <View style={[styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={{ color: msg.sender === 'user' ? '#fff' : '#3C3C3C' }}>{msg.text}</Text>
            </View>
          </View>
        ))}

        {showScreeningTrigger && (
          <View style={styles.triggerCard}>
            <Text style={styles.triggerTitle}>A Moment to Check In</Text>
            <Text style={styles.triggerText}>
              I noticed you might be feeling down. Would you like to start a private well-being check-in?
            </Text>
            <TouchableOpacity style={styles.triggerButton}>
              <Text style={{ color: '#7C2D12', fontWeight: '600' }}>Start Check-In</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickReplyContainer}>
          {quickReplies.map((reply) => (
            <TouchableOpacity key={reply} style={styles.quickReplyButton} onPress={() => handleSend(reply)}>
              <Text style={{ color: '#59784D' }}>{reply}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => handleSend(inputText)}
          />
          <TouchableOpacity style={styles.micButton}>
            <MicIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={() => handleSend(inputText)}>
            <SendIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// --- Styles ---
const moodColors = {
  calm: { bg: '#E8F0E5', text: '#59784D' },
  anxious: { bg: '#FEF6E9', text: '#D97706' },
  tired: { bg: '#EBF4FF', text: '#3B82F6' },
  distressed: { bg: '#FEE2E2', text: '#DC2626' },
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: 30, paddingBottom: 35, },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#3C3C3C', marginHorizontal: 10 },
  moodIndicator: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginLeft: 'auto' },
  chatContainer: { flex: 1, padding: 15 },
  messageRow: { flexDirection: 'row', marginBottom: 12 },
  messageBubble: { padding: 12, borderRadius: 18, maxWidth: '75%', marginBottom: 10 },
  aiBubble: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0F0F0', borderTopLeftRadius: 4 },
  userBubble: { backgroundColor: '#A3B899', borderTopRightRadius: 4 },
  footer: { padding: 10, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  quickReplyContainer: { flexDirection: 'row', marginBottom: 10 },
  quickReplyButton: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#E8F0E5', borderWidth: 1, borderColor: '#D1DED7', borderRadius: 16, marginRight: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  textInput: { flex: 1, height: 44, paddingHorizontal: 15, backgroundColor: '#F0F0F0', borderRadius: 22, fontSize: 15 },
  micButton: { marginHorizontal: 5 },
  sendButton: { height: 44, width: 44, borderRadius: 22, backgroundColor: '#A3B899', alignItems: 'center', justifyContent: 'center' },
  triggerCard: { backgroundColor: '#FEF6E9', borderWidth: 1, borderColor: '#FAD6A5', borderRadius: 12, padding: 16, marginVertical: 10 },
  triggerTitle: { fontSize: 16, fontWeight: '600', color: '#D97706', marginBottom: 8 },
  triggerText: { fontSize: 14, color: '#555', lineHeight: 20 },
  triggerButton: { marginTop: 12, padding: 12, borderRadius: 8, backgroundColor: '#FAD6A5', alignItems: 'center' },
});

export default AIChatbotScreen;