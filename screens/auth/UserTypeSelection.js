import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  typeCard: {
    backgroundColor: '#f5f5f5',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  typeCardSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  typeEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  typeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  typeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
