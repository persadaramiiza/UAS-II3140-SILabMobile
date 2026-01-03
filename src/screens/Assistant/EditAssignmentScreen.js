import React, { useState, useEffect } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { updateAssignment } from '../../services/assignmentsApi';
import { useAuth } from '../../contexts/AuthContext';

export default function EditAssignmentScreen({ navigation, route }) {
  const { assignment } = route.params || {};
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    course: '',
    dueDate: new Date(),
    dueTime: new Date(),
    maxPoints: '100',
    description: '',
  });
  const [attachments, setAttachments] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (assignment) {
      const dueDate = assignment.due_date ? new Date(assignment.due_date) : new Date();
      setForm({
        title: assignment.title || '',
        course: assignment.course || '',
        dueDate: dueDate,
        dueTime: dueDate,
        maxPoints: assignment.max_points?.toString() || '100',
        description: assignment.description || '',
      });
      
      if (assignment.attachments) {
        setAttachments(assignment.attachments);
      }
    }
  }, [assignment]);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('dueDate', selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      handleInputChange('dueTime', selectedTime);
    }
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
      Alert.alert('Error', 'Course is required');
      return false;
    }
    if (!form.maxPoints || isNaN(parseInt(form.maxPoints))) {
      Alert.alert('Error', 'Please enter valid maximum points');
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
      // Combine date and time
      const dueDateTime = new Date(form.dueDate);
      dueDateTime.setHours(form.dueTime.getHours());
      dueDateTime.setMinutes(form.dueTime.getMinutes());

      const assignmentData = {
        title: form.title.trim(),
        course: form.course.trim(),
        due_date: dueDateTime.toISOString(),
        max_points: parseInt(form.maxPoints),
        description: form.description.trim(),
        updated_by: user?.id,
      };

      await updateAssignment(assignment.id, assignmentData);
      Alert.alert('Success', 'Assignment updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Failed to update assignment:', error);
      Alert.alert('Error', 'Failed to update assignment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
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
            <Text style={styles.headerTitle}>Edit Assignment</Text>
            <Text style={styles.headerSubtitle}>Update assignment details</Text>
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

        {/* Course */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Course *</Text>
          <TextInput
            style={styles.input}
            value={form.course}
            onChangeText={(value) => handleInputChange('course', value)}
            placeholder="Enter course name"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Due Date & Time */}
        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Due Date *</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.inputText}>{formatDate(form.dueDate)}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Due Time *</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.inputText}>{formatTime(form.dueTime)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={form.dueDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={form.dueTime}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {/* Maximum Points */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Maximum Points *</Text>
          <TextInput
            style={styles.input}
            value={form.maxPoints}
            onChangeText={(value) => handleInputChange('maxPoints', value)}
            placeholder="100"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
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
            {loading ? 'Updating...' : 'Update Assignment'}
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
