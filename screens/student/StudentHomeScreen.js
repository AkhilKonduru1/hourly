import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import MockMap, { Marker } from '../../components/MockMap';
import { mockOpportunities, categories } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing, radii, fonts } from '../../theme';

export default function StudentHomeScreen({ navigation }) {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Near You');
  const filterTabs = ['Near You', 'Remote', 'Events'];

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    const matchesCategory =
      selectedCategory === 'All' || opp.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredOpps = filteredOpportunities.filter((opp) => opp.featured);

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
            <Text style={styles.headerTitle}>Hourly</Text>
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => navigation.navigate('StudentProfile')}
            >
              <View style={styles.avatarInner} />
            </TouchableOpacity>
          </View>

          {/* Search & Filters */}
          <View style={styles.controlsSection}>
            <View style={styles.searchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search opportunities..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={colors.textTertiary}
              />
            </View>

            <View style={styles.filterTabs}>
              {filterTabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.filterTab,
                    activeFilter === tab && styles.filterTabActive,
                  ]}
                  onPress={() => setActiveFilter(tab)}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      activeFilter === tab && styles.filterTabTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category chips */}
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

          {/* Recommended Section (glass list) */}
          {featuredOpps.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Recommended</Text>
              <View style={styles.glassListContainer}>
                {featuredOpps.map((opp, index) => (
                  <TouchableOpacity
                    key={opp.id}
                    style={[
                      styles.listItem,
                      index === featuredOpps.length - 1 && styles.listItemLast,
                      index === 0 && styles.listItemFirst,
                    ]}
                    onPress={() =>
                      navigation.navigate('OpportunityDetails', { opportunity: opp })
                    }
                  >
                    <View style={styles.listItemLeft}>
                      <View
                        style={[
                          styles.badgeDot,
                          index % 2 === 1 && styles.badgeDotPurple,
                        ]}
                      />
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemTitle}>{opp.title}</Text>
                        <Text style={styles.itemSub}>
                          {opp.organization} • {opp.date}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.itemAction}>
                      <Text style={styles.itemArrow}>›</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Explore All - Opportunity Cards */}
          <Text style={styles.sectionTitle}>Explore All</Text>
          <View style={styles.feedSection}>
            {filteredOpportunities.map((opp) => (
              <TouchableOpacity
                key={opp.id}
                style={styles.opportunityCard}
                onPress={() =>
                  navigation.navigate('OpportunityDetails', { opportunity: opp })
                }
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardTag}>
                    <Text style={styles.cardTagText}>{opp.category}</Text>
                  </View>
                </View>
                <Text style={styles.cardTitle}>{opp.title}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaText}>
                    {opp.duration} hrs
                  </Text>
                  <Text style={styles.cardMetaDot}>•</Text>
                  <Text style={styles.cardMetaText}>
                    {opp.spotsAvailable} spots left
                  </Text>
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.orgInfo}>
                    <View
                      style={[
                        styles.orgLogo,
                        opp.category === 'Environment' && {
                          backgroundColor: colors.accentPurple,
                        },
                        opp.category === 'Seniors' && {
                          backgroundColor: colors.accentBlue,
                        },
                      ]}
                    />
                    <Text style={styles.orgName}>{opp.organization}</Text>
                  </View>
                  <View style={styles.btnPill}>
                    <Text style={styles.btnPillText}>View</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
  headerTitle: {
    fontFamily: fonts.serif,
    fontSize: 32,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.5,
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
    backgroundColor: '#E8E8E8',
  },
  controlsSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  searchBar: {
    backgroundColor: colors.bgInput,
    borderRadius: radii.sm,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: spacing.sm,
  },
  searchIcon: {
    fontSize: 14,
    opacity: 0.4,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: colors.bgInput,
    borderRadius: radii.sm,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: radii.sm,
  },
  filterTabActive: {
    backgroundColor: colors.bgCard,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterTabTextActive: {
    color: colors.textPrimary,
  },
  categoryScroll: {
    maxHeight: 46,
    marginBottom: spacing.md,
  },
  categoryContent: {
    paddingHorizontal: spacing.md,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.sm,
    backgroundColor: colors.bgInput,
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: colors.accentBlack,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    fontSize: 18,
    fontFamily: fonts.serif,
    color: colors.textPrimary,
  },
  // Glass list container
  glassListContainer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.bgCardGlass,
    borderRadius: radii.lg,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 40,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listItemLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  listItemFirst: {
    paddingTop: 0,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  badgeDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accentPink,
    opacity: 0.7,
  },
  badgeDotPurple: {
    backgroundColor: colors.accentBlue,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  itemSub: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  itemAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemArrow: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  // Feed section
  feedSection: {
    paddingHorizontal: spacing.md,
  },
  opportunityCard: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    padding: 20,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
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
    borderRadius: radii.sm,
  },
  cardTagText: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.textSecondary,
  },
  cardTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 26,
    color: colors.textPrimary,
    maxWidth: '90%',
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  cardMetaText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  cardMetaDot: {
    fontSize: 13,
    color: colors.textSecondary,
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
    backgroundColor: '#333',
  },
  orgName: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  btnPill: {
    backgroundColor: colors.accentBlack,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radii.sm,
  },
  btnPillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
});
