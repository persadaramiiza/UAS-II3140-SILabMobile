import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import StudentHomeDashboard from './components/StudentHomeDashboard';
import AssistantHome from './components/AssistantHome';
import AdminHome from './components/AdminHome';
import TasksList from './components/TasksList';
import TaskDetail from './components/TaskDetail';
import AssignmentManagement from './components/AssignmentManagement';
import CreateAssignment from './components/CreateAssignment';
import EditAssignment from './components/EditAssignment';
import GradeSubmissions from './components/GradeSubmissions';
import AnnouncementManagement from './components/AnnouncementManagement';
import EditAnnouncement from './components/EditAnnouncement';
import QuizManagement from './components/QuizManagement';
import CreateQuiz from './components/CreateQuiz';
import EditQuiz from './components/EditQuiz';
import QuizMonitor from './components/QuizMonitor';
import QuizReport from './components/QuizReport';
import QuizList from './components/QuizList';
import QuizTaking from './components/QuizTaking';
import QuizResult from './components/QuizResult';
import ToolsHome from './components/ToolsHome';
import RequirementsViewer from './components/RequirementsViewer';
import DiagramViewer from './components/DiagramViewer';
import EnterpriseArchitecture from './components/EnterpriseArchitecture';
import ERDViewer from './components/ERDViewer';
import ProfileScreen from './components/ProfileScreen';
import EditProfileScreen from './components/EditProfileScreen';
import UserManagement from './components/UserManagement';
import SystemSettings from './components/SystemSettings';
import ActivityLogs from './components/ActivityLogs';
import BottomNav from './components/BottomNav';

export type UserRole = 'student' | 'assistant' | 'admin';

export type Screen = 
  | 'splash' 
  | 'login' 
  | 'register'
  | 'home' 
  | 'tasks' 
  | 'task-detail' 
  | 'assignment-management'
  | 'announcement-management'
  | 'edit-announcement'
  | 'quiz-management'
  | 'create-assignment'
  | 'edit-assignment'
  | 'grade-submissions'
  | 'create-quiz'
  | 'edit-quiz'
  | 'quiz-monitor'
  | 'quiz-report'
  | 'quiz-list' 
  | 'quiz-taking' 
  | 'quiz-result'
  | 'tools'
  | 'requirements'
  | 'diagram-viewer'
  | 'enterprise-architecture'
  | 'erd-viewer'
  | 'profile'
  | 'edit-profile'
  | 'notifications'
  | 'user-management'
  | 'system-settings'
  | 'activity-logs';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userRole, setUserRole] = useState<UserRole>('assistant');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null);

  // Auto transition from splash to login after 9.5s (frame 4 & 6 hold longer)
  useState(() => {
    if (currentScreen === 'splash') {
      setTimeout(() => setCurrentScreen('login'), 9500);
    }
  });

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen('home');
  };

  const navigate = (screen: Screen, data?: any) => {
    setCurrentScreen(screen);
    if (screen === 'task-detail' && data?.taskId) {
      setSelectedTaskId(data.taskId);
    }
    if ((screen === 'quiz-taking' || screen === 'edit-quiz' || screen === 'quiz-monitor' || screen === 'quiz-report') && data?.quizId) {
      setSelectedQuizId(data.quizId);
    }
    if ((screen === 'edit-assignment' || screen === 'grade-submissions') && data?.assignmentId) {
      setSelectedAssignmentId(data.assignmentId);
    }
    if (screen === 'edit-announcement' && data?.announcementId) {
      setSelectedAnnouncementId(data.announcementId);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return (
          <LoginScreen 
            onLogin={handleLogin} 
            onNavigateToRegister={() => setCurrentScreen('register')}
          />
        );
      case 'register':
        return (
          <RegisterScreen 
            onRegister={() => setCurrentScreen('login')}
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'home':
        return userRole === 'assistant' 
          ? <AssistantHome navigate={navigate} /> 
          : userRole === 'admin'
            ? <AdminHome navigate={navigate} />
            : <StudentHomeDashboard navigate={navigate} userRole={userRole} />;
      case 'tasks':
        return <TasksList navigate={navigate} userRole={userRole} />;
      case 'task-detail':
        return <TaskDetail taskId={selectedTaskId} navigate={navigate} />;
      case 'assignment-management':
        return <AssignmentManagement navigate={navigate} />;
      case 'create-assignment':
        return <CreateAssignment navigate={navigate} />;
      case 'edit-assignment':
        return <EditAssignment navigate={navigate} assignmentId={selectedAssignmentId ?? undefined} />;
      case 'grade-submissions':
        return <GradeSubmissions navigate={navigate} assignmentId={selectedAssignmentId ?? undefined} />;
      case 'announcement-management':
        return <AnnouncementManagement navigate={navigate} />;
      case 'edit-announcement':
        return <EditAnnouncement navigate={navigate} announcementId={selectedAnnouncementId} />;
      case 'quiz-management':
        return <QuizManagement navigate={navigate} />;
      case 'create-quiz':
        return <CreateQuiz navigate={navigate} />;
      case 'edit-quiz':
        return <EditQuiz navigate={navigate} quizId={selectedQuizId} />;
      case 'quiz-monitor':
        return <QuizMonitor navigate={navigate} quizId={selectedQuizId} />;
      case 'quiz-report':
        return <QuizReport navigate={navigate} quizId={selectedQuizId} />;
      case 'quiz-list':
        return <QuizList navigate={navigate} userRole={userRole} />;
      case 'quiz-taking':
        return <QuizTaking quizId={selectedQuizId} navigate={navigate} />;
      case 'quiz-result':
        return <QuizResult navigate={navigate} />;
      case 'tools':
        return <ToolsHome navigate={navigate} />;
      case 'requirements':
        return <RequirementsViewer navigate={navigate} userRole={userRole} />;
      case 'diagram-viewer':
        return <DiagramViewer onBack={() => navigate('tools')} navigate={navigate} userRole={userRole} />;
      case 'enterprise-architecture':
        return <EnterpriseArchitecture onBack={() => navigate('tools')} navigate={navigate} userRole={userRole} />;
      case 'erd-viewer':
        return <ERDViewer onBack={() => navigate('tools')} navigate={navigate} userRole={userRole} />;
      case 'profile':
        return <ProfileScreen navigate={navigate} userRole={userRole} onLogout={() => setCurrentScreen('login')} />;
      case 'edit-profile':
        return <EditProfileScreen navigate={navigate} userRole={userRole} />;
      case 'user-management':
        return <UserManagement navigate={navigate} />;
      case 'system-settings':
        return <SystemSettings navigate={navigate} />;
      case 'activity-logs':
        return <ActivityLogs navigate={navigate} />;
      default:
        return <StudentHomeDashboard navigate={navigate} userRole={userRole} />;
    }
  };

  const showBottomNav = !['splash', 'login', 'register', 'quiz-taking', 'requirements', 'diagram-viewer', 'enterprise-architecture', 'erd-viewer', 'edit-profile'].includes(currentScreen);

  return (
    <div className="flex flex-col h-screen w-full max-w-[402px] mx-auto bg-white relative overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {renderScreen()}
      </div>
      {showBottomNav && (
        <BottomNav 
          currentScreen={currentScreen} 
          navigate={navigate}
          userRole={userRole}
        />
      )}
    </div>
  );
}