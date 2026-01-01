import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../services/supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter an email and password.');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('Login Failed', error.message);
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'exp://localhost:8081', // For Expo Go during development
          // For production: use your custom scheme or deep link
        },
      });

      if (error) {
        Alert.alert('Google Sign-In Failed', error.message);
      }
      // Note: OAuth in React Native requires additional setup with deep linking
      // The user will be redirected to browser, then back to app after authentication
    } catch (err) {
      Alert.alert('Error', err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SILab Mobile</Text>
      <Text style={styles.subtitle}>Virtual Lab Environment</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6b7280"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#6b7280"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Sign In'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn} disabled={loading}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 20 }}>
        <Text style={styles.registerText}>
          Don't have an account? <Text style={{ color: '#facc15', fontWeight: 'bold' }}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#facc15', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#9ca3af', textAlign: 'center', marginBottom: 48 },
  form: { gap: 16 },
  input: { backgroundColor: '#111827', color: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#374151' },
  button: { backgroundColor: '#facc15', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#020617', fontWeight: 'bold', fontSize: 16 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#374151' },
  dividerText: { color: '#9ca3af', paddingHorizontal: 16, fontSize: 14 },
  googleButton: { backgroundColor: '#4285F4', padding: 16, borderRadius: 12, alignItems: 'center' },
  googleButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  registerText: { color: '#9ca3af', textAlign: 'center', marginTop: 10 }
});