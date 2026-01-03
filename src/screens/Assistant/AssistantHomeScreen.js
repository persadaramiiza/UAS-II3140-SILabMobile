import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { fetchAssignments, getAllSubmissions } from '../../services/assignmentsApi';
import { listQuizTopics } from '../../services/quizApi';
import { supabase } from '../../services/supabase';

import { formatRelativeTime } from '../../utils/helpers';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function AssistantHomeScreen({ navigation }) {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    assignments: 0,
    quizzes: 0,
    toGrade: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadActivities = async () => {
    try {
      // 1. Recent Submissions
      const { data: submissions } = await supabase
        .from('submissions')
        .select('id, submitted_at, student_name, assignment:assignments(title)')
        .order('submitted_at', { ascending: false })
        .limit(3);

      // 2. Recent Announcements
      const { data: announcements } = await supabase
        .from('announcements')
        .select('id, created_at, title')
        .order('created_at', { ascending: false })
        .limit(3);

      // 3. Recent Assignments
      const { data: assignments } = await supabase
        .from('assignments')
        .select('id, created_at, title')
        .order('created_at', { ascending: false })
        .limit(3);

      // 4. New Students
      const { data: newStudents } = await supabase
        .from('users')
        .select('id, created_at, name')
        .eq('role', 'student')
        .order('created_at', { ascending: false })
        .limit(3);

      // Normalize and merge
      const allActivities = [
        ...(submissions || []).map(s => ({
          id: `sub-${s.id}`,
          type: 'submission',
          text: `New submission from ${s.student_name}`,
          time: s.submitted_at,
          color: '#10B981'
        })),
        ...(announcements || []).map(a => ({
          id: `ann-${a.id}`,
          type: 'announcement',
          text: `New announcement: ${a.title}`,
          time: a.created_at,
          color: '#F59E0B'
        })),
        ...(assignments || []).map(a => ({
          id: `ass-${a.id}`,
          type: 'assignment',
          text: `New assignment created: ${a.title}`,
          time: a.created_at,
          color: '#3B82F6'
        })),
        ...(newStudents || []).map(s => ({
          id: `stu-${s.id}`,
          type: 'student',
          text: `New student enrolled: ${s.name}`,
          time: s.created_at,
          color: '#8B5CF6'
        }))
      ];

      // Sort by time desc and take top 5
      const sorted = allActivities
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .slice(0, 5);

      setActivities(sorted);
    } catch (error) {
      console.error('Failed to load activities:', error);
    }
  };

  const loadStats = async () => {
    try {
      await loadActivities();
      // Fetch students count
      const { count: studentsCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student');

      // Fetch assignments count
      const { count: assignmentsCount } = await supabase
        .from('assignments')
        .select('*', { count: 'exact', head: true });
      
      // Fetch quizzes count
      const { count: quizzesCount } = await supabase
        .from('quiz_topics')
        .select('*', { count: 'exact', head: true });

      // Fetch submissions to grade count
      const { count: toGradeCount } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .is('grade', null);

      setStats({
        students: studentsCount || 0,
        assignments: assignmentsCount || 0,
        quizzes: quizzesCount || 0,
        toGrade: toGradeCount || 0,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
      // Fallback to 0 instead of mock data to avoid confusion
      setStats({
        students: 0,
        assignments: 0,
        quizzes: 0,
        toGrade: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  const quickActions = [
    {
      id: 'create_assignment',
      title: 'Create Assignment',
      icon: 'document-text-outline',
      color: '#0F2A71',
      bgColor: '#F0F4FF',
      onPress: () => navigation.navigate('CreateAssignment'),
    },
    {
      id: 'new_announcement',
      title: 'New Announcement',
      icon: 'notifications-outline',
      color: '#0F2A71',
      bgColor: '#F0F4FF',
      onPress: () => navigation.navigate('CreateAnnouncement'),
    },
    {
      id: 'create_quiz',
      title: 'Create Quiz',
      icon: 'clipboard-outline',
      color: '#0F2A71',
      bgColor: '#F0F4FF',
      onPress: () => {
        // TODO: Navigate to CreateQuiz when implemented
        Alert.alert('Coming Soon', 'Quiz creation feature will be available soon.');
      },
    },
    {
      id: 'grade_submissions',
      title: 'Grade Submissions',
      icon: 'trending-up-outline',
      color: '#10B981',
      bgColor: '#ECFDF5',
      onPress: () => navigation.navigate('AssignmentManagement'),
    },
  ];

  const StatCard = ({ icon, title, value, color = '#0F2A71' }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );

  const QuickActionCard = ({ action }) => (
    <TouchableOpacity
      style={styles.quickActionCard}
      onPress={action.onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: action.bgColor }]}>
        <Ionicons name={action.icon} size={24} color={action.color} />
      </View>
      <Text style={styles.quickActionTitle}>{action.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <LinearGradient
          colors={['#0F2A71', '#1E3A8A', '#2563EB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.roleName}>Assistant</Text>
              <Text style={styles.roleSubtitle}>Manage your lab activities</Text>
            </View>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>
          
          {/* Notification badge */}
          <TouchableOpacity style={styles.notificationBadge}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard
              icon="people-outline"
              title="Students"
              value={stats.students}
              color="#0F2A71"
            />
            <StatCard
              icon="document-text-outline"
              title="Assignments"
              value={stats.assignments}
              color="#0F2A71"
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard
              icon="clipboard-outline"
              title="Quizzes"
              value={stats.quizzes}
              color="#0F2A71"
            />
            <StatCard
              icon="trending-up-outline"
              title="To Grade"
              value={stats.toGrade}
              color="#EF4444"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionCard key={action.id} action={action} />
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <View style={styles.activityList}>
            {activities.length > 0 ? (
              activities.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={[styles.activityDot, { backgroundColor: activity.color }]} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityText}>{activity.text}</Text>
                    <Text style={styles.activityTime}>{formatRelativeTime(activity.time)}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.activityItem, { borderBottomWidth: 0 }]}>
                <Text style={[styles.activityText, { color: '#9CA3AF', fontStyle: 'italic' }]}>
                  No recent activities
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'relative',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  roleName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  roleSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  headerImage: {
    width: 120,
    height: 100,
    marginRight: -10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  badge: {
    backgroundColor: '#FBBC04',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#0F2A71',
    fontSize: 12,
    fontWeight: '700',
  },
  statsContainer: {
    padding: 16,
    marginTop: -20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
