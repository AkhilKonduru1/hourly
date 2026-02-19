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
import MockMap, { Marker } from '../../components/MockMap';
import { colors, spacing, radii, fonts } from '../../theme';

export default function OpportunityDetailsScreen({ route, navigation }) {
  const { opportunity } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookSpot = () => {
    Alert.alert(
      'Booking Confirmed! 🎉',
      `You're registered for "${opportunity.title}" on ${opportunity.date}. We'll send you a reminder!`,
      [
        {
          text: 'View My Bookings',
          onPress: () => navigation.navigate('StudentProfile'),
        },
        { text: 'OK', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Card Tag & Bookmark */}
          <View style={styles.topRow}>
            <View style={styles.cardTag}>
              <Text style={styles.cardTagText}>{opportunity.category}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsBookmarked(!isBookmarked)}
              style={styles.bookmarkButton}
            >
              <Text style={styles.bookmarkIcon}>
                {isBookmarked ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.title}>{opportunity.title}</Text>
          <Text style={styles.organization}>{opportunity.organization}</Text>

          {opportunity.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ Verified Organization</Text>
            </View>
          )}

          {/* Details Glass Card */}
          <View style={styles.glassCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{opportunity.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailValue}>{opportunity.time}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>{opportunity.duration} hrs</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Spots Left</Text>
                <Text
                  style={[
                    styles.detailValue,
                    opportunity.spotsAvailable < 5 && styles.lowSpots,
                  ]}
                >
                  {opportunity.spotsAvailable}
                </Text>
              </View>
            </View>
          </View>

          {/* About */}
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.sectionCard}>
            <Text style={styles.description}>{opportunity.description}</Text>
          </View>

          {/* Location */}
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.sectionCard}>
            <Text style={styles.address}>{opportunity.address}</Text>
            <MockMap
              style={styles.map}
              region={{
                ...opportunity.coordinates,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={opportunity.coordinates}
                title={opportunity.location}
              />
            </MockMap>
          </View>

          {/* What to Bring */}
          <Text style={styles.sectionTitle}>What to Bring</Text>
          <View style={styles.sectionCard}>
            <Text style={styles.bulletPoint}>• Comfortable clothes and shoes</Text>
            <Text style={styles.bulletPoint}>• Water bottle</Text>
            <Text style={styles.bulletPoint}>• Positive attitude!</Text>
          </View>

          {/* Check-in Method */}
          <Text style={styles.sectionTitle}>Check-in Method</Text>
          <View style={styles.checkInCard}>
            <Text style={styles.checkInText}>📱 QR Code Scan at Event</Text>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerHours}>{opportunity.duration} hours</Text>
            <Text style={styles.footerCategory}>{opportunity.category}</Text>
          </View>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookSpot}>
            <Text style={styles.bookButtonText}>Book My Spot</Text>
          </TouchableOpacity>
        </View>
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
    padding: spacing.md,
    paddingBottom: 100,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTag: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.sm,
  },
  cardTagText: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.textSecondary,
  },
  bookmarkButton: {
    padding: 5,
  },
  bookmarkIcon: {
    fontSize: 24,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 28,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 34,
    marginBottom: 8,
  },
  organization: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  verifiedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(90,75,117,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.sm,
    marginBottom: 20,
  },
  verifiedText: {
    color: colors.accentPurple,
    fontSize: 12,
    fontWeight: '500',
  },
  glassCard: {
    backgroundColor: colors.bgCardGlass,
    borderRadius: radii.lg,
    padding: 20,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 40,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontFamily: fonts.serif,
    fontSize: 18,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  lowSpots: {
    color: '#C44536',
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  sectionCard: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    padding: 20,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 20,
    elevation: 2,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  address: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 15,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  bulletPoint: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 6,
    lineHeight: 22,
  },
  checkInCard: {
    backgroundColor: 'rgba(90,75,117,0.08)',
    padding: 18,
    borderRadius: radii.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  checkInText: {
    color: colors.accentPurple,
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerInfo: {
    flex: 1,
  },
  footerHours: {
    fontFamily: fonts.serif,
    fontSize: 18,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  footerCategory: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  bookButton: {
    backgroundColor: colors.accentBlack,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: radii.sm,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
