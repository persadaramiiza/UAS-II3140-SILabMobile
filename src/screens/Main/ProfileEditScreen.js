import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../services/supabase';

export default function ProfileEditScreen({ navigation }) {
  const { user, userProfile, refreshUserProfile } = useAuth();
  
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setStudentId(userProfile.student_id || '');
      setDepartment(userProfile.department || '');
      setPhone(userProfile.phone || '');
      setBio(userProfile.bio || '');
      setPicture(userProfile.picture || '');
    }
  }, [userProfile]);

  const handlePickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera roll permission is needed to upload profile picture.');
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setUploadingImage(true);
        const imageUri = result.assets[0].uri;
        
        // Upload to Supabase Storage
        const uploadedUrl = await uploadProfilePicture(imageUri);
        setPicture(uploadedUrl);
        Alert.alert('Success', 'Profile picture uploaded!');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const uploadProfilePicture = async (uri) => {
    try {
      const ext = uri.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${ext}`;
      const filePath = `profile-pictures/${fileName}`;

      // Convert to blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, blob, {
          contentType: blob.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      throw new Error('Failed to upload image: ' + error.message);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from('users')
        .update({
          name: name.trim(),
          student_id: studentId.trim() || null,
          department: department.trim() || null,
          phone: phone.trim() || null,
          bio: bio.trim() || null,
          picture: picture || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      // Refresh user profile in context
      await refreshUserProfile();

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#facc15" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={handlePickImage} 
          disabled={uploadingImage}
          style={styles.avatarContainer}
        >
          {picture ? (
            <Image source={{ uri: picture }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>
                {name.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          )}
          <View style={styles.cameraIcon}>
            {uploadingImage ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="camera" size={16} color="#fff" />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.hint}>Tap to change profile picture</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          placeholderTextColor="#6b7280"
        />

        <Text style={styles.label}>Student ID / NIM</Text>
        <TextInput
          style={styles.input}
          value={studentId}
          onChangeText={setStudentId}
          placeholder="e.g., 13521001"
          placeholderTextColor="#6b7280"
        />

        <Text style={styles.label}>Department / Jurusan</Text>
        <TextInput
          style={styles.input}
          value={department}
          onChangeText={setDepartment}
          placeholder="e.g., Teknik Informatika"
          placeholderTextColor="#6b7280"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="e.g., +62 812-3456-7890"
          placeholderTextColor="#6b7280"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself..."
          placeholderTextColor="#6b7280"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.5 }]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  loadingContainer: { flex: 1, backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', paddingVertical: 32 },
  avatarContainer: { position: 'relative' },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  avatarPlaceholder: { backgroundColor: '#facc15', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 48, fontWeight: 'bold', color: '#000' },
  cameraIcon: { 
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    backgroundColor: '#3b82f6', 
    width: 36, 
    height: 36, 
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#020617'
  },
  hint: { color: '#6b7280', fontSize: 12, marginTop: 12 },
  form: { padding: 20 },
  label: { color: '#9ca3af', fontSize: 14, marginBottom: 8, fontWeight: '500' },
  input: { 
    backgroundColor: '#111827', 
    color: '#fff', 
    borderWidth: 1, 
    borderColor: '#374151', 
    borderRadius: 8, 
    padding: 14, 
    marginBottom: 16,
    fontSize: 16
  },
  textArea: { height: 100, textAlignVertical: 'top', paddingTop: 14 },
  button: { backgroundColor: '#facc15', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  cancelButton: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  cancelButtonText: { color: '#9ca3af', fontSize: 16 }
});
