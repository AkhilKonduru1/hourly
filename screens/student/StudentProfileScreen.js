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
import { colors, spacing, radii, fonts } from '../../theme';

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
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarInner} />
            </View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            {user?.isPremium && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>⭐ Premium</Text>
              </View>
            )}
          </View>

          {/* Stats Glass Card */}
          <View style={styles.glassCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{approvedHours}</Text>
                <Text style={styles.statLabel}>Total Hours</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{mockStudentHours.length}</Text>
                <Text style={styles.statLabel}>Events</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, styles.pendingNumber]}>
                  {pendingHours}
                </Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
            </View>
          </View>

          {/* Premium Upsell / Resume */}
          {!user?.isPremium ? (
            <TouchableOpacity
              style={styles.premiumCard}
              onPress={handleUpgradePremium}
            >
              <Text style={styles.premiumCardTitle}>⭐ Upgrade to Premium</Text>
              <Text style={styles.premiumCardDescription}>
                Get auto-generated resume, early access, and rewards
              </Text>
              <View style={styles.premiumCardButton}>
                <Text style={styles.premiumCardButtonText}>$4.99/month</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.resumeButton}
              onPress={handleDownloadResume}
            >
              <Text style={styles.resumeButtonText}>
                📄 Download Volunteer Resume
              </Text>
            </TouchableOpacity>
          )}

          {/* Recent Activity */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            {mockStudentHours.map((hour) => (
              <View key={hour.id} style={styles.activityCard}>
                <View style={styles.activityHeader}>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityTitle}>
                      {hour.opportunityTitle}
                    </Text>
                    <Text style={styles.activityOrg}>{hour.organization}</Text>
                  </View>
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
                <View style={styles.activityMeta}>
                  <Text style={styles.activityMetaText}>{hour.date}</Text>
                  <Text style={styles.activityMetaDot}>•</Text>
                  <Text style={styles.activityMetaText}>{hour.hours} hours</Text>
                  <Text style={styles.activityMetaDot}>•</Text>
                  <Text style={styles.activityMetaText}>
                    {hour.verificationMethod}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Settings */}
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsContainer}>
            {[
              '🔔 Notification Preferences',
              '🏆 My Achievements',
              '💳 Payment & Billing',
              'ℹ️ Help & Support',
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.settingItem}>
                <Text style={styles.settingText}>{item}</Text>
                <Text style={styles.settingArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgBody,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontFamily: fonts.serif,
    fontSize: 32,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
    marginBottom: 16,
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E8E8',
  },
  name: {
    fontFamily: fonts.serif,
    fontSize: 24,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  premiumBadge: {
    backgroundColor: colors.accentPurple,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radii.sm,
    marginTop: 10,
  },
  premiumText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  glassCard: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.bgCardGlass,
    borderRadius: radii.lg,
    padding: 24,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 40,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  statNumber: {
    fontFamily: fonts.serif,
    fontSize: 28,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  pendingNumber: {
    color: colors.accentPurple,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  premiumCard: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.accentPurple,
    borderRadius: radii.md,
    padding: 20,
    marginBottom: spacing.md,
  },
  premiumCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  premiumCardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  premiumCardButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.sm,
  },
  premiumCardButtonText: {
    color: colors.accentPurple,
    fontWeight: '600',
    fontSize: 14,
  },
  resumeButton: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.accentBlack,
    padding: 18,
    borderRadius: radii.sm,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  resumeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.textPrimary,
    paddingHorizontal: spacing.md,
    marginBottom: 12,
    marginTop: 8,
  },
  activityContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  activityCard: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityInfo: {
    flex: 1,
    marginRight: 10,
  },
  activityTitle: {
    fontFamily: fonts.serif,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  activityOrg: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.sm,
  },
  statusApproved: {
    backgroundColor: 'rgba(74,124,89,0.1)',
  },
  statusPending: {
    backgroundColor: 'rgba(184,134,11,0.1)',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextApproved: {
    color: colors.statusApproved,
  },
  statusTextPending: {
    color: colors.statusPending,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activityMetaText: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  activityMetaDot: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  settingsContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  settingItem: {
    backgroundColor: colors.bgCard,
    padding: 18,
    borderRadius: radii.md,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  settingText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  settingArrow: {
    fontSize: 20,
    color: colors.textTertiary,
  },
  logoutButton: {
    marginHorizontal: spacing.md,
    backgroundColor: '#F2F2F2',
    padding: 18,
    borderRadius: radii.sm,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoutText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
});
