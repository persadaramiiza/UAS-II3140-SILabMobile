import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { fetchAssignments } from '../../services/assignmentsApi';
import { useFocusEffect } from '@react-navigation/native';

export default function AssignmentListScreen({ route, navigation }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const filterFocus = route.params?.filterFocus;

  const loadAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {};
      if (filterFocus) {
        filters.focus = filterFocus;
      }
      
      const data = await fetchAssignments(filters);
      setAssignments(data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat tugas. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadAssignments();
    }, [filterFocus])
  );

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#facc15" style={{ marginTop: 20 }} />;
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Coba Lagi" onPress={loadAssignments} color="#facc15" />
        </View>
      );
    }

    return (
      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('AssignmentDetail', { assignmentId: item.id, title: item.title })}
          >
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>{item.focus}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            <Text style={styles.date}>Dibuat: {new Date(item.createdAt).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Tidak ada tugas ditemukan.</Text>}
      />
    );
  };

  return (
    <View style={styles.container}>
      {filterFocus && (
        <View style={styles.filterBanner}>
          <Text style={styles.filterText}>Filter: {filterFocus}</Text>
          <TouchableOpacity onPress={() => {
            navigation.setParams({ filterFocus: null });
            // Reset filter and reload all assignments
            // This is a bit of a workaround. A better solution would be to refactor loadAssignments
            // to not rely on the route param directly for filtering.
            setAssignments([]); // Clear current view
            loadAssignments(); // Reload all
          }}>
            <Text style={styles.clearFilter}>Hapus</Text>
          </TouchableOpacity>
        </View>
      )}
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  filterBanner: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#1f2937' },
  filterText: { color: '#facc15', fontWeight: 'bold' },
  clearFilter: { color: '#f87171' },
  card: { backgroundColor: '#111827', borderRadius: 12, padding: 16, marginBottom: 12, borderColor: '#374151', borderWidth: 1 },
  badgeContainer: { flexDirection: 'row', marginBottom: 8 },
  badge: { backgroundColor: '#facc15', color: '#000', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, fontSize: 10, fontWeight: 'bold' },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  desc: { color: '#9ca3af', fontSize: 14, marginBottom: 8 },
  date: { color: '#6b7280', fontSize: 12 },
  empty: { color: '#9ca3af', textAlign: 'center', marginTop: 20 },
  errorText: { color: '#ef4444', textAlign: 'center', marginBottom: 10, fontSize: 16 }
});