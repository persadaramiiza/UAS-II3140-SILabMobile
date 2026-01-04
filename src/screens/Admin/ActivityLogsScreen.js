import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../services/supabase';
import { formatRelativeTime, formatDateTime } from '../../utils/helpers';

export default function ActivityLogsScreen({ navigation }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  const loadActivities = async () => {
    try {
      setLoading(true);

      // Fetch various activities from different tables
      const allActivities = [];

      // 1. User registrations
      const { data: users } = await supabase
        .from('users')
        .select('id, name, role, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      users?.forEach((u) => {
        allActivities.push({
          id: `user-${u.id}`,
          type: 'user',
          icon: 'person-add',
          color: '#10B981',
          title: 'New User Registered',
          description: `${u.name} registered as ${u.role || 'student'}`,
          timestamp: u.created_at,
        });
      });

      // 2. Submissions
      const { data: submissions } = await supabase
        .from('submissions')
        .select('id, student_name, submitted_at, assignment:assignments(title)')
        .order('submitted_at', { ascending: false })
        .limit(20);

      submissions?.forEach((s) => {
        allActivities.push({
          id: `sub-${s.id}`,
          type: 'submission',
          icon: 'document-attach',
          color: '#3B82F6',
          title: 'Assignment Submitted',
          description: `${s.student_name} submitted ${s.assignment?.title || 'an assignment'}`,
          timestamp: s.submitted_at,
        });
      });

      // 3. Announcements
      const { data: announcements } = await supabase
        .from('announcements')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      announcements?.forEach((a) => {
        allActivities.push({
          id: `ann-${a.id}`,
          type: 'announcement',
          icon: 'megaphone',
          color: '#F59E0B',
          title: 'Announcement Posted',
          description: a.title,
          timestamp: a.created_at,
        });
      });

      // 4. Assignments created
      const { data: assignments } = await supabase
        .from('assignments')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      assignments?.forEach((a) => {
        allActivities.push({
          id: `ass-${a.id}`,
          type: 'assignment',
          icon: 'create',
          color: '#8B5CF6',
          title: 'Assignment Created',
          description: a.title,
          timestamp: a.created_at,
        });
      });

      // 5. Quizzes created
      const { data: quizzes } = await supabase
        .from('quiz_topics')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      quizzes?.forEach((q) => {
        allActivities.push({
          id: `quiz-${q.id}`,
          type: 'quiz',
          icon: 'school',
          color: '#EC4899',
          title: 'Quiz Created',
          description: q.title,
          timestamp: q.created_at,
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

  const filteredActivities =
    filter === 'all'
      ? activities
      : activities.filter((a) => a.type === filter);

  const filterOptions = [
    { key: 'all', label: 'All' },
    { key: 'user', label: 'Users' },
    { key: 'submission', label: 'Submissions' },
    { key: 'announcement', label: 'Announcements' },
    { key: 'assignment', label: 'Assignments' },
    { key: 'quiz', label: 'Quizzes' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F2A71', '#1E3A8A']} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Activity Logs</Text>
            <Text style={styles.headerSubtitle}>View system activity history</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.filterTab,
              filter === option.key && styles.filterTabActive,
            ]}
            onPress={() => setFilter(option.key)}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === option.key && styles.filterTabTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
          filteredActivities.map((activity, index) => (
            <View
              key={activity.id}
              style={[
                styles.activityItem,
                index === 0 && styles.activityItemFirst,
              ]}
            >
              <View style={styles.timelineContainer}>
                <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
                  <Ionicons name={activity.icon} size={18} color={activity.color} />
                </View>
                {index < filteredActivities.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTime}>
                  {formatRelativeTime(activity.timestamp)} • {formatDateTime(activity.timestamp)}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    maxHeight: 56,
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    flexDirection: 'row',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  filterTabActive: {
    backgroundColor: '#0F2A71',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  activityItemFirst: {
    marginTop: 0,
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
    minHeight: 40,
  },
  activityContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  activityTime: {
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
});
