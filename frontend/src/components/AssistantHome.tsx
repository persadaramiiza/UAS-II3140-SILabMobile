import { Screen } from '../App';
import { Users, FileText, ClipboardList, TrendingUp, Bell } from 'lucide-react';
import imgHeader from "figma:asset/3e850e92b43284db0fac35330dbde26d5a67894a.png";

interface AssistantHomeProps {
  navigate: (screen: Screen) => void;
}

export default function AssistantHome({ navigate }: AssistantHomeProps) {
  return (
    <div className="min-h-full bg-white flex flex-col">
      {/* Fixed Header with Illustration */}
      <div 
        className="relative h-[163px] flex-shrink-0 overflow-hidden"
      >
        <img 
          src={imgHeader} 
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative px-6 pt-12 pb-6 h-full flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-white/80" style={{ fontSize: '14px' }}>
                Welcome back,
              </p>
              <h1 className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>
                Assistant
              </h1>
            </div>
            <button 
              onClick={() => navigate('notifications')}
              className="relative w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
            >
              <Bell size={20} className="text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FBBC04] rounded-full flex items-center justify-center text-white" style={{ fontSize: '11px', fontWeight: 700 }}>
                3
              </span>
            </button>
          </div>
          <p className="text-white/70" style={{ fontSize: '14px' }}>
            Manage your lab activities
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#FAFAFA]">
        <div className="px-6 py-8 flex flex-col gap-6 pb-24">
          {/* Stats Cards - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Students */}
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(15, 42, 113, 0.1)' }}
                >
                  <Users size={16} className="text-[#0F2A71]" />
                </div>
                <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                  Students
                </span>
              </div>
              <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
                42
              </p>
            </div>

            {/* Assignments */}
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(251, 188, 4, 0.1)' }}
                >
                  <FileText size={16} className="text-[#FBBC04]" />
                </div>
                <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                  Assignments
                </span>
              </div>
              <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
                3
              </p>
            </div>

            {/* Quizzes */}
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(52, 87, 213, 0.1)' }}
                >
                  <ClipboardList size={16} className="text-[#3457D5]" />
                </div>
                <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                  Quizzes
                </span>
              </div>
              <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
                2
              </p>
            </div>

            {/* To Grade */}
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                >
                  <TrendingUp size={16} className="text-[#F97316]" />
                </div>
                <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                  To Grade
                </span>
              </div>
              <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
                12
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="mb-3" style={{ fontSize: '18px', fontWeight: 700 }}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Create Assignment */}
              <button
                onClick={() => navigate('assignment-management')}
                className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col items-center gap-2 hover:bg-[#FAFAFA] transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(15, 42, 113, 0.08)' }}
                >
                  <FileText size={24} className="text-[#0F2A71]" />
                </div>
                <span className="text-center" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Create Assignment
                </span>
              </button>

              {/* New Announcement */}
              <button
                onClick={() => navigate('announcement-management')}
                className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col items-center gap-2 hover:bg-[#FAFAFA] transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(251, 188, 4, 0.08)' }}
                >
                  <Bell size={24} className="text-[#FBBC04]" />
                </div>
                <span className="text-center" style={{ fontSize: '14px', fontWeight: 600 }}>
                  New Announcement
                </span>
              </button>

              {/* Create Quiz */}
              <button
                onClick={() => navigate('quiz-management')}
                className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col items-center gap-2 hover:bg-[#FAFAFA] transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(52, 87, 213, 0.08)' }}
                >
                  <ClipboardList size={24} className="text-[#3457D5]" />
                </div>
                <span className="text-center" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Create Quiz
                </span>
              </button>

              {/* Grade Submissions */}
              <button
                onClick={() => navigate('assignment-management')}
                className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col items-center gap-2 hover:bg-[#FAFAFA] transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}
                >
                  <TrendingUp size={24} className="text-[#10B981]" />
                </div>
                <span className="text-center" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Grade Submissions
                </span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="mb-3" style={{ fontSize: '18px', fontWeight: 700 }}>
              Recent Activity
            </h2>
            <div className="flex flex-col gap-3">
              {/* Activity 1 */}
              <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[#0F2A71] rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                      Database ERD Assignment
                    </h3>
                    <p className="text-[#6B6B6B] mb-1" style={{ fontSize: '14px' }}>
                      Submitted by 8 students
                    </p>
                    <p className="text-[#999]" style={{ fontSize: '12px' }}>
                      2 hours ago
                    </p>
                  </div>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[#3457D5] rounded-full flex items-center justify-center flex-shrink-0">
                    <ClipboardList size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                      UML Diagrams Quiz
                    </h3>
                    <p className="text-[#6B6B6B] mb-1" style={{ fontSize: '14px' }}>
                      Completed by 15 students
                    </p>
                    <p className="text-[#999]" style={{ fontSize: '12px' }}>
                      5 hours ago
                    </p>
                  </div>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[#FBBC04] rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                      Lab Session Schedule
                    </h3>
                    <p className="text-[#6B6B6B] mb-1" style={{ fontSize: '14px' }}>
                      Published
                    </p>
                    <p className="text-[#999]" style={{ fontSize: '12px' }}>
                      1 day ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
