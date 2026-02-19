import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { mockPendingHours, mockOpportunities } from '../../data/mockData';

const { width } = Dimensions.get('window');

export default function OrgDashboardScreen({ navigation }) {
  const { user, logout } = useAuth();

  const totalOpportunities = 8;
  const activeVolunteers = 47;
  const pendingApprovals = mockPendingHours.length;
  const totalHoursLogged = 234;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back! 👋</Text>
          <Text style={styles.orgName}>{user?.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            /* Settings would go here */
          }}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📋</Text>
          <Text style={styles.statNumber}>{totalOpportunities}</Text>
          <Text style={styles.statLabel}>Posted Events</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>👥</Text>
          <Text style={styles.statNumber}>{activeVolunteers}</Text>
          <Text style={styles.statLabel}>Active Volunteers</Text>
        </View>

        <View style={[styles.statCard, styles.statCardAlert]}>
          <Text style={styles.statIcon}>⏳</Text>
          <Text style={[styles.statNumber, styles.statNumberAlert]}>
            {pendingApprovals}
          </Text>
          <Text style={styles.statLabel}>Pending Approvals</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>⏱️</Text>
          <Text style={styles.statNumber}>{totalHoursLogged}</Text>
          <Text style={styles.statLabel}>Hours Logged</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('PostOpportunity')}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionEmoji}>➕</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Post New Opportunity</Text>
            <Text style={styles.actionSubtitle}>Create a volunteer event</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, styles.actionCardAlert]}
          onPress={() => navigation.navigate('ManageHours')}
        >
          <View style={[styles.actionIcon, styles.actionIconAlert]}>
            <Text style={styles.actionEmoji}>✓</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Approve Hours</Text>
            <Text style={styles.actionSubtitle}>
              {pendingApprovals} pending approval
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{pendingApprovals}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Reports')}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionEmoji}>📊</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>View Reports</Text>
            <Text style={styles.actionSubtitle}>Export data & analytics</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionIcon}>
            <Text style={styles.actionEmoji}>🏆</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Run Contest</Text>
            <Text style={styles.actionSubtitle}>Engage your volunteers</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Recent Opportunities</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {mockOpportunities.slice(0, 3).map((opp) => (
          <View key={opp.id} style={styles.oppCard}>
            <View style={styles.oppHeader}>
              <Text style={styles.oppTitle}>{opp.title}</Text>
              {opp.featured && (
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredText}>⭐ Featured</Text>
                </View>
              )}
            </View>
            <Text style={styles.oppDate}>📅 {opp.date}</Text>
            <View style={styles.oppFooter}>
              <Text style={styles.oppSpots}>
                {opp.totalSpots - opp.spotsAvailable}/{opp.totalSpots} filled
              </Text>
              <Text style={styles.oppHours}>⏱️ {opp.duration} hrs</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#E3F2FD',
  },
  orgName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    width: (width - 40) / 2,
    margin: 5,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardAlert: {
    borderWidth: 2,
    borderColor: '#FFC107',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  statNumberAlert: {
    color: '#FFC107',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  quickActions: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionCardAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  actionIconAlert: {
    backgroundColor: '#FFF9C4',
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  actionArrow: {
    fontSize: 28,
    color: '#ccc',
  },
  badge: {
    backgroundColor: '#FFC107',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAll: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  oppCard: {
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
  oppHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  oppTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  featuredBadge: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  featuredText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  oppDate: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  oppFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oppSpots: {
    fontSize: 13,
    color: '#2196F3',
    fontWeight: '500',
  },
  oppHours: {
    fontSize: 13,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#FF5722',
    margin: 15,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
