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
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {opportunity.featured && (
          <View style={styles.featuredBanner}>
            <Text style={styles.featuredText}>⭐ FEATURED OPPORTUNITY</Text>
          </View>
        )}

        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{opportunity.title}</Text>
            <Text style={styles.organization}>{opportunity.organization}</Text>
            {opportunity.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Verified Organization</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setIsBookmarked(!isBookmarked)}
            style={styles.bookmarkButton}
          >
            <Text style={styles.bookmarkIcon}>{isBookmarked ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Opportunity</Text>
          <Text style={styles.description}>{opportunity.description}</Text>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{opportunity.date}</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailIcon}>⏰</Text>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{opportunity.time}</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailIcon}>⏱️</Text>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{opportunity.duration} hrs</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailIcon}>👥</Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.address}>📍 {opportunity.address}</Text>

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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What to Bring</Text>
          <Text style={styles.bulletPoint}>• Comfortable clothes and shoes</Text>
          <Text style={styles.bulletPoint}>• Water bottle</Text>
          <Text style={styles.bulletPoint}>• Positive attitude!</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Check-in Method</Text>
          <View style={styles.checkInBadge}>
            <Text style={styles.checkInText}>📱 QR Code Scan at Event</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerHours}>{opportunity.duration} hours</Text>
          <Text style={styles.footerCategory}>{opportunity.category}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookSpot}>
          <Text style={styles.bookButtonText}>Book My Spot</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100, // Add padding to account for footer
  },
  featuredBanner: {
    backgroundColor: '#FFC107',
    padding: 10,
    alignItems: 'center',
  },
  featuredText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  organization: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  verifiedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  verifiedText: {
    color: '#2196F3',
    fontSize: 12,
    fontWeight: '500',
  },
  bookmarkButton: {
    padding: 5,
  },
  bookmarkIcon: {
    fontSize: 28,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  detailCard: {
    width: '50%',
    padding: 10,
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lowSpots: {
    color: '#FF5722',
  },
  address: {
    fontSize: 15,
    color: '#666',
    marginBottom: 15,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#666',
    marginBottom: 5,
    lineHeight: 22,
  },
  checkInBadge: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkInText: {
    color: '#4CAF50',
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  footerInfo: {
    flex: 1,
  },
  footerHours: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  footerCategory: {
    fontSize: 13,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
