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
import { mockPendingHours } from '../../data/mockData';

export default function ManageHoursScreen() {
  const [hours, setHours] = useState(mockPendingHours);

  const handleApprove = (hourId) => {
    Alert.alert(
      'Approve Hours',
      'Confirm that these volunteer hours should be approved?',
      [
        {
          text: 'Approve',
          onPress: () => {
            setHours(hours.filter((h) => h.id !== hourId));
            Alert.alert(
              'Success!',
              'Hours have been approved and added to student record.'
            );
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleReject = (hourId) => {
    Alert.alert('Reject Hours', 'Please provide a reason:', [
      {
        text: 'Did not attend',
        onPress: () => {
          setHours(hours.filter((h) => h.id !== hourId));
          Alert.alert('Hours Rejected', 'Student has been notified.');
        },
      },
      {
        text: 'Incomplete work',
        onPress: () => {
          setHours(hours.filter((h) => h.id !== hourId));
          Alert.alert('Hours Rejected', 'Student has been notified.');
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Approve Volunteer Hours</Text>
        <Text style={styles.subtitle}>
          {hours.length} pending approval{hours.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView style={styles.list}>
        {hours.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyTitle}>All Caught Up!</Text>
            <Text style={styles.emptyText}>
              No pending hours to approve at this time.
            </Text>
          </View>
        ) : (
          hours.map((hour) => (
            <View key={hour.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentIcon}>👤</Text>
                  <View>
                    <Text style={styles.studentName}>{hour.studentName}</Text>
                    <Text style={styles.opportunityTitle}>
                      {hour.opportunityTitle}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📅 Date:</Text>
                  <Text style={styles.detailValue}>{hour.date}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>⏱️ Hours:</Text>
                  <Text style={styles.detailValue}>{hour.hours} hours</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>✓ Verified by:</Text>
                  <Text style={styles.detailValue}>{hour.verificationMethod}</Text>
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() => handleReject(hour.id)}
                >
                  <Text style={styles.rejectButtonText}>✕ Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.approveButton}
                  onPress={() => handleApprove(hour.id)}
                >
                  <Text style={styles.approveButtonText}>✓ Approve</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {hours.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.bulkApproveButton}
            onPress={() => {
              Alert.alert(
                'Bulk Approve',
                `Approve all ${hours.length} pending hours?`,
                [
                  {
                    text: 'Approve All',
                    onPress: () => {
                      setHours([]);
                      Alert.alert(
                        'Success!',
                        `All ${hours.length} hour submissions approved.`
                      );
                    },
                  },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }}
          >
            <Text style={styles.bulkApproveText}>
              Approve All ({hours.length})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  list: {
    flex: 1,
    padding: 15,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 15,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  opportunityTitle: {
    fontSize: 14,
    color: '#666',
  },
  cardDetails: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF5722',
    marginRight: 10,
  },
  rejectButtonText: {
    color: '#FF5722',
    fontSize: 16,
    fontWeight: 'bold',
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  approveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  bulkApproveButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  bulkApproveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
