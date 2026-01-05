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
  Image,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from '../../services/supabase';
import { Button, Input } from '../../components';
import { colors, typography, spacing, borderRadius, shadow } from '../../theme';

WebBrowser.maybeCompleteAuthSession();

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
          // If login fails with invalid credentials, try to auto-register the demo account
          if (error.message.includes("Invalid login credentials")) {
            console.log(`Demo user ${role} not found, attempting to register...`);
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email: account.email,
              password: account.password,
              options: {
                data: {
                  full_name: role.charAt(0).toUpperCase() + role.slice(1) + ' Demo',
                  role: role
                }
              }
            });

            if (signUpError) {
              Alert.alert('Demo Login Failed', `Could not register demo account: ${signUpError.message}`);
            } else if (signUpData.session) {
              // Registration successful and session created (auto-confirm enabled)
              // AuthContext will handle the state change
            } else if (signUpData.user && !signUpData.session) {
              Alert.alert('Demo Account Created', 'Account created but requires email confirmation.');
            }
          } else {
            Alert.alert('Demo Login Failed', error.message);
          }
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
      
      // Use Supabase callback URL - let it handle the redirect
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: true, // Important for mobile
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        Alert.alert('Google Sign-In Failed', error.message);
        return;
      }

      if (data?.url) {
        console.log('Opening Google OAuth URL...');
        
        // Open browser and let user complete sign in
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          null // Let browser handle redirect naturally
        );

        console.log('WebBrowser result:', result);

        if (result.type === 'success' || result.type === 'dismiss' || result.type === 'cancel') {
          // Browser closed, check if session was created
          // Give Supabase a moment to process the callback
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Try to get current session
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (session) {
            console.log('Google Sign-In successful! Session created.');
            // AuthContext will detect the session change
          } else {
            // If no session, try to extract tokens from URL if available
            if (result.type === 'success' && result.url) {
              const url = result.url;
              const hashParams = new URLSearchParams(url.split('#')[1] || '');
              const queryParams = new URLSearchParams(url.split('?')[1]?.split('#')[0] || '');
              
              const accessToken = hashParams.get('access_token') || queryParams.get('access_token');
              const refreshToken = hashParams.get('refresh_token') || queryParams.get('refresh_token');

              if (accessToken) {
                const { error: setError } = await supabase.auth.setSession({
                  access_token: accessToken,
                  refresh_token: refreshToken || '',
                });

                if (setError) {
                  console.error('Session error:', setError);
                  Alert.alert('Session Error', setError.message);
                } else {
                  console.log('Google Sign-In successful via manual token!');
                }
              } else {
                console.log('Sign-in process completed but no session detected');
                Alert.alert('Info', 'Please check your connection and try again');
              }
            } else {
              console.log('Browser closed without completing sign-in');
            }
          }
        }
      }
      
    } catch (error) {
      console.error('Google Sign-In error:', error);
      Alert.alert('Google Sign-In Error', error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Decorative Background - Absolute Position */}
      <View style={styles.decorativeBackground}>
        <Image 
          source={require('../../../assets/login-illustration.png')} 
          style={styles.decorationImage}
          resizeMode="cover"
        />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
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

        {/* Login Form Card */}
        <View style={styles.formCard}>
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
            style={{ marginBottom: 0 }}
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
            style={{ marginTop: spacing.lg }}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
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
        </View>

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  decorativeBackground: {
    position: 'absolute',
    left: -80,
    top: -96,
    width: 298,
    height: 529,
    zIndex: 0,
  },
  decorationImage: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: 64,
    paddingBottom: spacing.xl,
    position: 'relative',
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoContainer: {
    width: 80,
    height: 80,
    marginBottom: spacing.md,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#0F2A71',
    fontWeight: '400',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  dividerText: {
    fontSize: 16,
    color: '#6B6B6B',
    marginHorizontal: spacing.md,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    height: 48,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '400',
    marginLeft: spacing.sm,
  },
  demoSection: {
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    padding: 16,
    marginBottom: spacing.md,
  },
  demoTitle: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 12,
  },
  demoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  demoButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  demoButtonText: {
    fontSize: 16,
    color: '#0F2A71',
    fontWeight: '400',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  registerText: {
    fontSize: 12,
    color: '#6B6B6B',
  },
  registerLink: {
    fontSize: 12,
    color: '#0F2A71',
    fontWeight: '600',
  },
});