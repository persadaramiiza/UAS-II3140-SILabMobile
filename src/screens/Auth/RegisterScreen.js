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
import { colors, typography, spacing, borderRadius } from '../../theme';

WebBrowser.maybeCompleteAuthSession();

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
        Alert.alert('Success!', 'Your account has been created successfully.');
        // AuthContext will automatically handle the navigation when session is created
      }
    } catch (err) {
      Alert.alert('Registration Error', err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
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

        {/* Registration Form Card */}
        <View style={styles.formCard}>
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
            <Text style={styles.googleButtonText}>Sign up with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signInLink}>Sign in</Text>
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
    paddingTop: 60,
    paddingBottom: spacing.xl,
    position: 'relative',
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: spacing.md,
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
  title: {
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
    marginTop: spacing.sm,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '400',
    marginLeft: spacing.sm,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 12,
    color: '#6B6B6B',
  },
  signInLink: {
    fontSize: 12,
    color: '#0F2A71',
    fontWeight: '600',
  },
});