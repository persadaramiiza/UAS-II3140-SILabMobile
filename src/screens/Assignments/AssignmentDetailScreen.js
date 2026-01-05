import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { getAssignment, getSubmissions, createOrUpdateSubmission } from '../../services/assignmentsApi';
import { uploadSubmissionFile } from '../../services/fileUploadApi';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../services/supabase';
import { colors, spacing, borderRadius, shadow } from '../../theme';

export default function AssignmentDetailScreen({ route, navigation }) {
  const { user, userProfile } = useAuth();
  const { assignmentId } = route.params;
  const [detail, setDetail] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [descriptionExpanded, setDescriptionExpanded] = useState(true);
  const [submissionExpanded, setSubmissionExpanded] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
        const sub = userSubmissions[0];
        setSubmission(sub);
        setSubmissionLink(sub.link || '');
        setSubmissionNotes(sub.notes || '');
        
        // Load submission files from database
        const { data: files, error: filesError } = await supabase
          .from('submission_files')
          .select('*')
          .eq('submission_id', sub.id)
          .order('created_at', { ascending: false });
        
        if (!filesError && files) {
          // Map database files to uploadedFiles format
          const mappedFiles = files.map(file => ({
            id: file.id,
            name: file.original_name,
            path: file.storage_path,
            contentType: file.content_type,
            size: file.size_bytes,
            uploadedAt: file.created_at,
          }));
          setUploadedFiles(mappedFiles);
        } else {
          setUploadedFiles([]);
        }
      } else {
        setUploadedFiles([]);
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
    // Jika ada grade, berarti sudah di-grade
    if (submission.grade !== null && submission.grade !== undefined) return 'Graded';
    // Jika ada submission (tapi belum di-grade), berarti sudah submit
    return 'Submitted';
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

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const file = result.assets[0];
        Alert.alert(
          'Upload File',
          `Upload ${file.name}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Upload',
              onPress: async () => {
                try {
                  setSubmitting(true);
                  // Upload file to storage only (no DB insert yet)
                  const fileData = await uploadSubmissionFile(file);
                  setUploadedFiles(prev => [
                    ...prev,
                    { 
                      name: fileData.name, 
                      url: fileData.url, 
                      size: fileData.size, 
                      path: fileData.path,
                      contentType: fileData.contentType 
                    }
                  ]);
                  Alert.alert('Success', 'File uploaded successfully!');
                } catch (error) {
                  console.error('Upload error:', error);
                  Alert.alert('Error', 'Failed to upload file');
                } finally {
                  setSubmitting(false);
                }
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('File picker error:', error);
    }
  };

  const handleRemoveFile = (index) => {
    Alert.alert(
      'Remove File',
      'Are you sure you want to remove this file?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setUploadedFiles(prev => prev.filter((_, i) => i !== index));
          }
        }
      ]
    );
  };

  const handleSubmit = async () => {
    if (!submissionLink.trim() && uploadedFiles.length === 0 && !submissionNotes.trim()) {
      Alert.alert('Error', 'Please provide at least a link, file, or notes for your submission');
      return;
    }

    try {
      setSubmitting(true);
      
      const submissionData = {
        student_name: userProfile?.name || user?.email || 'Unknown',
        link: submissionLink.trim() || null,
        notes: submissionNotes.trim() || null,
        submitted_at: new Date().toISOString(),
      };

      const result = await createOrUpdateSubmission(assignmentId, user.id, submissionData);
      
      // INSERT file metadata to submission_files table AFTER submission is created
      if (uploadedFiles.length > 0 && result?.id) {
        for (const file of uploadedFiles) {
          if (file.path) {
            const { error: insertError } = await supabase
              .from('submission_files')
              .insert({
                submission_id: result.id,
                storage_path: file.path,
                original_name: file.name,
                content_type: file.contentType || 'application/octet-stream',
                size_bytes: file.size || 0,
                uploaded_by: user.id,
              });
            
            if (insertError) {
              console.error('Failed to save file metadata:', insertError);
            }
          }
        }
      }
      
      Alert.alert('Success', 'Assignment submitted successfully!', [
        { text: 'OK', onPress: () => loadData() }
      ]);
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'Failed to submit assignment. Please try again.');
    } finally {
      setSubmitting(false);
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
  const displayDate = detail?.created_at;

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
            {displayDate ? `Created: ${new Date(displayDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : '-'}
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

        {/* Submission Section */}
        {status !== 'Graded' && (
          <TouchableOpacity
            style={styles.section}
            onPress={() => setSubmissionExpanded(!submissionExpanded)}
            activeOpacity={0.7}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Submission</Text>
              <Ionicons
                name={submissionExpanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#1F2937"
              />
            </View>

            {submissionExpanded && (
              <View style={styles.submissionForm}>
                {/* Link Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Link (GitHub, Drive, etc.)</Text>
                  <TextInput
                    style={styles.textInput}
                    value={submissionLink}
                    onChangeText={setSubmissionLink}
                    placeholder="https://..."
                    placeholderTextColor="#9CA3AF"
                    editable={status !== 'Graded'}
                  />
                </View>

                {/* File Upload */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Upload Files</Text>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={handlePickFile}
                    disabled={submitting || status === 'Graded'}
                  >
                    <Ionicons name="cloud-upload-outline" size={20} color="#3B82F6" />
                    <Text style={styles.uploadButtonText}>Choose File</Text>
                  </TouchableOpacity>
                  
                  {uploadedFiles.length > 0 && (
                    <View style={styles.filesList}>
                      {uploadedFiles.map((file, index) => (
                        <View key={index} style={styles.fileItem}>
                          <Ionicons name="document-attach" size={20} color="#3B82F6" />
                          <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
                          {status !== 'Graded' && (
                            <TouchableOpacity onPress={() => handleRemoveFile(index)}>
                              <Ionicons name="close-circle" size={20} color="#EF4444" />
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                {/* Notes Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Notes (Optional)</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={submissionNotes}
                    onChangeText={setSubmissionNotes}
                    placeholder="Add any notes or comments..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    editable={status !== 'Graded'}
                  />
                </View>

                {/* Submit Button */}
                {status !== 'Graded' && (
                  <TouchableOpacity
                    style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <>
                        <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                        <Text style={styles.submitButtonText}>
                          {status === 'Submitted' ? 'Update Submission' : 'Submit Assignment'}
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            )}
          </TouchableOpacity>
        )}

        {/* Graded Submission Display */}
        {status === 'Graded' && submission && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Submission</Text>
            <View style={styles.gradeBox}>
              <Text style={styles.gradeLabel}>Score</Text>
              <Text style={styles.gradeValue}>{typeof submission.grade === 'object' ? submission.grade?.score : submission.grade}/100</Text>
            </View>
            {submission.link && (
              <View style={styles.submissionDetail}>
                <Text style={styles.detailLabel}>Link:</Text>
                <Text style={styles.detailValue}>{submission.link}</Text>
              </View>
            )}
            {submission.notes && (
              <View style={styles.submissionDetail}>
                <Text style={styles.detailLabel}>Notes:</Text>
                <Text style={styles.detailValue}>{submission.notes}</Text>
              </View>
            )}
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
  submissionForm: {
    marginTop: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: spacing.xs,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 14,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    minHeight: 100,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: borderRadius.md,
    borderStyle: 'dashed',
    padding: spacing.md,
    backgroundColor: '#EFF6FF',
  },
  uploadButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  filesList: {
    marginTop: spacing.sm,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  fileName: {
    flex: 1,
    fontSize: 13,
    color: '#1F2937',
    marginLeft: spacing.xs,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: spacing.xs,
  },
  gradeBox: {
    backgroundColor: '#DCFCE7',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  gradeLabel: {
    fontSize: 14,
    color: '#166534',
    marginBottom: spacing.xs,
  },
  gradeValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#15803D',
  },
  submissionDetail: {
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
  },
});
