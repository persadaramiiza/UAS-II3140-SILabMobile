import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../services/supabase';
import { Button, Input } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../theme';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !studentId) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            student_id: studentId,
          },
          emailRedirectTo: undefined,
        },
      });

      if (error) {
        Alert.alert('Registration Failed', error.message);
      } else {
        Alert.alert('Success!', 'Your account has been created. Please login.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (err) {
      Alert.alert('Registration Error', err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../assets/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Register to access SILab Suite</Text>
        </View>

        {/* Registration Form */}
        <View style={styles.formContainer}>
          <Input
            label="Full Name"
            placeholder="Persada R"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            disabled={loading}
            style={{ marginBottom: spacing.lg }}
          />

          <Input
            label="Student ID / NIM"
            placeholder="13520001"
            value={studentId}
            onChangeText={setStudentId}
            keyboardType="number-pad"
            disabled={loading}
            style={{ marginBottom: spacing.lg }}
          />

          <Input
            label="Email"
            placeholder="student@itb.ac.id"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            disabled={loading}
            style={{ marginBottom: spacing.lg }}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowPassword(!showPassword)}
            disabled={loading}
            style={{ marginBottom: spacing.lg }}
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={loading}
            style={{ marginBottom: spacing.xl }}
          />

          <Button
            title={loading ? "Creating account..." : "Create Account"}
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            variant="primary"
            size="large"
            fullWidth
            style={{ marginTop: spacing.md }}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <Text style={styles.dividerText}>or</Text>
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: 60,
    paddingBottom: spacing.xxl,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    marginBottom: spacing.lg,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  divider: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  signInText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signInLink: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '700',
  },
});