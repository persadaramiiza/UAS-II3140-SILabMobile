import { useState } from 'react';
import { Screen } from '../App';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  UserPlus, 
  UserCog, 
  FileText, 
  ClipboardList,
  Settings,
  LogIn,
  LogOut,
  Shield,
  X,
  Download
} from 'lucide-react';

interface ActivityLogsProps {
  navigate: (screen: Screen) => void;
}

type ActivityType = 'user' | 'assignment' | 'quiz' | 'system' | 'auth' | 'all';

interface LogEntry {
  id: string;
  type: ActivityType;
  action: string;
  description: string;
  user: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'success' | 'error';
}

export default function ActivityLogs({ navigate }: ActivityLogsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ActivityType>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Mock activity logs
  const logs: LogEntry[] = [
    {
      id: '1',
      type: 'user',
      action: 'User Registered',
      description: 'Ahmad Fauzan (13520089) registered as Student',
      user: 'System',
      timestamp: '2 hours ago',
      severity: 'success',
    },
    {
      id: '2',
      type: 'user',
      action: 'Role Changed',
      description: 'Budi Santoso changed from Student to Assistant',
      user: 'Admin Eko',
      timestamp: '5 hours ago',
      severity: 'info',
    },
    {
      id: '3',
      type: 'assignment',
      action: 'Assignment Created',
      description: 'New assignment "Database Design Project" created',
      user: 'Asst. Dewi Lestari',
      timestamp: '8 hours ago',
      severity: 'info',
    },
    {
      id: '4',
      type: 'quiz',
      action: 'Quiz Completed',
      description: '40 students completed "Database Normalization Quiz"',
      user: 'System',
      timestamp: '1 day ago',
      severity: 'success',
    },
    {
      id: '5',
      type: 'system',
      action: 'Maintenance Scheduled',
      description: 'System maintenance scheduled for Dec 30, 2025',
      user: 'Admin Eko',
      timestamp: '1 day ago',
      severity: 'warning',
    },
    {
      id: '6',
      type: 'auth',
      action: 'Failed Login',
      description: 'Multiple failed login attempts from IP 192.168.1.100',
      user: 'System',
      timestamp: '2 days ago',
      severity: 'error',
    },
    {
      id: '7',
      type: 'assignment',
      action: 'Grades Published',
      description: 'Grades published for "UML Diagram Assignment"',
      user: 'Asst. Budi Santoso',
      timestamp: '2 days ago',
      severity: 'success',
    },
    {
      id: '8',
      type: 'user',
      action: 'User Deactivated',
      description: 'User account Rina Kusuma (13520025) deactivated',
      user: 'Admin Eko',
      timestamp: '3 days ago',
      severity: 'warning',
    },
  ];

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'user':
        return <UserCog size={16} className="text-[#9333EA]" />;
      case 'assignment':
        return <FileText size={16} className="text-[#FBBC04]" />;
      case 'quiz':
        return <ClipboardList size={16} className="text-[#3457D5]" />;
      case 'system':
        return <Settings size={16} className="text-[#EF4444]" />;
      case 'auth':
        return <Shield size={16} className="text-[#10B981]" />;
      default:
        return <UserCog size={16} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'bg-[#10B981]';
      case 'warning':
        return 'bg-[#FBBC04]';
      case 'error':
        return 'bg-[#EF4444]';
      default:
        return 'bg-[#3457D5]';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || log.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const typeCounts = {
    all: logs.length,
    user: logs.filter(l => l.type === 'user').length,
    assignment: logs.filter(l => l.type === 'assignment').length,
    quiz: logs.filter(l => l.type === 'quiz').length,
    system: logs.filter(l => l.type === 'system').length,
    auth: logs.filter(l => l.type === 'auth').length,
  };

  return (
    <div className="min-h-full bg-[#FAFAFA] flex flex-col">
      {/* Fixed Header */}
      <div 
        className="px-6 pt-12 pb-6 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('home')}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>
            Activity Logs
          </h1>
        </div>
        <p className="text-white/80" style={{ fontSize: '14px' }}>
          Monitor system activity and events
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border-b border-[#E8E8E8] px-6 py-4 flex-shrink-0">
        <div className="flex gap-3 mb-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs..."
              className="w-full h-12 pl-11 pr-4 bg-[#F3F3F3] border border-transparent rounded-[12px] focus:outline-none focus:border-[#10B981] focus:bg-white transition-colors"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilterModal(true)}
            className="w-12 h-12 bg-[#F3F3F3] rounded-[12px] flex items-center justify-center hover:bg-[#E8E8E8] transition-colors relative"
          >
            <Filter size={20} className="text-[#10B981]" />
            {filterType !== 'all' && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] rounded-full" />
            )}
          </button>

          {/* Export Button */}
          <button
            className="w-12 h-12 bg-[#10B981] rounded-[12px] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Download size={20} className="text-white" />
          </button>
        </div>

        {/* Active Filter Tag */}
        {filterType !== 'all' && (
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10B981] text-white rounded-full" style={{ fontSize: '12px', fontWeight: 600 }}>
              {getActivityIcon(filterType)}
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              <button
                onClick={() => setFilterType('all')}
                className="ml-1 hover:opacity-70"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-[#E8E8E8] px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
            {filteredLogs.length} activities found
          </span>
          <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
            Last 7 days
          </span>
        </div>
      </div>

      {/* Logs List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 pb-24">
        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white border border-[#E8E8E8] rounded-[16px] p-4"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                {/* Severity Indicator */}
                <div className={`w-1 h-full absolute left-0 top-0 bottom-0 rounded-l-[16px] ${getSeverityColor(log.severity)}`} />
                
                {/* Icon */}
                <div className="w-10 h-10 bg-[#F3F3F3] rounded-full flex items-center justify-center flex-shrink-0">
                  {getActivityIcon(log.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>
                      {log.action}
                    </h3>
                    <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      {log.timestamp}
                    </span>
                  </div>
                  <p className="text-[#6B6B6B] mb-2" style={{ fontSize: '14px' }}>
                    {log.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-[#F3F3F3] text-[#6B6B6B] rounded-[6px]" style={{ fontSize: '12px' }}>
                      {log.type}
                    </span>
                    <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      by {log.user}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-[402px] rounded-t-[24px] p-6 pb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontSize: '20px', fontWeight: 700 }}>
                Filter by Type
              </h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-8 h-8 bg-[#F3F3F3] rounded-full flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {/* All */}
              <button
                onClick={() => {
                  setFilterType('all');
                  setShowFilterModal(false);
                }}
                className={`
                  w-full h-14 px-4 rounded-[12px] flex items-center justify-between transition-colors
                  ${filterType === 'all' ? 'bg-[#10B981] text-white' : 'bg-[#F3F3F3] text-[#111]'}
                `}
              >
                <span style={{ fontSize: '16px', fontWeight: 600 }}>All Activities</span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {typeCounts.all}
                </span>
              </button>

              {/* User Activities */}
              <button
                onClick={() => {
                  setFilterType('user');
                  setShowFilterModal(false);
                }}
                className={`
                  w-full h-14 px-4 rounded-[12px] flex items-center justify-between transition-colors
                  ${filterType === 'user' ? 'bg-[#9333EA] text-white' : 'bg-[#F3F3F3] text-[#111]'}
                `}
              >
                <div className="flex items-center gap-2">
                  <UserCog size={20} className={filterType === 'user' ? 'text-white' : 'text-[#9333EA]'} />
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>User Activities</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {typeCounts.user}
                </span>
              </button>

              {/* Assignment */}
              <button
                onClick={() => {
                  setFilterType('assignment');
                  setShowFilterModal(false);
                }}
                className={`
                  w-full h-14 px-4 rounded-[12px] flex items-center justify-between transition-colors
                  ${filterType === 'assignment' ? 'bg-[#FBBC04] text-white' : 'bg-[#F3F3F3] text-[#111]'}
                `}
              >
                <div className="flex items-center gap-2">
                  <FileText size={20} className={filterType === 'assignment' ? 'text-white' : 'text-[#FBBC04]'} />
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>Assignments</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {typeCounts.assignment}
                </span>
              </button>

              {/* Quiz */}
              <button
                onClick={() => {
                  setFilterType('quiz');
                  setShowFilterModal(false);
                }}
                className={`
                  w-full h-14 px-4 rounded-[12px] flex items-center justify-between transition-colors
                  ${filterType === 'quiz' ? 'bg-[#3457D5] text-white' : 'bg-[#F3F3F3] text-[#111]'}
                `}
              >
                <div className="flex items-center gap-2">
                  <ClipboardList size={20} className={filterType === 'quiz' ? 'text-white' : 'text-[#3457D5]'} />
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>Quizzes</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {typeCounts.quiz}
                </span>
              </button>

              {/* System */}
              <button
                onClick={() => {
                  setFilterType('system');
                  setShowFilterModal(false);
                }}
                className={`
                  w-full h-14 px-4 rounded-[12px] flex items-center justify-between transition-colors
                  ${filterType === 'system' ? 'bg-[#EF4444] text-white' : 'bg-[#F3F3F3] text-[#111]'}
                `}
              >
                <div className="flex items-center gap-2">
                  <Settings size={20} className={filterType === 'system' ? 'text-white' : 'text-[#EF4444]'} />
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>System</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {typeCounts.system}
                </span>
              </button>

              {/* Authentication */}
              <button
                onClick={() => {
                  setFilterType('auth');
                  setShowFilterModal(false);
                }}
                className={`
                  w-full h-14 px-4 rounded-[12px] flex items-center justify-between transition-colors
                  ${filterType === 'auth' ? 'bg-[#10B981] text-white' : 'bg-[#F3F3F3] text-[#111]'}
                `}
              >
                <div className="flex items-center gap-2">
                  <Shield size={20} className={filterType === 'auth' ? 'text-white' : 'text-[#10B981]'} />
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>Authentication</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {typeCounts.auth}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
