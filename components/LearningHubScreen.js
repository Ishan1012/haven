import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const SkillUnlockedIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 24 24" fill="#A3B899" stroke="#FFFFFF" strokeWidth="1">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SkillLockedIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="#E5E7EB" />
  </Svg>
);

const OfflineIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17.2 20l-3.4-3.4" />
    <Path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
    <Path d="M12 12a8 8 0 00-8 8" />
    <Path d="M20 12a8 8 0 00-8-8" />
    <Path d="M4 4l16 16" />
  </Svg>
);

const BadgeIcon = ({ achieved }) => (
  <Svg width={40} height={40} viewBox="0 0 24 24" fill={achieved ? "#FAD6A5" : "#E5E7EB"} stroke={achieved ? "#D97706" : "#9CA3AF"} strokeWidth="1.5">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const modules = {
  mild: [
    { id: 'm1', title: 'Mindful Journaling', progress: 75, offline: true },
    { id: 'm2', title: 'Guided Meditation', progress: 40, offline: false },
  ],
  moderate: [
    { id: 'mod1', title: 'Cognitive Restructuring', progress: 60, offline: true },
    { id: 'mod2', title: 'Breathing Exercises', progress: 85, offline: true },
  ],
  severe: [
    { id: 's1', title: 'Preparing for Therapy', progress: 20, offline: true },
    { id: 's2', title: 'Connect with a Counselor', progress: 0, offline: false, isAction: true },
  ]
};

const achievements = [
  { id: 'a1', name: 'First Step', achieved: true },
  { id: 'a2', name: '7-Day Streak', achieved: true },
  { id: 'a3', name: 'Mindful Pro', achieved: false },
  { id: 'a4', name: 'Community Helper', achieved: false },
];

const LearningHubScreen = () => {
  const [severity, setSeverity] = useState('mild');
  const getVisibleModules = () => modules[severity] || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learning Hub</Text>
        </View>

        {/* --- Demo Controls --- */}
        <View style={styles.demoControls}>
          <Text style={styles.demoLabel}>Simulate User State:</Text>
          <View style={styles.demoButtonContainer}>
            {['mild', 'moderate', 'severe'].map(level => (
              <TouchableOpacity
                key={level}
                onPress={() => setSeverity(level)}
                style={severity === level ? styles.demoButtonActive : styles.demoButton}
              >
                <Text style={severity === level ? styles.demoButtonTextActive : styles.demoButtonText}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- Skill Tree --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Growth Path</Text>
          <View style={styles.skillTree}>
            <SkillUnlockedIcon />
            <View style={styles.skillConnector} />
            <SkillUnlockedIcon />
            <View style={styles.skillConnector} />
            <SkillLockedIcon />
            <View style={styles.skillConnector} />
            <SkillLockedIcon />
          </View>
        </View>

        {/* --- Adaptive Modules --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          {getVisibleModules().map(mod => (
            <View key={mod.id} style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleTitle}>{mod.title}</Text>
                {mod.offline && <OfflineIcon />}
              </View>
              {!mod.isAction ? (
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBarFill, { width: `${mod.progress}%` }]} />
                </View>
              ) : (
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Get Support Now</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* --- Achievements --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.statsContainer}>
            <Text style={styles.statItem}>🔥 <Text style={styles.statValue}>5</Text> Day Streak</Text>
            <Text style={styles.statItem}>🏆 <Text style={styles.statValue}>1250</Text> Points</Text>
          </View>
          <View style={styles.badgeContainer}>
            {achievements.map(badge => (
              <View key={badge.id} style={styles.badge}>
                <BadgeIcon achieved={badge.achieved} />
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBF9F6',
    paddingTop: 10
  },
  container: {
    padding: 20
  },
  header: {
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3C3C3C',
    textAlign: 'center'
  },
  section: {
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3C3C3C',
    marginBottom: 15
  },
  skillTree: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  skillConnector: {
    width: 30,
    height: 2,
    backgroundColor: '#E5E7EB'
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3C3C3C'
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A3B899'
  },
  actionButton: {
    backgroundColor: '#FAD6A5',
    borderRadius: 8,
    padding: 12,
    marginTop: 5
  },
  actionButtonText: {
    color: '#7C2D12',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  statItem: {
    backgroundColor: '#E8F0E5',
    color: '#59784D',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: '500'
  },
  statValue: {
    fontWeight: 'bold'
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 100
  },
  badge: {
    alignItems: 'center',
    padding: 5
  },
  badgeName: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    textAlign: 'center'
  },
  demoControls: {
    marginBottom: 25,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    width: 200
  },
  demoButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8
  },
  demoLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10
  },
  demoButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    marginVertical: 3
  },
  demoButtonActive: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#A3B899',
    borderRadius: 6,
    backgroundColor: '#E8F0E5'
  },
  demoButtonText: {
    color: '#3C3C3C'
  },
  demoButtonTextActive: {
    color: '#59784D',
    fontWeight: 'bold'
  },
});

export default LearningHubScreen;