import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Dimensions,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import { fetchAnnouncements } from '../../services/announcementsApi';
import { fetchAssignments } from '../../services/assignmentsApi';
import { listQuizTopics } from '../../services/quizApi';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { formatDateTime } from '../../utils/helpers';
import { colors, spacing, borderRadius } from '../../theme';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ dueSoon: 0, quizToday: 0 });
  const [nextDeadline, setNextDeadline] = useState(null);
  const { userProfile } = useAuth();

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [announcementsData, assignmentsData, quizzesData] = await Promise.all([
        fetchAnnouncements(),
        fetchAssignments(),
        listQuizTopics()
      ]);

      setAnnouncements(announcementsData.slice(0, 3));

      // Process Assignments
      const now = new Date();
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(now.getDate() + 3);

      // Filter for future assignments
      const activeAssignments = (assignmentsData || []).filter(a => {
        if (!a.due_date) return false;
        const dueDate = new Date(a.due_date);
        return dueDate > now;
      });

      // Sort by due date (nearest first)
      activeAssignments.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

      // Set Next Deadline
      if (activeAssignments.length > 0) {
        const next = activeAssignments[0];
        setNextDeadline({
          id: next.id,
          course: next.focus || 'General',
          title: next.title,
          dueDate: formatDateTime(next.due_date),
          status: 'Active'
        });
      } else {
        setNextDeadline(null);
      }

      // Count Due Soon
      const dueSoonCount = activeAssignments.filter(a => {
        const d = new Date(a.due_date);
        return d <= threeDaysFromNow;
      }).length;

      // Count Quiz Today
      const todayStr = now.toISOString().split('T')[0];
      const quizTodayCount = (quizzesData || []).filter(q => {
        const dateToCheck = q.start_time || q.created_at;
        return dateToCheck && dateToCheck.startsWith(todayStr);
      }).length;

      setStats({
        dueSoon: dueSoonCount,
        quizToday: quizTodayCount
      });

    } catch (error) {
      console.error('Failed to load home data:', error);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    let isMounted = true;
    
    const init = async () => {
      if (isMounted) {
        await loadData();
      }
    };
    
    init();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const progress = {
    tasksCompleted: 8,
    totalTasks: 12,
    averageQuizScore: 85,
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Styled Header with Background */}
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../../../assets/home-header.png')}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          {/* Logo */}
          <Image 
            source={require('../../../assets/logo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          
          {/* Text Content */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              Hi, {userProfile?.name || 'Student'}!
            </Text>
            <Text style={styles.headerSubtitle}>
              Are you <Text style={styles.headerSubtitleBold}>ready</Text> to{' '}
              <Text style={styles.headerSubtitleBold}>explore</Text> today?
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        {/* Illustration Widget with Floating Stats */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../../assets/illustration.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
          
          {/* Floating Stats Cards */}
          <View style={styles.statsContainer}>
            {/* Due Soon Card */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Ionicons name="time-outline" size={16} color="#0F2A71" />
                <Text style={styles.statLabel}>Due Soon</Text>
              </View>
              <Text style={styles.statValue}>{stats.dueSoon}</Text>
            </View>

            {/* Quiz Today Card */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Ionicons name="calendar-outline" size={16} color="#0F2A71" />
                <Text style={styles.statLabel}>Quiz Today</Text>
              </View>
              <Text style={styles.statValue}>{stats.quizToday}</Text>
            </View>
          </View>
        </View>

        {/* Next Deadline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Deadline</Text>
          {nextDeadline ? (
            <TouchableOpacity 
              style={styles.deadlineCard}
              onPress={() => navigation.navigate('AssignmentDetail', { assignmentId: nextDeadline.id })}
              activeOpacity={0.9}
            >
              {/* Course Chip */}
              <View style={styles.courseChip}>
                <Text style={styles.courseChipText}>{nextDeadline.course}</Text>
              </View>

              {/* Title */}
              <Text style={styles.deadlineTitle}>{nextDeadline.title}</Text>

              {/* Due Date */}
              <View style={styles.dueDateRow}>
                <Ionicons name="time-outline" size={16} color="#6B6B6B" />
                <Text style={styles.dueDateText}>{nextDeadline.dueDate}</Text>
              </View>

              {/* Status Badge */}
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{nextDeadline.status}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={[styles.deadlineCard, { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 }]}>
              <Ionicons name="checkmark-circle-outline" size={48} color="#10B981" />
              <Text style={[styles.deadlineTitle, { marginTop: 12, textAlign: 'center' }]}>All caught up!</Text>
              <Text style={[styles.dueDateText, { textAlign: 'center' }]}>No upcoming deadlines.</Text>
            </View>
          )}
        </View>

        {/* Announcements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <View style={styles.announcementsCard}>
            {announcements.length === 0 ? (
              <View style={styles.emptyAnnouncements}>
                <Text style={styles.emptyAnnouncementsText}>No announcements yet</Text>
              </View>
            ) : (
              announcements.map((announcement, index) => (
                <View key={announcement.id}>
                  {/* Yellow Accent Bar */}
                  <View style={styles.announcementAccent} />
                  
                  <View style={styles.announcementItem}>
                    <Text style={styles.announcementTitle}>{announcement.title}</Text>
                    <Text style={styles.announcementSnippet} numberOfLines={2}>
                      {announcement.content}
                    </Text>
                    <Text style={styles.announcementTimestamp}>
                      {formatDateTime(announcement.created_at)}
                    </Text>
                  </View>
                  
                  {index < announcements.length - 1 && (
                    <View style={styles.announcementDivider} />
                  )}
                </View>
              ))
            )}
          </View>
        </View>

        {/* Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <View style={styles.progressCard}>
            {/* Tasks Completed */}
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Tasks Completed</Text>
                <Text style={styles.progressValue}>
                  {progress.tasksCompleted}/{progress.totalTasks}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressBarFill,
                    { 
                      width: `${(progress.tasksCompleted / progress.totalTasks) * 100}%`,
                      backgroundColor: '#0F2A71'
                    }
                  ]} 
                />
              </View>
            </View>

            {/* Average Quiz Score */}
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Average Quiz Score</Text>
                <View style={styles.progressScoreContainer}>
                  <Ionicons name="trending-up" size={14} color="#00A63E" />
                  <Text style={styles.progressValue}>
                    {progress.averageQuizScore}%
                  </Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressBarFill,
                    { 
                      width: `${progress.averageQuizScore}%`,
                      backgroundColor: '#00C950'
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF',
  },
  
  // Header styles
  headerContainer: {
    height: 222,
    marginBottom: 8,
  },
  headerBackground: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerLogo: {
    position: 'absolute',
    top: 92,
    right: 22,
    width: 54,
    height: 56,
  },
  headerTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  headerSubtitleBold: {
    fontWeight: '700',
    fontStyle: 'italic',
  },
  
  // Content
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  
  // Illustration & Stats
  illustrationContainer: {
    height: 340,
    marginBottom: 16,
    position: 'relative',
  },
  illustration: {
    position: 'absolute',
    width: width - 48,
    height: '140%',
    top: -60,
  },
  statsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 6,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F2A71',
    marginLeft: 6,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F2A71',
    lineHeight: 32,
  },
  
  // Section
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111111',
    marginBottom: 16,
  },
  
  // Deadline Card
  deadlineCard: {
    backgroundColor: 'rgba(251, 188, 4, 0.2)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FBBC04',
  },
  courseChip: {
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  courseChipText: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  deadlineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 12,
  },
  dueDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dueDateText: {
    fontSize: 16,
    color: '#6B6B6B',
    marginLeft: 8,
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 16,
    color: '#008236',
  },
  ctaButton: {
    backgroundColor: '#0F2A71',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  
  // Announcements
  announcementsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 16,
    overflow: 'hidden',
  },
  announcementAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FBBC04',
  },
  announcementItem: {
    padding: 16,
    paddingLeft: 20,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111111',
    marginBottom: 12,
  },
  announcementSnippet: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 12,
  },
  announcementTimestamp: {
    fontSize: 16,
    color: '#9A9A9A',
  },
  announcementDivider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginLeft: 20,
    marginRight: 16,
  },
  emptyAnnouncements: {
    padding: 32,
    alignItems: 'center',
  },
  emptyAnnouncementsText: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  
  // Progress
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 16,
    padding: 16,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  progressValue: {
    fontSize: 16,
    color: '#111111',
  },
  progressScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F3F3',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
  },
});