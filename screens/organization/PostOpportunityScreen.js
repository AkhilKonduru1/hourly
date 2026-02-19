import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, radii, fonts } from '../../theme';

export default function PostOpportunityScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [spots, setSpots] = useState('');
  const [category, setCategory] = useState('Community');
  const [isFeatured, setIsFeatured] = useState(false);

  const categories = [
    'Community',
    'Education',
    'Environment',
    'Food Security',
    'Seniors',
    'Animals',
  ];

  const handlePost = () => {
    if (title && description && date && time && duration && location && spots) {
      Alert.alert(
        'Opportunity Posted! 🎉',
        'Your volunteer opportunity has been published and is now visible to students.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Post Opportunity</Text>
            <Text style={styles.subtitle}>Create a volunteer event for students</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>
              Event Title <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Food Bank Sorting & Packing"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={colors.textTertiary}
            />

            <Text style={styles.label}>
              Description <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the volunteer work and requirements..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              placeholderTextColor={colors.textTertiary}
            />

            <Text style={styles.label}>
              Category <Text style={styles.required}>*</Text>
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    category === cat && styles.categoryChipSelected,
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === cat && styles.categoryTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>
                  Date <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={date}
                  onChangeText={setDate}
                  placeholderTextColor={colors.textTertiary}
                />
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.label}>
                  Time <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="9:00 AM - 12:00 PM"
                  value={time}
                  onChangeText={setTime}
                  placeholderTextColor={colors.textTertiary}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>
                  Duration (hours) <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="3"
                  value={duration}
                  onChangeText={setDuration}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textTertiary}
                />
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.label}>
                  Volunteer Spots <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="15"
                  value={spots}
                  onChangeText={setSpots}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textTertiary}
                />
              </View>
            </View>

            <Text style={styles.label}>
              Location/Address <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="123 Main St, City, State"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor={colors.textTertiary}
            />

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsFeatured(!isFeatured)}
            >
              <View
                style={[styles.checkbox, isFeatured && styles.checkboxChecked]}
              >
                {isFeatured && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.checkboxLabel}>
                <Text style={styles.checkboxText}>
                  Make this a Featured Opportunity
                </Text>
                <Text style={styles.checkboxSubtext}>
                  ⭐ Featured events get 3x more visibility ($25/event)
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>📱 Check-in Methods</Text>
              <Text style={styles.infoText}>
                Students can verify attendance using:
              </Text>
              <Text style={styles.infoBullet}>• GPS check-in at location</Text>
              <Text style={styles.infoBullet}>
                • QR code scan (we'll provide)
              </Text>
              <Text style={styles.infoBullet}>• Organizer signature</Text>
            </View>

            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Post Opportunity</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
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
  form: {
    paddingHorizontal: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
    marginTop: 16,
  },
  required: {
    color: '#C44536',
  },
  input: {
    backgroundColor: colors.bgInput,
    padding: 16,
    borderRadius: radii.sm,
    fontSize: 15,
    color: colors.textPrimary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    marginBottom: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radii.sm,
    backgroundColor: colors.bgInput,
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: colors.accentBlack,
  },
  categoryText: {
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 13,
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(90,75,117,0.08)',
    borderRadius: radii.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.accentPurple,
    borderRadius: 8,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: colors.accentPurple,
    borderColor: colors.accentPurple,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    flex: 1,
  },
  checkboxText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  checkboxSubtext: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  infoBox: {
    backgroundColor: 'rgba(140,166,214,0.12)',
    padding: 16,
    borderRadius: radii.md,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  infoBullet: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 10,
    marginTop: 3,
  },
  postButton: {
    backgroundColor: colors.accentBlack,
    padding: 18,
    borderRadius: radii.sm,
    alignItems: 'center',
    marginTop: 30,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
});
