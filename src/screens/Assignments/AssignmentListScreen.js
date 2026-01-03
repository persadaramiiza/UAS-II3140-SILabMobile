import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchAssignments, getSubmissions } from '../../services/assignmentsApi';
import { useAuth } from '../../contexts/AuthContext';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';

export default function AssignmentListScreen({ route, navigation }) {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const filterFocus = route.params?.filterFocus;

  const loadAssignments = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {};
      if (filterFocus) filters.focus = filterFocus;

      const data = await fetchAssignments(filters);
      setAssignments(data || []);
      setLoading(false);

      // Load submission status for each assignment in background
      if (user && data && data.length > 0) {
        const submissionMap = {};
        const promises = data.map(async (assignment) => {
          try {
            const subs = await getSubmissions(assignment.id, user.id);
            if (subs && subs.length > 0) {
              submissionMap[assignment.id] = subs[0];
            }
          } catch (err) {
            console.log('Failed to load submission for', assignment.id);
          }
        });
        await Promise.all(promises);
        setSubmissions(submissionMap);
      }
    } catch (err) {
      console.error(err);
      setError('Gagal memuat tugas. Silakan coba lagi.');
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      
      const load = async () => {
        if (isActive) {
          await loadAssignments();
        }
      };
      
      load();
      
      return () => {
        isActive = false;
      };
    }, [filterFocus])
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow, 11:59 PM';
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getAssignmentStatus = (assignment) => {
    const submission = submissions[assignment.id];
    if (!submission) return 'Active';
    if (submission.score !== null && submission.score !== undefined) return 'Graded';
    if (submission.link || submission.notes) return 'Submitted';
    return 'Active';
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (statusFilter === 'All') return true;
    return getAssignmentStatus(assignment) === statusFilter;
  });

  const StatusBadge = ({ status }) => {
    const getStatusConfig = () => {
      switch (status) {
        case 'Active':
          return { bg: '#DBEAFE', text: '#1447E6', label: 'Active' };
        case 'Submitted':
          return { bg: '#FEF9C2', text: '#A65F00', label: 'Submitted' };
        case 'Graded':
          return { bg: '#DCFCE7', text: '#008236', label: 'Graded' };
        default:
          return { bg: '#F3F3F3', text: '#6B6B6B', label: status };
      }
    };

    const config = getStatusConfig();
    return (
      <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
        <Text style={[styles.statusText, { color: config.text }]}>{config.label}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const status = getAssignmentStatus(item);
    const submission = submissions[item.id];

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('AssignmentDetail', { assignmentId: item.id })}
      >
        <View style={styles.cardContent}>
          <View style={styles.leftContent}>
            {/* Focus Badge */}
            <View style={styles.focusBadge}>
              <Text style={styles.focusText}>{item.focus || 'General'}</Text>
            </View>

            {/* Title */}
            <Text style={styles.titleText}>{item.title}</Text>

            {/* Date */}
            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={14} color="#6B6B6B" />
              <Text style={styles.dateText}>{formatDate(item.due_date)}</Text>
            </View>

            {/* Score if graded */}
            {status === 'Graded' && submission?.score !== null && (
              <Text style={styles.scoreText}>Score: {submission.score}/100</Text>
            )}
          </View>

          {/* Right side: Status + Chevron */}
          <View style={styles.rightContent}>
            <StatusBadge status={status} />
            <Ionicons name="chevron-forward" size={20} color="#6B6B6B" style={styles.chevron} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Memuat tugas...</Text>
        </View>
      );
    }

    if (error) {
      return <ErrorState message={error} onRetry={loadAssignments} />;
    }

    if (filteredAssignments.length === 0) {
      return (
        <EmptyState
          icon="document-text-outline"
          message={searchQuery ? 'Tidak ada tugas yang cocok' : 'Belum ada tugas'}
        />
      );
    }

    return (
      <FlatList
        data={filteredAssignments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Gradient Background */}
      <LinearGradient
        colors={['#0F2A71', '#FBBC04']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientHeader}
      >
        <Text style={styles.headerTitle}>My Tasks</Text>
      </LinearGradient>

      <View style={styles.contentContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#6B6B6B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            placeholderTextColor="rgba(17, 17, 17, 0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Chips */}
        <View style={styles.filterRow}>
          {['All', 'Active', 'Submitted', 'Graded'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                statusFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setStatusFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  statusFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  gradientHeader: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
    borderWidth: 0.7,
    borderColor: 'transparent',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111111',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F3F3F3',
    height: 40,
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: '#0F2A71',
  },
  filterText: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: '#E8E8E8',
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  leftContent: {
    flex: 1,
    gap: 8,
  },
  focusBadge: {
    backgroundColor: '#F3F3F3',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  focusText: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  titleText: {
    fontSize: 16,
    color: '#111111',
    marginTop: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  scoreText: {
    fontSize: 16,
    color: '#0F2A71',
    marginTop: 4,
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 16,
  },
  chevron: {
    marginTop: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B6B6B',
  },
});