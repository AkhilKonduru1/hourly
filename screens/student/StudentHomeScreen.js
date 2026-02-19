import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import MockMap, { Marker } from '../../components/MockMap';
import { mockOpportunities, categories } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');

export default function StudentHomeScreen({ navigation }) {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState({
    latitude: 30.5022, // Cedar Park, TX
    longitude: -97.8202,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    const matchesCategory =
      selectedCategory === 'All' || opp.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0]}! 👋</Text>
          <Text style={styles.subGreeting}>Find your next volunteer opportunity</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('StudentProfile')}
        >
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search opportunities..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <MockMap style={styles.map} region={region}>
        {filteredOpportunities.map((opp) => (
          <Marker
            key={opp.id}
            coordinate={opp.coordinates}
            title={opp.title}
            description={opp.organization}
            onCalloutPress={() =>
              navigation.navigate('OpportunityDetails', { opportunity: opp })
            }
          >
            <View style={styles.markerContainer}>
              <Text style={styles.markerText}>📍</Text>
            </View>
          </Marker>
        ))}
      </MockMap>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              selectedCategory === cat && styles.categoryChipSelected,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextSelected,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Nearby Opportunities</Text>
          <Text style={styles.listCount}>{filteredOpportunities.length} found</Text>
        </View>

        <ScrollView 
          style={styles.opportunitiesList}
          contentContainerStyle={styles.opportunitiesListContent}
        >
          {filteredOpportunities.map((opp) => (
            <TouchableOpacity
              key={opp.id}
              style={styles.opportunityCard}
              onPress={() =>
                navigation.navigate('OpportunityDetails', { opportunity: opp })
              }
            >
              {opp.featured && (
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredText}>⭐ Featured</Text>
                </View>
              )}

              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{opp.title}</Text>
                <Text style={styles.categoryBadge}>{opp.category}</Text>
              </View>

              <Text style={styles.organization}>📍 {opp.organization}</Text>
              <Text style={styles.dateTime}>
                📅 {opp.date} • ⏰ {opp.time}
              </Text>
              <Text style={styles.duration}>⏱️ {opp.duration} hours</Text>

              <View style={styles.cardFooter}>
                <Text
                  style={[
                    styles.spotsAvailable,
                    opp.spotsAvailable < 5 && styles.spotsLow,
                  ]}
                >
                  {opp.spotsAvailable} spots left
                </Text>
                {opp.verified && <Text style={styles.verified}>✓ Verified</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subGreeting: {
    fontSize: 14,
    color: '#E8F5E9',
    marginTop: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  map: {
    width: width,
    height: height * 0.25,
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerText: {
    fontSize: 30,
  },
  categoryScroll: {
    maxHeight: 50,
    marginVertical: 15,
  },
  categoryContent: {
    paddingHorizontal: 15,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  categoryChipSelected: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    color: '#666',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listCount: {
    fontSize: 14,
    color: '#666',
  },
  opportunitiesList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  opportunitiesListContent: {
    paddingBottom: 20,
  },
  opportunityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFC107',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  categoryBadge: {
    fontSize: 11,
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  organization: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  duration: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  spotsAvailable: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },
  spotsLow: {
    color: '#FF5722',
  },
  verified: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
});
