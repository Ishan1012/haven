import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Polyline, Text as SvgText } from 'react-native-svg';

const JournalIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </Svg>
);

const TrophyIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <Path d="M8 11l2 2 4-4" />
  </Svg>
);

const BadgeIcon = ({ achieved, color, name }) => (
  <View style={styles.badgeItem}>
    <Svg width={60} height={60} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={10} fill={achieved ? color : "#E5E7EB"} />
      <SvgText
        x="12"
        y="15"
        fontSize="6"
        fill={achieved ? "#FFFFFF" : "#9CA3AF"}
        textAnchor="middle"
        fontWeight="bold"
      >
        {name.substring(0, 3)}
      </SvgText>
    </Svg>
    <Text style={styles.badgeName}>{name}</Text>
  </View>
);

const moodData = [
  { x: 0, y: 7 }, { x: 50, y: 5 }, { x: 100, y: 8 },
  { x: 150, y: 6 }, { x: 200, y: 7 }, { x: 250, y: 9 }, { x: 300, y: 8 }
];
const screeningData = [
  { label: 'PHQ-9', value: 40 },
  { label: 'GAD-7', value: 60 },
  { label: 'Stress', value: 80 }
];
const journalThemes = [
  { text: 'Anxious', size: 20 },
  { text: 'Work', size: 24 },
  { text: 'Tired', size: 16 },
  { text: 'Hopeful', size: 18 }
];
const achievements = [
  { name: '5 Journals', achieved: true, color: '#A3B899' },
  { name: '7-Day Streak', achieved: true, color: '#A9C4D4' },
  { name: 'First Check-in', achieved: true, color: '#FAD6A5' },
  { name: 'Mindful Pro', achieved: false }
];

const MoodChart = ({ data }) => {
  const points = data.map(p => `${p.x},${100 - p.y * 10}`).join(' ');
  return (
    <Svg height="120" width="100%">
      <Polyline points={points} fill="none" stroke="#A9C4D4" strokeWidth="3" />
      {data.map(p => (
        <Circle key={p.x} cx={p.x} cy={100 - p.y * 10} r="4" fill="#A9C4D4" stroke="#FBF9F6" strokeWidth="2" />
      ))}
    </Svg>
  );
};

const ScoreChart = ({ data }) => (
  <View style={styles.scoreChartContainer}>
    {data.map((item, index) => (
      <View key={index} style={styles.scoreBarItem}>
        <View style={styles.scoreBarBackground}>
          <View style={[styles.scoreBarFill, { height: `${item.value}%` }]} />
        </View>
        <Text style={styles.scoreBarLabel}>{item.label}</Text>
      </View>
    ))}
  </View>
);

const GrowthDashboardScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Gamification */}
        <View style={styles.gamificationContainer}>
          <View style={styles.streakCounter}>
            <Text style={styles.streakValue}>🔥 14</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </View>
          <View style={styles.milestoneProgress}>
            <Text style={styles.milestoneLabel}>Next: '30-Day Streak'</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: '45%' }]} />
            </View>
          </View>
        </View>

        {/* Mood Trend */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mood Trend (Last 7 Days)</Text>
          <MoodChart data={moodData} />
        </View>

        {/* Screening Scores */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Screening Scores</Text>
          <ScoreChart data={screeningData} />
        </View>

        {/* Insights */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personalized Insight</Text>
          <Text style={styles.insightText}>
            We've noticed your mood is often higher on days you log a journal entry in the evening. Great job building a healthy habit!
          </Text>
        </View>

        {/* Journaling Insights */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Journal Themes</Text>
          <View style={styles.wordCloud}>
            {journalThemes.map(item => (
              <Text key={item.text} style={{ fontSize: item.size, color: '#555', padding: 5, fontWeight: '500' }}>
                {item.text}
              </Text>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {achievements.map(item => <BadgeIcon key={item.name} {...item} />)}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#3C3C3C', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 15, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#3C3C3C', marginBottom: 15 },
  gamificationContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#E8F0E5', borderRadius: 16, padding: 15, marginBottom: 15 },
  streakCounter: { alignItems: 'center' },
  streakValue: { fontSize: 24, fontWeight: 'bold', color: '#59784D' },
  streakLabel: { fontSize: 12, color: '#59784D' },
  milestoneProgress: { flex: 1, marginLeft: 15 },
  milestoneLabel: { fontSize: 12, color: '#59784D', marginBottom: 6 },
  progressBarContainer: { height: 8, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 4 },
  progressBarFill: { height: '100%', backgroundColor: '#FFFFFF', borderRadius: 4 },
  insightText: { fontSize: 15, color: '#555', lineHeight: 22 },
  scoreChartContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 25, alignItems: 'flex-end', height: 100 },
  scoreBarItem: { alignItems: 'center' },
  scoreBarBackground: { width: 30, height: 100, backgroundColor: '#F0F0F0', borderRadius: 6, justifyContent: 'flex-end' },
  scoreBarFill: { width: '100%', backgroundColor: '#A3B899', borderRadius: 6 },
  scoreBarLabel: { fontSize: 12, color: '#555', marginTop: 8 },
  wordCloud: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  badgeItem: { alignItems: 'center', marginRight: 15 },
  badgeName: { fontSize: 12, color: '#555', marginTop: 5 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#F0F0F0', padding: 12, justifyContent: 'space-around' },
  navButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#A3B899', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25 },
  navButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginLeft: 8 }
});

export default GrowthDashboardScreen;