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
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@erd_diagram';

const RELATIONSHIP_TYPES = [
  { key: '1-1', label: 'One to One (1:1)', symbol: '—' },
  { key: '1-M', label: 'One to Many (1:M)', symbol: '—<' },
  { key: 'M-M', label: 'Many to Many (M:M)', symbol: '>—<' },
];

export default function ERDBuilderScreen() {
  const [entities, setEntities] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [showEntityModal, setShowEntityModal] = useState(false);
  const [showRelationModal, setShowRelationModal] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null);
  
  const [entityName, setEntityName] = useState('');
  const [attributes, setAttributes] = useState([{ name: '', isPK: false, isFK: false }]);
  
  const [fromEntity, setFromEntity] = useState('');
  const [toEntity, setToEntity] = useState('');
  const [relationType, setRelationType] = useState('1-M');

  useEffect(() => {
    loadDiagram();
  }, []);

  const loadDiagram = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setEntities(data.entities || []);
        setRelationships(data.relationships || []);
      }
    } catch (error) {
      console.error('Error loading diagram:', error);
    }
  };

  const saveDiagram = async (ents, rels) => {
    try {
      const data = { entities: ents, relationships: rels };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setEntities(ents);
      setRelationships(rels);
    } catch (error) {
      console.error('Error saving diagram:', error);
    }
  };

  const openEntityModal = (entity = null) => {
    if (entity) {
      setEditingEntity(entity);
      setEntityName(entity.name);
      setAttributes(entity.attributes);
    } else {
      setEditingEntity(null);
      setEntityName('');
      setAttributes([{ name: '', isPK: false, isFK: false }]);
    }
    setShowEntityModal(true);
  };

  const saveEntity = () => {
    if (!entityName.trim()) {
      Alert.alert('Error', 'Entity name is required');
      return;
    }

    const validAttrs = attributes.filter((attr) => attr.name.trim());
    if (validAttrs.length === 0) {
      Alert.alert('Error', 'At least one attribute is required');
      return;
    }

    const entity = {
      id: editingEntity?.id || `entity-${Date.now()}`,
      name: entityName.trim(),
      attributes: validAttrs,
    };

    let updated;
    if (editingEntity) {
      updated = entities.map((e) => (e.id === editingEntity.id ? entity : e));
    } else {
      updated = [...entities, entity];
    }

    saveDiagram(updated, relationships);
    setShowEntityModal(false);
  };

  const deleteEntity = (id) => {
    Alert.alert('Delete Entity', 'This will also remove related relationships.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedEntities = entities.filter((e) => e.id !== id);
          const updatedRelationships = relationships.filter(
            (r) => r.from !== id && r.to !== id
          );
          saveDiagram(updatedEntities, updatedRelationships);
        },
      },
    ]);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { name: '', isPK: false, isFK: false }]);
  };

  const updateAttribute = (index, field, value) => {
    const updated = attributes.map((attr, i) =>
      i === index ? { ...attr, [field]: value } : attr
    );
    setAttributes(updated);
  };

  const removeAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const saveRelationship = () => {
    if (!fromEntity || !toEntity) {
      Alert.alert('Error', 'Please select both entities');
      return;
    }

    if (fromEntity === toEntity) {
      Alert.alert('Error', 'Cannot relate an entity to itself');
      return;
    }

    const relation = {
      id: `rel-${Date.now()}`,
      from: fromEntity,
      to: toEntity,
      type: relationType,
    };

    saveDiagram(entities, [...relationships, relation]);
    closeRelationModal();
  };

  const closeRelationModal = () => {
    setShowRelationModal(false);
    setFromEntity('');
    setToEntity('');
    setRelationType('1-M');
  };

  const deleteRelationship = (id) => {
    const updated = relationships.filter((r) => r.id !== id);
    saveDiagram(entities, updated);
  };

  const clearDiagram = () => {
    Alert.alert('Clear Diagram', 'Remove all entities and relationships?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => saveDiagram([], []),
      },
    ]);
  };

  const getEntityName = (id) => {
    return entities.find((e) => e.id === id)?.name || id;
  };

  const getRelationshipLabel = (type) => {
    return RELATIONSHIP_TYPES.find((r) => r.key === type)?.symbol || type;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F2A71', '#FBBC04']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.title}>ERD Viewer</Text>
        <Text style={styles.subtitle}>Entity Relationship Diagram Builder</Text>
      </LinearGradient>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { flex: 1 }]}
          onPress={() => openEntityModal()}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.actionButtonText}>Add Entity</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { flex: 1 }]}
          onPress={() => setShowRelationModal(true)}
          disabled={entities.length < 2}
        >
          <Ionicons name="git-branch-outline" size={18} color="#fff" />
          <Text style={styles.actionButtonText}>Add Relation</Text>
        </TouchableOpacity>
        {entities.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearDiagram}>
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        {entities.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="git-network-outline" size={64} color="#374151" />
            <Text style={styles.emptyText}>No entities yet</Text>
            <Text style={styles.emptyHint}>
              Create entities to start building your ERD
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Entities ({entities.length})
              </Text>
              {entities.map((entity) => (
                <EntityCard
                  key={entity.id}
                  entity={entity}
                  onEdit={() => openEntityModal(entity)}
                  onDelete={() => deleteEntity(entity.id)}
                />
              ))}
            </View>

            {relationships.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Relationships ({relationships.length})
                </Text>
                {relationships.map((rel) => (
                  <RelationshipCard
                    key={rel.id}
                    relationship={rel}
                    fromName={getEntityName(rel.from)}
                    toName={getEntityName(rel.to)}
                    symbol={getRelationshipLabel(rel.type)}
                    onDelete={() => deleteRelationship(rel.id)}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Entity Modal */}
      <Modal
        visible={showEntityModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEntityModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingEntity ? 'Edit' : 'Add'} Entity
              </Text>
              <TouchableOpacity onPress={() => setShowEntityModal(false)}>
                <Ionicons name="close" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Text style={styles.label}>Entity Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., User, Product, Order"
                placeholderTextColor="#6b7280"
                value={entityName}
                onChangeText={setEntityName}
              />

              <Text style={styles.label}>Attributes</Text>
              {attributes.map((attr, index) => (
                <View key={index} style={styles.attributeRow}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Attribute name"
                    placeholderTextColor="#6b7280"
                    value={attr.name}
                    onChangeText={(value) =>
                      updateAttribute(index, 'name', value)
                    }
                  />
                  <TouchableOpacity
                    style={[
                      styles.keyButton,
                      attr.isPK && styles.keyButtonActive,
                    ]}
                    onPress={() =>
                      updateAttribute(index, 'isPK', !attr.isPK)
                    }
                  >
                    <Text
                      style={[
                        styles.keyButtonText,
                        attr.isPK && styles.keyButtonTextActive,
                      ]}
                    >
                      PK
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.keyButton,
                      attr.isFK && styles.keyButtonActive,
                    ]}
                    onPress={() =>
                      updateAttribute(index, 'isFK', !attr.isFK)
                    }
                  >
                    <Text
                      style={[
                        styles.keyButtonText,
                        attr.isFK && styles.keyButtonTextActive,
                      ]}
                    >
                      FK
                    </Text>
                  </TouchableOpacity>
                  {attributes.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeAttribute(index)}
                      style={styles.removeButton}
                    >
                      <Ionicons name="close-circle" size={24} color="#ef4444" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <TouchableOpacity
                style={styles.addAttrButton}
                onPress={addAttribute}
              >
                <Ionicons name="add-circle-outline" size={20} color="#3b82f6" />
                <Text style={styles.addAttrButtonText}>Add Attribute</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveEntity}
              >
                <Text style={styles.saveButtonText}>
                  {editingEntity ? 'Update' : 'Create'} Entity
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Relationship Modal */}
      <Modal
        visible={showRelationModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeRelationModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '80%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Relationship</Text>
              <TouchableOpacity onPress={closeRelationModal}>
                <Ionicons name="close" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>From Entity</Text>
              <View style={styles.pickerContainer}>
                {entities.map((entity) => (
                  <TouchableOpacity
                    key={entity.id}
                    style={[
                      styles.pickerOption,
                      fromEntity === entity.id && styles.pickerOptionActive,
                    ]}
                    onPress={() => setFromEntity(entity.id)}
                  >
                    <Text
                      style={[
                        styles.pickerOptionText,
                        fromEntity === entity.id && styles.pickerOptionTextActive,
                      ]}
                    >
                      {entity.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Relationship Type</Text>
              <View style={styles.pickerContainer}>
                {RELATIONSHIP_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.pickerOption,
                      relationType === type.key && styles.pickerOptionActive,
                    ]}
                    onPress={() => setRelationType(type.key)}
                  >
                    <Text
                      style={[
                        styles.pickerOptionText,
                        relationType === type.key && styles.pickerOptionTextActive,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>To Entity</Text>
              <View style={styles.pickerContainer}>
                {entities.map((entity) => (
                  <TouchableOpacity
                    key={entity.id}
                    style={[
                      styles.pickerOption,
                      toEntity === entity.id && styles.pickerOptionActive,
                    ]}
                    onPress={() => setToEntity(entity.id)}
                  >
                    <Text
                      style={[
                        styles.pickerOptionText,
                        toEntity === entity.id && styles.pickerOptionTextActive,
                      ]}
                    >
                      {entity.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveRelationship}
              >
                <Text style={styles.saveButtonText}>Add Relationship</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function EntityCard({ entity, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.cardHeaderLeft}>
          <Ionicons name="document-text" size={20} color="#3b82f6" />
          <Text style={styles.cardTitle}>{entity.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{entity.attributes.length}</Text>
          </View>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
            <Ionicons name="create-outline" size={20} color="#3b82f6" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#9ca3af"
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.attributesList}>
          {entity.attributes.map((attr, idx) => (
            <View key={idx} style={styles.attributeItem}>
              <Text style={styles.attributeName}>{attr.name}</Text>
              <View style={styles.attributeKeys}>
                {attr.isPK && (
                  <View style={styles.keyTag}>
                    <Ionicons name="key" size={12} color="#facc15" />
                    <Text style={styles.keyTagText}>PK</Text>
                  </View>
                )}
                {attr.isFK && (
                  <View style={[styles.keyTag, { backgroundColor: '#3b82f6' }]}>
                    <Ionicons name="link" size={12} color="#fff" />
                    <Text style={styles.keyTagText}>FK</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function RelationshipCard({ relationship, fromName, toName, symbol, onDelete }) {
  return (
    <View style={styles.relationCard}>
      <View style={styles.relationContent}>
        <Text style={styles.relationText}>
          {fromName} <Text style={styles.relationSymbol}>{symbol}</Text> {toName}
        </Text>
        <Text style={styles.relationType}>{relationship.type}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F2A71',
    padding: 12,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 13 },
  clearButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DC2626',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, padding: 16, backgroundColor: '#FAFAFA' },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937', flex: 1 },
  cardActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconButton: { padding: 4 },
  badge: {
    backgroundColor: '#0F2A71',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  attributesList: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  attributeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  attributeName: { color: '#374151', fontSize: 14 },
  attributeKeys: { flexDirection: 'row', gap: 6 },
  keyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FBBC04',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  keyTagText: { color: '#1F2937', fontSize: 10, fontWeight: 'bold' },
  relationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  relationContent: { flex: 1 },
  relationText: { color: '#1F2937', fontSize: 14, marginBottom: 4 },
  relationSymbol: { color: '#0F2A71', fontWeight: 'bold' },
  relationType: { color: '#6B7280', fontSize: 12 },
  emptyState: { alignItems: 'center', padding: 48, marginTop: 60 },
  emptyText: {
    color: '#6B7280',
    fontSize: 18,
    marginTop: 16,
    fontWeight: '500',
  },
  emptyHint: { color: '#9CA3AF', fontSize: 14, marginTop: 8, textAlign: 'center' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  label: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  attributeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  keyButton: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  keyButtonActive: {
    backgroundColor: '#FBBC04',
    borderColor: '#FBBC04',
  },
  keyButtonText: { color: '#6B7280', fontSize: 12, fontWeight: 'bold' },
  keyButtonTextActive: { color: '#1F2937' },
  removeButton: { padding: 4 },
  addAttrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0F2A71',
    marginBottom: 20,
  },
  addAttrButtonText: { color: '#0F2A71', fontSize: 14, fontWeight: '500' },
  pickerContainer: { marginBottom: 16 },
  pickerOption: {
    padding: 14,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 8,
  },
  pickerOptionActive: {
    backgroundColor: '#0F2A71',
    borderColor: '#0F2A71',
  },
  pickerOptionText: { color: '#6B7280', fontSize: 14 },
  pickerOptionTextActive: { color: '#FFFFFF', fontWeight: '500' },
  saveButton: {
    backgroundColor: '#0F2A71',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});
