import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { listQuizTopics } from '../../services/quizApi';

export default function QuizListScreen({ navigation }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const data = await listQuizTopics();
      setTopics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadQuizzes(); }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={topics}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadQuizzes} tintColor="#facc15" />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('QuizRoom', { topicId: item.id, title: item.title })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description || 'Tidak ada deskripsi'}</Text>
            <View style={styles.footer}>
              <Text style={styles.count}>{item.questionCount || 0} Soal</Text>
              <Text style={styles.startBtn}>Mulai</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !loading && <Text style={styles.empty}>Tidak ada quiz tersedia.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  card: { backgroundColor: '#111827', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#374151' },
  title: { color: '#facc15', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  desc: { color: '#9ca3af', marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  count: { color: '#6b7280', fontSize: 12 },
  startBtn: { color: '#fff', fontWeight: 'bold', backgroundColor: '#2563eb', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, fontSize: 12 },
  empty: { color: '#9ca3af', textAlign: 'center', marginTop: 20 }
});