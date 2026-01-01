import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Dummy content for modules. In a real app, this would come from an API.
const DUMMY_CONTENT = {
  'Requirements': {
    title: 'Requirements Engineering',
    content: `Requirements engineering adalah proses elisitasi, analisis, spesifikasi, validasi, dan manajemen kebutuhan untuk sebuah sistem perangkat lunak. Fase ini krusial untuk memastikan produk yang dibangun sesuai dengan ekspektasi stakeholder.

Materi:
- Teknik Elisitasi (Wawancara, Kuesioner, Observasi)
- Analisis Kebutuhan (Fungsional & Non-fungsional)
- Pemodelan (Use Case, Activity Diagram)
- Spesifikasi Kebutuhan Perangkat Lunak (SKPL)
- Manajemen Perubahan Kebutuhan`
  },
  'Enterprise Architecture': {
    title: 'Enterprise Architecture',
    content: `Arsitektur enterprise (EA) adalah praktik untuk menganalisis, merancang, merencanakan, dan mengimplementasikan analisis enterprise untuk berhasil mencapai strategi bisnis. EA membantu menjembatani kesenjangan antara strategi TI dan strategi bisnis.

Materi:
- Framework EA (TOGAF, Zachman)
- Domain Arsitektur (Bisnis, Data, Aplikasi, Teknologi)
- Artefak dan Deliverables
- Governance EA`
  },
  'Interaction Design': {
    title: 'Interaction Design',
    content: `Desain interaksi (IxD) berfokus pada perancangan interaksi antara pengguna dan produk. Tujuannya adalah untuk menciptakan produk yang mudah digunakan, efisien, dan menyenangkan.

Materi:
- Prinsip Desain Interaksi (Affordance, Signifier, Feedback)
- Heuristic Evaluation (Nielsen's Heuristics)
- Prototyping (Low-fidelity & High-fidelity)
- User Testing`
  },
  'Diagram Builder': {
    title: 'Diagram Builder',
    content: `Alat pembuat diagram adalah perangkat lunak yang memungkinkan pengguna untuk membuat berbagai jenis diagram, seperti flowchart, UML diagram, dan ERD.

Fitur Umum:
- Drag-and-drop interface
- Pustaka bentuk dan simbol
- Opsi kustomisasi (warna, teks)
- Ekspor ke berbagai format (PNG, SVG, PDF)`
  },
  'Conceptual Modeling (ERD)': {
    title: 'Conceptual Modeling (ERD)',
    content: `Pemodelan konseptual adalah proses membuat model dari suatu domain masalah untuk lebih memahaminya. Entity-Relationship Diagram (ERD) adalah salah satu teknik pemodelan data yang paling umum digunakan.

Komponen ERD:
- Entitas (Entity)
- Atribut (Attribute)
- Hubungan (Relationship)
- Kardinalitas (Cardinality)`
  },
};

export default function ModuleContentScreen({ route }) {
  const { moduleId, moduleTitle } = route.params;
  const moduleData = DUMMY_CONTENT[moduleId] || { title: moduleTitle, content: 'Konten tidak ditemukan.' };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{moduleData.title}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{moduleData.content}</Text>
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
});
