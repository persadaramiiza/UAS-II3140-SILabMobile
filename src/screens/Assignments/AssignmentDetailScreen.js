import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAssignment, getSubmissions } from '../../services/assignmentsApi';
import { useAuth } from '../../contexts/AuthContext';
import { colors, spacing, borderRadius, shadow } from '../../theme';

export default function AssignmentDetailScreen({ route, navigation }) {
  const { user } = useAuth();
  const { assignmentId } = route.params;
  const [detail, setDetail] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [descriptionExpanded, setDescriptionExpanded] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const assignmentDetail = await getAssignment(assignmentId);
      setDetail(assignmentDetail);

      const userSubmissions = await getSubmissions(assignmentId, user.id);
      if (userSubmissions && userSubmissions.length > 0) {
        setSubmission(userSubmissions[0]);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const getAssignmentStatus = () => {
    if (!submission) return 'Active';
    if (submission.score !== null && submission.score !== undefined) return 'Graded';
    if (submission.link || submission.notes) return 'Submitted';
    return 'Active';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#3B82F6';
      case 'Submitted': return '#FBBF24';
      case 'Graded': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Active': return 'rgba(59, 130, 246, 0.1)';
      case 'Submitted': return 'rgba(251, 191, 36, 0.15)';
      case 'Graded': return 'rgba(16, 185, 129, 0.15)';
      default: return '#E5E7EB';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const status = getAssignmentStatus();
  const dueDate = detail?.due_date || detail?.dueDate;

  // Parse resources if available (assuming JSON string or array)
  const resources = Array.isArray(detail?.resources) 
    ? detail.resources 
    : (typeof detail?.resources === 'string' ? JSON.parse(detail.resources) : []);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Detail</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: spacing.huge }}>
        <View style={styles.metaSection}>
          <Text style={styles.focusChip}>{detail?.focus || 'General'}</Text>
        </View>

        <Text style={styles.title}>{detail?.title}</Text>

        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.metaText}>
            {dueDate ? `Tomorrow, ${new Date(dueDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}` : '-'}
          </Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(status) }]}>{status}</Text>
        </View>

        <TouchableOpacity
          style={styles.section}
          onPress={() => setDescriptionExpanded(!descriptionExpanded)}
          activeOpacity={0.7}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Ionicons
              name={descriptionExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#1F2937"
            />
          </View>

          {descriptionExpanded && (
            <>
              <Text style={styles.description}>{detail?.description}</Text>
              <View style={styles.maxScoreBox}>
                <Text style={styles.maxScoreText}>Max Score: 100 points</Text>
              </View>
            </>
          )}
        </TouchableOpacity>

        {resources.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          {resources.map((resource) => (
            <TouchableOpacity key={resource.id} style={styles.resourceItem} activeOpacity={0.7}>
              <Ionicons name="document-text" size={32} color="#3B82F6" />
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>{resource.name}</Text>
                <Text style={styles.resourceSize}>{formatFileSize(resource.size)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  loadingText: { marginTop: spacing.md, fontSize: 14, color: '#6B7280' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: '#FBBF24',
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1E3A8A' },
  content: { flex: 1, backgroundColor: '#F9FAFB' },
  metaSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  focusChip: {
    backgroundColor: '#E5E7EB',
    color: '#6B7280',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  metaText: { fontSize: 14, color: '#6B7280', marginLeft: spacing.xs },
  statusBadge: {
    alignSelf: 'flex-start',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: borderRadius.full,
  },
  statusText: { fontSize: 12, fontWeight: '700' },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: spacing.md,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadow.small,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: spacing.sm },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginTop: spacing.md,
  },
  maxScoreBox: {
    backgroundColor: '#F3F4F6',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  maxScoreText: { fontSize: 14, color: '#6B7280' },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  resourceInfo: { flex: 1, marginLeft: spacing.md },
  resourceName: { fontSize: 14, fontWeight: '500', color: '#1F2937' },
  resourceSize: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
});
