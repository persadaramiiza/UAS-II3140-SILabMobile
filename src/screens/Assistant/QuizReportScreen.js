import React, { useState, useEffect } from 'react';
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
import { formatDate } from '../../utils/helpers';

export default function QuizReportScreen({ navigation, route }) {
  const { quizId } = route.params;
  const [quiz, setQuiz] = useState(null);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    participated: 0,
    avgScore: 0,
    highestScore: 0,
    lowestScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const quizData = await getQuizTopic(quizId);
      setQuiz(quizData);

      const { data: allStudents } = await supabase
        .from('users')
        .select('id, name, student_id')
        .eq('role', 'student');

      const { data: submissions } = await supabase
        .from('submissions')
        .select('*')
        .eq('assignment_id', quizId);

      const studentResults = allStudents.map(student => {
        const submission = submissions?.find(s => s.student_id === student.id);
        const score = submission?.grade ? submission.grade.score : 0;
        const status = submission ? 'Submitted' : 'Missing';
        
        return {
          ...student,
          score,
          status,
          submittedAt: submission?.submitted_at
        };
      });

      const participated = studentResults.filter(s => s.status === 'Submitted');
      const scores = participated.map(s => s.score);
      
      setStats({
        totalStudents: allStudents.length,
        participated: participated.length,
        avgScore: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
        highestScore: scores.length ? Math.max(...scores) : 0,
        lowestScore: scores.length ? Math.min(...scores) : 0,
      });

      setStudents(studentResults.sort((a, b) => b.score - a.score)); // Sort by score desc

    } catch (error) {
      console.error('Failed to load report:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [quizId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const StatBox = ({ label, value, color }) => (
    <View style={[styles.statBox, { borderLeftColor: color }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
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
          <Text style={styles.headerTitle}>Quiz Report</Text>
        </View>
        <View style={styles.quizInfo}>
          <Text style={styles.quizTitle}>{displayTitle}</Text>
          <Text style={styles.quizSubtitle}>
            {displayCourse ? `${displayCourse} • ` : ''}{quiz?.start_time ? formatDate(quiz.start_time) : ''}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Performance Overview</Text>
          <View style={styles.statsGrid}>
            <StatBox label="Average Score" value={`${stats.avgScore}%`} color="#3B82F6" />
            <StatBox label="Participation" value={`${stats.participated}/${stats.totalStudents}`} color="#10B981" />
            <StatBox label="Highest Score" value={`${stats.highestScore}%`} color="#8B5CF6" />
            <StatBox label="Lowest Score" value={`${stats.lowestScore}%`} color="#EF4444" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Student Results</Text>

        <View style={styles.tableHeader}>
          <Text style={[styles.colName, styles.headerText]}>Student</Text>
          <Text style={[styles.colStatus, styles.headerText]}>Status</Text>
          <Text style={[styles.colScore, styles.headerText]}>Score</Text>
        </View>

        {students.map((student, index) => (
          <View key={student.id || index} style={styles.tableRow}>
            <View style={styles.colName}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.studentId}>{student.student_id || '-'}</Text>
            </View>
            <View style={styles.colStatus}>
              <View style={[
                styles.statusBadge,
                student.status === 'Submitted' ? styles.statusSuccess : styles.statusMissing
              ]}>
                <Text style={[
                  styles.statusText,
                  student.status === 'Submitted' ? styles.textSuccess : styles.textMissing
                ]}>{student.status}</Text>
              </View>
            </View>
            <View style={styles.colScore}>
              <Text style={[
                styles.scoreText,
                student.score >= 70 ? styles.scoreHigh : 
                student.score >= 50 ? styles.scoreMed : styles.scoreLow
              ]}>{student.score}</Text>
            </View>
          </View>
        ))}
        
        <View style={{ height: 40 }} />
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
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },
  colName: {
    flex: 3,
  },
  colStatus: {
    flex: 2,
    alignItems: 'center',
  },
  colScore: {
    flex: 1,
    alignItems: 'flex-end',
  },
  studentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  studentId: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusSuccess: {
    backgroundColor: '#ECFDF5',
  },
  statusMissing: {
    backgroundColor: '#FEF2F2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  textSuccess: { color: '#10B981' },
  textMissing: { color: '#EF4444' },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
  },
  scoreHigh: { color: '#10B981' },
  scoreMed: { color: '#F59E0B' },
  scoreLow: { color: '#EF4444' },
});
