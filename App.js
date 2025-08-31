import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import OnboardingFlow from './components/OnboardingFlow';
import HomeDashboard from './components/HomeDashboard';
import AIChatbotScreen from './components/AIChatbotScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LearningHubScreen from './components/LearningHubScreen';
import PeerCommunityScreen from './components/PeerCommunityScreen';
import BookingScreen from './components/BookingScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {isOnboarded ? (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeDashboard} />
            <Stack.Screen name="Chatbot" component={AIChatbotScreen} />
            <Stack.Screen name="Learning" component={LearningHubScreen} />
            <Stack.Screen name="Community" component={PeerCommunityScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <OnboardingFlow onFinish={() => setIsOnboarded(true)} />
      )} 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
