import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { isAssistant, canManageContent, isAdmin } from '../utils/helpers';

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
import QuizReviewScreen from '../screens/Quiz/QuizReviewScreen';

// Interactive Module Screens
import RequirementsEngineeringScreen from '../screens/Modules/RequirementsEngineeringScreen';
import EnterpriseArchitectureScreen from '../screens/Modules/EnterpriseArchitectureScreen';
import InteractionDesignScreen from '../screens/Modules/InteractionDesignScreen';
import ERDBuilderScreen from '../screens/Modules/ERDBuilderScreen';

// Assistant Screens
import AssistantHomeScreen from '../screens/Assistant/AssistantHomeScreen';
import AssignmentManagementScreen from '../screens/Assistant/AssignmentManagementScreen';
import GradeSubmissionsScreen from '../screens/Assistant/GradeSubmissionsScreen';
import CreateAssignmentScreen from '../screens/Assistant/CreateAssignmentScreen';
import EditAssignmentScreen from '../screens/Assistant/EditAssignmentScreen';
import AnnouncementManagementScreen from '../screens/Assistant/AnnouncementManagementScreen';
import EditAnnouncementScreen from '../screens/Assistant/EditAnnouncementScreen';
import QuizManagementScreen from '../screens/Assistant/QuizManagementScreen';
import CreateQuizScreen from '../screens/Assistant/CreateQuizScreen';
import QuizMonitorScreen from '../screens/Assistant/QuizMonitorScreen';
import QuizReportScreen from '../screens/Assistant/QuizReportScreen';

// Admin Screens
import { 
  AdminHomeScreen, 
  UserManagementScreen, 
  SystemSettingsScreen, 
  ActivityLogsScreen 
} from '../screens/Admin';

import { useAuth } from '../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const commonHeaderStyle = {
  headerStyle: { backgroundColor: colors.background.primary },
  headerTintColor: colors.primary,
  contentStyle: { backgroundColor: colors.background.primary },
};

// Student Home Tabs
function StudentHomeTabs() {
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
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Pengumuman', headerShown: false }} />
      <Tab.Screen name="Modul" component={ModulesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Tugas" component={AssignmentListScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Quiz" component={QuizListScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Akun" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Assistant Home Tabs
function AssistantHomeTabs() {
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
        tabBarActiveTintColor: '#0F2A71',
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Tugas') iconName = focused ? 'document-text' : 'document-text-outline';
          else if (route.name === 'Pengumuman') iconName = focused ? 'notifications' : 'notifications-outline';
          else if (route.name === 'Quiz') iconName = focused ? 'school' : 'school-outline';
          else if (route.name === 'Akun') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={AssistantHomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Tugas" component={AssignmentManagementScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Pengumuman" component={AnnouncementManagementScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Quiz" component={QuizManagementScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Akun" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Admin Home Tabs
function AdminHomeTabs() {
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
        tabBarActiveTintColor: '#0F2A71',
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Users') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          else if (route.name === 'Activity') iconName = focused ? 'pulse' : 'pulse-outline';
          else if (route.name === 'Akun') iconName = focused ? 'person' : 'person-outline';
          
          // Special styling for focused home icon with circular background
          if (route.name === 'Dashboard' && focused) {
            return (
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#0F2A71',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Ionicons name="home" size={24} color="#FFFFFF" />
              </View>
            );
          }
          
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminHomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Users" component={UserManagementScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SystemSettingsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Activity" component={ActivityLogsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Akun" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Wrapper component to handle role-based tabs
function MainTabsWrapper() {
  const { userProfile } = useAuth();
  
  // Check if user is admin (has all permissions + user management)
  if (isAdmin(userProfile)) {
    return <AdminHomeTabs />;
  }
  
  // Check if user is assistant or instructor
  if (canManageContent(userProfile)) {
    return <AssistantHomeTabs />;
  }
  
  return <StudentHomeTabs />;
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
          <Stack.Screen name="MainTabs" component={MainTabsWrapper} />
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
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="EnterpriseArchitecture" 
            component={EnterpriseArchitectureScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="InteractionDesign" 
            component={InteractionDesignScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="ERDBuilder" 
            component={ERDBuilderScreen} 
            options={{ headerShown: false }} 
          />

          {/* Assistant/Instructor Screens */}
          <Stack.Screen 
            name="AssignmentManagement" 
            component={AssignmentManagementScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="GradeSubmissions" 
            component={GradeSubmissionsScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="CreateAssignment" 
            component={CreateAssignmentScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="EditAssignment" 
            component={EditAssignmentScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="EditAnnouncement" 
            component={EditAnnouncementScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="CreateQuiz" 
            component={CreateQuizScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="QuizMonitor" 
            component={QuizMonitorScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="QuizReport" 
            component={QuizReportScreen} 
            options={{ headerShown: false }} 
          />

          {/* Admin Screens */}
          <Stack.Screen 
            name="UserManagement" 
            component={UserManagementScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SystemSettings" 
            component={SystemSettingsScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="ActivityLogs" 
            component={ActivityLogsScreen} 
            options={{ headerShown: false }} 
          />

          <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{ headerShown: true, title: 'Edit Profile' }} />
          <Stack.Screen name="AssignmentDetail" component={AssignmentDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="QuizRoom" component={QuizRoomScreen} options={{ headerShown: true, title: 'Mengerjakan Quiz' }} />
          <Stack.Screen name="QuizReview" component={QuizReviewScreen} options={{ headerShown: true, title: 'Review Quiz' }} />
          <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncementScreen} options={{ headerShown: true, title: 'Buat Pengumuman' }} />
        </>
      )}
    </Stack.Navigator>
  );
}