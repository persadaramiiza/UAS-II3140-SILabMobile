import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Interactive module mapping - route to interactive screens for these modules
const INTERACTIVE_MODULES = {
  'Requirements': 'RequirementsEngineering',
  'Enterprise Architecture': 'EnterpriseArchitecture',
  'Diagram Builder': 'InteractionDesign',
  'Conceptual Modeling': 'ERDBuilder',
};

// Content for non-interactive modules
const MODULE_CONTENT = {
  'Diagram Builder': {
    title: 'Diagram Builder',
    content: `Alat pembuat diagram adalah perangkat lunak yang memungkinkan pengguna untuk membuat berbagai jenis diagram, seperti flowchart, UML diagram, dan ERD.

Fitur Umum:
- Drag-and-drop interface
- Pustaka bentuk dan simbol
- Opsi kustomisasi (warna, teks)
- Ekspor ke berbagai format (PNG, SVG, PDF)

Tips:
- Gunakan grid untuk alignment yang tepat
- Manfaatkan shortcut keyboard
- Simpan pekerjaan secara berkala
- Eksport dalam format yang sesuai dengan kebutuhan`
  },
};

export default function ModuleContentScreen({ route, navigation }) {
  const { moduleId, moduleTitle } = route.params;

  // Auto-navigate to interactive screen if available
  useEffect(() => {
    const interactiveRoute = INTERACTIVE_MODULES[moduleId];
    if (interactiveRoute) {
      navigation.replace(interactiveRoute, { moduleTitle });
    }
  }, [moduleId, navigation]);

  // For non-interactive modules, show content
  const moduleData = MODULE_CONTENT[moduleId] || { 
    title: moduleTitle, 
    content: 'Konten untuk modul ini belum tersedia.' 
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{moduleData.title}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{moduleData.content}</Text>
      </View>

      {/* Placeholder for interactive features */}
      <View style={styles.interactiveCard}>
        <Ionicons name="construct-outline" size={32} color="#6b7280" />
        <Text style={styles.interactiveText}>
          Fitur interaktif untuk modul ini sedang dalam pengembangan
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  header: {
    backgroundColor: '#111827',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  title: {
    color: '#facc15',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
  },
  content: {
    color: '#e5e7eb',
    fontSize: 16,
    lineHeight: 24,
  },
  interactiveCard: {
    margin: 20,
    padding: 32,
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    alignItems: 'center',
    gap: 12,
  },
  interactiveText: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
  },
});
