import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { mockStudentHours } from '../../data/mockData';

export default function StudentProfileScreen({ navigation }) {
  const { user, logout, upgradeToPremium } = useAuth();

  const approvedHours = mockStudentHours
    .filter((h) => h.status === 'approved')
    .reduce((sum, h) => sum + h.hours, 0);

  const pendingHours = mockStudentHours
    .filter((h) => h.status === 'pending')
    .reduce((sum, h) => sum + h.hours, 0);

  const handleUpgradePremium = () => {
    Alert.alert(
      'Upgrade to Premium! ⭐',
      'Get auto-generated volunteer resume, early access to limited spots, and local business rewards for just $4.99/month!',
      [
        {
          text: 'Upgrade Now',
          onPress: () => {
            upgradeToPremium();
            Alert.alert('Success!', 'Welcome to Hourly Premium! 🎉');
          },
        },
        { text: 'Maybe Later', style: 'cancel' },
      ]
    );
  };

  const handleDownloadResume = () => {
    Alert.alert(
      'Volunteer Resume Generated! 📄',
      'Your volunteer resume has been generated and is ready for download. Perfect for college applications!',
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Yes, Logout',
        onPress: logout,
        style: 'destructive',
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {user?.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>⭐ Premium Member</Text>
          </View>
        )}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{approvedHours}</Text>
          <Text style={styles.statLabel}>Total Hours</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{mockStudentHours.length}</Text>
          <Text style={styles.statLabel}>Events</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, styles.pendingNumber]}>{pendingHours}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {!user?.isPremium && (
        <TouchableOpacity style={styles.premiumCard} onPress={handleUpgradePremium}>
          <Text style={styles.premiumCardTitle}>⭐ Upgrade to Premium</Text>
          <Text style={styles.premiumCardDescription}>
            Get auto-generated resume, early access, and rewards
          </Text>
          <Text style={styles.premiumCardPrice}>$4.99/month</Text>
        </TouchableOpacity>
      )}

      {user?.isPremium && (
        <TouchableOpacity style={styles.resumeButton} onPress={handleDownloadResume}>
          <Text style={styles.resumeButtonText}>📄 Download Volunteer Resume</Text>
        </TouchableOpacity>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        {mockStudentHours.map((hour) => (
          <View key={hour.id} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle}>{hour.opportunityTitle}</Text>
              <View
                style={[
                  styles.statusBadge,
                  hour.status === 'approved'
                    ? styles.statusApproved
                    : styles.statusPending,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    hour.status === 'approved'
                      ? styles.statusTextApproved
                      : styles.statusTextPending,
                  ]}
                >
                  {hour.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                </Text>
              </View>
            </View>
            <Text style={styles.activityOrg}>{hour.organization}</Text>
            <View style={styles.activityFooter}>
              <Text style={styles.activityDate}>📅 {hour.date}</Text>
              <Text style={styles.activityHours}>⏱️ {hour.hours} hours</Text>
            </View>
            <Text style={styles.verification}>
              Verified by: {hour.verificationMethod}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🔔 Notification Preferences</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🏆 My Achievements</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>💳 Payment & Billing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>ℹ️ Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 30,
    paddingTop: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  avatar: {
    fontSize: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#E8F5E9',
  },
  premiumBadge: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 10,
  },
  premiumText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: -30,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  pendingNumber: {
    color: '#FFC107',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  premiumCard: {
    backgroundColor: '#FFC107',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  premiumCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  premiumCardDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
    opacity: 0.9,
  },
  premiumCardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  resumeButton: {
    backgroundColor: '#4CAF50',
    margin: 15,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  resumeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusApproved: {
    backgroundColor: '#E8F5E9',
  },
  statusPending: {
    backgroundColor: '#FFF9C4',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextApproved: {
    color: '#4CAF50',
  },
  statusTextPending: {
    color: '#F57C00',
  },
  activityOrg: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
  },
  activityHours: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  verification: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  settingItem: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF5722',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
