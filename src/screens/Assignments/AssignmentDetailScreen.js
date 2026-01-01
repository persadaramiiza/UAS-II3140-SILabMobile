import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAssignment, getSubmissions, createOrUpdateSubmission } from '../../services/assignmentsApi';
import { 
  pickFile, 
  uploadSubmissionFile, 
  getSubmissionFiles, 
  getFileDownloadUrl,
  deleteSubmissionFile,
  formatFileSize 
} from '../../services/fileUploadApi';
import { useAuth } from '../../contexts/AuthContext';

export default function AssignmentDetailScreen({ route, navigation }) {
  const { user } = useAuth();
  const { assignmentId } = route.params;
  const [detail, setDetail] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const assignmentDetail = await getAssignment(assignmentId);
      setDetail(assignmentDetail);

      const userSubmissions = await getSubmissions(assignmentId, user.id);
      if (userSubmissions && userSubmissions.length > 0) {
        const mySub = userSubmissions[0];
        setSubmission(mySub);
        setLink(mySub.link || '');
        setNotes(mySub.notes || '');
        
        // Load files for this submission
        if (mySub.id) {
          const submissionFiles = await getSubmissionFiles(mySub.id);
          setFiles(submissionFiles);
        }
      }
    } catch (err) {
      Alert.alert('Error', err.message);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!link && !notes && files.length === 0) {
      Alert.alert('Peringatan', 'Isi Link, Catatan, atau Upload File untuk mengumpulkan.');
      return;
    }
    try {
      setSubmitting(true);
      await createOrUpdateSubmission(assignmentId, user.id, { link, notes });
      Alert.alert('Sukses', 'Tugas berhasil dikumpulkan!');
      loadData(); // Refresh status
    } catch (err) {
      Alert.alert('Gagal', err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePickFile = async () => {
    try {
      // Make sure submission exists first
      if (!submission) {
        Alert.alert('Info', 'Simpan pengumpulan terlebih dahulu sebelum upload file.');
        return;
      }

      setUploadingFile(true);
      const file = await pickFile();
      
      if (file) {
        await uploadSubmissionFile(file, submission.id, user.id);
        Alert.alert('Sukses', 'File berhasil diupload!');
        loadData(); // Refresh files
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDownloadFile = async (file) => {
    try {
      const url = await getFileDownloadUrl(file.storage_path);
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert('Error', 'Gagal membuka file: ' + err.message);
    }
  };

  const handleDeleteFile = async (file) => {
    Alert.alert(
      'Hapus File',
      `Yakin ingin menghapus ${file.original_name}?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteSubmissionFile(file.id, file.storage_path);
              Alert.alert('Sukses', 'File berhasil dihapus');
              loadData();
            } catch (err) {
              Alert.alert('Error', err.message);
            }
          },
        },
      ]
    );
  };

  if (loading) return <View style={styles.center}><ActivityIndicator color="#facc15" /></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.focus}>{detail?.focus}</Text>
        <Text style={styles.title}>{detail?.title}</Text>
        <Text style={styles.desc}>{detail?.description}</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Pengumpulan Tugas</Text>
        
        {submission?.grade && (
          <View style={styles.gradeBox}>
            <Text style={styles.gradeLabel}>Nilai: {submission.grade.score}/100</Text>
            <Text style={styles.gradeFeedback}>Feedback: {submission.grade.feedback}</Text>
          </View>
        )}

        <Text style={styles.label}>Link Pengerjaan (Google Drive/Github)</Text>
        <TextInput 
          style={styles.input} 
          value={link} 
          onChangeText={setLink} 
          placeholder="https://..." 
          placeholderTextColor="#6b7280"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Catatan Tambahan</Text>
        <TextInput 
          style={[styles.input, { height: 80 }]} 
          value={notes} 
          onChangeText={setNotes} 
          multiline 
          placeholder="Catatan untuk asisten..." 
          placeholderTextColor="#6b7280"
          textAlignVertical="top"
        />

        <Text style={styles.label}>File Lampiran</Text>
        {files.length > 0 && (
          <View style={styles.filesContainer}>
            {files.map((file) => (
              <View key={file.id} style={styles.fileItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fileName} numberOfLines={1}>{file.original_name}</Text>
                  <Text style={styles.fileSize}>{formatFileSize(file.size_bytes)}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDownloadFile(file)} style={styles.iconButton}>
                  <Ionicons name="download-outline" size={20} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteFile(file)} style={styles.iconButton}>
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity 
          style={[styles.uploadButton, uploadingFile && { opacity: 0.5 }]} 
          onPress={handlePickFile}
          disabled={uploadingFile || !submission}
        >
          <Ionicons name="cloud-upload-outline" size={20} color="#3b82f6" />
          <Text style={styles.uploadButtonText}>
            {uploadingFile ? 'Uploading...' : submission ? 'Upload File' : 'Simpan pengumpulan dulu'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, submitting && { opacity: 0.5 }]} 
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.buttonText}>
            {submission ? 'Update Pengumpulan' : 'Kumpulkan Tugas'}
          </Text>
        </TouchableOpacity>

        {submission && (
          <Text style={styles.status}>
            Terakhir dikumpulkan: {new Date(submission.updated_at).toLocaleString('id-ID')}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  center: { flex: 1, backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#1f2937' },
  focus: { color: '#facc15', fontWeight: 'bold', fontSize: 12, marginBottom: 4 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  desc: { color: '#d1d5db', fontSize: 16, lineHeight: 24 },
  formCard: { padding: 20 },
  formTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  label: { color: '#9ca3af', marginBottom: 6 },
  input: { backgroundColor: '#111827', color: '#fff', borderWidth: 1, borderColor: '#374151', borderRadius: 8, padding: 12, marginBottom: 16 },
  filesContainer: { marginBottom: 16 },
  fileItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111827', padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#374151' },
  fileName: { color: '#fff', fontSize: 14, fontWeight: '500' },
  fileSize: { color: '#6b7280', fontSize: 12, marginTop: 2 },
  iconButton: { padding: 8, marginLeft: 8 },
  uploadButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827', borderWidth: 1, borderColor: '#3b82f6', padding: 14, borderRadius: 8, marginBottom: 16 },
  uploadButtonText: { color: '#3b82f6', fontWeight: '600', marginLeft: 8 },
  button: { backgroundColor: '#facc15', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#000', fontWeight: 'bold' },
  status: { color: '#6b7280', textAlign: 'center', marginTop: 12, fontSize: 12 },
  gradeBox: { backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: 12, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.3)' },
  gradeLabel: { color: '#34d399', fontWeight: 'bold', fontSize: 16 },
  gradeFeedback: { color: '#d1d5db', marginTop: 4 }
});