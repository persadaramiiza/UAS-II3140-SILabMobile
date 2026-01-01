import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen'; // <-- Tambahan Baru
import HomeScreen from '../screens/Main/HomeScreen';
import ModulesScreen from '../screens/Main/ModulesScreen'; // <-- PERBAIKAN: Hapus 's' di ModuleScreen
import ProfileScreen from '../screens/Main/ProfileScreen';
import ProfileEditScreen from '../screens/Main/ProfileEditScreen';
import ModuleContentScreen from '../screens/Modules/ModuleContentScreen';
import CreateAnnouncementScreen from '../screens/Announcements/CreateAnnouncementScreen';

import AssignmentListScreen from '../screens/Assignments/AssignmentListScreen';
import AssignmentDetailScreen from '../screens/Assignments/AssignmentDetailScreen';

import QuizListScreen from '../screens/Quiz/QuizListScreen';
import QuizRoomScreen from '../screens/Quiz/QuizRoomScreen';

import { useAuth } from '../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const commonHeaderStyle = {
  headerStyle: { backgroundColor: '#020617' },
  headerTintColor: '#facc15',
  contentStyle: { backgroundColor: '#020617' },
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...commonHeaderStyle,
        tabBarStyle: { backgroundColor: '#020617', borderTopColor: '#1f2937' },
        tabBarActiveTintColor: '#facc15',
        tabBarInactiveTintColor: '#6b7280',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Modul') iconName = 'library';
          else if (route.name === 'Tugas') iconName = 'list';
          else if (route.name === 'Quiz') iconName = 'school';
          else if (route.name === 'Akun') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Pengumuman' }} />
      <Tab.Screen name="Modul" component={ModulesScreen} />
      <Tab.Screen name="Tugas" component={AssignmentListScreen} />
      <Tab.Screen name="Quiz" component={QuizListScreen} />
      <Tab.Screen name="Akun" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#facc15" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, ...commonHeaderStyle }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} /> 
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={HomeTabs} />
          <Stack.Screen 
            name="ModuleContent" 
            component={ModuleContentScreen} 
            options={({ route }) => ({ 
              headerShown: true, 
              title: route.params?.moduleTitle || 'Materi Modul',
            })} 
          />
          <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{ headerShown: true, title: 'Edit Profile' }} />
          <Stack.Screen name="AssignmentDetail" component={AssignmentDetailScreen} options={{ headerShown: true, title: 'Detail Tugas' }} />
          <Stack.Screen name="QuizRoom" component={QuizRoomScreen} options={{ headerShown: true, title: 'Mengerjakan Quiz' }} />
          <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncementScreen} options={{ headerShown: true, title: 'Buat Pengumuman' }} />
        </>
      )}
    </Stack.Navigator>
  );
}