import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ShieldIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#A3B899" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Svg>
);

const PenIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </Svg>
);

const BadgeIcon = ({ achieved }) => (
  <Svg width={60} height={60} viewBox="0 0 24 24" fill={achieved ? "#FAD6A5" : "#E5E7EB"} stroke={achieved ? "#D97706" : "#9CA3AF"} strokeWidth={1.5}>
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const forums = [
  { id: 'f1', title: 'Daily Wins', description: 'Share small victories and positive moments.' },
  { id: 'f2', title: 'Exam Anxiety', description: 'Tips and support for managing study stress.' },
  { id: 'f3', title: 'Stress Relief Techniques', description: 'Discuss what works for you, from music to meditation.' },
];

const groups = {
  all: [
    { id: 'g1', title: 'Mindful Mornings', moderator: true, description: 'Start your day with intention and calm.' },
    { id: 'g2', title: 'Creative Expression Circle', moderator: false, description: 'Share art, writing, and music.' },
  ],
  mild: [{ id: 'rec1', title: 'Gratitude Group', moderator: true, description: 'A space to focus on the positive.' }],
  moderate: [{ id: 'rec2', title: 'Coping Skills Workshop', moderator: true, description: 'Learn and share practical strategies.' }],
  severe: [{ id: 'rec3', title: 'Guided Peer Support', moderator: true, description: 'Connect with others in a structured, safe space.' }],
};

const achievements = [
  { id: 'a1', name: 'Icebreaker', achieved: true },
  { id: 'a2', name: 'Encourager', achieved: true },
  { id: 'a3', name: '7-Day Helper', achieved: false },
  { id: 'a4', name: 'Community Pillar', achieved: false },
];

const PeerCommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('Forums');
  const [userSeverity] = useState('moderate');

  const renderContent = () => {
    switch (activeTab) {
      case 'Groups':
        return (
          <View>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
            {groups[userSeverity].map(item => <GroupCard key={item.id} item={item} />)}

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>All Groups</Text>
            {groups.all.map(item => <GroupCard key={item.id} item={item} />)}
          </View>
        );
      case 'My Activity':
        return (
          <View>
            <Text style={styles.sectionTitle}>Your Contributions</Text>
            <View style={styles.statsContainer}>
              <Text style={styles.statItem}>🔥 5 Day Streak</Text>
              <Text style={styles.statItem}>💬 12 Posts</Text>
            </View>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Your Badges</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgeContainer}>
              {achievements.map(badge => (
                <View key={badge.id} style={styles.badge}>
                  <BadgeIcon achieved={badge.achieved} />
                  <Text style={styles.badgeName}>{badge.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        );
      case 'Forums':
      default:
        return (
          <View>
            <Text style={styles.sectionTitle}>All Forums</Text>
            {forums.map(item => <ForumCard key={item.id} item={item} />)}
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Peer Community</Text>
        </View>

        <View style={styles.navContainer}>
          {['Forums', 'Groups', 'My Activity'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.navButton, activeTab === tab && styles.navButtonActive]}
            >
              <Text style={[styles.navButtonText, activeTab === tab && styles.navButtonTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderContent()}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <PenIcon />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const ForumCard = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{item.title}</Text>
    <Text style={styles.cardDescription}>{item.description}</Text>
  </View>
);

const GroupCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      {item.moderator && (
        <View style={styles.moderatedTag}>
          <ShieldIcon />
          <Text style={styles.moderatedTagText}>Moderated</Text>
        </View>
      )}
    </View>
    <Text style={styles.cardDescription}>{item.description}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF9F6', paddingTop: 15 },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  header: { marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#3C3C3C', textAlign: 'center' },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 25,
  },
  navButton: { flex: 1, paddingVertical: 10, borderRadius: 8 },
  navButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  navButtonText: { fontSize: 14, fontWeight: '500', color: '#555', textAlign: 'center' },
  navButtonTextActive: { color: '#A3B899', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#3C3C3C', marginBottom: 15 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: '500', color: '#3C3C3C', width: 150 },
  cardDescription: { fontSize: 14, color: '#555', marginTop: 4, lineHeight: 20 },
  moderatedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F0E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  moderatedTagText: { marginLeft: 6, fontSize: 12, color: '#59784D', fontWeight: '500' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statItem: {
    backgroundColor: '#E8F0E5',
    color: '#59784D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  badgeContainer: { paddingVertical: 10, flexDirection: 'row', gap: 20 },
  badge: { alignItems: 'center', width: 80 },
  badgeName: { fontSize: 12, color: '#555', marginTop: 5, textAlign: 'center' },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#A3B899',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default PeerCommunityScreen;