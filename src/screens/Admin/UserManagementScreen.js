import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  Modal,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../services/supabase';
import { formatDate } from '../../utils/helpers';

const { width } = Dimensions.get('window');

export default function UserManagementScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [changingRole, setChangingRole] = useState(false);
  
  // New states for add/edit user
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Password change states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    student_id: '',
    bio: '',
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, role, student_id, bio, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
      applyFilters(data || [], searchQuery, roleFilter);
    } catch (error) {
      console.error('Failed to load users:', error);
      Alert.alert('Error', 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const applyFilters = (userList, search, role) => {
    let filtered = userList;

    // Apply search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.student_id?.toLowerCase().includes(query)
      );
    }

    // Apply role filter
    if (role !== 'all') {
      filtered = filtered.filter((user) => user.role === role);
    }

    setFilteredUsers(filtered);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    applyFilters(users, text, roleFilter);
  };

  const handleRoleFilterSelect = (role) => {
    setRoleFilter(role);
    applyFilters(users, searchQuery, role);
    setFilterModalVisible(false);
  };

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setRoleModalVisible(true);
  };

  const handleChangeRole = async (newRole) => {
    if (!selectedUser || newRole === selectedUser.role) return;

    try {
      setChangingRole(true);
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', selectedUser.id);

      if (error) throw error;

      Alert.alert('Success', `Role changed to ${newRole}`);
      setRoleModalVisible(false);
      loadUsers();
    } catch (error) {
      console.error('Failed to change role:', error);
      Alert.alert('Error', 'Failed to change role');
    } finally {
      setChangingRole(false);
    }
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'student',
      student_id: '',
      bio: '',
    });
  };

  // Open add user modal
  const openAddUserModal = () => {
    resetFormData();
    setAddUserModalVisible(true);
  };

  // Open edit user modal
  const openEditUserModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'student',
      student_id: user.student_id || '',
      bio: user.bio || '',
    });
    setEditUserModalVisible(true);
  };

  // Handle add new user
  const handleAddUser = async () => {
    // Validation
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setSaving(true);

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            name: formData.name.trim(),
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Insert into users table
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            name: formData.name.trim(),
            email: formData.email.trim(),
            role: formData.role,
            student_id: formData.student_id.trim() || null,
            bio: formData.bio.trim() || null,
          });

        if (insertError) {
          console.error('Insert error:', insertError);
          // If user already exists in users table, update instead
          if (insertError.code === '23505') {
            await supabase
              .from('users')
              .update({
                name: formData.name.trim(),
                role: formData.role,
                student_id: formData.student_id.trim() || null,
                bio: formData.bio.trim() || null,
              })
              .eq('id', authData.user.id);
          } else {
            throw insertError;
          }
        }
      }

      Alert.alert('Success', 'User created successfully');
      setAddUserModalVisible(false);
      resetFormData();
      loadUsers();
    } catch (error) {
      console.error('Failed to add user:', error);
      Alert.alert('Error', error.message || 'Failed to create user');
    } finally {
      setSaving(false);
    }
  };

  // Handle edit user
  const handleEditUser = async () => {
    if (!selectedUser) return;

    // Validation
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }

    try {
      setSaving(true);

      // Update users table
      const updateData = {
        name: formData.name.trim(),
        role: formData.role,
        student_id: formData.student_id.trim() || null,
        bio: formData.bio.trim() || null,
      };

      // Only update email if changed
      if (formData.email.trim() !== selectedUser.email) {
        updateData.email = formData.email.trim();
      }

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', selectedUser.id);

      if (error) throw error;

      Alert.alert('Success', 'User updated successfully');
      setEditUserModalVisible(false);
      setSelectedUser(null);
      resetFormData();
      loadUsers();
    } catch (error) {
      console.error('Failed to update user:', error);
      Alert.alert('Error', error.message || 'Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = (user) => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete "${user.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('users')
                .delete()
                .eq('id', user.id);

              if (error) throw error;

              Alert.alert('Success', 'User deleted successfully');
              loadUsers();
            } catch (error) {
              console.error('Failed to delete user:', error);
              Alert.alert('Error', 'Failed to delete user');
            }
          },
        },
      ]
    );
  };

  // Open password change modal
  const openPasswordModal = (user) => {
    setSelectedUser(user);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordModalVisible(true);
  };

  // Handle password change
  const handleChangePassword = async () => {
    if (!selectedUser) return;

    // Validation
    if (!newPassword || newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setSaving(true);

      // Note: Changing another user's password requires admin privileges
      // In production, this should be done through a secure backend API
      // For now, we'll use Supabase auth admin API if available
      const { error } = await supabase.auth.admin.updateUserById(
        selectedUser.id,
        { password: newPassword }
      );

      if (error) {
        // If admin API is not available, show appropriate message
        if (error.message.includes('not authorized') || error.message.includes('admin')) {
          Alert.alert(
            'Info',
            'Password reset request sent. The user will receive an email to reset their password.',
            [{ text: 'OK' }]
          );
          // As fallback, send password reset email
          await supabase.auth.resetPasswordForEmail(selectedUser.email);
        } else {
          throw error;
        }
      } else {
        Alert.alert('Success', 'Password changed successfully');
      }

      setPasswordModalVisible(false);
      setNewPassword('');
      setConfirmPassword('');
      setSelectedUser(null);
    } catch (error) {
      console.error('Failed to change password:', error);
      Alert.alert('Error', error.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'admin':
        return { bg: '#FEE2E2', text: '#DC2626', icon: 'shield' };
      case 'assistant':
        return { bg: '#DBEAFE', text: '#2563EB', icon: 'person' };
      default:
        return { bg: '#D1FAE5', text: '#059669', icon: 'school' };
    }
  };

  const getRoleCount = (role) => {
    if (role === 'all') return users.length;
    return users.filter((u) => u.role === role).length;
  };

  const UserCard = ({ user }) => {
    const roleStyle = getRoleBadgeStyle(user.role);
    const initials = user.name
      ? user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : '?';

    return (
      <View style={styles.userCard}>
        <View style={styles.userCardHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.userNameRow}>
              <Text style={styles.userName}>{user.name || 'Unknown'}</Text>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>active</Text>
              </View>
            </View>
            <Text style={styles.userEmail}>{user.email}</Text>
            {user.student_id && (
              <Text style={styles.userNim}>NIM: {user.student_id}</Text>
            )}
          </View>
        </View>

        <View style={styles.userCardFooter}>
          <View style={[styles.roleBadge, { backgroundColor: roleStyle.bg }]}>
            <Ionicons name={roleStyle.icon} size={14} color={roleStyle.text} />
            <Text style={[styles.roleBadgeText, { color: roleStyle.text }]}>
              {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student'}
            </Text>
          </View>
          <Text style={styles.registeredDate}>
            Registered: {formatDate(user.created_at)}
          </Text>
        </View>

        {/* Action buttons */}
        <View style={styles.userCardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => openEditUserModal(user)}
          >
            <Ionicons name="create-outline" size={16} color="#0F2A71" />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => openPasswordModal(user)}
          >
            <Ionicons name="key-outline" size={16} color="#F59E0B" />
            <Text style={[styles.actionButtonText, { color: '#F59E0B' }]}>Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteUser(user)}
          >
            <Ionicons name="trash-outline" size={16} color="#DC2626" />
            <Text style={[styles.actionButtonText, { color: '#DC2626' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Form Input Component
  const FormInput = ({ label, value, onChangeText, placeholder, secureTextEntry, multiline, keyboardType }) => (
    <View style={styles.formGroup}>
      <Text style={styles.formLabel}>{label}</Text>
      <TextInput
        style={[styles.formInput, multiline && styles.formInputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        keyboardType={keyboardType || 'default'}
      />
    </View>
  );

  // Role Selector Component
  const RoleSelector = ({ selectedRole, onSelectRole }) => (
    <View style={styles.formGroup}>
      <Text style={styles.formLabel}>Role</Text>
      <View style={styles.roleSelector}>
        {['student', 'assistant', 'admin'].map((role) => {
          const style = getRoleBadgeStyle(role);
          const isSelected = selectedRole === role;
          return (
            <TouchableOpacity
              key={role}
              style={[
                styles.roleSelectorOption,
                isSelected && { backgroundColor: style.bg, borderColor: style.text },
              ]}
              onPress={() => onSelectRole(role)}
            >
              <Ionicons name={style.icon} size={16} color={isSelected ? style.text : '#6B7280'} />
              <Text style={[styles.roleSelectorText, isSelected && { color: style.text }]}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F2A71', '#1E3A8A']} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>User Management</Text>
            <Text style={styles.headerSubtitle}>Manage user accounts and roles</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={openAddUserModal}
          >
            <Ionicons name="person-add" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, email, or NIM"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Ionicons name="funnel" size={20} color="#0F2A71" />
          </TouchableOpacity>
        </View>

        {/* Results Count */}
        <Text style={styles.resultsCount}>{filteredUsers.length} users found</Text>

        {/* User List */}
        <ScrollView
          style={styles.userList}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
          {filteredUsers.length === 0 && !loading && (
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={48} color="#9CA3AF" />
              <Text style={styles.emptyText}>No users found</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={openAddUserModal}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>Filter by Role</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>
            {[
              { key: 'all', label: 'All Users', icon: 'people' },
              { key: 'student', label: 'Students', icon: 'school' },
              { key: 'assistant', label: 'Assistants', icon: 'person' },
              { key: 'admin', label: 'Admins', icon: 'shield' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.filterOption,
                  roleFilter === option.key && styles.filterOptionSelected,
                ]}
                onPress={() => handleRoleFilterSelect(option.key)}
              >
                <View style={styles.filterOptionLeft}>
                  <Ionicons
                    name={option.icon}
                    size={20}
                    color={roleFilter === option.key ? '#0F2A71' : '#6B7280'}
                  />
                  <Text
                    style={[
                      styles.filterOptionText,
                      roleFilter === option.key && styles.filterOptionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </View>
                <Text style={styles.filterOptionCount}>{getRoleCount(option.key)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Change Role Modal */}
      <Modal
        visible={roleModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setRoleModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.roleModal}>
            <View style={styles.roleModalIcon}>
              <Ionicons name="people" size={32} color="#0F2A71" />
            </View>
            <Text style={styles.roleModalTitle}>Change User Role</Text>
            <Text style={styles.roleModalUser}>{selectedUser?.name}</Text>
            <Text style={styles.roleModalEmail}>{selectedUser?.email}</Text>
            <Text style={styles.roleModalCurrentRole}>
              Current role: {selectedUser?.role || 'Student'}
            </Text>

            <View style={styles.roleOptions}>
              {['student', 'assistant', 'admin'].map((role) => {
                const style = getRoleBadgeStyle(role);
                const isSelected = selectedUser?.role === role;
                return (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.roleOption,
                      isSelected && styles.roleOptionSelected,
                      { borderColor: style.text },
                    ]}
                    onPress={() => handleChangeRole(role)}
                    disabled={changingRole}
                  >
                    <Ionicons name={style.icon} size={18} color={style.text} />
                    <Text style={[styles.roleOptionText, { color: style.text }]}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setRoleModalVisible(false)}
              disabled={changingRole}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add User Modal */}
      <Modal
        visible={addUserModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddUserModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.formModal}>
            <View style={styles.formModalHeader}>
              <Text style={styles.formModalTitle}>Add New User</Text>
              <TouchableOpacity onPress={() => setAddUserModalVisible(false)}>
                <Ionicons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formModalContent} showsVerticalScrollIndicator={false}>
              <FormInput
                label="Full Name *"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter full name"
              />

              <FormInput
                label="Email *"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="Enter email address"
                keyboardType="email-address"
              />

              <FormInput
                label="Password *"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                placeholder="Enter password (min 6 characters)"
                secureTextEntry
              />

              <FormInput
                label="Student ID (NIM)"
                value={formData.student_id}
                onChangeText={(text) => setFormData({ ...formData, student_id: text })}
                placeholder="Enter student ID"
              />

              <FormInput
                label="Bio"
                value={formData.bio}
                onChangeText={(text) => setFormData({ ...formData, bio: text })}
                placeholder="Enter bio"
                multiline
              />

              <RoleSelector
                selectedRole={formData.role}
                onSelectRole={(role) => setFormData({ ...formData, role })}
              />
            </ScrollView>

            <View style={styles.formModalFooter}>
              <TouchableOpacity
                style={styles.formCancelButton}
                onPress={() => setAddUserModalVisible(false)}
                disabled={saving}
              >
                <Text style={styles.formCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.formSubmitButton, saving && styles.formSubmitButtonDisabled]}
                onPress={handleAddUser}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons name="person-add" size={18} color="#FFFFFF" />
                    <Text style={styles.formSubmitButtonText}>Add User</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        visible={editUserModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditUserModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.formModal}>
            <View style={styles.formModalHeader}>
              <Text style={styles.formModalTitle}>Edit User</Text>
              <TouchableOpacity onPress={() => setEditUserModalVisible(false)}>
                <Ionicons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formModalContent} showsVerticalScrollIndicator={false}>
              <FormInput
                label="Full Name *"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter full name"
              />

              <FormInput
                label="Email *"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="Enter email address"
                keyboardType="email-address"
              />

              <FormInput
                label="Student ID (NIM)"
                value={formData.student_id}
                onChangeText={(text) => setFormData({ ...formData, student_id: text })}
                placeholder="Enter student ID"
              />

              <FormInput
                label="Bio"
                value={formData.bio}
                onChangeText={(text) => setFormData({ ...formData, bio: text })}
                placeholder="Enter bio"
                multiline
              />

              <RoleSelector
                selectedRole={formData.role}
                onSelectRole={(role) => setFormData({ ...formData, role })}
              />
            </ScrollView>

            <View style={styles.formModalFooter}>
              <TouchableOpacity
                style={styles.formCancelButton}
                onPress={() => setEditUserModalVisible(false)}
                disabled={saving}
              >
                <Text style={styles.formCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.formSubmitButton, saving && styles.formSubmitButtonDisabled]}
                onPress={handleEditUser}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                    <Text style={styles.formSubmitButtonText}>Save Changes</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.formModal}>
            <View style={styles.formModalHeader}>
              <Text style={styles.formModalTitle}>Change Password</Text>
              <TouchableOpacity onPress={() => setPasswordModalVisible(false)}>
                <Ionicons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            <View style={styles.formModalContent}>
              {/* User Info */}
              <View style={styles.passwordUserInfo}>
                <View style={styles.passwordUserAvatar}>
                  <Ionicons name="person" size={24} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.passwordUserName}>{selectedUser?.name}</Text>
                  <Text style={styles.passwordUserEmail}>{selectedUser?.email}</Text>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>New Password *</Text>
                <TextInput
                  style={styles.formInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password (min 6 characters)"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Confirm Password *</Text>
                <TextInput
                  style={styles.formInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm new password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                />
              </View>

              <View style={styles.passwordNote}>
                <Ionicons name="information-circle-outline" size={18} color="#6B7280" />
                <Text style={styles.passwordNoteText}>
                  Password must be at least 6 characters long.
                </Text>
              </View>
            </View>

            <View style={styles.formModalFooter}>
              <TouchableOpacity
                style={styles.formCancelButton}
                onPress={() => setPasswordModalVisible(false)}
                disabled={saving}
              >
                <Text style={styles.formCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.formSubmitButton, styles.passwordSubmitButton, saving && styles.formSubmitButtonDisabled]}
                onPress={handleChangePassword}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons name="key" size={18} color="#FFFFFF" />
                    <Text style={styles.formSubmitButtonText}>Change Password</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    marginLeft: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  userList: {
    flex: 1,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  userCardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0F2A71',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#059669',
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  userNim: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  userCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  registeredDate: {
    flex: 1,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
  },
  userCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0F2A71',
    marginLeft: 4,
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0F2A71',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterOptionSelected: {
    backgroundColor: '#EEF2FF',
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  filterOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 12,
  },
  filterOptionTextSelected: {
    color: '#0F2A71',
    fontWeight: '600',
  },
  filterOptionCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  roleModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  roleModalIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  roleModalUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  roleModalEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  roleModalCurrentRole: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    marginBottom: 24,
  },
  roleOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  roleOptionSelected: {
    backgroundColor: '#F3F4F6',
  },
  roleOptionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  // Form Modal Styles
  formModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  formModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  formModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  formModalContent: {
    padding: 20,
    maxHeight: 400,
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
  formInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  formInputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  roleSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  roleSelectorOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  roleSelectorText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 6,
  },
  formModalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  formCancelButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  formCancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  formSubmitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#0F2A71',
    gap: 8,
  },
  formSubmitButtonDisabled: {
    opacity: 0.7,
  },
  formSubmitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Password Modal Styles
  passwordUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 20,
  },
  passwordUserAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0F2A71',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  passwordUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  passwordUserEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  passwordNote: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginTop: 8,
  },
  passwordNoteText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  passwordSubmitButton: {
    backgroundColor: '#F59E0B',
  },
});
