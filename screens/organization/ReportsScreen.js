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
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports & Analytics</Text>
        <Text style={styles.subtitle}>Track your impact and engagement</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.periodScroll}
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

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⏱️</Text>
            <Text style={styles.statNumber}>{stats.totalHours}</Text>
            <Text style={styles.statLabel}>Total Hours</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>👥</Text>
            <Text style={styles.statNumber}>{stats.totalVolunteers}</Text>
            <Text style={styles.statLabel}>Volunteers</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📋</Text>
            <Text style={styles.statNumber}>{stats.totalEvents}</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={styles.statNumber}>{stats.avgAttendance}</Text>
            <Text style={styles.statLabel}>Avg Attendance</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Top Volunteers</Text>
          {topVolunteers.map((volunteer) => (
            <View key={volunteer.rank} style={styles.volunteerCard}>
              <View style={styles.volunteerRank}>
                <Text style={styles.rankNumber}>#{volunteer.rank}</Text>
              </View>
              <View style={styles.volunteerInfo}>
                <Text style={styles.volunteerName}>{volunteer.name}</Text>
                <Text style={styles.volunteerHours}>{volunteer.hours} hours</Text>
              </View>
              {volunteer.rank <= 3 && (
                <Text style={styles.medal}>
                  {volunteer.rank === 1 ? '🥇' : volunteer.rank === 2 ? '🥈' : '🥉'}
                </Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Event Performance</Text>
          {eventPerformance.map((event, index) => (
            <View key={index} style={styles.eventCard}>
              <Text style={styles.eventName}>{event.event}</Text>
              <View style={styles.eventStats}>
                <View style={styles.eventStat}>
                  <Text style={styles.eventStatLabel}>Volunteers</Text>
                  <Text style={styles.eventStatValue}>{event.volunteers}</Text>
                </View>
                <View style={styles.eventStat}>
                  <Text style={styles.eventStatLabel}>Total Hours</Text>
                  <Text style={styles.eventStatValue}>{event.hours}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📥 Export Options</Text>

          <TouchableOpacity
            style={styles.exportButton}
            onPress={() => handleExport('pdf')}
          >
            <Text style={styles.exportIcon}>📄</Text>
            <View style={styles.exportInfo}>
              <Text style={styles.exportTitle}>Export as PDF</Text>
              <Text style={styles.exportSubtitle}>
                Formatted report for printing
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.exportButton}
            onPress={() => handleExport('csv')}
          >
            <Text style={styles.exportIcon}>📊</Text>
            <View style={styles.exportInfo}>
              <Text style={styles.exportTitle}>Export as CSV</Text>
              <Text style={styles.exportSubtitle}>
                Raw data for Excel/Sheets
              </Text>
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
            <Text style={styles.exportIcon}>📧</Text>
            <View style={styles.exportInfo}>
              <Text style={styles.exportTitle}>Email Report</Text>
              <Text style={styles.exportSubtitle}>
                Send summary to your inbox
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  periodScroll: {
    backgroundColor: '#fff',
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  periodContent: {
    padding: 15,
  },
  periodChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  periodChipSelected: {
    backgroundColor: '#2196F3',
  },
  periodText: {
    color: '#666',
    fontWeight: '600',
  },
  periodTextSelected: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    width: '48%',
    margin: '1%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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
  volunteerCard: {
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
  volunteerRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  volunteerInfo: {
    flex: 1,
  },
  volunteerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  volunteerHours: {
    fontSize: 14,
    color: '#666',
  },
  medal: {
    fontSize: 28,
  },
  eventCard: {
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
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  eventStats: {
    flexDirection: 'row',
  },
  eventStat: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  eventStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  eventStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  exportButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  exportIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  exportInfo: {
    flex: 1,
  },
  exportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  exportSubtitle: {
    fontSize: 13,
    color: '#666',
  },
});
