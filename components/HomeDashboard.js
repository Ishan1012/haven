import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import GrowthDashboardScreen from './GrowthDashboardScreen';

const { width } = Dimensions.get('window');

const ChatbotIcon = () => (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#3C3C3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Svg>
);

const CommunityIcon = () => (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#3C3C3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <Circle cx="9" cy="7" r="4" />
        <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Svg>
);

const JournalIcon = () => (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#3C3C3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </Svg>
);

const HomeDashboard = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={styles.header}>Good Morning</Text>

                <View style={[styles.card, styles.safetyTriggerCard]}>
                    <Text style={styles.cardTitle}>It's okay to not be okay.</Text>
                    <Text style={styles.cardSubtext}>
                        It seems like you're going through a tough time. Would you like to check in with a few questions to understand your feelings better?
                    </Text>
                    <TouchableOpacity style={styles.safetyTriggerButton} onPress={() => navigation.navigate('Learning')}>
                        <Text style={styles.safetyTriggerButtonText}>Start Deeper Check-In</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Daily Check-In</Text>
                    <Text style={styles.cardSubtext}>How are you feeling right now?</Text>
                    <View style={styles.moodSelector}>
                        {['😊', '🙂', '😐', '😔', '😠'].map((emoji) => (
                            <TouchableOpacity key={emoji} style={styles.moodButton}>
                                <Text style={styles.moodEmoji}>{emoji}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.shortcutsContainer}>
                    <TouchableOpacity style={styles.shortcut} onPress={() => navigation.navigate('Chatbot')}>
                        <ChatbotIcon />
                        <Text style={styles.shortcutText}>Chatbot</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shortcut} onPress={() => navigation.navigate('Community')}>
                        <CommunityIcon />
                        <Text style={styles.shortcutText}>Community</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shortcut} onPress={() => navigation.navigate('Booking')}>
                        <JournalIcon />
                        <Text style={styles.shortcutText}>Journaling</Text>
                    </TouchableOpacity>
                </View>
                <GrowthDashboardScreen />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 10,
    },
    container: {
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#3C3C3C',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#3C3C3C',
        marginBottom: 8,
    },
    cardSubtext: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    moodSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    moodButton: {
        padding: 8,
    },
    moodEmoji: {
        fontSize: 28,
    },
    shortcutsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    shortcut: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 15,
        marginHorizontal: 5,
        elevation: 2,
    },
    shortcutText: {
        marginTop: 8,
        fontSize: 10.8,
        fontWeight: '500',
        color: '#3C3C3C',
    },
    safetyTriggerCard: {
        backgroundColor: '#FEF6E9',
        borderWidth: 1,
        borderColor: '#FAD6A5',
    },
    safetyTriggerButton: {
        backgroundColor: '#A3B899',
        padding: 12,
        borderRadius: 12,
        marginTop: 15,
    },
    safetyTriggerButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default HomeDashboard;