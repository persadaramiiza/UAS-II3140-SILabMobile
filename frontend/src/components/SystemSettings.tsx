import { useState } from 'react';
import { Screen } from '../App';
import { 
  ArrowLeft, 
  Bell, 
  Mail, 
  Lock, 
  Database, 
  Globe, 
  Moon, 
  Smartphone,
  ChevronRight,
  Save
} from 'lucide-react';

interface SystemSettingsProps {
  navigate: (screen: Screen) => void;
}

export default function SystemSettings({ navigate }: SystemSettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-full bg-[#FAFAFA] flex flex-col">
      {/* Fixed Header */}
      <div 
        className="px-6 pt-12 pb-6 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #FBBC04 0%, #F59E0B 100%)'
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
            System Settings
          </h1>
        </div>
        <p className="text-white/80" style={{ fontSize: '14px' }}>
          Configure system preferences
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6 pb-24">
        <div className="space-y-6">
          {/* Notification Settings */}
          <div>
            <h2 className="mb-3" style={{ fontSize: '18px', fontWeight: 700 }}>
              Notifications
            </h2>
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] overflow-hidden">
              {/* Email Notifications */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-[rgba(251,188,4,0.1)] rounded-full flex items-center justify-center">
                    <Mail size={20} className="text-[#FBBC04]" />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>
                      Email Notifications
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      Send email for important updates
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`
                    w-12 h-6 rounded-full transition-colors flex items-center px-1
                    ${emailNotifications ? 'bg-[#10B981]' : 'bg-[#E8E8E8]'}
                  `}
                >
                  <div className={`
                    w-4 h-4 bg-white rounded-full transition-transform
                    ${emailNotifications ? 'translate-x-6' : 'translate-x-0'}
                  `} />
                </button>
              </div>

              <div className="h-px bg-[#E8E8E8] mx-4" />

              {/* Push Notifications */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-[rgba(52,87,213,0.1)] rounded-full flex items-center justify-center">
                    <Bell size={20} className="text-[#3457D5]" />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>
                      Push Notifications
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      Browser push notifications
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`
                    w-12 h-6 rounded-full transition-colors flex items-center px-1
                    ${pushNotifications ? 'bg-[#10B981]' : 'bg-[#E8E8E8]'}
                  `}
                >
                  <div className={`
                    w-4 h-4 bg-white rounded-full transition-transform
                    ${pushNotifications ? 'translate-x-6' : 'translate-x-0'}
                  `} />
                </button>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div>
            <h2 className="mb-3" style={{ fontSize: '18px', fontWeight: 700 }}>
              System
            </h2>
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] overflow-hidden">
              {/* Maintenance Mode */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-[rgba(239,68,68,0.1)] rounded-full flex items-center justify-center">
                    <Lock size={20} className="text-[#EF4444]" />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>
                      Maintenance Mode
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      Disable access for maintenance
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`
                    w-12 h-6 rounded-full transition-colors flex items-center px-1
                    ${maintenanceMode ? 'bg-[#EF4444]' : 'bg-[#E8E8E8]'}
                  `}
                >
                  <div className={`
                    w-4 h-4 bg-white rounded-full transition-transform
                    ${maintenanceMode ? 'translate-x-6' : 'translate-x-0'}
                  `} />
                </button>
              </div>

              <div className="h-px bg-[#E8E8E8] mx-4" />

              {/* Allow Registration */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-[rgba(16,185,129,0.1)] rounded-full flex items-center justify-center">
                    <Globe size={20} className="text-[#10B981]" />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>
                      Allow Registration
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      Allow new users to register
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAllowRegistration(!allowRegistration)}
                  className={`
                    w-12 h-6 rounded-full transition-colors flex items-center px-1
                    ${allowRegistration ? 'bg-[#10B981]' : 'bg-[#E8E8E8]'}
                  `}
                >
                  <div className={`
                    w-4 h-4 bg-white rounded-full transition-transform
                    ${allowRegistration ? 'translate-x-6' : 'translate-x-0'}
                  `} />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div>
            <h2 className="mb-3" style={{ fontSize: '18px', fontWeight: 700 }}>
              Appearance
            </h2>
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] overflow-hidden">
              {/* Dark Mode */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-[rgba(15,42,113,0.1)] rounded-full flex items-center justify-center">
                    <Moon size={20} className="text-[#0F2A71]" />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>
                      Dark Mode
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      Enable dark theme
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`
                    w-12 h-6 rounded-full transition-colors flex items-center px-1
                    ${darkMode ? 'bg-[#0F2A71]' : 'bg-[#E8E8E8]'}
                  `}
                >
                  <div className={`
                    w-4 h-4 bg-white rounded-full transition-transform
                    ${darkMode ? 'translate-x-6' : 'translate-x-0'}
                  `} />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <h2 className="mb-3" style={{ fontSize: '18px', fontWeight: 700 }}>
              Advanced
            </h2>
            <div className="bg-white border border-[#E8E8E8] rounded-[16px]">
              {/* Database Management */}
              <button className="w-full p-4 flex items-center justify-between hover:bg-[#F3F3F3] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[rgba(147,51,234,0.1)] rounded-full flex items-center justify-center">
                    <Database size={20} className="text-[#9333EA]" />
                  </div>
                  <div className="text-left">
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>
                      Database Management
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      Backup and restore database
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#6B6B6B]" />
              </button>

              <div className="h-px bg-[#E8E8E8] mx-4" />

              {/* Mobile App Settings */}
              <button className="w-full p-4 flex items-center justify-between hover:bg-[#F3F3F3] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[rgba(52,87,213,0.1)] rounded-full flex items-center justify-center">
                    <Smartphone size={20} className="text-[#3457D5]" />
                  </div>
                  <div className="text-left">
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>
                      Mobile App
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      Configure mobile app settings
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#6B6B6B]" />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            className="w-full h-12 bg-[#FBBC04] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            <Save size={18} />
            Save Changes
          </button>

          {/* System Info */}
          <div className="bg-[#F3F3F3] rounded-[12px] p-4">
            <p className="text-[#6B6B6B] mb-2" style={{ fontSize: '12px', fontWeight: 600 }}>
              System Information
            </p>
            <div className="space-y-1">
              <p className="text-[#111]" style={{ fontSize: '12px' }}>
                Version: 1.0.0
              </p>
              <p className="text-[#111]" style={{ fontSize: '12px' }}>
                Last Updated: Jan 1, 2026
              </p>
              <p className="text-[#111]" style={{ fontSize: '12px' }}>
                Database: PostgreSQL 14.5
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
