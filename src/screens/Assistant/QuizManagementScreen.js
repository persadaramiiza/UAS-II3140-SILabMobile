import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { listQuizTopics, deleteQuizTopic } from '../../services/quizApi';
import { formatDate, formatTime } from '../../utils/helpers';

const { width } = Dimensions.get('window');

export default function QuizManagementScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('active'); // upcoming, active, completed
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadQuizzes = async () => {
    try {
      const data = await listQuizTopics();
      setQuizzes(data);
    } catch (error) {
      console.error('Failed to load quizzes:', error);
      Alert.alert('Error', 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadQuizzes();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadQuizzes();
    setRefreshing(false);
  };

  const handleDelete = (quiz) => {
    Alert.alert(
      'Delete Quiz',
      `Are you sure you want to delete "${quiz.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteQuizTopic(quiz.id);
              await loadQuizzes();
              Alert.alert('Success', 'Quiz deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete quiz');
            }
          },
        },
      ]
    );
  };

  const filterQuizzes = (tab) => {
    const now = new Date();
    return quizzes.filter((quiz) => {
      // Assuming quiz has start_time and end_time or duration
      // If not, we might need to rely on status field if it exists, or mock logic
      const startTime = quiz.start_time ? new Date(quiz.start_time) : new Date(quiz.created_at);
      const endTime = quiz.end_time ? new Date(quiz.end_time) : new Date(startTime.getTime() + (quiz.duration || 60) * 60000);
      
      if (tab === 'upcoming') {
        return startTime > now;
      } else if (tab === 'active') {
        return startTime <= now && endTime > now;
      } else {
        return endTime <= now;
      }
    });
  };

  const renderQuizCard = (quiz) => {
    const isUpcoming = activeTab === 'upcoming';
    const isActive = activeTab === 'active';
    const isCompleted = activeTab === 'completed';

    // Parse title for display if course is missing
    let displayTitle = quiz.title;
    let displayCourse = quiz.course || 'General';
    
    if (!quiz.course && quiz.title && quiz.title.includes(' - ')) {
      const parts = quiz.title.split(' - ');
      if (parts.length >= 2) {
        displayCourse = parts[0];
        displayTitle = parts.slice(1).join(' - ');
      }
    }

    return (
      <View key={quiz.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{displayTitle}</Text>
            <Text style={styles.cardSubtitle}>{displayCourse}</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('CreateQuiz', { quizId: quiz.id })}
            >
              <Ionicons name="pencil" size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.iconButton, styles.deleteButton]}
              onPress={() => handleDelete(quiz)}
            >
              <Ionicons name="trash" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.metaText}>
              {quiz.start_time ? formatDate(quiz.start_time) : 'TBA'}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="document-text-outline" size={16} color="#6B7280" />
            <Text style={styles.metaText}>{quiz.questionCount || 0} questions</Text>
          </View>
        </View>

        {(isActive || isCompleted) && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Participation</Text>
              <Text style={styles.progressValue}>
                {quiz.participation_count || 0}/{quiz.total_students || 42} students
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${((quiz.participation_count || 0) / (quiz.total_students || 42)) * 100}%` }
                ]} 
              />
            </View>
            
            <View style={styles.statsRow}>
              <Ionicons name="trending-up" size={20} color="#3B82F6" />
              <Text style={styles.statsLabel}>Average Score</Text>
              <Text style={styles.statsValue}>{quiz.average_score || 0}%</Text>
            </View>
          </View>
        )}

        {isActive && (
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('QuizMonitor', { quizId: quiz.id })}
          >
            <Text style={styles.primaryButtonText}>Monitor Quiz</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        {isCompleted && (
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: '#10B981' }]}
            onPress={() => navigation.navigate('QuizReport', { quizId: quiz.id })}
          >
            <Ionicons name="stats-chart" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.primaryButtonText}>View Grade Report</Text>
          </TouchableOpacity>
        )}
        
        {isUpcoming && (
           <TouchableOpacity 
           style={[styles.secondaryButton]}
           onPress={() => navigation.navigate('CreateQuiz', { quizId: quiz.id })}
         >
           <Text style={styles.secondaryButtonText}>Edit Quiz</Text>
           <Ionicons name="chevron-forward" size={16} color="#0F2A71" />
         </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F2A71', '#1E3A8A']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Quiz Management</Text>
          <Text style={styles.headerSubtitle}>Create quizzes and view grade reports</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateQuiz')}
        >
          <Ionicons name="add" size={24} color="#0F2A71" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.tabs}>
        {['Upcoming', 'Active', 'Completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab.toLowerCase() && styles.activeTab]}
            onPress={() => setActiveTab(tab.toLowerCase())}
          >
            <Text style={[styles.tabText, activeTab === tab.toLowerCase() && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {filterQuizzes(activeTab).map(renderQuizCard)}
        {filterQuizzes(activeTab).length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No {activeTab} quizzes found</Text>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FBBC04',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    marginRight: 24,
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0F2A71',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#0F2A71',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
  cardMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  progressSection: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
  },
  statsLabel: {
    fontSize: 14,
    color: '#1E3A8A',
    marginLeft: 8,
    flex: 1,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#0F2A71',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
});
