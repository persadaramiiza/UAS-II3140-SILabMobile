import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Card } from '../../components';
import { colors, spacing, typography, shadow } from '../../theme';

export default function ProfileScreen({ navigation }) {
  const { user, userProfile, logout } = useAuth();

  if (!userProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Memuat profil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header with Avatar */}
      <View style={styles.header}>
        {userProfile.picture ? (
          <Image source={{ uri: userProfile.picture }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {userProfile?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        )}
        <Text style={styles.name}>{userProfile?.name || 'User'}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{userProfile?.role?.toUpperCase() || 'STUDENT'}</Text>
        </View>
      </View>

      {/* Profile Information Card */}
      <Card variant="elevation" style={{ marginBottom: spacing.lg }}>
        <Text style={styles.sectionTitle}>Informasi Profil</Text>
        <InfoItem icon="person-outline" label="Username" value={userProfile?.username || '-'} />
        <InfoItem icon="mail-outline" label="Email" value={user?.email || '-'} />
        <InfoItem icon="card-outline" label="NIM / ID" value={userProfile?.student_id || '-'} />
        <InfoItem icon="school-outline" label="Jurusan" value={userProfile?.department || '-'} />
        <InfoItem icon="call-outline" label="Phone" value={userProfile?.phone || '-'} />
        
        {userProfile?.bio && (
          <View style={styles.bioContainer}>
            <View style={styles.bioHeader}>
              <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
              <Text style={styles.bioLabel}>Bio</Text>
            </View>
            <Text style={styles.bioText}>{userProfile.bio}</Text>
          </View>
        )}
      </Card>

      {/* Action Buttons */}
      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate('ProfileEdit')}
        variant="outline"
        icon="create-outline"
        fullWidth
        style={{ marginBottom: spacing.md }}
      />

      <Button
        title="Keluar Aplikasi"
        onPress={logout}
        variant="primary"
        icon="log-out-outline"
        fullWidth
        style={{ 
          marginBottom: spacing.xl,
          backgroundColor: colors.status.error,
        }}
      />
    </ScrollView>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLabel}>
        <Ionicons name={icon} size={18} color={colors.primary} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
  },
  loadingContainer: { 
    flex: 1, 
    backgroundColor: colors.background.primary,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  loadingText: { 
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  header: { 
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  avatarContainer: { 
    width: 100, 
    height: 100, 
    borderRadius: 50,
    backgroundColor: colors.primary + '20',
    borderWidth: 3,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: spacing.md,
  },
  avatarText: { 
    ...typography.heading1,
    color: colors.primary,
  },
  name: { 
    ...typography.heading2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  roleBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  roleText: { 
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  infoRow: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    // Removed gap - not supported in all RN versions
  },
  label: { 
    ...typography.body,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  value: { 
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  bioContainer: { 
    paddingTop: spacing.md,
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // Removed gap - not supported in all RN versions
    marginBottom: spacing.sm,
  },
  bioLabel: { 
    ...typography.body,
    color: colors.text.secondary,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  bioText: { 
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 22,
  },
});