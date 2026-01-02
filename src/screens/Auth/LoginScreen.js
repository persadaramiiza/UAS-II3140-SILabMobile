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
import { colors, typography, spacing, borderRadius, shadow } from '../../theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter an email and password.');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('Login Failed', error.message);
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    const demoAccounts = {
      student: { email: 'student@itb.ac.id', password: 'student123' },
      assistant: { email: 'assistant@itb.ac.id', password: 'assistant123' },
      admin: { email: 'admin@itb.ac.id', password: 'admin123' }
    };

    const account = demoAccounts[role];
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
      // Auto login after setting credentials
      try {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword(account);
        if (error) {
          Alert.alert('Demo Login Failed', error.message);
        }
      } catch (err) {
        Alert.alert('Error', err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'exp://localhost:8081',
        },
      });

      if (error) {
        Alert.alert('Google Sign-In Failed', error.message);
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'An unexpected error occurred.');
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
        {/* Decorative Elements */}
        <View style={styles.decorativeTopLeft} />
        <View style={styles.decorativeTopRight} />

        {/* Logo and Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../assets/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.welcomeTitle}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue to SILab Suite</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          {/* Email Input */}
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

          {/* Password Input */}
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowPassword(!showPassword)}
            disabled={loading}
            style={{ marginBottom: spacing.xs }}
          />

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            title={loading ? "Signing in..." : "Log in"}
            onPress={handleLogin}
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

          {/* Google Sign In Button */}
          <TouchableOpacity 
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={loading}
          >
            <Ionicons name="logo-google" size={20} color="#4285F4" />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>

          {/* Quick Demo Access */}
          <View style={styles.demoSection}>
            <Text style={styles.demoTitle}>Quick Demo Access</Text>
            <View style={styles.demoButtons}>
              <TouchableOpacity 
                style={styles.demoButton}
                onPress={() => handleDemoLogin('student')}
                disabled={loading}
              >
                <Text style={styles.demoButtonText}>Student</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.demoButton}
                onPress={() => handleDemoLogin('assistant')}
                disabled={loading}
              >
                <Text style={styles.demoButtonText}>Assistant</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.demoButton}
                onPress={() => handleDemoLogin('admin')}
                disabled={loading}
              >
                <Text style={styles.demoButtonText}>Admin</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Register here</Text>
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
  decorativeTopLeft: {
    position: 'absolute',
    top: -50,
    left: -30,
    width: 200,
    height: 200,
    backgroundColor: '#FFF4E6',
    borderRadius: 100,
    opacity: 0.6,
  },
  decorativeTopRight: {
    position: 'absolute',
    top: 30,
    right: -40,
    width: 150,
    height: 150,
    backgroundColor: '#FFE5CC',
    borderRadius: 75,
    opacity: 0.5,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    marginTop: spacing.xl,
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
  welcomeTitle: {
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  divider: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: borderRadius.md,
    height: 52,
    marginBottom: spacing.lg,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  demoSection: {
    backgroundColor: '#F3F4F6',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  demoTitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  demoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  demoButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  demoButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  registerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  registerLink: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '700',
  },
});