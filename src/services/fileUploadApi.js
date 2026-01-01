import { supabase } from './supabase';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

/**
 * Pick a file using DocumentPicker
 */
export async function pickFile() {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // Allow all file types
      copyToCacheDirectory: true,
    });

    if (result.type === 'cancel') {
      return null;
    }

    return {
      uri: result.uri,
      name: result.name,
      mimeType: result.mimeType || 'application/octet-stream',
      size: result.size,
    };
  } catch (error) {
    console.error('Error picking file:', error);
    throw new Error('Failed to pick file: ' + error.message);
  }
}

/**
 * Upload a file to Supabase Storage
 * @param {object} file - File object from pickFile()
 * @param {string} submissionId - Submission ID
 * @param {string} userId - User ID
 */
export async function uploadSubmissionFile(file, submissionId, userId) {
  try {
    if (!file || !file.uri) {
      throw new Error('No file selected');
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}_${file.name}`;
    const filePath = `${userId}/${fileName}`;

    // Read file as base64
    const base64 = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert base64 to blob
    const arrayBuffer = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('submission-files')
      .upload(filePath, arrayBuffer, {
        contentType: file.mimeType,
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Create record in submission_files table
    const { data: fileRecord, error: recordError } = await supabase
      .from('submission_files')
      .insert({
        submission_id: submissionId,
        storage_path: filePath,
        original_name: file.name,
        content_type: file.mimeType,
        size_bytes: file.size,
        uploaded_by: userId,
      })
      .select()
      .single();

    if (recordError) {
      // Rollback: delete uploaded file from storage
      await supabase.storage.from('submission-files').remove([filePath]);
      throw recordError;
    }

    return fileRecord;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file: ' + error.message);
  }
}

/**
 * Get all files for a submission
 * @param {string} submissionId 
 */
export async function getSubmissionFiles(submissionId) {
  try {
    const { data, error } = await supabase
      .from('submission_files')
      .select('*')
      .eq('submission_id', submissionId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching submission files:', error);
    throw new Error('Failed to fetch files: ' + error.message);
  }
}

/**
 * Get download URL for a file
 * @param {string} storagePath 
 */
export async function getFileDownloadUrl(storagePath) {
  try {
    const { data, error } = await supabase.storage
      .from('submission-files')
      .createSignedUrl(storagePath, 3600); // 1 hour expiry

    if (error) throw error;

    return data.signedUrl;
  } catch (error) {
    console.error('Error getting download URL:', error);
    throw new Error('Failed to get download URL: ' + error.message);
  }
}

/**
 * Delete a submission file
 * @param {string} fileId - File record ID
 * @param {string} storagePath - Storage path
 */
export async function deleteSubmissionFile(fileId, storagePath) {
  try {
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('submission-files')
      .remove([storagePath]);

    if (storageError) throw storageError;

    // Delete record from database
    const { error: dbError } = await supabase
      .from('submission_files')
      .delete()
      .eq('id', fileId);

    if (dbError) throw dbError;

    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file: ' + error.message);
  }
}

/**
 * Format file size to human readable
 * @param {number} bytes 
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
