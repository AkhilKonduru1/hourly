import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, radii, fonts } from '../../theme';

export default function ReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const periods = ['This Week', 'This Month', 'This Year', 'All Time'];

  const stats = {
    totalHours: 234,
    totalVolunteers: 47,
    totalEvents: 8,
    avgAttendance: 12,
  };

  const topVolunteers = [
    { name: 'Emily Rodriguez', hours: 28, rank: 1 },
    { name: 'Michael Chen', hours: 24, rank: 2 },
    { name: 'Sarah Johnson', hours: 22, rank: 3 },
    { name: 'David Kim', hours: 20, rank: 4 },
    { name: 'Jessica Martinez', hours: 18, rank: 5 },
  ];

  const eventPerformance = [
    { event: 'Food Bank Sorting', volunteers: 15, hours: 45 },
    { event: 'Beach Cleanup', volunteers: 18, hours: 54 },
    { event: 'Senior Center Activities', volunteers: 8, hours: 24 },
    { event: 'Animal Shelter Care', volunteers: 12, hours: 48 },
  ];

  const handleExport = (format) => {
    Alert.alert(
      'Export Report',
      `Your ${selectedPeriod.toLowerCase()} report has been exported as ${format.toUpperCase()} and is ready for download.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Reports</Text>
          <Text style={styles.subtitle}>Track your impact and engagement</Text>
        </View>

        {/* Period filter tabs */}
        <View style={styles.periodContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.periodContent}
          >
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodChip,
                  selectedPeriod === period && styles.periodChipSelected,
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text
                  style={[
                    styles.periodText,
                    selectedPeriod === period && styles.periodTextSelected,
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Stats Glass Card */}
          <View style={styles.glassCard}>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.totalHours}</Text>
                <Text style={styles.statLabel}>Hours</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.totalVolunteers}</Text>
                <Text style={styles.statLabel}>Volunteers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.totalEvents}</Text>
                <Text style={styles.statLabel}>Events</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.avgAttendance}</Text>
                <Text style={styles.statLabel}>Avg</Text>
              </View>
            </View>
          </View>

          {/* Top Volunteers */}
          <Text style={styles.sectionTitle}>Top Volunteers</Text>
          <View style={styles.volunteersContainer}>
            {topVolunteers.map((volunteer) => (
              <View key={volunteer.rank} style={styles.volunteerCard}>
                <View style={styles.volunteerLeft}>
                  <View style={styles.volunteerRank}>
                    <Text style={styles.rankText}>#{volunteer.rank}</Text>
                  </View>
                  <View style={styles.volunteerInfo}>
                    <Text style={styles.volunteerName}>{volunteer.name}</Text>
                    <Text style={styles.volunteerHours}>
                      {volunteer.hours} hours
                    </Text>
                  </View>
                </View>
                {volunteer.rank <= 3 && (
                  <Text style={styles.medal}>
                    {volunteer.rank === 1
                      ? '🥇'
                      : volunteer.rank === 2
                      ? '🥈'
                      : '🥉'}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* Event Performance */}
          <Text style={styles.sectionTitle}>Event Performance</Text>
          <View style={styles.eventsContainer}>
            {eventPerformance.map((event, index) => (
              <View key={index} style={styles.eventCard}>
                <Text style={styles.eventName}>{event.event}</Text>
                <View style={styles.eventStats}>
                  <View style={styles.eventStat}>
                    <Text style={styles.eventStatValue}>{event.volunteers}</Text>
                    <Text style={styles.eventStatLabel}>Volunteers</Text>
                  </View>
                  <View style={styles.eventStat}>
                    <Text style={styles.eventStatValue}>{event.hours}</Text>
                    <Text style={styles.eventStatLabel}>Total Hours</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Export Options */}
          <Text style={styles.sectionTitle}>Export</Text>
          <View style={styles.exportContainer}>
            <TouchableOpacity
              style={styles.exportButton}
              onPress={() => handleExport('pdf')}
            >
              <View style={styles.exportLeft}>
                <View style={styles.exportDot} />
                <View style={styles.exportInfo}>
                  <Text style={styles.exportTitle}>Export as PDF</Text>
                  <Text style={styles.exportSubtitle}>
                    Formatted report for printing
                  </Text>
                </View>
              </View>
              <View style={styles.exportArrow}>
                <Text style={styles.exportArrowText}>›</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.exportButton}
              onPress={() => handleExport('csv')}
            >
              <View style={styles.exportLeft}>
                <View style={[styles.exportDot, styles.exportDotBlue]} />
                <View style={styles.exportInfo}>
                  <Text style={styles.exportTitle}>Export as CSV</Text>
                  <Text style={styles.exportSubtitle}>
                    Raw data for Excel/Sheets
                  </Text>
                </View>
              </View>
              <View style={styles.exportArrow}>
                <Text style={styles.exportArrowText}>›</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.exportButton}
              onPress={() =>
                Alert.alert(
                  'Email Report',
                  'Report will be sent to your registered email address.'
                )
              }
            >
              <View style={styles.exportLeft}>
                <View style={[styles.exportDot, styles.exportDotPurple]} />
                <View style={styles.exportInfo}>
                  <Text style={styles.exportTitle}>Email Report</Text>
                  <Text style={styles.exportSubtitle}>
                    Send summary to your inbox
                  </Text>
                </View>
              </View>
              <View style={styles.exportArrow}>
                <Text style={styles.exportArrowText}>›</Text>
              </View>
            </TouchableOpacity>
          </View>
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
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 28,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  periodContainer: {
    paddingVertical: 12,
  },
  periodContent: {
    paddingHorizontal: spacing.md,
  },
  periodChip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: radii.sm,
    backgroundColor: colors.bgInput,
    marginRight: 8,
  },
  periodChipSelected: {
    backgroundColor: colors.accentBlack,
  },
  periodText: {
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 13,
  },
  periodTextSelected: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
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
  volunteersContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  volunteerCard: {
    backgroundColor: colors.bgCard,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: radii.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 1,
  },
  volunteerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  volunteerRank: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(90,75,117,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rankText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.accentPurple,
  },
  volunteerInfo: {
    flex: 1,
  },
  volunteerName: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  volunteerHours: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  medal: {
    fontSize: 24,
  },
  eventsContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  eventCard: {
    backgroundColor: colors.bgCard,
    padding: 16,
    borderRadius: radii.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 1,
  },
  eventName: {
    fontFamily: fonts.serif,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  eventStats: {
    flexDirection: 'row',
    gap: 10,
  },
  eventStat: {
    flex: 1,
    backgroundColor: colors.bgBody,
    padding: 12,
    borderRadius: 16,
  },
  eventStatValue: {
    fontFamily: fonts.serif,
    fontSize: 20,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  eventStatLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  exportContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  exportButton: {
    backgroundColor: colors.bgCard,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: radii.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 1,
  },
  exportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 14,
  },
  exportDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentPink,
    opacity: 0.7,
  },
  exportDotBlue: {
    backgroundColor: colors.accentBlue,
  },
  exportDotPurple: {
    backgroundColor: colors.accentPurple,
    opacity: 0.4,
  },
  exportInfo: {
    flex: 1,
  },
  exportTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  exportSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  exportArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportArrowText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
});
