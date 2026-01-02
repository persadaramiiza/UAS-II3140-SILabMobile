import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const STORAGE_KEY = '@moscow_requirements';

const CATEGORIES = [
  { 
    key: 'must', 
    label: 'Must Have', 
    color: '#DC2626', 
    bgColor: '#FEE2E2',
    description: 'Critical requirements that must be delivered.'
  },
  { 
    key: 'should', 
    label: 'Should Have', 
    color: '#EA580C', 
    bgColor: '#FED7AA',
    description: 'Important requirements that should be included.'
  },
  { 
    key: 'could', 
    label: 'Could Have', 
    color: '#2563EB', 
    bgColor: '#DBEAFE',
    description: 'Desirable requirements that could improve the system.'
  },
  { 
    key: 'wont', 
    label: "Won't Have", 
    color: '#6B7280', 
    bgColor: '#F3F4F6',
    description: 'Requirements that will not be implemented this time.'
  },
];

export default function RequirementsEngineeringScreen() {
  const navigation = useNavigation();
  const [requirements, setRequirements] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReq, setNewReq] = useState({
    title: '',
    stakeholder: '',
    acceptanceCriteria: '',
    category: 'must',
  });
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  useEffect(() => {
    loadRequirements();
  }, []);

  const loadRequirements = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRequirements(JSON.parse(stored));
      } else {
        setRequirements([]);
      }
    } catch (error) {
      console.error('Error loading requirements:', error);
      setRequirements([]);
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
    if (!newReq.title.trim()) {
      Alert.alert('Error', 'Please enter a requirement title');
      return;
    }

    const req = {
      id: Date.now().toString(),
      title: newReq.title.trim(),
      stakeholder: newReq.stakeholder.trim() || 'Unassigned',
      acceptanceCriteria: newReq.acceptanceCriteria.trim() || 'No criteria specified',
      category: newReq.category,
    };

    saveRequirements([...requirements, req]);
    setNewReq({ title: '', stakeholder: '', acceptanceCriteria: '', category: 'must' });
    setShowAddForm(false);
  };

  const deleteRequirement = (id) => {
    Alert.alert('Delete Requirement', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => saveRequirements(requirements.filter((r) => r.id !== id)),
      },
    ]);
  };

  const getRequirementsByCategory = (key) => requirements.filter((r) => r.category === key);
  const getCategoryLabel = (key) => CATEGORIES.find((c) => c.key === key)?.label || 'Must Have';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#0F2A71" />
          </TouchableOpacity>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddForm(!showAddForm)}>
              <Ionicons name="add" size={16} color="#111" />
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exportBtn} onPress={() => Alert.alert('Export', 'Exported!')}>
              <Ionicons name="download-outline" size={16} color="#FFF" />
              <Text style={styles.exportBtnText}>Export</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.headerTitle}>MoSCoW Requirements</Text>
        <Text style={styles.headerSubtitle}>Prioritize and manage requirements</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add Form */}
        {showAddForm && (
          <View style={styles.addFormCard}>
            <Text style={styles.addFormTitle}>Add New Requirement</Text>
            <TextInput
              style={styles.input}
              placeholder="Requirement Title"
              placeholderTextColor="#9CA3AF"
              value={newReq.title}
              onChangeText={(t) => setNewReq({ ...newReq, title: t })}
            />
            <TextInput
              style={styles.input}
              placeholder="Stakeholder"
              placeholderTextColor="#9CA3AF"
              value={newReq.stakeholder}
              onChangeText={(t) => setNewReq({ ...newReq, stakeholder: t })}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Acceptance Criteria"
              placeholderTextColor="#9CA3AF"
              value={newReq.acceptanceCriteria}
              onChangeText={(t) => setNewReq({ ...newReq, acceptanceCriteria: t })}
              multiline
              textAlignVertical="top"
            />
            <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowCategoryPicker(!showCategoryPicker)}>
              <Text style={styles.pickerBtnText}>{getCategoryLabel(newReq.category)}</Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
            {showCategoryPicker && (
              <View style={styles.dropdown}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.key}
                    style={[styles.dropdownItem, newReq.category === cat.key && styles.dropdownItemActive]}
                    onPress={() => { setNewReq({ ...newReq, category: cat.key }); setShowCategoryPicker(false); }}
                  >
                    <View style={[styles.dot, { backgroundColor: cat.color }]} />
                    <Text style={styles.dropdownItemText}>{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View style={styles.formBtns}>
              <TouchableOpacity style={styles.submitBtn} onPress={addRequirement}>
                <Text style={styles.submitBtnText}>Add Requirement</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowAddForm(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Category Sections */}
        {CATEGORIES.map((cat) => {
          const reqs = getRequirementsByCategory(cat.key);
          return (
            <View key={cat.key} style={styles.categorySection}>
              <View style={styles.catHeader}>
                <View style={[styles.dot, { backgroundColor: cat.color }]} />
                <Text style={styles.catTitle}>{cat.label}</Text>
                <View style={[styles.badge, { backgroundColor: cat.color }]}>
                  <Text style={styles.badgeText}>{reqs.length}</Text>
                </View>
              </View>
              <Text style={styles.catDesc}>{cat.description}</Text>
              {reqs.map((req) => (
                <View key={req.id} style={[styles.reqCard, { borderLeftColor: cat.color }]}>
                  <View style={styles.cardRow}>
                    <View style={styles.dragHandle}>
                      <Ionicons name="ellipsis-vertical" size={14} color="#9CA3AF" />
                      <Ionicons name="ellipsis-vertical" size={14} color="#9CA3AF" style={{ marginLeft: -8 }} />
                    </View>
                    <View style={styles.cardBody}>
                      <Text style={styles.reqTitle}>{req.title}</Text>
                      <Text style={styles.reqStakeholder}>{req.stakeholder}</Text>
                      <View style={[styles.criteriaBox, { backgroundColor: cat.bgColor }]}>
                        <Text style={styles.criteriaText}>{req.acceptanceCriteria}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteRequirement(req.id)}>
                      <Ionicons name="trash-outline" size={16} color="#DC2626" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          );
        })}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingHorizontal: 16, paddingTop: 40, paddingBottom: 16 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerButtons: { flexDirection: 'row', gap: 8 },
  addBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, gap: 6 },
  addBtnText: { fontSize: 14, color: '#111', fontWeight: '500' },
  exportBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F2A71', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, gap: 6 },
  exportBtnText: { fontSize: 14, color: '#FFF', fontWeight: '500' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFB800', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: '#6B6B6B' },
  content: { flex: 1, padding: 16 },
  addFormCard: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#E8E8E8', padding: 16, marginBottom: 16 },
  addFormTitle: { fontSize: 16, fontWeight: '600', color: '#111', marginBottom: 12 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#111', marginBottom: 12 },
  textArea: { minHeight: 70, textAlignVertical: 'top' },
  pickerBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  pickerBtnText: { fontSize: 14, color: '#111' },
  dropdown: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 8, marginBottom: 12, overflow: 'hidden' },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  dropdownItemActive: { backgroundColor: '#F5F5F5' },
  dropdownItemText: { fontSize: 14, color: '#111' },
  formBtns: { flexDirection: 'row', gap: 8 },
  submitBtn: { flex: 1, backgroundColor: '#0F2A71', borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  submitBtnText: { fontSize: 14, fontWeight: '600', color: '#FFF' },
  cancelBtn: { flex: 1, backgroundColor: '#F5F5F5', borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  cancelBtnText: { fontSize: 14, fontWeight: '500', color: '#111' },
  categorySection: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#E8E8E8', padding: 16, marginBottom: 16 },
  catHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  catTitle: { fontSize: 16, fontWeight: '600', color: '#111' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, minWidth: 24, alignItems: 'center' },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#FFF' },
  catDesc: { fontSize: 12, color: '#6B6B6B', marginBottom: 12 },
  reqCard: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E8E8E8', borderLeftWidth: 4, borderRadius: 12, marginBottom: 8 },
  cardRow: { flexDirection: 'row', padding: 12, alignItems: 'flex-start' },
  dragHandle: { flexDirection: 'row', marginRight: 8, marginTop: 4 },
  cardBody: { flex: 1 },
  reqTitle: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 4 },
  reqStakeholder: { fontSize: 12, color: '#6B6B6B', marginBottom: 8 },
  criteriaBox: { borderRadius: 8, padding: 8 },
  criteriaText: { fontSize: 12, color: '#111', lineHeight: 18 },
  deleteBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
});
