import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { updateAnnouncement, deleteAnnouncement } from '../../services/announcementsApi';

export default function EditAnnouncementScreen({ navigation, route }) {
  const { announcement } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
    priority: 'normal',
  });

  useEffect(() => {
    if (announcement) {
      setForm({
        title: announcement.title || '',
        content: announcement.content || '',
        priority: announcement.priority || 'normal',
      });
    }
  }, [announcement]);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      Alert.alert('Error', 'Title is required');
      return false;
    }
    if (!form.content.trim()) {
      Alert.alert('Error', 'Content is required');
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await updateAnnouncement(announcement.id, {
        title: form.title.trim(),
        content: form.content.trim(),
      });
      
      Alert.alert('Success', 'Announcement updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Failed to update announcement:', error);
      Alert.alert('Error', 'Failed to update announcement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Announcement',
      'Are you sure you want to delete this announcement? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAnnouncement(announcement.id);
              Alert.alert('Success', 'Announcement deleted', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete announcement');
            }
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <LinearGradient
        colors={['#F59E0B', '#FBBF24', '#FCD34D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
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
            <Text style={styles.headerTitle}>Edit Announcement</Text>
            <Text style={styles.headerSubtitle}>Update announcement details</Text>
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
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            value={form.title}
            onChangeText={(value) => handleInputChange('title', value)}
            placeholder="Enter announcement title"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Content */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Content *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={form.content}
            onChangeText={(value) => handleInputChange('content', value)}
            placeholder="Enter announcement content"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Priority */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Priority *</Text>
          <View style={styles.priorityButtons}>
            <TouchableOpacity
              style={[
                styles.priorityButton,
                form.priority === 'normal' && styles.priorityButtonNormalActive,
              ]}
              onPress={() => handleInputChange('priority', 'normal')}
            >
              <Text
                style={[
                  styles.priorityButtonText,
                  form.priority === 'normal' && styles.priorityButtonTextActive,
                ]}
              >
                Normal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.priorityButton,
                form.priority === 'important' && styles.priorityButtonImportantActive,
              ]}
              onPress={() => handleInputChange('priority', 'important')}
            >
              <Ionicons 
                name="alert-circle" 
                size={16} 
                color={form.priority === 'important' ? '#FFFFFF' : '#EF4444'} 
              />
              <Text
                style={[
                  styles.priorityButtonText,
                  form.priority === 'important' 
                    ? styles.priorityButtonTextActive 
                    : styles.priorityButtonTextImportant,
                ]}
              >
                Important
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
          <Text style={styles.deleteButtonText}>Delete Announcement</Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.updateButton, loading && styles.buttonDisabled]}
            onPress={handleUpdate}
            disabled={loading}
          >
            <Ionicons name="send" size={16} color="#FFFFFF" />
            <Text style={styles.updateButtonText}>
              {loading ? 'Updating...' : 'Update'}
            </Text>
          </TouchableOpacity>
        </View>

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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
    color: 'rgba(255, 255, 255, 0.8)',
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
  textArea: {
    minHeight: 150,
    paddingTop: 14,
  },
  priorityButtons: {
    flexDirection: 'row',
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  priorityButtonNormalActive: {
    backgroundColor: '#F3F4F6',
    borderColor: '#9CA3AF',
  },
  priorityButtonImportantActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 4,
  },
  priorityButtonTextActive: {
    color: '#FFFFFF',
  },
  priorityButtonTextImportant: {
    color: '#EF4444',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
    marginBottom: 20,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  updateButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
