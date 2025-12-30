import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { apiFetch, saveToken } from '../../services/apiClient';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Login', 'Isi username dan password terlebih dahulu.');
      return;
    }

    try {
      setLoading(true);
      // backend web app login route expects username/password (see legacy/web app)
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: { username, password }
      });

      await saveToken(data.token);
      Alert.alert('Sukses', 'Berhasil login.');
      navigation.replace('MainTabs');
    } catch (err) {
      Alert.alert('Gagal', err.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SILab Suite</Text>
      <Text style={styles.subtitle}>Virtual Lab Environment (Mobile)</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Memproses...' : 'Masuk'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#facc15',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 32,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4b5563',
    paddingHorizontal: 14,
    marginBottom: 14,
    color: '#e5e7eb',
    backgroundColor: '#020617'
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6
  },
  buttonText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 16
  }
});


