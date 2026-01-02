import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  RefreshControl, 
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { listQuizTopics } from '../../services/quizApi';

const { width } = Dimensions.get('window');

export default function QuizListScreen({ navigation }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Active');

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const data = await listQuizTopics();
      setTopics(data || []);
    } catch (err) {
      console.error('Failed to load quizzes:', err);
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const init = async () => {
      if (isMounted) {
        await loadQuizzes();
      }
    };
    
    init();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const filters = ['Upcoming', 'Active', 'Completed'];

  // Mock enhanced data structure to match frontend
  const enhancedTopics = topics.map((topic, index) => ({
    ...topic,
    status: index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Upcoming' : 'Completed',
    course: topic.title.split(' ')[0] || 'General',
    timeLimit: '30 minutes',
    attempts: 2,
    availableUntil: 'Today, 11:59 PM',
    availableFrom: 'Tomorrow, 9:00 AM',
    score: index % 3 === 2 ? 85 : null,
    completedAt: index % 3 === 2 ? 'Dec 20, 2025' : null,
    accentColor: index % 3 === 0 ? '#0F2A71' : index % 3 === 1 ? '#3B82F6' : '#10B981',
  }));

  const filteredTopics = enhancedTopics.filter(topic => topic.status === activeFilter);

  const renderQuizCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('QuizRoom', { topicId: item.id, title: item.title })}
      activeOpacity={0.7}
    >
      {/* Left Accent Bar */}
      <View style={[styles.accentBar, { backgroundColor: item.accentColor }]} />
      
      <View style={styles.cardContent}>
        {/* Course Label */}
        <Text style={styles.courseLabel}>{item.course}</Text>

        {/* Title with Status Badge */}
        <View style={styles.titleRow}>
          <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>
          {item.status === 'Active' && (
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>active</Text>
            </View>
          )}
        </View>

        {/* Quiz Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color="#6B6B6B" />
            <Text style={styles.infoText}>{item.timeLimit}</Text>
          </View>
          <Text style={styles.infoText}>{item.attempts} attempts allowed</Text>
        </View>

        {/* Availability / Score */}
        {item.status === 'Active' && (
          <Text style={styles.availableText}>Available until {item.availableUntil}</Text>
        )}
        
        {item.status === 'Upcoming' && (
          <Text style={styles.upcomingText}>Available from {item.availableFrom}</Text>
        )}

        {item.status === 'Completed' && item.score && (
          <View style={styles.scoreContainer}>
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text style={styles.scoreText}>Score: {item.score}%</Text>
            <Text style={styles.completedText}>{item.completedAt}</Text>
          </View>
        )}

        {/* Action Button */}
        {item.status === 'Active' && (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: item.accentColor }]}
            onPress={() => navigation.navigate('QuizRoom', { topicId: item.id, title: item.title })}
          >
            <Ionicons name="play" size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        )}

        {item.status === 'Upcoming' && (
          <View style={styles.disabledButton}>
            <Text style={styles.disabledButtonText}>Not Available Yet</Text>
          </View>
        )}

        {item.status === 'Completed' && (
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Review Answers</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Gradient - Always visible */}
      <LinearGradient
        colors={['#0F2A71', '#B8975A']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientHeader}
      >
        <Text style={styles.headerTitle}>Quizzes</Text>
      </LinearGradient>

      {/* Filter Tabs Container */}
      <View style={styles.filterTabsContainer}>
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quizzes List */}
      <FlatList
        data={filteredTopics}
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={loadQuizzes} 
            tintColor="#0F2A71" 
          />
        }
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderQuizCard}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No {activeFilter.toLowerCase()} quizzes
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA' 
  },
  
  // Gradient Header
  gradientHeader: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 32,
  },
  
  // Filter Tabs
  filterTabsContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  filterText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  filterTextActive: {
    color: '#1F2937',
    fontWeight: '500',
  },
  
  // List
  listContent: {
    padding: 24,
    paddingBottom: 100,
  },
  
  // Quiz Card
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 16,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cardContent: {
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 16,
  },
  courseLabel: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    color: '#111111',
    fontWeight: '400',
  },
  activeBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#6B6B6B',
  },
  availableText: {
    fontSize: 13,
    color: '#F97316',
    marginBottom: 16,
  },
  upcomingText: {
    fontSize: 13,
    color: '#6B6B6B',
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    flex: 1,
  },
  completedText: {
    fontSize: 13,
    color: '#10B981',
  },
  
  // Action Buttons
  actionButton: {
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  disabledButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButtonText: {
    fontSize: 16,
    color: '#9A9A9A',
  },
  reviewButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButtonText: {
    fontSize: 16,
    color: '#0F2A71',
  },
  
  // Empty State
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B6B6B',
  },
});