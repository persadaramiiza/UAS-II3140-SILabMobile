import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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


// Layout wrapper for pages with bottom navigation
function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideBottomNavPaths = [
    '/splash', 
    '/login', 
    '/register', 
    '/quiz-taking', 
    '/requirements', 
    '/diagram-viewer', 
    '/enterprise-architecture', 
    '/erd-viewer', 
    '/edit-profile'
  ];

  const shouldShowBottomNav = !hideBottomNavPaths.some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex flex-col h-screen w-full max-w-[402px] mx-auto bg-white relative overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {children}
      </div>
      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout>
          <Routes>
            {/* Public routes */}
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* Protected routes - All authenticated users */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<StudentHomeDashboard />} />
              <Route path="/tasks" element={<TasksList />} />
              <Route path="/tasks/:taskId" element={<TaskDetail />} />
              <Route path="/quiz-list" element={<QuizList />} />
              <Route path="/quiz-taking/:quizId" element={<QuizTaking />} />
              <Route path="/quiz-result/:quizId" element={<QuizResult />} />
              <Route path="/tools" element={<ToolsHome />} />
              <Route path="/requirements" element={<RequirementsViewer />} />
              <Route path="/diagram-viewer" element={<DiagramViewer />} />
              <Route path="/enterprise-architecture" element={<EnterpriseArchitecture />} />
              <Route path="/erd-viewer" element={<ERDViewer />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/edit-profile" element={<EditProfileScreen />} />
            </Route>

            {/* Assistant routes */}
            <Route element={<ProtectedRoute allowedRoles={['assistant', 'admin']} />}>
              <Route path="/assistant" element={<AssistantHome />} />
              <Route path="/assignments" element={<AssignmentManagement />} />
              <Route path="/assignments/create" element={<CreateAssignment />} />
              <Route path="/assignments/edit/:assignmentId" element={<EditAssignment />} />
              <Route path="/assignments/grade/:assignmentId" element={<GradeSubmissions />} />
              <Route path="/announcements" element={<AnnouncementManagement />} />
              <Route path="/announcements/edit/:announcementId" element={<EditAnnouncement />} />
              <Route path="/quizzes" element={<QuizManagement />} />
              <Route path="/quizzes/create" element={<CreateQuiz />} />
              <Route path="/quizzes/edit/:quizId" element={<EditQuiz />} />
              <Route path="/quizzes/monitor/:quizId" element={<QuizMonitor />} />
              <Route path="/quizzes/report/:quizId" element={<QuizReport />} />
            </Route>

            {/* Admin only routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/settings" element={<SystemSettings />} />
              <Route path="/activity-logs" element={<ActivityLogs />} />
            </Route>

            {/* 404 redirect */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}