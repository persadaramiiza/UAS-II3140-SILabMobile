import { User, Mail, Shield, Bell, Moon, LogOut, ChevronRight } from 'lucide-react';
import { Screen, UserRole } from '../App';
import imgLogo from "figma:asset/c7331baf757474afb91e9105f759afebcb9348c1.png";
import imgProfileHeader from "figma:asset/0296d46b7d60abc44c4ad89aa86a77476cfa9aab.png";

interface ProfileScreenProps {
  navigate: (screen: Screen) => void;
  userRole: UserRole;
  onLogout: () => void;
}

export default function ProfileScreen({ navigate, userRole, onLogout }: ProfileScreenProps) {
  // Mock user data
  const user = {
    name: 'Persada R',
    email: 'ahmad.fauzan@students.itb.ac.id',
    studentId: '18223033',
    role: userRole,
    avatar: null,
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-700';
      case 'assistant':
        return 'bg-purple-100 text-purple-700';
      case 'admin':
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="min-h-full bg-[#FAFAFA]">
      {/* Header with Background Image */}
      <div className="sticky top-0 bg-white z-10 border-b border-[rgba(17,17,17,0.1)]">
        <div className="relative px-6 pt-4 pb-[10px]">
          {/* Background Image */}
          <img 
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" 
            src={imgProfileHeader} 
            alt=""
          />
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-white" style={{ fontSize: '20px', fontWeight: 600, lineHeight: '26px' }}>
              Profile
            </h2>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-6">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 rounded-full bg-[var(--brand-blue)] flex items-center justify-center mb-4">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={40} className="text-white" strokeWidth={2} />
              )}
            </div>

            {/* Name and Role */}
            <h2 className="mb-2">{user.name}</h2>
            <div className={`
              inline-flex items-center px-3 py-1 rounded-[var(--radius-chip)]
              ${getRoleBadgeColor(user.role)}
            `}>
              <span className="text-caption">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-3 pt-4 border-t border-[var(--brand-divider)]">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[var(--text-secondary)]" />
              <div>
                <p className="text-label text-[var(--text-secondary)]">Email</p>
                <p className="text-caption text-[var(--text-primary)]">{user.email}</p>
              </div>
            </div>

            {user.role === 'student' && (
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-[var(--text-secondary)]" />
                <div>
                  <p className="text-label text-[var(--text-secondary)]">Student ID</p>
                  <p className="text-caption text-[var(--text-primary)]">{user.studentId}</p>
                </div>
              </div>
            )}
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => navigate('edit-profile')}
            className="w-full mt-4 h-12 bg-[var(--brand-blue)] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <User size={18} />
            Edit Profile
          </button>
        </div>

        {/* App Logo Section */}
        <div className="flex flex-col items-center py-4">
          <img 
            src={imgLogo} 
            alt="SILab Suite Logo" 
            className="w-16 h-16 mb-3"
          />
          <h3 className="mb-1">SILab Suite</h3>
          <p className="text-caption text-[var(--text-secondary)]">Version 1.0.0</p>
        </div>

        {/* Settings List */}
        <div className="bg-white border border-[var(--brand-divider)] rounded-[16px] overflow-hidden">
          {/* Notifications */}
          <button className="w-full flex items-center justify-between p-4 hover:bg-[var(--brand-surface)] transition-colors">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-[var(--brand-navy)]" />
              <div className="text-left">
                <p className="text-body-strong">Notifications</p>
                <p className="text-label text-[var(--text-secondary)]">Manage notification settings</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[var(--text-secondary)]" />
          </button>

          <div className="h-px bg-[var(--brand-divider)] mx-4" />

          {/* Theme Toggle */}
          <button className="w-full flex items-center justify-between p-4 hover:bg-[var(--brand-surface)] transition-colors">
            <div className="flex items-center gap-3">
              <Moon size={20} className="text-[var(--brand-navy)]" />
              <div className="text-left">
                <p className="text-body-strong">Dark Mode</p>
                <p className="text-label text-[var(--text-secondary)]">Switch to dark theme</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-[var(--brand-divider)] rounded-full relative">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
            </div>
          </button>
        </div>

        {/* About Section */}
        <div className="bg-[var(--brand-surface)] rounded-[12px] p-4">
          <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
            SILab Suite is a comprehensive virtual laboratory platform for Information Systems education at ITB. 
            Design. Model. Learn — All in One Lab.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full h-12 bg-red-50 border border-red-200 text-red-600 rounded-[12px] flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut size={18} />
          Log Out
        </button>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-label text-[var(--text-disabled)]">
            © 2025 LabSI ITB. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}