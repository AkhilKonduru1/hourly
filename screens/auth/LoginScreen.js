import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing, radii, fonts } from '../../theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    if (email && password) {
      navigation.navigate('UserTypeSelection', { email, password, isLogin: true });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.auraPink} />
      <View style={styles.auraBlue} />

      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.appName}>Hourly</Text>
            <Text style={styles.tagline}>Track. Volunteer. Grow.</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textTertiary}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={colors.textTertiary}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.signupLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    top: '10%',
    left: '-10%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.accentPink,
    opacity: 0.35,
  },
  auraBlue: {
    position: 'absolute',
    top: '5%',
    right: '-15%',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.accentBlue,
    opacity: 0.25,
  },
  inner: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontFamily: fonts.serif,
    fontSize: 48,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -1,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 15,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.bgInput,
    padding: 16,
    borderRadius: radii.sm,
    marginBottom: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },
  loginButton: {
    backgroundColor: colors.accentBlack,
    padding: 16,
    borderRadius: radii.sm,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  signupText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
  },
  signupLink: {
    color: colors.accentPurple,
    fontWeight: '600',
  },
});
