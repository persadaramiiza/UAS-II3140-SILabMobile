import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ea_mapping';

const DEFAULT_VALUE_STREAMS = [
  'Discovery',
  'Design',
  'Development',
  'Testing',
  'Deployment',
];

const DEFAULT_CAPABILITIES = [
  'Requirements Analysis',
  'System Design',
  'Database Modeling',
  'API Development',
  'UI/UX Design',
  'Quality Assurance',
];

export default function EnterpriseArchitectureScreen() {
  const [valueStreams, setValueStreams] = useState(DEFAULT_VALUE_STREAMS);
  const [capabilities, setCapabilities] = useState(DEFAULT_CAPABILITIES);
  const [mappings, setMappings] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('stream'); // 'stream' or 'capability'
  const [newItemName, setNewItemName] = useState('');
  const [editingMapping, setEditingMapping] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setValueStreams(data.valueStreams || DEFAULT_VALUE_STREAMS);
        setCapabilities(data.capabilities || DEFAULT_CAPABILITIES);
        setMappings(data.mappings || {});
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async (streams, caps, maps) => {
    try {
      const data = {
        valueStreams: streams,
        capabilities: caps,
        mappings: maps,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setValueStreams(streams);
      setCapabilities(caps);
      setMappings(maps);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const addItem = () => {
    if (!newItemName.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    if (addType === 'stream') {
      const updated = [...valueStreams, newItemName.trim()];
      saveData(updated, capabilities, mappings);
    } else {
      const updated = [...capabilities, newItemName.trim()];
      saveData(valueStreams, updated, mappings);
    }

    setNewItemName('');
    setShowAddModal(false);
  };

  const updateMapping = (stream, capability, intensity) => {
    const key = `${stream}:${capability}`;
    const updated = { ...mappings };
    
    if (intensity === 0) {
      delete updated[key];
    } else {
      updated[key] = intensity;
    }
    
    saveData(valueStreams, capabilities, updated);
    setEditingMapping(null);
  };

  const getMappingIntensity = (stream, capability) => {
    const key = `${stream}:${capability}`;
    return mappings[key] || 0;
  };

  const getHeatColor = (intensity) => {
    if (intensity === 0) return '#1f2937';
    if (intensity <= 25) return '#3b82f6';
    if (intensity <= 50) return '#22c55e';
    if (intensity <= 75) return '#f59e0b';
    return '#ef4444';
  };

  const resetAll = () => {
    Alert.alert('Reset All', 'Reset to default configuration?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => {
          saveData(DEFAULT_VALUE_STREAMS, DEFAULT_CAPABILITIES, {});
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Enterprise Architecture</Text>
        <Text style={styles.subtitle}>Value Stream × Capability Mapping</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.addButton, { flex: 1 }]}
          onPress={() => {
            setAddType('stream');
            setShowAddModal(true);
          }}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.addButtonText}>Stream</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addButton, { flex: 1 }]}
          onPress={() => {
            setAddType('capability');
            setShowAddModal(true);
          }}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.addButtonText}>Capability</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
          <Ionicons name="refresh-outline" size={20} color="#f59e0b" />
        </TouchableOpacity>
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Heat Intensity:</Text>
        <View style={styles.legendItems}>
          <LegendItem color="#1f2937" label="None" />
          <LegendItem color="#3b82f6" label="Low" />
          <LegendItem color="#22c55e" label="Med" />
          <LegendItem color="#f59e0b" label="High" />
          <LegendItem color="#ef4444" label="Critical" />
        </View>
      </View>

      <ScrollView horizontal style={styles.matrixScroll}>
        <View>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.cornerCell} />
            {valueStreams.map((stream, idx) => (
              <View key={idx} style={styles.headerCell}>
                <Text style={styles.headerText} numberOfLines={2}>
                  {stream}
                </Text>
              </View>
            ))}
          </View>

          {/* Matrix Rows */}
          <ScrollView style={styles.matrixContent}>
            {capabilities.map((capability, capIdx) => (
              <View key={capIdx} style={styles.matrixRow}>
                <View style={styles.rowHeader}>
                  <Text style={styles.rowHeaderText} numberOfLines={2}>
                    {capability}
                  </Text>
                </View>
                {valueStreams.map((stream, streamIdx) => {
                  const intensity = getMappingIntensity(stream, capability);
                  const heatColor = getHeatColor(intensity);
                  return (
                    <TouchableOpacity
                      key={streamIdx}
                      style={[styles.matrixCell, { backgroundColor: heatColor }]}
                      onPress={() =>
                        setEditingMapping({ stream, capability, intensity })
                      }
                    >
                      {intensity > 0 && (
                        <Text style={styles.cellText}>{intensity}</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Add Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Add {addType === 'stream' ? 'Value Stream' : 'Capability'}
              </Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder={`Enter ${addType} name...`}
              placeholderTextColor="#6b7280"
              value={newItemName}
              onChangeText={setNewItemName}
            />

            <TouchableOpacity style={styles.saveButton} onPress={addItem}>
              <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Mapping Modal */}
      <Modal
        visible={editingMapping !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setEditingMapping(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Heat Intensity</Text>
              <TouchableOpacity onPress={() => setEditingMapping(null)}>
                <Ionicons name="close" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            {editingMapping && (
              <>
                <View style={styles.mappingInfo}>
                  <Text style={styles.mappingLabel}>Value Stream:</Text>
                  <Text style={styles.mappingValue}>{editingMapping.stream}</Text>
                </View>
                <View style={styles.mappingInfo}>
                  <Text style={styles.mappingLabel}>Capability:</Text>
                  <Text style={styles.mappingValue}>{editingMapping.capability}</Text>
                </View>

                <View style={styles.sliderContainer}>
                  <Text style={styles.sliderLabel}>
                    Intensity: {editingMapping.intensity}%
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={25}
                    value={editingMapping.intensity}
                    onValueChange={(value) =>
                      setEditingMapping({ ...editingMapping, intensity: value })
                    }
                    minimumTrackTintColor={getHeatColor(editingMapping.intensity)}
                    maximumTrackTintColor="#374151"
                    thumbTintColor="#facc15"
                  />
                  <View style={styles.sliderMarks}>
                    <Text style={styles.sliderMark}>0</Text>
                    <Text style={styles.sliderMark}>25</Text>
                    <Text style={styles.sliderMark}>50</Text>
                    <Text style={styles.sliderMark}>75</Text>
                    <Text style={styles.sliderMark}>100</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() =>
                    updateMapping(
                      editingMapping.stream,
                      editingMapping.capability,
                      editingMapping.intensity
                    )
                  }
                >
                  <Text style={styles.saveButtonText}>Save Mapping</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

function LegendItem({ color, label }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendBox, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#1f2937' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#9ca3af' },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  resetButton: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#f59e0b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    padding: 16,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  legendTitle: { color: '#9ca3af', fontSize: 12, marginBottom: 8 },
  legendItems: { flexDirection: 'row', gap: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendBox: { width: 16, height: 16, borderRadius: 4 },
  legendLabel: { color: '#d1d5db', fontSize: 11 },
  matrixScroll: { flex: 1 },
  headerRow: { flexDirection: 'row', backgroundColor: '#111827' },
  cornerCell: { width: 120, height: 60, borderRightWidth: 2, borderBottomWidth: 2, borderColor: '#374151' },
  headerCell: {
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderColor: '#374151',
  },
  headerText: { color: '#fff', fontSize: 11, fontWeight: '600', textAlign: 'center' },
  matrixContent: { flex: 1 },
  matrixRow: { flexDirection: 'row' },
  rowHeader: {
    width: 120,
    minHeight: 60,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#111827',
    borderRightWidth: 2,
    borderBottomWidth: 1,
    borderColor: '#374151',
  },
  rowHeaderText: { color: '#fff', fontSize: 11, fontWeight: '500' },
  matrixCell: {
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#374151',
  },
  cellText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: { backgroundColor: '#111827', borderRadius: 16, padding: 24 },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  input: {
    backgroundColor: '#0a0f1e',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 14,
  },
  mappingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  mappingLabel: { color: '#9ca3af', fontSize: 14 },
  mappingValue: { color: '#fff', fontSize: 14, fontWeight: '500' },
  sliderContainer: { marginVertical: 20 },
  sliderLabel: { color: '#facc15', fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  slider: { width: '100%', height: 40 },
  sliderMarks: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  sliderMark: { color: '#6b7280', fontSize: 11 },
  saveButton: {
    backgroundColor: '#facc15',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});
