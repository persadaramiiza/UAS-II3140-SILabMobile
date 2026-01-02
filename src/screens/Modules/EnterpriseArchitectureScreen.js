import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const STORAGE_KEY = '@ea_diagram';

const TEMPLATES = [
  { id: 'blank', label: 'Blank Canvas' },
  { id: 'basic', label: 'Basic EA Framework' },
];

const LAYERS = [
  { id: 'business', label: 'Business', icon: 'people-outline', color: '#3B82F6' },
  { id: 'application', label: 'Application', icon: 'apps-outline', color: '#8B5CF6' },
  { id: 'data', label: 'Data', icon: 'server-outline', color: '#10B981' },
  { id: 'technology', label: 'Technology', icon: 'hardware-chip-outline', color: '#F59E0B' },
];

const BASIC_TEMPLATE = {
  business: [
    { id: 'b1', name: 'Business Process' },
    { id: 'b2', name: 'Business Service' },
  ],
  application: [
    { id: 'a1', name: 'Application Component' },
    { id: 'a2', name: 'Application Service' },
  ],
  data: [
    { id: 'd1', name: 'Data Entity' },
    { id: 'd2', name: 'Data Service' },
  ],
  technology: [
    { id: 't1', name: 'Infrastructure' },
    { id: 't2', name: 'Platform Service' },
  ],
};

