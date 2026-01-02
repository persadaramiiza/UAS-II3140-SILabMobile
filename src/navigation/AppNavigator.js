import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import ModulesScreen from '../screens/Main/ModulesScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import ProfileEditScreen from '../screens/Main/ProfileEditScreen';
import ModuleContentScreen from '../screens/Modules/ModuleContentScreen';
import CreateAnnouncementScreen from '../screens/Announcements/CreateAnnouncementScreen';

import AssignmentListScreen from '../screens/Assignments/AssignmentListScreen';
import AssignmentDetailScreen from '../screens/Assignments/AssignmentDetailScreen';

import QuizListScreen from '../screens/Quiz/QuizListScreen';
import QuizRoomScreen from '../screens/Quiz/QuizRoomScreen';

// Interactive Module Screens
import RequirementsEngineeringScreen from '../screens/Modules/RequirementsEngineeringScreen';
import EnterpriseArchitectureScreen from '../screens/Modules/EnterpriseArchitectureScreen';
import InteractionDesignScreen from '../screens/Modules/InteractionDesignScreen';
import ERDBuilderScreen from '../screens/Modules/ERDBuilderScreen';

import { useAuth } from '../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const commonHeaderStyle = {
  headerStyle: { backgroundColor: colors.background.primary },
  headerTintColor: colors.primary,
  contentStyle: { backgroundColor: colors.background.primary },
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...commonHeaderStyle,
        tabBarStyle: { 
          backgroundColor: colors.background.primary,
          borderTopColor: colors.border.light,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Modul') iconName = focused ? 'library' : 'library-outline';
          else if (route.name === 'Tugas') iconName = focused ? 'list' : 'list-outline';
          else if (route.name === 'Quiz') iconName = focused ? 'school' : 'school-outline';
          else if (route.name === 'Akun') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={24} color={color} />;
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
      <View style={{ 
        flex: 1, 
        backgroundColor: colors.background.primary,
        justifyContent: 'center', 
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color={colors.primary} />
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
          
          {/* Interactive Module Screens */}
          <Stack.Screen 
            name="RequirementsEngineering" 
            component={RequirementsEngineeringScreen} 
            options={{ headerShown: true, title: 'Requirements Engineering' }} 
          />
          <Stack.Screen 
            name="EnterpriseArchitecture" 
            component={EnterpriseArchitectureScreen} 
            options={{ headerShown: true, title: 'Enterprise Architecture' }} 
          />
          <Stack.Screen 
            name="InteractionDesign" 
            component={InteractionDesignScreen} 
            options={{ headerShown: true, title: 'Interaction Design' }} 
          />
          <Stack.Screen 
            name="ERDBuilder" 
            component={ERDBuilderScreen} 
            options={{ headerShown: true, title: 'ERD Builder' }} 
          />

          <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{ headerShown: true, title: 'Edit Profile' }} />
          <Stack.Screen name="AssignmentDetail" component={AssignmentDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="QuizRoom" component={QuizRoomScreen} options={{ headerShown: true, title: 'Mengerjakan Quiz' }} />
          <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncementScreen} options={{ headerShown: true, title: 'Buat Pengumuman' }} />
        </>
      )}
    </Stack.Navigator>
  );
}