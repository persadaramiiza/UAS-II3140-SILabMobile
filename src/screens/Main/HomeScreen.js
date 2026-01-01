import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { fetchAnnouncements } from '../../services/announcementsApi';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { formatDateTime } from '../../utils/helpers';
import { isInstructor } from '../../utils/helpers';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';

export default function HomeScreen({ navigation }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userProfile } = useAuth();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error on new load
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
      setError("Gagal memuat pengumuman. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const isAdmin = isInstructor(userProfile);

  const renderContent = () => {
    if (error && !loading) {
      return <ErrorState message={error} onRetry={loadData} />;
    }

    return (
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} tintColor="#facc15" />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardContent}>{item.content}</Text>
            <Text style={styles.cardFooter}>
              Oleh: {item.createdByName} • {formatDateTime(item.created_at)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          !loading && <EmptyState message="Tidak ada pengumuman" description="Belum ada pengumuman yang dibuat" />
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderContent()}
      {isAdmin && (
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => navigation.navigate('CreateAnnouncement')}
        >
          <Ionicons name="add" size={24} color="#020617" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  card: { backgroundColor: '#111827', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#374151' },
  cardTitle: { color: '#facc15', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  cardContent: { color: '#e5e7eb', lineHeight: 22, marginBottom: 12 },
  cardFooter: { color: '#6b7280', fontSize: 12 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#facc15',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});