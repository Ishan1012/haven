import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Expo supports this out of the box

// --- Mock Data ---
const counselors = [
  { id: 'c1', name: 'Dr. Anya Sharma', specialty: 'Stress & Anxiety' },
  { id: 'c2', name: 'Rohan Verma', specialty: 'Burnout & Motivation' },
];
const availableSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
const userSummary = {
  moodTrend: 'Generally stable, with dips in evenings.',
  recentThemes: 'Work stress, feeling tired.',
  activeTools: 'Journaling, Meditation.',
};

const BookingScreen = () => {
  const [activeTab, setActiveTab] = useState('Appointments');
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userSeverity] = useState('moderate'); // Simulated: mild, moderate, severe

  const handleBooking = (slot) => {
    setSelectedSlot(slot);
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Book a Session</Text>

        {userSeverity !== 'mild' && (
          <View style={styles.triggerBanner}>
            <Text style={styles.triggerText}>
              We've noticed you might be going through a tough time. Immediate support is available.
            </Text>
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Appointments' && styles.tabButtonActive]}
            onPress={() => setActiveTab('Appointments')}
          >
            <Text style={[styles.tabText, activeTab === 'Appointments' && styles.tabTextActive]}>
              Appointments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Helpline' && styles.tabButtonActive]}
            onPress={() => setActiveTab('Helpline')}
          >
            <Text style={[styles.tabText, activeTab === 'Helpline' && styles.tabTextActive]}>
              24x7 Helpline
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'Appointments' ? (
          counselors.map((counselor) => (
            <View key={counselor.id} style={styles.card}>
              <View style={styles.counselorHeader}>
                <Icon name="person-circle-outline" size={40} color="#9CA3AF" />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.counselorName}>{counselor.name}</Text>
                  <Text style={styles.counselorSpecialty}>{counselor.specialty}</Text>
                </View>
              </View>

              <Text style={styles.slotsTitle}>Available Slots:</Text>
              <View style={styles.slotsContainer}>
                {availableSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot}
                    style={styles.slotButton}
                    onPress={() => handleBooking(slot)}
                  >
                    <Text style={styles.slotButtonText}>{slot}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Urgent Support Helpline</Text>
            <Text style={styles.helplineText}>
              If you are in distress or need to talk to someone immediately, our 24x7 helpline is
              always available. Your conversation is confidential and secure.
            </Text>
            <TouchableOpacity style={styles.primaryButton}>
              <Icon name="call-outline" size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>Call Helpline Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="call" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Booking Confirmed!</Text>
            <Text style={styles.modalText}>Your session for {selectedSlot} is booked.</Text>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Anonymized Summary for Counselor</Text>
              <Text style={styles.summaryText}>
                <Text style={{ fontWeight: '600' }}>Mood Trend: </Text>
                {userSummary.moodTrend}
              </Text>
              <Text style={styles.summaryText}>
                <Text style={{ fontWeight: '600' }}>Recent Themes: </Text>
                {userSummary.recentThemes}
              </Text>
              <Text style={styles.summaryText}>
                <Text style={{ fontWeight: '600' }}>Active Tools: </Text>
                {userSummary.activeTools}
              </Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => setShowModal(false)}>
              <Text style={styles.primaryButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF9F6' },
  container: { padding: 20, paddingBottom: 100 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#3C3C3C', textAlign: 'center', marginVertical: 20 },

  triggerBanner: { backgroundColor: '#FAD6A5', borderRadius: 12, padding: 15, marginBottom: 20, borderWidth: 1, borderColor: '#D97706' },
  triggerText: { color: '#92400E', textAlign: 'center' },

  tabContainer: { flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 12, padding: 4, marginBottom: 25 },
  tabButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  tabButtonActive: { backgroundColor: '#FFFFFF', elevation: 3 },
  tabText: { fontSize: 14, fontWeight: '500', color: '#555' },
  tabTextActive: { color: '#A3B899', fontWeight: 'bold' },

  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 20, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15, color: '#3C3C3C' },

  counselorHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  counselorName: { fontSize: 16, fontWeight: '600', color: '#3C3C3C' },
  counselorSpecialty: { fontSize: 14, color: '#555' },

  slotsTitle: { fontSize: 14, fontWeight: '500', color: '#555', marginBottom: 10 },
  slotsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  slotButton: { backgroundColor: '#E8F0E5', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, margin: 5 },
  slotButtonText: { color: '#59784D', fontSize: 14, fontWeight: '500' },

  helplineText: { fontSize: 15, color: '#555', lineHeight: 20, marginBottom: 20 },
  primaryButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#A3B899', borderRadius: 10, paddingVertical: 14, marginTop: 10 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },

  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#A3B899', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', elevation: 6 },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 16, padding: 25, width: '85%' },
  closeButton: { position: 'absolute', top: 10, right: 10 },

  modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#3C3C3C' },
  modalText: { textAlign: 'center', color: '#555', marginBottom: 20 },

  summaryCard: { backgroundColor: '#F9FAFB', borderRadius: 8, padding: 15, marginBottom: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  summaryTitle: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#3C3C3C' },
  summaryText: { fontSize: 14, color: '#555', marginBottom: 6 },
});

export default BookingScreen;