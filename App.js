import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import OnboardingFlow from './components/OnboardingFlow';
import HomeDashboard from './components/HomeDashboard';
import AIChatbotScreen from './components/AIChatbotScreen';
import { NavigationContainer } from '@react-navigation/native';
import LearningHubScreen from './components/LearningHubScreen';
import PeerCommunityScreen from './components/PeerCommunityScreen';
import BookingScreen from './components/BookingScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <NavigationContainer>
      {isOnboarded ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeDashboard} />
          <Stack.Screen name="Chatbot" component={AIChatbotScreen} />
          <Stack.Screen name="Learning" component={LearningHubScreen} />
          <Stack.Screen name="Community" component={PeerCommunityScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
        </Stack.Navigator>
      ) : (
        <SafeAreaView style={styles.container}>
          <OnboardingFlow onFinish={() => setIsOnboarded(true)} />
        </SafeAreaView>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});