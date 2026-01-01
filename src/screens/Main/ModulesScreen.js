import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MODULES = [
  { id: 'Requirements', title: 'Requirements Engineering', icon: 'list' },
  { id: 'Enterprise Architecture', title: 'Enterprise Architecture', icon: 'business' },
  { id: 'Interaction Design', title: 'Interaction Design', icon: 'color-palette' },
  { id: 'Diagram Builder', title: 'Diagram Builder', icon: 'git-network' },
  { id: 'Conceptual Modeling', title: 'Conceptual Modeling (ERD)', icon: 'construct' },
];

export default function ModulesScreen({ navigation }) {
  const handlePress = (moduleId, moduleTitle) => {
    navigation.navigate('ModuleContent', { moduleId, moduleTitle });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={MODULES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handlePress(item.id, item.title)}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={24} color="#facc15" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>Lihat materi</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  item: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#1f2937' },
  iconContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(250, 204, 21, 0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  itemTitle: { color: '#f3f4f6', fontSize: 16, fontWeight: '600' },
  itemSubtitle: { color: '#9ca3af', fontSize: 13, marginTop: 2 }
});