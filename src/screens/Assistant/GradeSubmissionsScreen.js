import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Modal,
  TextInput,
  Alert,
  Dimensions,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../services/supabase';

const { width } = Dimensions.get('window');

export default function GradeSubmissionsScreen({ navigation, route }) {
  const { assignment } = route.params || {};
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [gradeModalVisible, setGradeModalVisible] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      
      if (!assignment?.id) {
        // Mock data
        setSubmissions([
          {
            id: 1,
            student_name: 'Ahmad Rizki',
            student_nim: '13520001',
            submitted_at: '2025-12-27T14:30:00',
            files: ['ERD_Diagram.pdf', 'Database_Schema.sql'],
            grade: null,
          },
          {
            id: 2,
            student_name: 'Siti Nurhaliza',
            student_nim: '13520002',
            submitted_at: '2025-12-27T16:45:00',
            files: ['ERD_Assignment.pdf'],
            grade: null,
          },
          {
            id: 3,
            student_name: 'Budi Santoso',
            student_nim: '13520003',
            submitted_at: '2025-12-26T10:30:00',
            files: ['Final_ERD.pdf'],
            grade: 85,
            feedback: 'Good work!',
          },
        ]);
        return;
      }

      const { data, error } = await supabase
        .from('submissions')
        .select(`
          *,
          profiles:student_id (
            name,
            nim
          )
        `)
        .eq('assignment_id', assignment.id)
        .order('submitted_at', { ascending: false });

      if (error) throw error;

      const formattedSubmissions = (data || []).map((sub) => ({
        id: sub.id,
        student_name: sub.profiles?.name || 'Unknown Student',
        student_nim: sub.profiles?.nim || 'N/A',
        submitted_at: sub.submitted_at,
        files: sub.files || ['submission.pdf'],
        grade: sub.grade,
        feedback: sub.feedback,
      }));

      setSubmissions(formattedSubmissions);
    } catch (error) {
      console.error('Failed to load submissions:', error);
      // Mock data fallback
      setSubmissions([
        {
          id: 1,
          student_name: 'Ahmad Rizki',
          student_nim: '13520001',
          submitted_at: '2025-12-27T14:30:00',
          files: ['ERD_Diagram.pdf', 'Database_Schema.sql'],
          grade: null,
        },
        {
          id: 2,
          student_name: 'Siti Nurhaliza',
          student_nim: '13520002',
          submitted_at: '2025-12-27T16:45:00',
          files: ['ERD_Assignment.pdf'],
          grade: null,
        },
        {
          id: 3,
          student_name: 'Budi Santoso',
          student_nim: '13520003',
          submitted_at: '2025-12-26T10:30:00',
          files: ['Final_ERD.pdf'],
          grade: 85,
          feedback: 'Good work!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSubmissions();
    }, [assignment?.id])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSubmissions();
    setRefreshing(false);
  };

  const openGradeModal = (submission) => {
    setSelectedSubmission(submission);
    setGrade(submission.grade?.toString() || '');
    setFeedback(submission.feedback || '');
    setGradeModalVisible(true);
  };

  const handleSubmitGrade = async () => {
    if (!grade || isNaN(parseInt(grade)) || parseInt(grade) < 0 || parseInt(grade) > 100) {
      Alert.alert('Error', 'Please enter a valid grade (0-100)');
      return;
    }

    setSubmitting(true);
    try {
      if (assignment?.id && selectedSubmission?.id) {
        const { error } = await supabase
          .from('submissions')
          .update({
            grade: parseInt(grade),
            feedback: feedback.trim() || null,
            graded_at: new Date().toISOString(),
          })
          .eq('id', selectedSubmission.id);

        if (error) throw error;
      }

      // Update local state
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === selectedSubmission.id
            ? { ...sub, grade: parseInt(grade), feedback: feedback.trim() }
            : sub
        )
      );

      setGradeModalVisible(false);
      setSelectedSubmission(null);
      setGrade('');
      setFeedback('');
      Alert.alert('Success', 'Grade submitted successfully');
    } catch (error) {
      console.error('Failed to submit grade:', error);
      Alert.alert('Error', 'Failed to submit grade');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownloadFile = (filename) => {
    // In a real app, this would trigger a file download
    Alert.alert('Download', `Downloading ${filename}...`);
  };

  const SubmissionCard = ({ submission }) => {
    const isGraded = submission.grade !== null;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.studentName}>{submission.student_name}</Text>
            <Text style={styles.studentNim}>NIM: {submission.student_nim}</Text>
            <Text style={styles.submittedDate}>
              Submitted: {formatDate(submission.submitted_at)}
            </Text>
          </View>
          {isGraded && (
            <View style={styles.gradedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.gradedText}>Graded</Text>
            </View>
          )}
        </View>

        <View style={styles.filesSection}>
          <Text style={styles.filesLabel}>Submitted Files:</Text>
          {submission.files.map((file, index) => (
            <TouchableOpacity
              key={index}
              style={styles.fileItem}
              onPress={() => handleDownloadFile(file)}
            >
              <View style={styles.fileIcon}>
                <Ionicons name="document-outline" size={20} color="#0F2A71" />
              </View>
              <Text style={styles.fileName}>{file}</Text>
              <Ionicons name="download-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>

        {isGraded ? (
          <View style={styles.gradeInfo}>
            <Text style={styles.gradeLabel}>Grade: {submission.grade}/100</Text>
            {submission.feedback && (
              <Text style={styles.feedbackText}>Feedback: {submission.feedback}</Text>
            )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.gradeButton}
            onPress={() => openGradeModal(submission)}
          >
            <Text style={styles.gradeButtonText}>Grade Submission</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

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
            <Text style={styles.headerTitle}>Grade Submissions</Text>
            <Text style={styles.headerSubtitle}>
              {assignment?.title || 'Database ERD Assignment'}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Submissions List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {submissions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="documents-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No submissions yet</Text>
          </View>
        ) : (
          submissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Grade Modal */}
      <Modal
        visible={gradeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setGradeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Grade Submission</Text>
              <TouchableOpacity
                onPress={() => setGradeModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.studentInfo}>
              <Text style={styles.studentInfoName}>
                {selectedSubmission?.student_name}
              </Text>
              <Text style={styles.studentInfoNim}>
                NIM: {selectedSubmission?.student_nim}
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Grade (0-100) *</Text>
              <TextInput
                style={styles.input}
                value={grade}
                onChangeText={setGrade}
                placeholder="Enter grade"
                keyboardType="numeric"
                maxLength={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Feedback (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={feedback}
                onChangeText={setFeedback}
                placeholder="Enter feedback for student"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setGradeModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                onPress={handleSubmitGrade}
                disabled={submitting}
              >
                <Text style={styles.submitButtonText}>
                  {submitting ? 'Submitting...' : 'Submit Grade'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 16,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  studentNim: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  submittedDate: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
  gradedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gradedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 4,
  },
  filesSection: {
    marginBottom: 16,
  },
  filesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  fileIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  gradeInfo: {
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
  },
  gradeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  feedbackText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  gradeButton: {
    backgroundColor: '#0F2A71',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  gradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentInfo: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  studentInfoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  studentInfoNim: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  submitButton: {
    flex: 1.5,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#10B981',
    marginLeft: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
