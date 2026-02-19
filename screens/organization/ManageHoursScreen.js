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
import { colors, spacing, radii, fonts } from '../../theme';

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
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Approve Hours</Text>
          <Text style={styles.subtitle}>
            {hours.length} pending approval{hours.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
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
                <View style={styles.cardTop}>
                  <View style={styles.studentRow}>
                    <View style={styles.studentAvatar}>
                      <Text style={styles.studentAvatarText}>
                        {hour.studentName.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.studentInfo}>
                      <Text style={styles.studentName}>{hour.studentName}</Text>
                      <Text style={styles.opportunityTitle}>
                        {hour.opportunityTitle}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.detailsCard}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date</Text>
                    <Text style={styles.detailValue}>{hour.date}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Hours</Text>
                    <Text style={styles.detailValue}>{hour.hours} hours</Text>
                  </View>
                  <View style={[styles.detailRow, styles.detailRowLast]}>
                    <Text style={styles.detailLabel}>Verified by</Text>
                    <Text style={styles.detailValue}>
                      {hour.verificationMethod}
                    </Text>
                  </View>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleReject(hour.id)}
                  >
                    <Text style={styles.rejectButtonText}>Reject</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.approveButton}
                    onPress={() => handleApprove(hour.id)}
                  >
                    <Text style={styles.approveButtonText}>Approve</Text>
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
    paddingBottom: spacing.sm,
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
  list: {
    flex: 1,
  },
  listContent: {
    padding: spacing.md,
    paddingTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 48,
    color: colors.accentPurple,
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 20,
    elevation: 2,
  },
  cardTop: {
    marginBottom: 16,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accentPurple,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  studentAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontFamily: fonts.serif,
    fontSize: 18,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  opportunityTitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  detailsCard: {
    backgroundColor: colors.bgBody,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailRowLast: {
    marginBottom: 0,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingVertical: 14,
    borderRadius: radii.sm,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  approveButton: {
    flex: 1,
    backgroundColor: colors.accentBlack,
    paddingVertical: 14,
    borderRadius: radii.sm,
    alignItems: 'center',
  },
  approveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bulkApproveButton: {
    backgroundColor: colors.accentPurple,
    padding: 18,
    borderRadius: radii.sm,
    alignItems: 'center',
  },
  bulkApproveText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
