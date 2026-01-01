import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, userProfile, logout } = useAuth();

  if (!userProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#facc15" />
        <Text style={styles.loadingText}>Memuat profil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {userProfile.picture ? (
          <Image source={{ uri: userProfile.picture }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userProfile?.name?.charAt(0)?.toUpperCase() || 'U'}</Text>
          </View>
        )}
        <Text style={styles.name}>{userProfile?.name || 'User'}</Text>
        <Text style={styles.role}>{userProfile?.role?.toUpperCase() || 'STUDENT'}</Text>
      </View>

      <View style={styles.infoSection}>
        <InfoItem label="Username" value={userProfile?.username || '-'} />
        <InfoItem label="Email" value={user?.email || '-'} />
        <InfoItem label="NIM / ID" value={userProfile?.student_id || '-'} />
        <InfoItem label="Jurusan" value={userProfile?.department || '-'} />
        <InfoItem label="Phone" value={userProfile?.phone || '-'} />
        {userProfile?.bio && (
          <View style={styles.bioContainer}>
            <Text style={styles.bioLabel}>Bio</Text>
            <Text style={styles.bioText}>{userProfile.bio}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity 
        style={styles.editBtn} 
        onPress={() => navigation.navigate('ProfileEdit')}
      >
        <Ionicons name="create-outline" size={20} color="#facc15" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Keluar Aplikasi</Text>
      </TouchableOpacity>
    </View>
  );
}

function InfoItem({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  loadingContainer: { flex: 1, backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#9ca3af', marginTop: 12 },
  header: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#facc15', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#000' },
  name: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  role: { color: '#9ca3af', fontSize: 12, letterSpacing: 1, marginTop: 4 },
  infoSection: { backgroundColor: '#111827', borderRadius: 12, padding: 16, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1f2937' },
  label: { color: '#9ca3af' },
  value: { color: '#fff', fontWeight: '500' },
  bioContainer: { paddingTop: 12, marginTop: 8, borderTopWidth: 1, borderTopColor: '#1f2937' },
  bioLabel: { color: '#9ca3af', fontSize: 14, marginBottom: 6 },
  bioText: { color: '#d1d5db', lineHeight: 20 },
  editBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827', borderWidth: 1, borderColor: '#facc15', padding: 14, borderRadius: 12, marginBottom: 12 },
  editText: { color: '#facc15', fontWeight: 'bold', marginLeft: 8 },
  logoutBtn: { backgroundColor: '#ef4444', padding: 16, borderRadius: 12, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: 'bold' }
});