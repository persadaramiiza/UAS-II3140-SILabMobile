import { Screen } from '../App';
import { Users, UserCog, Shield, TrendingUp, Bell, ChevronRight } from 'lucide-react';
import imgHeader from "figma:asset/3e850e92b43284db0fac35330dbde26d5a67894a.png";

interface AdminHomeProps {
  navigate: (screen: Screen) => void;
}

export default function AdminHome({ navigate }: AdminHomeProps) {
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
                Admin
              </h1>
            </div>
            <button 
              onClick={() => navigate('notifications')}
              className="relative w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
            >
              <Bell size={20} className="text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] rounded-full flex items-center justify-center text-white" style={{ fontSize: '11px', fontWeight: 700 }}>
                2
              </span>
            </button>
          </div>
          <p className="text-white/70" style={{ fontSize: '14px' }}>
            Manage users and system settings
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#FAFAFA]">
        <div className="px-6 py-8 flex flex-col gap-6 pb-24">
          {/* Stats Cards - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Total Users */}
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(15, 42, 113, 0.1)' }}
                >
                  <Users size={16} className="text-[#0F2A71]" />
                </div>
                <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                  Total Users
                </span>
              </div>
              <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
                58
              </p>
            </div>

            {/* Students */}
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(52, 87, 213, 0.1)' }}
                >
                  <Users size={16} className="text-[#3457D5]" />
                </div>
                <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                  Students
                </span>
              </div>
              <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
                42
              </p>
            </div>

            {/* Assistants */}
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                >
                  <UserCog size={16} className="text-[#9333EA]" />
                </div>
                <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                  Assistants
                </span>
              </div>
              <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
                14
              </p>
            </div>

            {/* Admins */}
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                >
                  <Shield size={16} className="text-[#EF4444]" />
                </div>
                <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                  Admins
                </span>
              </div>
              <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
                2
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="mb-3" style={{ fontSize: '18px', fontWeight: 700 }}>
              Quick Actions
            </h2>
            <div className="space-y-3">
              {/* User Management */}
              <button
                onClick={() => navigate('user-management')}
                className="w-full bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex items-center justify-between hover:bg-[#F3F3F3] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-[12px] flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #0F2A71 0%, #001740 100%)' }}
                  >
                    <UserCog size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>
                      User Management
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                      Assign roles and manage users
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#6B6B6B]" />
              </button>

              {/* System Settings */}
              <button
                onClick={() => navigate('system-settings')}
                className="w-full bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex items-center justify-between hover:bg-[#F3F3F3] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-[12px] flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(251, 188, 4, 0.1)' }}
                  >
                    <Shield size={24} className="text-[#FBBC04]" />
                  </div>
                  <div className="text-left">
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>
                      System Settings
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                      Configure system preferences
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#6B6B6B]" />
              </button>

              {/* Activity Logs */}
              <button
                onClick={() => navigate('activity-logs')}
                className="w-full bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex items-center justify-between hover:bg-[#F3F3F3] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-[12px] flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                  >
                    <TrendingUp size={24} className="text-[#10B981]" />
                  </div>
                  <div className="text-left">
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>
                      Activity Logs
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                      View system activity history
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#6B6B6B]" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="mb-3" style={{ fontSize: '18px', fontWeight: 700 }}>
              Recent Activity
            </h2>
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>
                    New user registered
                  </p>
                  <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                    Ahmad Fauzan (13520089) · 2 hours ago
                  </p>
                </div>
              </div>
              <div className="h-px bg-[#E8E8E8]" />
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#3457D5] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>
                    Role updated
                  </p>
                  <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                    Budi Santoso changed to Assistant · 5 hours ago
                  </p>
                </div>
              </div>
              <div className="h-px bg-[#E8E8E8]" />
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FBBC04] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>
                    System maintenance
                  </p>
                  <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                    Scheduled for Dec 30, 2025 · 1 day ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}