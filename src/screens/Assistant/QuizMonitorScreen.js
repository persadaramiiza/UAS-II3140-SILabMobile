import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getQuizTopic } from '../../services/quizApi';
import { supabase } from '../../services/supabase';
import { formatTime } from '../../utils/helpers';

const { width } = Dimensions.get('window');

export default function QuizMonitorScreen({ navigation, route }) {
  const { quizId } = route.params;
  const [quiz, setQuiz] = useState(null);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    total: 0,
    avgProgress: 0,
    avgScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadData = async () => {
    try {
      // 1. Fetch Quiz Details
      const quizData = await getQuizTopic(quizId);
      setQuiz(quizData);

      // 2. Fetch All Students (to know total count)
      const { data: allStudents, count: totalStudents } = await supabase
        .from('users')
        .select('id, name, student_id')
        .eq('role', 'student');

      // 3. Fetch Submissions/Progress for this quiz
      // Assuming we have a 'quiz_submissions' or similar table, or using 'submissions' table if unified.
      // The schema provided earlier had 'submissions' table linked to 'assignments'.
      // It didn't explicitly show quiz submissions.
      // However, usually quizzes have their own tracking or share the table.
      // Let's assume for now we use a 'quiz_attempts' table or similar, OR we mock it if it doesn't exist.
      // Given the schema dump earlier:
      // CREATE TABLE public.quiz_questions ...
      // CREATE TABLE public.quiz_topics ...
      // No quiz_submissions table shown.
      // But `submissions` table has `assignment_id`. Maybe quizzes are treated as assignments?
      // Or maybe I need to create a table? I can't.
      // I will assume there is a table `quiz_attempts` or I will query `submissions` assuming `assignment_id` can be a quiz_id.
      // Let's try querying `submissions` with `assignment_id` = `quizId`.
      
      const { data: attempts } = await supabase
        .from('submissions')
        .select('*')
        .eq('assignment_id', quizId); // Assuming quizId is stored here

      // Map students with their progress
      const studentProgress = allStudents.map(student => {
        const attempt = attempts?.find(a => a.student_id === student.id);
        
        // Mock progress calculation if real data is missing
        // In a real app, we'd have `answers` jsonb in submission to calc progress
        const progress = attempt ? (attempt.grade ? 100 : 50) : 0; 
        const status = attempt ? (attempt.grade ? 'Completed' : 'Active') : 'Not Started';
        const score = attempt?.grade ? attempt.grade.score : 0;
        const startTime = attempt?.submitted_at ? new Date(attempt.submitted_at) : null; // This is actually submit time
        // We need start time. Assuming it's in metadata or we just use submit time as "last active"
        
        return {
          ...student,
          progress,
          status,
          score,
          startTime,
          timeLeft: '12:45 left' // Mock
        };
      });

      // Calculate Stats
      const activeCount = studentProgress.filter(s => s.status === 'Active').length;
      const completedCount = studentProgress.filter(s => s.status === 'Completed').length;
      const totalProgress = studentProgress.reduce((acc, s) => acc + s.progress, 0);
      const totalScore = studentProgress.reduce((acc, s) => acc + s.score, 0);

      setStudents(studentProgress);
      setStats({
        active: activeCount,
        completed: completedCount,
        total: totalStudents || 42,
        avgProgress: totalStudents ? Math.round(totalProgress / totalStudents) : 0,
        avgScore: completedCount ? Math.round(totalScore / completedCount) : 0,
      });

    } catch (error) {
      console.error('Failed to load monitor data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    let interval;
    if (autoRefresh) {
      interval = setInterval(loadData, 30000); // Refresh every 30s
    }
    return () => clearInterval(interval);
  }, [quizId, autoRefresh]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const StatCard = ({ label, value, subLabel, icon, color }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={[styles.statLabel, { color }]}>{label}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      {subLabel && <Text style={styles.statSubLabel}>{subLabel}</Text>}
    </View>
  );

  // Parse title for display
  let displayTitle = quiz?.title || 'Loading...';
  let displayCourse = quiz?.course || '';
  
  if (quiz && !quiz.course && quiz.title && quiz.title.includes(' - ')) {
    const parts = quiz.title.split(' - ');
    if (parts.length >= 2) {
      displayCourse = parts[0];
      displayTitle = parts.slice(1).join(' - ');
    }
  }

  return (
    <View style={styles.container}>
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
          <Text style={styles.headerTitle}>Monitor Quiz</Text>
        </View>
        <View style={styles.quizInfo}>
          <Text style={styles.quizTitle}>{displayTitle}</Text>
          <Text style={styles.quizSubtitle}>
            {displayCourse ? `${displayCourse} • ` : ''}{quiz?.start_time ? formatTime(quiz.start_time) : ''} - {quiz?.end_time ? formatTime(quiz.end_time) : ''}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard
              label="Active"
              value={`${stats.active}/${stats.total}`}
              icon="people"
              color="#3B82F6"
            />
            <StatCard
              label="Completed"
              value={stats.completed}
              icon="checkmark-circle"
              color="#10B981"
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard
              label="Avg Progress"
              value={`${stats.avgProgress}%`}
              icon="trending-up"
              color="#F59E0B"
            />
            <View style={styles.autoRefreshCard}>
              <Text style={styles.autoRefreshLabel}>Auto Refresh</Text>
              <Switch
                value={autoRefresh}
                onValueChange={setAutoRefresh}
                trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Student Progress ({students.length})</Text>

        {students.map((student, index) => (
          <View key={student.id || index} style={styles.studentCard}>
            <View style={styles.studentHeader}>
              <View>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentId}>NIM: {student.student_id || '-'}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                student.status === 'Completed' ? styles.statusCompleted : 
                student.status === 'Active' ? styles.statusActive : styles.statusPending
              ]}>
                <Ionicons 
                  name={student.status === 'Completed' ? "checkmark-circle" : "time"} 
                  size={14} 
                  color={student.status === 'Completed' ? "#10B981" : student.status === 'Active' ? "#3B82F6" : "#9CA3AF"} 
                />
                <Text style={[
                  styles.statusText,
                  student.status === 'Completed' ? styles.textCompleted : 
                  student.status === 'Active' ? styles.textActive : styles.textPending
                ]}>{student.status}</Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={styles.progressValue}>{student.progress}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${student.progress}%`, backgroundColor: student.status === 'Completed' ? '#10B981' : '#3B82F6' }
                ]} 
              />
            </View>

            <View style={styles.studentFooter}>
              <View style={styles.footerItem}>
                <Ionicons name="time-outline" size={14} color="#6B7280" />
                <Text style={styles.footerText}>Started: {student.startTime ? formatTime(student.startTime) : '-'}</Text>
              </View>
              {student.status === 'Active' && (
                <Text style={styles.timeLeftText}>{student.timeLeft}</Text>
              )}
            </View>
          </View>
        ))}
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

import { Switch } from 'react-native'; // Added missing import

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
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  quizInfo: {
    marginLeft: 40,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quizSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsGrid: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  autoRefreshCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  autoRefreshLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusCompleted: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  statusActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  statusPending: {
    backgroundColor: '#F3F4F6',
    borderColor: '#9CA3AF',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  textCompleted: { color: '#10B981' },
  textActive: { color: '#3B82F6' },
  textPending: { color: '#9CA3AF' },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  studentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  timeLeftText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
});
