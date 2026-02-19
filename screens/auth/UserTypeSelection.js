import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing, radii, fonts } from '../../theme';

export default function UserTypeSelection({ route }) {
  const { email, password, name, isLogin } = route.params;
  const [selectedType, setSelectedType] = useState(null);
  const { login, signup } = useAuth();

  const handleContinue = () => {
    if (!selectedType) return;

    if (isLogin) {
      login(email, password, selectedType);
    } else {
      signup(email, password, name, selectedType);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.auraPink} />
      <View style={styles.auraBlue} />

      <View style={styles.content}>
        <Text style={styles.title}>I am a...</Text>
        <Text style={styles.subtitle}>Select your account type</Text>

        <TouchableOpacity
          style={[
            styles.typeCard,
            selectedType === 'student' && styles.typeCardSelected,
          ]}
          onPress={() => setSelectedType('student')}
        >
          <Text style={styles.typeEmoji}>🎓</Text>
          <Text style={styles.typeTitle}>Student</Text>
          <Text style={styles.typeDescription}>
            Find volunteer opportunities, track hours, and build your service record
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeCard,
            selectedType === 'organization' && styles.typeCardSelected,
          ]}
          onPress={() => setSelectedType('organization')}
        >
          <Text style={styles.typeEmoji}>🏫</Text>
          <Text style={styles.typeTitle}>Organization / School</Text>
          <Text style={styles.typeDescription}>
            Post opportunities, manage volunteers, and approve service hours
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedType && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedType}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgBody,
  },
  auraPink: {
    position: 'absolute',
    bottom: '10%',
    left: '-10%',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.accentPink,
    opacity: 0.3,
  },
  auraBlue: {
    position: 'absolute',
    top: '10%',
    right: '-10%',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.accentBlue,
    opacity: 0.2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 32,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 40,
  },
  typeCard: {
    backgroundColor: colors.bgCard,
    padding: 24,
    borderRadius: radii.md,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 20,
    elevation: 2,
  },
  typeCardSelected: {
    borderColor: colors.accentPurple,
    backgroundColor: '#F8F5FF',
  },
  typeEmoji: {
    fontSize: 36,
    marginBottom: 12,
  },
  typeTitle: {
    fontFamily: fonts.serif,
    fontSize: 20,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  typeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: colors.accentBlack,
    padding: 16,
    borderRadius: radii.sm,
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
