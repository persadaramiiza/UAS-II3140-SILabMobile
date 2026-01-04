import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../services/supabase';
import { formatRelativeTime } from '../../utils/helpers';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function AdminHomeScreen({ navigation }) {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    students: 0,
    assistants: 0,
    admins: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadActivities = async () => {
    try {
      // Fetch recent user registrations
      const { data: newUsers } = await supabase
        .from('users')
        .select('id, created_at, name, role')
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch recent role changes (if we had an audit log, we'd use that)
      // For now, just show recent users
      const allActivities = [
        ...(newUsers || []).map(u => ({
          id: `user-${u.id}`,
          type: 'user',
          text: `New ${u.role || 'user'}: ${u.name}`,
          time: u.created_at,
          color: u.role === 'admin' ? '#EF4444' : u.role === 'assistant' ? '#F59E0B' : '#10B981',
          icon: 'person-add'
        })),
      ];

      // Sort by time desc
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

      // Fetch all user counts by role
      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      const { count: studentsCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student');

      const { count: assistantsCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'assistant');

      const { count: adminsCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'admin');

      setStats({
        totalUsers: totalUsers || 0,
        students: studentsCount || 0,
        assistants: assistantsCount || 0,
        admins: adminsCount || 0,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
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
      id: 'user_management',
      title: 'User Management',
      subtitle: 'Assign roles and manage users',
      icon: 'people-outline',
      onPress: () => navigation.navigate('UserManagement'),
    },
    {
      id: 'system_settings',
      title: 'System Settings',
      subtitle: 'Configure system preferences',
      icon: 'settings-outline',
      onPress: () => navigation.navigate('SystemSettings'),
    },
    {
      id: 'activity_logs',
      title: 'Activity Logs',
      subtitle: 'View system activity history',
      icon: 'list-outline',
      onPress: () => navigation.navigate('ActivityLogs'),
    },
  ];

  const StatCard = ({ label, value, icon, color }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statContent}>
        <View style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
          source={require('../../../assets/header-bg2.png')}
          style={styles.header}
          imageStyle={styles.headerBackground}
      >
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>{userProfile?.name || 'Admin'}</Text>
          <Text style={styles.roleText}>Manage users and system</Text>
        </View>
        <View style={styles.headerImage}>
          <Ionicons name="shield-checkmark" size={80} color="rgba(255,255,255,0.2)" />
        </View>
      </ImageBackground>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard 
            label="Total Users" 
            value={stats.totalUsers} 
            icon="people" 
            color="#3B82F6" 
          />
          <StatCard 
            label="Students" 
            value={stats.students} 
            icon="school" 
            color="#10B981" 
          />
          <StatCard 
            label="Assistants" 
            value={stats.assistants} 
            icon="person" 
            color="#F59E0B" 
          />
          <StatCard 
            label="Admins" 
            value={stats.admins} 
            icon="shield" 
            color="#EF4444" 
          />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionCard}
              onPress={action.onPress}
            >
              <View style={styles.quickActionIconContainer}>
                <Ionicons name={action.icon} size={24} color="#0F2A71" />
              </View>
              <View style={styles.quickActionContent}>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          {activities.length === 0 ? (
            <Text style={styles.emptyText}>No recent activity</Text>
          ) : (
            activities.map((activity, index) => (
              <View 
                key={activity.id} 
                style={[
                  styles.activityItem,
                  index < activities.length - 1 && styles.activityItemBorder
                ]}
              >
                <View style={[styles.activityDot, { backgroundColor: activity.color }]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{activity.text}</Text>
                  <Text style={styles.activityTime}>{formatRelativeTime(activity.time)}</Text>
                </View>
              </View>
            ))
          )}
        </View>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  nameText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  roleText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  headerImage: {
    marginLeft: 20,
  },
  content: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
  statContent: {
    flex: 1,
    justifyContent: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  quickActionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  quickActionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  activityItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#374151',
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 20,
  },
});
