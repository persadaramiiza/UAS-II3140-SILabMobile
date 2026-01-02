import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const MODULES = [
  { 
    id: 'Requirements', 
    title: 'Requirements', 
    description: 'MoSCoW prioritization board',
    icon: 'grid-outline',
    color: '#EFF6FF',
    iconColor: '#0F2A71'
  },
  { 
    id: 'Enterprise Architecture', 
    title: 'Enterprise Architecture', 
    description: 'Value stream & capabilities',
    icon: 'business-outline',
    color: '#FAF5FF',
    iconColor: '#9810FA'
  },
  { 
    id: 'Diagram Builder', 
    title: 'Diagram Viewer', 
    description: 'System modeling tools',
    icon: 'pencil-outline',
    color: '#F0FDF4',
    iconColor: '#00A63E'
  },
  { 
    id: 'Conceptual Modeling', 
    title: 'ERD Viewer', 
    description: 'Entity relationship design',
    icon: 'server-outline',
    color: '#FFF7ED',
    iconColor: '#F54900'
  },
];

export default function ModulesScreen({ navigation }) {
  const handlePress = (moduleId, moduleTitle) => {
    navigation.navigate('ModuleContent', { moduleId, moduleTitle });
  };

  return (
    <View style={styles.container}>
      {/* Header with Gradient Background */}
      <LinearGradient
        colors={['#0F2A71', '#FBBC04']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Tools</Text>
        <Text style={styles.headerSubtitle}>System analysis and design tools</Text>
      </LinearGradient>

      {/* Tools Grid */}
      <FlatList
        data={MODULES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handlePress(item.id, item.title)}
            activeOpacity={0.7}
          >
            {/* Icon Container */}
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={24} color={item.iconColor} />
            </View>

            {/* Title */}
            <Text style={styles.cardTitle}>{item.title}</Text>

            {/* Description */}
            <Text style={styles.cardDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA' 
  },
  
  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    lineHeight: 20,
  },
  
  // Grid
  gridContainer: {
    padding: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 16,
    padding: 20,
    width: (width - 64) / 2, // 24px padding on each side + 16px gap
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111111',
    marginBottom: 8,
    lineHeight: 24,
  },
  cardDescription: {
    fontSize: 13,
    color: '#6B6B6B',
    lineHeight: 18,
  },
});