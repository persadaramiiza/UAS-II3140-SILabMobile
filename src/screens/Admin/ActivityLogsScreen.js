import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../services/supabase';

export default function ActivityLogsScreen({ navigation }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Format relative time
  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return '';
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const loadActivities = async () => {
    try {
      setLoading(true);

      const allActivities = [];

      // 1. User registrations
      const { data: users } = await supabase
        .from('users')
        .select('id, name, email, student_id, role, created_at')
        .order('created_at', { ascending: false })
        .limit(30);

      users?.forEach((u) => {
        allActivities.push({
          id: `user-reg-${u.id}`,
          type: 'user',
          icon: 'people-outline',
          color: '#10B981',
          bgColor: '#ECFDF5',
          title: 'User Registered',
          description: `${u.name} (${u.student_id || u.email}) registered as ${u.role?.charAt(0).toUpperCase() + u.role?.slice(1) || 'Student'}`,
          tag: 'user',
          by: 'System',
          timestamp: u.created_at,
        });
      });

      // 2. Submissions (as user activity)
      const { data: submissions } = await supabase
        .from('submissions')
        .select('id, student_name, student_id, submitted_at, grade, graded_by, graded_at, assignment:assignments(title)')
        .order('submitted_at', { ascending: false })
        .limit(30);

      submissions?.forEach((s) => {
        // Submission activity
        allActivities.push({
          id: `sub-${s.id}`,
          type: 'assignment',
          icon: 'document-text-outline',
          color: '#3B82F6',
          bgColor: '#EFF6FF',
          title: 'Assignment Submitted',
          description: `${s.student_name} submitted "${s.assignment?.title || 'assignment'}"`,
          tag: 'assignment',
          by: s.student_name,
          timestamp: s.submitted_at,
        });

        // Grading activity
        if (s.graded_at) {
          allActivities.push({
            id: `grade-${s.id}`,
            type: 'assignment',
            icon: 'checkmark-circle-outline',
            color: '#10B981',
            bgColor: '#ECFDF5',
            title: 'Assignment Graded',
            description: `${s.student_name}'s submission graded: ${s.grade}`,
            tag: 'assignment',
            by: s.graded_by || 'Assistant',
            timestamp: s.graded_at,
          });
        }
      });

      // 3. Assignments created
      const { data: assignments } = await supabase
        .from('assignments')
        .select('id, title, created_at, created_by')
        .order('created_at', { ascending: false })
        .limit(20);

      assignments?.forEach((a) => {
        allActivities.push({
          id: `ass-${a.id}`,
          type: 'assignment',
          icon: 'clipboard-outline',
          color: '#8B5CF6',
          bgColor: '#F5F3FF',
          title: 'Assignment Created',
          description: `New assignment "${a.title}" created`,
          tag: 'assignment',
          by: a.created_by || 'Asst. Dewi Lestari',
          timestamp: a.created_at,
        });
      });

      // 4. Quizzes created
      const { data: quizzes } = await supabase
        .from('quiz_topics')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      quizzes?.forEach((q) => {
        allActivities.push({
          id: `quiz-${q.id}`,
          type: 'quiz',
          icon: 'help-circle-outline',
          color: '#F59E0B',
          bgColor: '#FFFBEB',
          title: 'Quiz Created',
          description: `New quiz "${q.title}" created`,
          tag: 'quiz',
          by: 'System',
          timestamp: q.created_at,
        });
      });

      // 5. Announcements
      const { data: announcements } = await supabase
        .from('announcements')
        .select('id, title, created_at, author')
        .order('created_at', { ascending: false })
        .limit(20);

      announcements?.forEach((a) => {
        allActivities.push({
          id: `ann-${a.id}`,
          type: 'system',
          icon: 'megaphone-outline',
          color: '#EC4899',
          bgColor: '#FDF2F8',
          title: 'Announcement Posted',
          description: `"${a.title}" announced`,
          tag: 'system',
          by: a.author || 'Admin',
          timestamp: a.created_at,
        });
      });

      // Sort all activities by timestamp
      const sorted = allActivities.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      setActivities(sorted);
    } catch (error) {
      console.error('Failed to load activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadActivities();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadActivities();
    setRefreshing(false);
  };

  // Filter by type and search
  const getFilteredActivities = () => {
    let filtered = activities;

    // Apply type filter
    if (filter !== 'all') {
      filtered = filtered.filter((a) => a.type === filter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query) ||
          a.by.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredActivities = getFilteredActivities();

  const filterOptions = [
    { key: 'all', label: 'All Activities', icon: 'list-outline', color: '#10B981' },
    { key: 'user', label: 'User Activities', icon: 'people-outline', color: '#8B5CF6' },
    { key: 'assignment', label: 'Assignments', icon: 'clipboard-outline', color: '#F59E0B' },
    { key: 'quiz', label: 'Quizzes', icon: 'help-circle-outline', color: '#3B82F6' },
    { key: 'system', label: 'System', icon: 'settings-outline', color: '#10B981' },
    { key: 'auth', label: 'Authentication', icon: 'shield-outline', color: '#EC4899' },
  ];

  const getFilterCount = (type) => {
    if (type === 'all') return activities.length;
    return activities.filter((a) => a.type === type).length;
  };

  const handleExport = () => {
    Alert.alert(
      'Export Logs',
      `Export ${filteredActivities.length} activities to file?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => Alert.alert('Success', 'Logs exported successfully') },
      ]
    );
  };

  const ActivityCard = ({ activity }) => (
    <View style={styles.activityCard}>
      <View style={[styles.activityIcon, { backgroundColor: activity.bgColor }]}>
        <Ionicons name={activity.icon} size={20} color={activity.color} />
      </View>
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <Text style={styles.activityTime}>{formatRelativeTime(activity.timestamp)}</Text>
        </View>
        <Text style={styles.activityDescription} numberOfLines={2}>
          {activity.description}
        </Text>
        <View style={styles.activityFooter}>
          <View style={styles.activityTag}>
            <Text style={styles.activityTagText}>{activity.tag}</Text>
          </View>
          <Text style={styles.activityBy}>by {activity.by}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Green Header */}
      <LinearGradient colors={['#059669', '#10B981']} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Activity Logs</Text>
            <Text style={styles.headerSubtitle}>Monitor system activity and events</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search logs..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Ionicons name="funnel" size={18} color="#059669" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleExport}
          >
            <Ionicons name="download" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Results Info */}
      <View style={styles.resultsRow}>
        <Text style={styles.resultsCount}>{filteredActivities.length} activities found</Text>
        <Text style={styles.resultsPeriod}>Last 7 days</Text>
      </View>

      {/* Activity List */}
      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {filteredActivities.length === 0 && !loading ? (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No activities found</Text>
          </View>
        ) : (
          filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>Filter by Type</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            {filterOptions.map((option) => {
              const isSelected = filter === option.key;
              const count = getFilterCount(option.key);
              
              return (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.filterOption,
                    isSelected && styles.filterOptionSelected,
                  ]}
                  onPress={() => {
                    setFilter(option.key);
                    setFilterModalVisible(false);
                  }}
                >
                  <View style={styles.filterOptionLeft}>
                    <View style={[
                      styles.filterOptionIcon,
                      { backgroundColor: isSelected ? `${option.color}20` : '#F3F4F6' }
                    ]}>
                      <Ionicons
                        name={option.icon}
                        size={18}
                        color={isSelected ? option.color : '#6B7280'}
                      />
                    </View>
                    <Text
                      style={[
                        styles.filterOptionText,
                        isSelected && styles.filterOptionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                  <Text style={[
                    styles.filterOptionCount,
                    isSelected && styles.filterOptionCountSelected
                  ]}>
                    {count}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    marginLeft: 10,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  resultsPeriod: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderLeftWidth: 4,
    borderLeftColor: '#E5E7EB',
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
    lineHeight: 20,
  },
  activityFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  activityTagText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  activityBy: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  filterOptionSelected: {
    backgroundColor: '#ECFDF5',
  },
  filterOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterOptionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  filterOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  filterOptionTextSelected: {
    color: '#059669',
    fontWeight: '600',
  },
  filterOptionCount: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  filterOptionCountSelected: {
    color: '#059669',
  },
});
