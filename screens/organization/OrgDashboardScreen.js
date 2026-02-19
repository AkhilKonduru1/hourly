import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { mockPendingHours, mockOpportunities } from '../../data/mockData';
import { colors, spacing, radii, fonts } from '../../theme';

export default function OrgDashboardScreen({ navigation }) {
  const { user, logout } = useAuth();

  const totalOpportunities = 8;
  const activeVolunteers = 47;
  const pendingApprovals = mockPendingHours.length;
  const totalHoursLogged = 234;

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
            <View>
              <Text style={styles.greeting}>Welcome back</Text>
              <Text style={styles.orgName}>{user?.name}</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Glass Card */}
          <View style={styles.glassCard}>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalOpportunities}</Text>
                <Text style={styles.statLabel}>Posted</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{activeVolunteers}</Text>
                <Text style={styles.statLabel}>Volunteers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, styles.statAlert]}>
                  {pendingApprovals}
                </Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalHoursLogged}</Text>
                <Text style={styles.statLabel}>Hours</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('PostOpportunity')}
            >
              <View style={styles.actionLeft}>
                <View style={styles.actionDot} />
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Post New Opportunity</Text>
                  <Text style={styles.actionSubtitle}>Create a volunteer event</Text>
                </View>
              </View>
              <View style={styles.actionArrowContainer}>
                <Text style={styles.actionArrow}>›</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('ManageHours')}
            >
              <View style={styles.actionLeft}>
                <View style={[styles.actionDot, styles.actionDotPurple]} />
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Approve Hours</Text>
                  <Text style={styles.actionSubtitle}>
                    {pendingApprovals} pending approval
                  </Text>
                </View>
              </View>
              {pendingApprovals > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{pendingApprovals}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Reports')}
            >
              <View style={styles.actionLeft}>
                <View style={[styles.actionDot, styles.actionDotBlue]} />
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>View Reports</Text>
                  <Text style={styles.actionSubtitle}>Export data & analytics</Text>
                </View>
              </View>
              <View style={styles.actionArrowContainer}>
                <Text style={styles.actionArrow}>›</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionLeft}>
                <View style={[styles.actionDot, { backgroundColor: '#E8D5B7' }]} />
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Run Contest</Text>
                  <Text style={styles.actionSubtitle}>Engage your volunteers</Text>
                </View>
              </View>
              <View style={styles.actionArrowContainer}>
                <Text style={styles.actionArrow}>›</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Recent Opportunities */}
          <Text style={styles.sectionTitle}>Your Recent Opportunities</Text>
          <View style={styles.feedSection}>
            {mockOpportunities.slice(0, 3).map((opp) => (
              <View key={opp.id} style={styles.opportunityCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTag}>
                    <Text style={styles.cardTagText}>{opp.category}</Text>
                  </View>
                  {opp.featured && (
                    <View style={styles.featuredTag}>
                      <Text style={styles.featuredTagText}>⭐ Featured</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cardTitle}>{opp.title}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaText}>{opp.date}</Text>
                  <Text style={styles.cardMetaDot}>•</Text>
                  <Text style={styles.cardMetaText}>
                    {opp.totalSpots - opp.spotsAvailable}/{opp.totalSpots} filled
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  orgName: {
    fontFamily: fonts.serif,
    fontSize: 24,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgInput,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 18,
  },
  glassCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.bgCardGlass,
    borderRadius: radii.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 40,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: fonts.serif,
    fontSize: 24,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statAlert: {
    color: colors.accentPurple,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.textPrimary,
    paddingHorizontal: spacing.md,
    marginBottom: 12,
    marginTop: 8,
  },
  actionsContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  actionCard: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 1,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 14,
  },
  actionDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accentPink,
    opacity: 0.7,
  },
  actionDotPurple: {
    backgroundColor: colors.accentPurple,
    opacity: 0.3,
  },
  actionDotBlue: {
    backgroundColor: colors.accentBlue,
    opacity: 0.5,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: fonts.serif,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  actionArrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionArrow: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  badge: {
    backgroundColor: colors.accentPurple,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  feedSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  opportunityCard: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 20,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTag: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.sm,
  },
  cardTagText: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.textSecondary,
  },
  featuredTag: {
    backgroundColor: colors.accentPurple,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.sm,
  },
  featuredTagText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  cardMetaText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  cardMetaDot: {
    fontSize: 13,
    color: colors.textSecondary,
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
