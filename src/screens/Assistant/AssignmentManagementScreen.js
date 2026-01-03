import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAssignments, deleteAssignment } from '../../services/assignmentsApi';
import { supabase } from '../../services/supabase';

const { width } = Dimensions.get('window');

const TABS = [
  { id: 'active', label: 'Active' },
  { id: 'grading', label: 'Grading' },
  { id: 'closed', label: 'Closed' },
];

export default function AssignmentManagementScreen({ navigation }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [submissionCounts, setSubmissionCounts] = useState({});

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const data = await fetchAssignments();
      setAssignments(data || []);
      
      // Load submission counts for each assignment
      const counts = {};
      for (const assignment of (data || [])) {
        try {
          const { count: totalStudents } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'student');
          
          const { count: submitted } = await supabase
            .from('submissions')
            .select('*', { count: 'exact', head: true })
            .eq('assignment_id', assignment.id);
          
          const { count: graded } = await supabase
            .from('submissions')
            .select('*', { count: 'exact', head: true })
            .eq('assignment_id', assignment.id)
            .not('grade', 'is', null);
          
          const { count: pendingGrade } = await supabase
            .from('submissions')
            .select('*', { count: 'exact', head: true })
            .eq('assignment_id', assignment.id)
            .is('grade', null);
          
          counts[assignment.id] = {
            total: totalStudents || 42,
            submitted: submitted || 0,
            graded: graded || 0,
            pendingGrade: pendingGrade || 0,
          };
        } catch (e) {
          counts[assignment.id] = {
            total: 42,
            submitted: 8,
            graded: 0,
            pendingGrade: 8,
          };
        }
      }
      setSubmissionCounts(counts);
    } catch (error) {
      console.error('Failed to load assignments:', error);
      // Mock data fallback
      setAssignments([
        {
          id: 1,
          title: 'Database ERD Assignment',
          course: 'Database Systems',
          due_date: '2025-12-28',
          status: 'active',
        },
      ]);
      setSubmissionCounts({
        1: { total: 42, submitted: 8, graded: 0, pendingGrade: 8 },
      });
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadAssignments();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAssignments();
    setRefreshing(false);
  };

  const handleDelete = (assignment) => {
    Alert.alert(
      'Delete Assignment',
      `Are you sure you want to delete "${assignment.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAssignment(assignment.id);
              await loadAssignments();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete assignment');
            }
          },
        },
      ]
    );
  };

  const getFilteredAssignments = () => {
    const now = new Date();
    return assignments.filter((assignment) => {
      const dueDate = new Date(assignment.due_date);
      const counts = submissionCounts[assignment.id] || {};
      
      if (activeTab === 'active') {
        return dueDate >= now;
      } else if (activeTab === 'grading') {
        return counts.pendingGrade > 0;
      } else {
        return dueDate < now && (counts.pendingGrade === 0 || !counts.pendingGrade);
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const AssignmentCard = ({ assignment }) => {
    const counts = submissionCounts[assignment.id] || {
      total: 42,
      submitted: 8,
      graded: 0,
      pendingGrade: 8,
    };
    const progress = counts.total > 0 ? (counts.submitted / counts.total) * 100 : 0;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>{assignment.title}</Text>
            <Text style={styles.cardSubtitle}>{assignment.course || 'Database Systems'}</Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('EditAssignment', { assignment })}
            >
              <Ionicons name="pencil-outline" size={20} color="#0F2A71" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDelete(assignment)}
            >
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.infoText}>Due: {formatDate(assignment.due_date)}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="people-outline" size={16} color="#6B7280" />
            <Text style={styles.infoText}>{counts.submitted}/{counts.total} submitted</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Submission Progress</Text>
            <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {counts.pendingGrade > 0 && (
          <View style={styles.pendingBadge}>
            <Ionicons name="time-outline" size={16} color="#B45309" />
            <Text style={styles.pendingText}>
              {counts.pendingGrade} submissions pending grade
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.gradeButton}
          onPress={() => navigation.navigate('GradeSubmissions', { assignment })}
        >
          <Text style={styles.gradeButtonText}>Grade Submissions</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const filteredAssignments = getFilteredAssignments();

  return (
    <View style={styles.container}>
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
            <Text style={styles.headerTitle}>Assignments</Text>
            <Text style={styles.headerSubtitle}>Manage assignments and grade submissions</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateAssignment')}
          >
            <Ionicons name="add" size={24} color="#0F2A71" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Assignments List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredAssignments.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No {activeTab} assignments</Text>
          </View>
        ) : (
          filteredAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))
        )}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FBBC04',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingVertical: 16,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#0F2A71',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#0F2A71',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  cardInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  infoText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F2A71',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0F2A71',
    borderRadius: 3,
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  pendingText: {
    fontSize: 13,
    color: '#B45309',
    marginLeft: 8,
  },
  gradeButton: {
    flexDirection: 'row',
    backgroundColor: '#0F2A71',
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
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
});
