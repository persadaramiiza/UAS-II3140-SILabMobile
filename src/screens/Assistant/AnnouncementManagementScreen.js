import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { 
  fetchAnnouncements, 
  createAnnouncement, 
  deleteAnnouncement 
} from '../../services/announcementsApi';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function AnnouncementManagementScreen({ navigation }) {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('normal');
  const [submitting, setSubmitting] = useState(false);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await fetchAnnouncements();
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Failed to load announcements:', error);
      // Mock data fallback
      setAnnouncements([
        {
          id: 1,
          title: 'Lab Session Schedule Update',
          content: 'Lab sessions for next week will be held on Tuesday and Thursday at 2 PM. Please make sure to attend on time.',
          created_at: '2025-12-25',
          priority: 'important',
          views: 38,
        },
        {
          id: 2,
          title: 'New Assignment Posted',
          content: 'Database ERD Assignment has been posted. Due date is December 28, 2025.',
          created_at: '2025-12-22',
          priority: 'normal',
          views: 42,
        },
        {
          id: 3,
          title: 'Office Hours Reminder',
          content: 'Office hours are available every Monday and Wednesday from 1-3 PM at Lab 1.',
          created_at: '2025-12-20',
          priority: 'normal',
          views: 35,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadAnnouncements();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAnnouncements();
    setRefreshing(false);
  };

  const handleDelete = (announcement) => {
    Alert.alert(
      'Delete Announcement',
      `Are you sure you want to delete "${announcement.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAnnouncement(announcement.id);
              await loadAnnouncements();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete announcement');
            }
          },
        },
      ]
    );
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setPriority('normal');
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Error', 'Content is required');
      return;
    }

    setSubmitting(true);
    try {
      await createAnnouncement({
        title: title.trim(),
        content: content.trim(),
        priority,
        created_by: user?.id,
      });
      
      setModalVisible(false);
      resetForm();
      await loadAnnouncements();
      Alert.alert('Success', 'Announcement published successfully');
    } catch (error) {
      console.error('Failed to create announcement:', error);
      Alert.alert('Error', 'Failed to publish announcement');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const AnnouncementCard = ({ announcement }) => {
    const isImportant = announcement.priority === 'important';
    
    return (
      <View style={[styles.card, isImportant && styles.cardImportant]}>
        {isImportant && (
          <View style={styles.importantBadge}>
            <Ionicons name="alert-circle" size={14} color="#EF4444" />
            <Text style={styles.importantText}>Important</Text>
          </View>
        )}
        
        <Text style={styles.cardTitle}>{announcement.title}</Text>
        <Text style={styles.cardContent} numberOfLines={2}>
          {announcement.content}
        </Text>
        
        <View style={styles.cardFooter}>
          <View style={styles.cardMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color="#6B7280" />
              <Text style={styles.metaText}>{formatDate(announcement.created_at)}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={14} color="#6B7280" />
              <Text style={styles.metaText}>{announcement.views || 0} views</Text>
            </View>
          </View>
          
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('EditAnnouncement', { announcement })}
            >
              <Ionicons name="pencil" size={18} color="#F59E0B" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDelete(announcement)}
            >
              <Ionicons name="trash" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#F59E0B', '#FBBF24', '#FCD34D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Announcements</Text>
            <Text style={styles.headerSubtitle}>Create and manage announcements for students</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={24} color="#F59E0B" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Announcements List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {announcements.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="megaphone-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No announcements yet</Text>
          </View>
        ) : (
          announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* New Announcement Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Announcement</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter announcement title"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Content</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={content}
                onChangeText={setContent}
                placeholder="Enter announcement content"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Priority</Text>
              <View style={styles.priorityButtons}>
                <TouchableOpacity
                  style={[
                    styles.priorityButton,
                    priority === 'normal' && styles.priorityButtonActive,
                  ]}
                  onPress={() => setPriority('normal')}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      priority === 'normal' && styles.priorityButtonTextActive,
                    ]}
                  >
                    Normal
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priorityButton,
                    priority === 'important' && styles.priorityButtonImportant,
                  ]}
                  onPress={() => setPriority('important')}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      priority === 'important' && styles.priorityButtonTextImportant,
                    ]}
                  >
                    Important
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  resetForm();
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.publishButton, submitting && styles.buttonDisabled]}
                onPress={handlePublish}
                disabled={submitting}
              >
                <Ionicons name="send" size={16} color="#FFFFFF" />
                <Text style={styles.publishButtonText}>
                  {submitting ? 'Publishing...' : 'Publish'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Preview */}
            {(title || content) && (
              <View style={styles.previewSection}>
                <View style={[styles.previewCard, priority === 'important' && styles.previewCardImportant]}>
                  {priority === 'important' && (
                    <View style={styles.importantBadge}>
                      <Ionicons name="alert-circle" size={14} color="#EF4444" />
                      <Text style={styles.importantText}>Important</Text>
                    </View>
                  )}
                  <Text style={styles.previewTitle}>{title || 'Announcement Title'}</Text>
                  <Text style={styles.previewContent} numberOfLines={2}>
                    {content || 'Announcement content will appear here...'}
                  </Text>
                </View>
              </View>
            )}
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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImportant: {
    borderColor: '#FCA5A5',
    borderWidth: 1.5,
  },
  importantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  importantText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  cardContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardMeta: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  cardActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  priorityButtons: {
    flexDirection: 'row',
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  priorityButtonActive: {
    backgroundColor: '#0F2A71',
    borderColor: '#0F2A71',
  },
  priorityButtonImportant: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  priorityButtonTextActive: {
    color: '#FFFFFF',
  },
  priorityButtonTextImportant: {
    color: '#FFFFFF',
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  publishButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  publishButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  previewSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  previewCardImportant: {
    borderColor: '#FCA5A5',
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  previewContent: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
});
