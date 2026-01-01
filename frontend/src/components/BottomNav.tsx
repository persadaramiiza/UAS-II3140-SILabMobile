import { Home, FileText, ClipboardList, Wrench, User, Bell, UserCog, Settings, Activity } from 'lucide-react';
import { Screen, UserRole } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  userRole: UserRole;
}

export default function BottomNav({ currentScreen, navigate, userRole }: BottomNavProps) {
  // Different nav items for student vs assistant vs admin
  const studentNavItems = [
    { screen: 'home' as Screen, icon: Home, label: 'Home' },
    { screen: 'tasks' as Screen, icon: FileText, label: 'Tasks' },
    { screen: 'quiz-list' as Screen, icon: ClipboardList, label: 'Quiz' },
    { screen: 'tools' as Screen, icon: Wrench, label: 'Tools' },
    { screen: 'profile' as Screen, icon: User, label: 'Profile' },
  ];

  const assistantNavItems = [
    { screen: 'home' as Screen, icon: Home, label: 'Home' },
    { screen: 'assignment-management' as Screen, icon: FileText, label: 'Assignments' },
    { screen: 'announcement-management' as Screen, icon: Bell, label: 'Announce' },
    { screen: 'quiz-management' as Screen, icon: ClipboardList, label: 'Quizzes' },
    { screen: 'profile' as Screen, icon: User, label: 'Profile' },
  ];

  const adminNavItems = [
    { screen: 'home' as Screen, icon: Home, label: 'Home' },
    { screen: 'user-management' as Screen, icon: UserCog, label: 'Users' },
    { screen: 'system-settings' as Screen, icon: Settings, label: 'Settings' },
    { screen: 'activity-logs' as Screen, icon: Activity, label: 'Logs' },
    { screen: 'profile' as Screen, icon: User, label: 'Profile' },
  ];

  const navItems = userRole === 'admin' 
    ? adminNavItems 
    : userRole === 'assistant' 
      ? assistantNavItems 
      : studentNavItems;

  const toolsScreens: Screen[] = ['tools', 'requirements', 'diagram-viewer', 'enterprise-architecture', 'erd-viewer'];
  const assignmentScreens: Screen[] = ['assignment-management', 'create-assignment', 'edit-assignment', 'grade-submissions'];
  const quizManagementScreens: Screen[] = ['quiz-management', 'create-quiz', 'edit-quiz', 'quiz-monitor', 'quiz-report'];
  const announcementScreens: Screen[] = ['announcement-management', 'edit-announcement'];

  return (
    <nav className="border-t border-[var(--brand-divider)] bg-white/80 backdrop-blur-lg">
      <div className="flex items-center justify-around h-20 px-6">
        {navItems.map((item) => {
          let isActive = currentScreen === item.screen;
          
          // Check for nested screens
          if (item.screen === 'tools') {
            isActive = toolsScreens.includes(currentScreen);
          } else if (item.screen === 'assignment-management') {
            isActive = assignmentScreens.includes(currentScreen);
          } else if (item.screen === 'quiz-management') {
            isActive = quizManagementScreens.includes(currentScreen);
          } else if (item.screen === 'announcement-management') {
            isActive = announcementScreens.includes(currentScreen);
          }
          
          const Icon = item.icon;
          
          return (
            <button
              key={item.screen}
              onClick={() => navigate(item.screen)}
              className="flex items-center justify-center w-14 h-14 rounded-full transition-all"
              style={{
                backgroundColor: isActive ? '#0F2A71' : 'transparent',
              }}
            >
              <Icon 
                size={24} 
                className={isActive ? 'text-white' : 'text-[var(--text-secondary)]'}
                strokeWidth={2}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}