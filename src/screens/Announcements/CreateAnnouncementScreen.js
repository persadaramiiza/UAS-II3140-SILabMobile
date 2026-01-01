import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import { createAnnouncement } from '../../services/announcementsApi';
import { useAuth } from '../../contexts/AuthContext';

export default function CreateAnnouncementScreen({ navigation }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Judul dan konten tidak boleh kosong.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await createAnnouncement({ 
        title, 
        content,
        created_by: user.id
      });
      setLoading(false);
      
      Alert.alert('Sukses', 'Pengumuman berhasil dibuat.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
      
    } catch (err) {
      setLoading(false);
      setError('Gagal membuat pengumuman. Coba lagi nanti.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul Pengumuman</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Tulis judul di sini..."
        placeholderTextColor="#6b7280"
      />

      <Text style={styles.label}>Konten</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Tulis konten pengumuman..."
        placeholderTextColor="#6b7280"
        multiline
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button
        title={loading ? 'Membuat...' : 'Buat Pengumuman'}
        onPress={handleCreate}
        disabled={loading}
        color="#facc15"
      />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} color="#facc15" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 20,
  },
  label: {
    color: '#f3f4f6',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1e293b',
    color: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 10,
  }
});
