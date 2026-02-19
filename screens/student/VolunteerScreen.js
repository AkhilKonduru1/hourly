import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import Svg, { Path, Circle, Polyline, Line, Polygon } from 'react-native-svg';

// --- SVG Icon Components ---
const SearchIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={0.4}>
    <Circle cx={11} cy={11} r={8} />
    <Line x1={21} y1={21} x2={16.65} y2={16.65} />
  </Svg>
);

const ChevronRight = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <Polyline points="9,18 15,12 9,6" />
  </Svg>
);

// --- Mock Data ---
const recommendedItems = [
  { id: 1, title: 'Food Bank Sort', subtitle: '2.4 miles away • Sat, 10 AM', variant: 'default' },
  { id: 2, title: 'Park Cleanup', subtitle: '3.1 miles away • Sun, 9 AM', variant: 'purple' },
];

const exploreOpportunities = [
  {
    id: 1,
    tag: 'Education',
    title: 'After-school math tutor for local high school students',
    frequency: 'Recurring',
    detail: '12 spots left',
    orgName: 'City Youth Center',
    orgColor: '#333',
    accentColor: '#F2C4C4',
  },
  {
    id: 2,
    tag: 'Environment',
    title: 'Community garden planting and maintenance day',
    frequency: 'One-time',
    detail: 'Sat, Oct 14',
    orgName: 'Green Earth',
    orgColor: '#5A4B75',
    accentColor: '#8CA6D6',
  },
  {
    id: 3,
    tag: 'Seniors',
    title: 'Technology helper for senior citizens home',
    frequency: 'Flexible',
    detail: 'Weekday evenings',
    orgName: 'Silver Living',
    orgColor: '#8CA6D6',
    accentColor: null,
  },
];

const FILTERS = ['Near You', 'Remote', 'Events'];

// --- Font helpers ---
const FONT_SERIF = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'serif',
});

const FONT_SANS = Platform.select({
  ios: undefined,
  android: 'sans-serif',
  default: undefined,
});

// --- Sub-components ---

function BadgeDot({ variant }) {
  return (
    <View style={[styles.badgeDot, variant === 'purple' && styles.badgeDotPurple]} />
  );
}

function RecommendedListItem({ item, isFirst, isLast, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.listItem,
        isFirst && styles.listItemFirst,
        isLast && styles.listItemLast,
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.listItemLeft}>
        <BadgeDot variant={item.variant} />
        <View>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.itemAction}>
        <ChevronRight />
      </View>
    </TouchableOpacity>
  );
}

function OpportunityCard({ opportunity, onApply }) {
  return (
    <View style={styles.opportunityCard}>
      {opportunity.accentColor && (
        <View
          style={[styles.cardAccentBlob, { backgroundColor: opportunity.accentColor }]}
        />
      )}

      <View style={styles.cardHeader}>
        <View style={styles.cardTag}>
          <Text style={styles.cardTagText}>{opportunity.tag}</Text>
        </View>
      </View>

      <Text style={styles.cardTitle}>{opportunity.title}</Text>

      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaText}>{opportunity.frequency}</Text>
        <Text style={styles.cardMetaText}>•</Text>
        <Text style={styles.cardMetaText}>{opportunity.detail}</Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.orgInfo}>
          <View style={[styles.orgLogo, { backgroundColor: opportunity.orgColor }]} />
          <Text style={styles.orgName}>{opportunity.orgName}</Text>
        </View>
        <TouchableOpacity style={styles.btnPill} activeOpacity={0.8} onPress={onApply}>
          <Text style={styles.btnPillText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Main Screen ---

export default function VolunteerScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Near You');

  const handleApply = (opp) => {
    Alert.alert('Apply', `You applied to "${opp.title}"!`);
  };

  const handleRecommendedPress = (item) => {
    Alert.alert(item.title, item.subtitle);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Aura background blobs */}
      <View style={styles.auraBg}>
        <View style={styles.auraBlob1} />
        <View style={styles.auraBlob2} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Volunteer</Text>
          <View style={styles.avatar}>
            <View style={styles.avatarInner} />
          </View>
        </View>

        {/* Controls Section */}
        <View style={styles.controlsSection}>
          {/* Search Bar */}
          <View style={styles.searchBar}>
            <SearchIcon />
            <TextInput
              style={styles.searchInput}
              placeholder="Search opportunities..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Filter Tabs */}
          <View style={styles.filterTabs}>
            {FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  activeFilter === filter && styles.filterTabActive,
                ]}
                onPress={() => setActiveFilter(filter)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    activeFilter === filter && styles.filterTabTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recommended Section */}
        <Text style={styles.sectionTitle}>Recommended</Text>
        <View style={styles.glassListOuter}>
          <View style={styles.glassListContainer}>
            {/* Decorative blobs inside the glass container */}
            <View style={styles.glassBlob1} />
            <View style={styles.glassBlob2} />

            {recommendedItems.map((item, index) => (
              <RecommendedListItem
                key={item.id}
                item={item}
                isFirst={index === 0}
                isLast={index === recommendedItems.length - 1}
                onPress={() => handleRecommendedPress(item)}
              />
            ))}
          </View>
        </View>

        {/* Explore All Section */}
        <Text style={styles.sectionTitle}>Explore All</Text>
        <View style={styles.feedSection}>
          {exploreOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onApply={() => handleApply(opp)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  // Aura background
  auraBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  auraBlob1: {
    position: 'absolute',
    top: '10%',
    left: '-15%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(244, 196, 196, 0.4)',
  },
  auraBlob2: {
    position: 'absolute',
    top: 0,
    right: '-15%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(140, 166, 214, 0.3)',
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONT_SERIF,
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: -0.64,
    color: '#1A1A1A',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EDEDED',
  },

  // Controls Section
  controlsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchBar: {
    backgroundColor: '#EAEAEA',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT_SANS,
    fontSize: 15,
    color: '#1A1A1A',
    padding: 0,
  },

  // Filter Tabs
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#EAEAEA',
    borderRadius: 100,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 100,
  },
  filterTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666666',
  },
  filterTabTextActive: {
    color: '#1A1A1A',
  },

  // Section Title
  sectionTitle: {
    paddingHorizontal: 24,
    marginBottom: 16,
    fontSize: 18,
    fontFamily: FONT_SERIF,
    color: '#1A1A1A',
  },

  // Glass List Container
  glassListOuter: {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  glassListContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 32,
    padding: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 40,
    elevation: 3,
  },
  glassBlob1: {
    position: 'absolute',
    bottom: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(90, 75, 117, 0.15)',
  },
  glassBlob2: {
    position: 'absolute',
    top: -30,
    left: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(242, 196, 196, 0.2)',
  },

  // List Items
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  listItemFirst: {
    paddingTop: 0,
  },
  listItemLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badgeDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D4B0B0',
    opacity: 0.8,
  },
  badgeDotPurple: {
    backgroundColor: '#7D8FB8',
  },
  itemTitle: {
    fontFamily: FONT_SERIF,
    fontSize: 18,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#666666',
  },
  itemAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Feed Section
  feedSection: {
    paddingHorizontal: 24,
  },
  opportunityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    overflow: 'hidden',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.03)',
  },
  cardAccentBlob: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTag: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  cardTagText: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.55,
    color: '#666666',
  },
  cardTitle: {
    fontFamily: FONT_SERIF,
    fontSize: 22,
    lineHeight: 26.4,
    color: '#1A1A1A',
    marginTop: 8,
    maxWidth: '90%',
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  cardMetaText: {
    fontSize: 13,
    color: '#666666',
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orgInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orgLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  orgName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  btnPill: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  btnPillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
});
