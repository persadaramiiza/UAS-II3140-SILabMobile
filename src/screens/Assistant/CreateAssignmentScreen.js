import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { createAssignment } from '../../services/assignmentsApi';
import { useAuth } from '../../contexts/AuthContext';

export default function CreateAssignmentScreen({ navigation }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    course: '',
    description: '',
  });
  const [attachments, setAttachments] = useState([]);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true,
      });

      if (!result.canceled && result.assets) {
        const newAttachments = result.assets.map((asset) => ({
          name: asset.name,
          uri: asset.uri,
          size: asset.size,
        }));
        setAttachments((prev) => [...prev, ...newAttachments]);
      }
    } catch (error) {
      console.error('Document picker error:', error);
    }
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      Alert.alert('Error', 'Assignment title is required');
      return false;
    }
    if (!form.course.trim()) {
      Alert.alert('Error', 'Course/Focus is required');
      return false;
    }
    if (!form.description.trim()) {
      Alert.alert('Error', 'Description is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const assignmentData = {
        title: form.title.trim(),
        focus: form.course.trim(),
        description: form.description.trim(),
      };

      await createAssignment(assignmentData);
      Alert.alert('Success', 'Assignment created successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Failed to create assignment:', error);
      Alert.alert('Error', 'Failed to create assignment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <LinearGradient
        colors={['#0F2A71', '#1E3A8A']}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Create Assignment</Text>
            <Text style={styles.headerSubtitle}>Add new assignment for students</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Assignment Title *</Text>
          <TextInput
            style={styles.input}
            value={form.title}
            onChangeText={(value) => handleInputChange('title', value)}
            placeholder="Enter assignment title"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Course/Focus */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Course/Focus *</Text>
          <TextInput
            style={styles.input}
            value={form.course}
            onChangeText={(value) => handleInputChange('course', value)}
            placeholder="Enter course or focus area (e.g., EA, ERD, SD)"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Description */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={form.description}
            onChangeText={(value) => handleInputChange('description', value)}
            placeholder="Enter assignment description and requirements"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* Attachments */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Attachments (Optional)</Text>
          
          {attachments.map((file, index) => (
            <View key={index} style={styles.attachmentItem}>
              <Ionicons name="document-outline" size={20} color="#0F2A71" />
              <Text style={styles.attachmentName} numberOfLines={1}>
                {file.name}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveAttachment(index)}
                style={styles.removeButton}
              >
                <Ionicons name="close-circle" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addAttachmentButton}
            onPress={handleAddAttachment}
          >
            <Ionicons name="add-circle-outline" size={20} color="#0F2A71" />
            <Text style={styles.addAttachmentText}>Add Attachment</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Creating...' : 'Create Assignment'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  inputText: {
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  row: {
    flexDirection: 'row',
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  attachmentName: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    marginLeft: 10,
  },
  removeButton: {
    padding: 4,
  },
  addAttachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0F2A71',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 14,
  },
  addAttachmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F2A71',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#0F2A71',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
