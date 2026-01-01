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
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@moscow_requirements';

const CATEGORIES = [
  { key: 'must', label: 'Must Have', color: '#ef4444', icon: 'alert-circle' },
  { key: 'should', label: 'Should Have', color: '#f59e0b', icon: 'warning' },
  { key: 'could', label: 'Could Have', color: '#3b82f6', icon: 'information-circle' },
  { key: 'wont', label: "Won't Have", color: '#6b7280', icon: 'close-circle' },
];

export default function RequirementsEngineeringScreen() {
  const [requirements, setRequirements] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRequirement, setNewRequirement] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('must');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadRequirements();
  }, []);

  const loadRequirements = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRequirements(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading requirements:', error);
    }
  };

  const saveRequirements = async (reqs) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reqs));
      setRequirements(reqs);
    } catch (error) {
      console.error('Error saving requirements:', error);
    }
  };

  const addRequirement = () => {
    if (!newRequirement.trim()) {
      Alert.alert('Error', 'Please enter a requirement');
      return;
    }

    const req = {
      id: Date.now().toString(),
      text: newRequirement.trim(),
      category: selectedCategory,
      createdAt: new Date().toISOString(),
    };

    const updated = [...requirements, req];
    saveRequirements(updated);
    setNewRequirement('');
    setShowAddModal(false);
  };

  const updateRequirement = (id, newCategory) => {
    const updated = requirements.map((req) =>
      req.id === id ? { ...req, category: newCategory } : req
    );
    saveRequirements(updated);
  };

  const deleteRequirement = (id) => {
    Alert.alert('Delete Requirement', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updated = requirements.filter((req) => req.id !== id);
          saveRequirements(updated);
        },
      },
    ]);
  };

  const getRequirementsByCategory = (category) => {
    return requirements.filter((req) => req.category === category);
  };

  const clearAll = () => {
    Alert.alert('Clear All', 'Delete all requirements?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => saveRequirements([]),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Requirements Engineering</Text>
        <Text style={styles.subtitle}>MoSCoW Prioritization Method</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Requirement</Text>
        </TouchableOpacity>
        {requirements.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <Ionicons name="trash-outline" size={18} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        {CATEGORIES.map((category) => (
          <CategorySection
            key={category.key}
            category={category}
            requirements={getRequirementsByCategory(category.key)}
            onMove={updateRequirement}
            onDelete={deleteRequirement}
          />
        ))}

        {requirements.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="documents-outline" size={64} color="#374151" />
            <Text style={styles.emptyText}>No requirements yet</Text>
            <Text style={styles.emptyHint}>
              Tap "Add Requirement" to start organizing your user stories
            </Text>
          </View>
        )}
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
              <Text style={styles.modalTitle}>Add Requirement</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter user story or requirement..."
              placeholderTextColor="#6b7280"
              value={newRequirement}
              onChangeText={setNewRequirement}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Priority Category</Text>
            <View style={styles.categoryPicker}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.categoryOption,
                    selectedCategory === cat.key && {
                      backgroundColor: cat.color,
                      borderColor: cat.color,
                    },
                  ]}
                  onPress={() => setSelectedCategory(cat.key)}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,
                      selectedCategory === cat.key && styles.categoryOptionTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={addRequirement}>
              <Text style={styles.saveButtonText}>Add to Board</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function CategorySection({ category, requirements, onMove, onDelete }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.categorySection}>
      <TouchableOpacity
        style={[styles.categoryHeader, { borderLeftColor: category.color }]}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.categoryHeaderLeft}>
          <Ionicons name={category.icon} size={20} color={category.color} />
          <Text style={styles.categoryTitle}>{category.label}</Text>
          <View style={[styles.badge, { backgroundColor: category.color }]}>
            <Text style={styles.badgeText}>{requirements.length}</Text>
          </View>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#9ca3af"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.requirementsList}>
          {requirements.length === 0 ? (
            <Text style={styles.emptyCategory}>No items in this category</Text>
          ) : (
            requirements.map((req) => (
              <RequirementCard
                key={req.id}
                requirement={req}
                category={category}
                onMove={onMove}
                onDelete={onDelete}
              />
            ))
          )}
        </View>
      )}
    </View>
  );
}

function RequirementCard({ requirement, category, onMove, onDelete }) {
  const [showActions, setShowActions] = useState(false);

  const moveToCategory = (newCategory) => {
    onMove(requirement.id, newCategory);
    setShowActions(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{requirement.text}</Text>
        <Text style={styles.cardDate}>
          {new Date(requirement.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowActions(!showActions)}
        >
          <Ionicons name="swap-horizontal" size={20} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onDelete(requirement.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>

      {showActions && (
        <View style={styles.moveMenu}>
          <Text style={styles.moveMenuTitle}>Move to:</Text>
          {CATEGORIES.filter((cat) => cat.key !== category.key).map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={styles.moveOption}
              onPress={() => moveToCategory(cat.key)}
            >
              <Ionicons name={cat.icon} size={16} color={cat.color} />
              <Text style={styles.moveOptionText}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#facc15',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  clearButton: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#ef4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  categorySection: { marginBottom: 16 },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 16,
    borderLeftWidth: 4,
  },
  categoryHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  categoryTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  requirementsList: { backgroundColor: '#0a0f1e', padding: 12 },
  emptyCategory: { color: '#6b7280', textAlign: 'center', padding: 16 },
  card: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardContent: { marginBottom: 8 },
  cardText: { color: '#e5e7eb', fontSize: 14, lineHeight: 20, marginBottom: 4 },
  cardDate: { color: '#6b7280', fontSize: 11 },
  cardActions: { flexDirection: 'row', gap: 8, justifyContent: 'flex-end' },
  actionButton: { padding: 4 },
  moveMenu: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
  },
  moveMenuTitle: { color: '#9ca3af', fontSize: 12, marginBottom: 8 },
  moveOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    backgroundColor: '#0a0f1e',
    borderRadius: 6,
    marginBottom: 4,
  },
  moveOptionText: { color: '#d1d5db', fontSize: 13 },
  emptyState: { alignItems: 'center', padding: 48 },
  emptyText: { color: '#9ca3af', fontSize: 18, marginTop: 16, fontWeight: '500' },
  emptyHint: { color: '#6b7280', fontSize: 14, marginTop: 8, textAlign: 'center' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#111827',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  input: {
    backgroundColor: '#0a0f1e',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    minHeight: 80,
    fontSize: 14,
  },
  label: { color: '#9ca3af', fontSize: 14, marginBottom: 12, fontWeight: '500' },
  categoryPicker: { flexDirection: 'column', gap: 8, marginBottom: 20 },
  categoryOption: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#374151',
    backgroundColor: '#0a0f1e',
  },
  categoryOptionText: { color: '#9ca3af', fontSize: 14, fontWeight: '500' },
  categoryOptionTextActive: { color: '#fff' },
  saveButton: {
    backgroundColor: '#facc15',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});
