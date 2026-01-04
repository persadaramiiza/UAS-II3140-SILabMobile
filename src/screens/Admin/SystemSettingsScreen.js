import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../services/supabase';

export default function SystemSettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    maintenanceMode: false,
    allowRegistration: true,
  });
  const [saving, setSaving] = useState(false);

  // Load settings from database (or AsyncStorage in real app)
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // In a real app, you'd fetch from a settings table
      // For now, we use local state
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleToggle = async (key) => {
    if (key === 'maintenanceMode' && !settings.maintenanceMode) {
      Alert.alert(
        'Enable Maintenance Mode?',
        'This will disable access for maintenance. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Enable',
            style: 'destructive',
            onPress: () => saveSettings(key, true),
          },
        ]
      );
    } else {
      saveSettings(key, !settings[key]);
    }
  };

  const saveSettings = async (key, value) => {
    setSaving(true);
    try {
      // In a real app, save to database
      setSettings((prev) => ({ ...prev, [key]: value }));
      
      // Show feedback for important settings
      if (key === 'maintenanceMode') {
        Alert.alert(
          value ? 'Maintenance Mode Enabled' : 'Maintenance Mode Disabled',
          value ? 'Students will not be able to access the app.' : 'App is now accessible to all users.'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save setting');
    } finally {
      setSaving(false);
    }
  };

  const SettingItem = ({ icon, iconColor, iconBgColor, title, subtitle, settingKey }) => (
    <View style={styles.settingItem}>
      <View style={[styles.settingIcon, { backgroundColor: iconBgColor }]}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={settings[settingKey]}
        onValueChange={() => handleToggle(settingKey)}
        trackColor={{ false: '#E5E7EB', true: '#10B981' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#E5E7EB"
        disabled={saving}
      />
    </View>
  );

  const ActionItem = ({ icon, iconColor, iconBgColor, title, subtitle, onPress }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={saving}>
      <View style={[styles.settingIcon, { backgroundColor: iconBgColor }]}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F59E0B', '#F97316']} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>System Settings</Text>
            <Text style={styles.headerSubtitle}>Configure system preferences</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.sectionCard}>
          <SettingItem
            icon="mail-outline"
            iconColor="#3B82F6"
            iconBgColor="#EFF6FF"
            title="Email Notifications"
            subtitle="Send email for important updates"
            settingKey="emailNotifications"
          />
          <SettingItem
            icon="notifications-outline"
            iconColor="#F59E0B"
            iconBgColor="#FFFBEB"
            title="Push Notifications"
            subtitle="Browser push notifications"
            settingKey="pushNotifications"
          />
        </View>

        {/* System */}
        <Text style={styles.sectionTitle}>System</Text>
        <View style={styles.sectionCard}>
          <SettingItem
            icon="construct-outline"
            iconColor="#EF4444"
            iconBgColor="#FEF2F2"
            title="Maintenance Mode"
            subtitle="Disable access for maintenance"
            settingKey="maintenanceMode"
          />
          <SettingItem
            icon="globe-outline"
            iconColor="#10B981"
            iconBgColor="#ECFDF5"
            title="Allow Registration"
            subtitle="Allow new users to register"
            settingKey="allowRegistration"
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>SI Lab Mobile v1.0.0</Text>
          <Text style={styles.appInfoSubtext}>© 2026 Institut Teknologi Bandung</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
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
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  appInfoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  appInfoSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
