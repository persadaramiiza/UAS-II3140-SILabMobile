import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchAssignments } from '../../services/assignmentsApi';
import { listQuizTopics } from '../../services/quizApi';

// Simple placeholders for now – these will later mirror web modules:
function RequirementsScreen() {
  return <Text style={{ padding: 16, color: '#fff' }}>Requirements Engineering (mobile)</Text>;
}

function EnterpriseScreen() {
  return <Text style={{ padding: 16, color: '#fff' }}>Enterprise Architecture (mobile)</Text>;
}

function InteractionScreen() {
  return <Text style={{ padding: 16, color: '#fff' }}>Interaction Design (mobile)</Text>;
}

function DiagramScreen() {
  return <Text style={{ padding: 16, color: '#fff' }}>Diagram Builder (mobile)</Text>;
}

function ERDScreen() {
  return <Text style={{ padding: 16, color: '#fff' }}>Conceptual Modeling ERD (mobile)</Text>;
}

function QuizScreen() {
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await listQuizTopics();
        if (mounted) {
          setTopics(list);
        }
      } catch (err) {
        if (mounted) setError(err.message || 'Gagal memuat quiz');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#facc15" />
        <Text style={styles.muted}>Memuat quiz dari server...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!topics.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Belum ada topik quiz yang tersedia.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={topics}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>{item.title || 'Quiz Tanpa Judul'}</Text>
            {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
            {item.questionCount !== undefined ? (
              <Text style={styles.muted}>Jumlah soal: {item.questionCount}</Text>
            ) : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function AssignmentsScreen() {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await fetchAssignments();
        if (mounted) {
          setAssignments(list);
        }
      } catch (err) {
        if (mounted) setError(err.message || 'Gagal memuat tugas');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#facc15" />
        <Text style={styles.muted}>Memuat tugas dari server...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!assignments.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Belum ada tugas yang terdaftar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={assignments}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            {item.focus ? <Text style={styles.badge}>{item.focus}</Text> : null}
            {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#020617' },
        headerTintColor: '#e5e7eb',
        tabBarStyle: { backgroundColor: '#020617' },
        tabBarActiveTintColor: '#facc15',
        tabBarInactiveTintColor: '#6b7280'
      }}
    >
      <Tab.Screen name="Req" component={RequirementsScreen} options={{ title: 'Requirements' }} />
      <Tab.Screen name="EA" component={EnterpriseScreen} options={{ title: 'EA' }} />
      <Tab.Screen name="IXD" component={InteractionScreen} options={{ title: 'Interaction' }} />
      <Tab.Screen name="Diagram" component={DiagramScreen} />
      <Tab.Screen name="ERD" component={ERDScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Assignments" component={AssignmentsScreen} options={{ title: 'Tugas' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#020617'
  },
  center: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center'
  },
  muted: {
    marginTop: 8,
    color: '#9ca3af'
  },
  error: {
    color: '#f87171',
    paddingHorizontal: 16,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#0b1120',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e5e7eb',
    marginBottom: 4
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#facc15',
    color: '#111827',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6
  },
  desc: {
    fontSize: 13,
    color: '#9ca3af'
  }
});