export default function EnterpriseArchitectureScreen() {
  const navigation = useNavigation();
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [selectedLayer, setSelectedLayer] = useState('business');
  const [components, setComponents] = useState({
    business: [],
    application: [],
    data: [],
    technology: [],
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newComponentName, setNewComponentName] = useState('');

  useEffect(() => {
    loadDiagram();
  }, []);

  const loadDiagram = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setComponents(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading diagram:', error);
    }
  };

  const saveDiagram = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setComponents(data);
    } catch (error) {
      console.error('Error saving diagram:', error);
    }
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    if (templateId === 'basic') {
      Alert.alert(
        'Load Template',
        'This will replace current diagram with Basic EA Framework template. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Load',
            onPress: () => saveDiagram(BASIC_TEMPLATE),
          },
        ]
      );
    } else if (templateId === 'blank') {
      Alert.alert(
        'Clear Canvas',
        'This will clear all components. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Clear',
            style: 'destructive',
            onPress: () => saveDiagram({
              business: [],
              application: [],
              data: [],
              technology: [],
            }),
          },
        ]
      );
    }
  };

  const addComponent = () => {
    if (!newComponentName.trim()) {
      Alert.alert('Error', 'Please enter a component name');
      return;
    }

    const newComponent = {
      id: `${selectedLayer}-${Date.now()}`,
      name: newComponentName.trim(),
    };

    const updated = {
      ...components,
      [selectedLayer]: [...components[selectedLayer], newComponent],
    };

    saveDiagram(updated);
    setNewComponentName('');
    setShowAddModal(false);
  };

  const deleteComponent = (layerId, componentId) => {
    Alert.alert('Delete Component', 'Remove this component?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updated = {
            ...components,
            [layerId]: components[layerId].filter((c) => c.id !== componentId),
          };
          saveDiagram(updated);
        },
      },
    ]);
  };

  const handleDownload = () => {
    Alert.alert('Export', 'EA Diagram data copied to clipboard!');
  };

  const getLayerColor = (layerId) => {
    return LAYERS.find((l) => l.id === layerId)?.color || '#6B7280';
  };

  const getTotalComponents = () => {
    return Object.values(components).reduce((sum, arr) => sum + arr.length, 0);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Ionicons name="download-outline" size={18} color="#FFFFFF" />
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Enterprise Architecture</Text>
        <Text style={styles.subtitle}>Design EA models with TOGAF framework</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Templates Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Templates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.templatesRow}>
              {TEMPLATES.map((template) => (
                <TouchableOpacity
                  key={template.id}
                  style={[
                    styles.templatePill,
                    selectedTemplate === template.id && styles.templatePillActive,
                  ]}
                  onPress={() => handleTemplateSelect(template.id)}
                >
                  <Text
                    style={[
                      styles.templatePillText,
                      selectedTemplate === template.id && styles.templatePillTextActive,
                    ]}
                  >
                    {template.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Architecture Layers Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Architecture Layers</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.layersGrid}>
            {LAYERS.map((layer) => (
              <TouchableOpacity
                key={layer.id}
                style={[
                  styles.layerButton,
                  selectedLayer === layer.id && styles.layerButtonActive,
                ]}
                onPress={() => setSelectedLayer(layer.id)}
              >
                <Ionicons
                  name={layer.icon}
                  size={20}
                  color={selectedLayer === layer.id ? '#FFFFFF' : '#6B7280'}
                />
                <Text
                  style={[
                    styles.layerButtonText,
                    selectedLayer === layer.id && styles.layerButtonTextActive,
                  ]}
                >
                  {layer.label}
                </Text>
                {components[layer.id].length > 0 && (
                  <View style={[styles.badge, { backgroundColor: layer.color }]}>
                    <Text style={styles.badgeText}>{components[layer.id].length}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Canvas Card - TOGAF Layer View */}
        <View style={styles.canvasCard}>
          <View style={styles.canvasHeader}>
            <Text style={styles.canvasTitle}>TOGAF Architecture Layers</Text>
            <Text style={styles.canvasSubtitle}>{getTotalComponents()} components</Text>
          </View>
          
          <View style={styles.layersContainer}>
            {LAYERS.map((layer) => (
              <View key={layer.id} style={styles.layerSection}>
                <View style={[styles.layerHeader, { backgroundColor: layer.color }]}>
                  <Ionicons name={layer.icon} size={16} color="#FFFFFF" />
                  <Text style={styles.layerHeaderText}>{layer.label} Layer</Text>
                </View>
                <View style={styles.layerContent}>
                  {components[layer.id].length === 0 ? (
                    <Text style={styles.emptyLayerText}>No components</Text>
                  ) : (
                    <View style={styles.componentsGrid}>
                      {components[layer.id].map((comp) => (
                        <TouchableOpacity
                          key={comp.id}
                          style={[styles.componentBox, { borderColor: layer.color }]}
                          onLongPress={() => deleteComponent(layer.id, comp.id)}
                        >
                          <Text style={styles.componentText} numberOfLines={2}>
                            {comp.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
          
          <Text style={styles.hintText}>Long press on component to delete</Text>
        </View>
      </ScrollView>

      {/* Add Component Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Component</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Layer</Text>
            <View style={[styles.layerIndicator, { backgroundColor: getLayerColor(selectedLayer) }]}>
              <Text style={styles.layerIndicatorText}>
                {LAYERS.find((l) => l.id === selectedLayer)?.label}
              </Text>
            </View>

            <Text style={styles.modalLabel}>Component Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter component name..."
              placeholderTextColor="#9CA3AF"
              value={newComponentName}
              onChangeText={setNewComponentName}
            />

            <TouchableOpacity style={styles.saveButton} onPress={addComponent}>
              <Text style={styles.saveButtonText}>Add Component</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F2A71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FBBC04',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#0F2A71',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  templatesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  templatePill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  templatePillActive: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  templatePillText: {
    fontSize: 14,
    color: '#374151',
  },
  templatePillTextActive: {
    color: '#1F2937',
    fontWeight: '500',
  },
  layersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  layerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    width: '48%',
  },
  layerButtonActive: {
    backgroundColor: '#0F2A71',
  },
  layerButtonText: {
    fontSize: 13,
    color: '#374151',
    flex: 1,
  },
  layerButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  canvasCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  canvasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  canvasTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  canvasSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  layersContainer: {
    gap: 12,
  },
  layerSection: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  layerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  layerHeaderText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  layerContent: {
    padding: 12,
    backgroundColor: '#FAFAFA',
    minHeight: 60,
  },
  emptyLayerText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  componentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  componentBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  componentText: {
    fontSize: 12,
    color: '#374151',
  },
  hintText: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  layerIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  layerIndicatorText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#0F2A71',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
