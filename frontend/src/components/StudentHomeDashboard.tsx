import { Bell, Clock, Calendar, TrendingUp } from 'lucide-react';
import { Screen, UserRole } from '../App';
import imgIllustration from "figma:asset/6fc1d61ea861ee21215ef9bb50320d83c9dccb1f.png";
import img31 from "figma:asset/a00b1dd9baefaa1e5be49afe583112751ee604fc.png";
import imgLogo12 from "figma:asset/c7331baf757474afb91e9105f759afebcb9348c1.png";

interface StudentHomeDashboardProps {
  navigate: (screen: Screen, data?: any) => void;
  userRole: UserRole;
}

export default function StudentHomeDashboard({ navigate, userRole }: StudentHomeDashboardProps) {
  // Mock user data
  const userName = "Persada R";
  
  // Mock data
  const stats = {
    dueSoon: 3,
    quizToday: 1,
  };

  const nextDeadline = {
    course: 'System Analysis & Design',
    title: 'UML Class Diagram Assignment',
    dueDate: 'Tomorrow, 11:59 PM',
    status: 'Active',
  };

  const announcements = [
    {
      id: 1,
      title: 'Lab Session Rescheduled',
      snippet: 'Tomorrow\'s lab session will be moved to 2 PM',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      title: 'New Quiz Available',
      snippet: 'Requirements Engineering quiz is now available',
      timestamp: '5 hours ago',
    },
    {
      id: 3,
      title: 'Assignment Deadline Extension',
      snippet: 'ERD assignment deadline extended to next week',
      timestamp: '1 day ago',
    },
  ];

  const progress = {
    tasksCompleted: 8,
    totalTasks: 12,
    averageQuizScore: 85,
  };

  return (
    <div className="min-h-full bg-white overflow-y-auto scrollbar-hide">
      {/* Styled Header with Background */}
      <div className="relative h-[222px] -mt-[65px] mb-1">
        {/* Background Image */}
        <div className="absolute inset-0 rounded-bl-[20px] rounded-br-[20px] overflow-hidden">
          <img 
            alt="" 
            className="absolute h-[321.97%] left-0 max-w-none top-[-112.6%] w-full object-cover" 
            src={img31} 
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-[rgba(30,30,30,0.4)] rounded-bl-[20px] rounded-br-[20px]" />
        
        {/* Logo */}
        <div className="absolute h-[56px] right-[22px] top-[92px] w-[54px]">
          <img 
            alt="SILab Suite Logo" 
            className="w-full h-full object-cover" 
            src={imgLogo12} 
          />
        </div>
        
        {/* Text Content */}
        <div className="relative pt-[137px] px-8">
          <p className="text-white mb-2" style={{ fontSize: '30px', fontWeight: 700, lineHeight: 'normal' }}>
            Hi, {userName}!
          </p>
          <p className="text-white" style={{ fontSize: '15px', lineHeight: 'normal' }}>
            <span>Are you </span>
            <span style={{ fontWeight: 700, fontStyle: 'italic' }}>ready</span>
            <span> to </span>
            <span style={{ fontWeight: 700, fontStyle: 'italic' }}>explore</span>
            <span> today?</span>
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Illustration Widget with Floating Stats */}
        <div className="relative h-[340px]">
          {/* Illustration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img 
              alt="Exploration illustration" 
              className="absolute h-[198.14%] left-0 max-w-none top-[-27.55%] w-full" 
              src={imgIllustration} 
            />
          </div>
          
          {/* Floating Stats Cards */}
          <div className="absolute bottom-6 left-0 right-0">
            <div className="grid grid-cols-2 gap-3">
              {/* Due Soon Card */}
              <div className="bg-white rounded-2xl p-4 border border-[#E8E8E8] shadow-sm">
                <div className="flex items-center gap-2 mb-2" style={{ color: '#0F2A71' }}>
                  <Clock className="w-4 h-4" />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Due Soon</span>
                </div>
                <p style={{ fontSize: '32px', fontWeight: 700, color: '#0F2A71', lineHeight: '1' }}>
                  {stats.dueSoon}
                </p>
              </div>

              {/* Quiz Today Card */}
              <div className="bg-white rounded-2xl p-4 border border-[#E8E8E8] shadow-sm">
                <div className="flex items-center gap-2 mb-2" style={{ color: '#0F2A71' }}>
                  <Calendar className="w-4 h-4" />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Quiz Today</span>
                </div>
                <p style={{ fontSize: '32px', fontWeight: 700, color: '#0F2A71', lineHeight: '1' }}>
                  {stats.quizToday}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section B: Next Deadline */}
        <div className="space-y-4">
          <p style={{ fontSize: '16px', fontWeight: 400, color: '#111', lineHeight: '24px' }}>
            Next Deadline
          </p>
          <div 
            className="bg-white rounded-[16px] p-4 border border-[#FBBC04]" 
            style={{ backgroundColor: 'rgba(251,188,4,0.2)' }}
          >
            {/* Course Chip */}
            <div className="inline-flex items-center px-3 py-2 rounded-[999px] mb-3 bg-[#F3F3F3]">
              <span style={{ fontSize: '16px', fontWeight: 400, color: '#6B6B6B', lineHeight: '24px' }}>
                {nextDeadline.course}
              </span>
            </div>

            {/* Title */}
            <h3 className="mb-3" style={{ fontSize: '16px', fontWeight: 700, color: '#111', lineHeight: '24px' }}>
              {nextDeadline.title}
            </h3>

            {/* Due Date Row */}
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} className="text-[#6B6B6B]" />
              <span style={{ fontSize: '16px', fontWeight: 400, color: '#6B6B6B', lineHeight: '24px' }}>
                {nextDeadline.dueDate}
              </span>
            </div>

            {/* Status Badge */}
            <div className="mb-3">
              <div className="inline-flex items-center px-3 py-2 rounded-[999px] bg-[#DCFCE7]">
                <span style={{ fontSize: '16px', fontWeight: 400, color: '#008236', lineHeight: '24px' }}>
                  {nextDeadline.status}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate('task-detail', { taskId: '1' })}
              className="w-full h-12 bg-[#0F2A71] text-white rounded-[12px] hover:opacity-90 transition-opacity"
              style={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px' }}
            >
              Open
            </button>
          </div>
        </div>

        {/* Section C: Announcements */}
        <div className="space-y-4">
          <p style={{ fontSize: '16px', fontWeight: 400, color: '#111', lineHeight: '24px' }}>
            Announcements
          </p>
          <div className="bg-white border border-[#E8E8E8] rounded-[16px] overflow-hidden">
            {announcements.map((announcement, index) => (
              <div key={announcement.id} className="relative">
                {/* Yellow Accent Bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FBBC04]" />
                
                <div className="p-4 pl-5">
                  <p style={{ fontSize: '16px', fontWeight: 400, color: '#111', lineHeight: '24px' }} className="mb-3">
                    {announcement.title}
                  </p>
                  <p style={{ fontSize: '16px', fontWeight: 400, color: '#6B6B6B', lineHeight: '24px' }} className="mb-3">
                    {announcement.snippet}
                  </p>
                  <span style={{ fontSize: '16px', fontWeight: 400, color: '#9A9A9A', lineHeight: '24px' }}>
                    {announcement.timestamp}
                  </span>
                </div>
                {index < announcements.length - 1 && (
                  <div className="h-[1px] bg-[#E8E8E8] ml-5 mr-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section D: Progress */}
        <div className="space-y-4">
          <p style={{ fontSize: '16px', fontWeight: 400, color: '#111', lineHeight: '24px' }}>
            Progress
          </p>
          <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 space-y-4">
            {/* Tasks Completed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: '16px', fontWeight: 400, color: '#6B6B6B', lineHeight: '24px' }}>
                  Tasks Completed
                </span>
                <span style={{ fontSize: '16px', fontWeight: 400, color: '#111', lineHeight: '24px' }}>
                  {progress.tasksCompleted}/{progress.totalTasks}
                </span>
              </div>
              <div className="w-full h-2 bg-[#F3F3F3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0F2A71] rounded-full transition-all"
                  style={{ 
                    width: `${(progress.tasksCompleted / progress.totalTasks) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Average Quiz Score */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: '16px', fontWeight: 400, color: '#6B6B6B', lineHeight: '24px' }}>
                  Average Quiz Score
                </span>
                <div className="flex items-center gap-1">
                  <TrendingUp size={14} className="text-[#00A63E]" />
                  <span style={{ fontSize: '16px', fontWeight: 400, color: '#111', lineHeight: '24px' }}>
                    {progress.averageQuizScore}%
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-[#F3F3F3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00C950] rounded-full transition-all"
                  style={{ 
                    width: `${progress.averageQuizScore}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}