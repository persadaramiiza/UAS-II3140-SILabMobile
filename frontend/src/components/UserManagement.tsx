import { useState } from 'react';
import { Screen, UserRole } from '../App';
import { ArrowLeft, Search, Users, UserCog, Shield, Filter, ChevronRight, X } from 'lucide-react';

interface UserManagementProps {
  navigate: (screen: Screen) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  nim?: string;
  role: UserRole;
  registeredDate: string;
  status: 'active' | 'inactive';
}

export default function UserManagement({ navigate }: UserManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  // Mock users data
  const users: User[] = [
    {
      id: '1',
      name: 'Ahmad Fauzan',
      email: 'ahmad.fauzan@students.itb.ac.id',
      nim: '13520089',
      role: 'student',
      registeredDate: 'Dec 15, 2025',
      status: 'active',
    },
    {
      id: '2',
      name: 'Budi Santoso',
      email: 'budi.santoso@students.itb.ac.id',
      nim: '13520003',
      role: 'assistant',
      registeredDate: 'Dec 10, 2025',
      status: 'active',
    },
    {
      id: '3',
      name: 'Siti Nurhaliza',
      email: 'siti.nur@students.itb.ac.id',
      nim: '13520002',
      role: 'student',
      registeredDate: 'Dec 12, 2025',
      status: 'active',
    },
    {
      id: '4',
      name: 'Dewi Lestari',
      email: 'dewi.lestari@itb.ac.id',
      role: 'assistant',
      registeredDate: 'Dec 8, 2025',
      status: 'active',
    },
    {
      id: '5',
      name: 'Eko Prasetyo',
      email: 'eko.prasetyo@itb.ac.id',
      role: 'admin',
      registeredDate: 'Dec 1, 2025',
      status: 'active',
    },
    {
      id: '6',
      name: 'Rina Kusuma',
      email: 'rina.kusuma@students.itb.ac.id',
      nim: '13520025',
      role: 'student',
      registeredDate: 'Dec 14, 2025',
      status: 'inactive',
    },
  ];

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'student':
        return <Users size={16} className="text-[#3457D5]" />;
      case 'assistant':
        return <UserCog size={16} className="text-[#9333EA]" />;
      case 'admin':
        return <Shield size={16} className="text-[#EF4444]" />;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'student':
        return 'bg-[rgba(52,87,213,0.1)] text-[#3457D5]';
      case 'assistant':
        return 'bg-[rgba(147,51,234,0.1)] text-[#9333EA]';
      case 'admin':
        return 'bg-[rgba(239,68,68,0.1)] text-[#EF4444]';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.nim && user.nim.includes(searchQuery));
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleChangeRole = (newRole: UserRole) => {
    if (selectedUser) {
      console.log('Changing role:', selectedUser.id, 'to', newRole);
      setShowRoleModal(false);
      setSelectedUser(null);
    }
  };

  const roleCounts = {
    all: users.length,
    student: users.filter(u => u.role === 'student').length,
    assistant: users.filter(u => u.role === 'assistant').length,
    admin: users.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="min-h-full bg-[#FAFAFA] flex flex-col">
      {/* Fixed Header */}
      <div 
        className="px-6 pt-12 pb-6 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #0F2A71 0%, #001740 100%)'
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
            User Management
          </h1>
        </div>
        <p className="text-white/70" style={{ fontSize: '14px' }}>
          Manage user accounts and roles
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border-b border-[#E8E8E8] px-6 py-4 flex-shrink-0">
        <div className="flex gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or NIM"
              className="w-full h-12 pl-11 pr-4 bg-[#F3F3F3] border border-transparent rounded-[12px] focus:outline-none focus:border-[#0F2A71] focus:bg-white transition-colors"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilterModal(true)}
            className="w-12 h-12 bg-[#F3F3F3] rounded-[12px] flex items-center justify-center hover:bg-[#E8E8E8] transition-colors relative"
          >
            <Filter size={20} className="text-[#0F2A71]" />
            {filterRole !== 'all' && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] rounded-full" />
            )}
          </button>
        </div>

        {/* Active Filter Tag */}
        {filterRole !== 'all' && (
          <div className="mt-3 flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0F2A71] text-white rounded-full" style={{ fontSize: '12px', fontWeight: 600 }}>
              {getRoleIcon(filterRole as UserRole)}
              {filterRole.charAt(0).toUpperCase() + filterRole.slice(1)}
              <button
                onClick={() => setFilterRole('all')}
                className="ml-1 hover:opacity-70"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 pb-24">
        <div className="mb-3">
          <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
            {filteredUsers.length} users found
          </p>
        </div>

        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-[#E8E8E8] rounded-[16px] p-4"
            >
              {/* User Info */}
              <div className="flex items-start gap-3 mb-3">
                {/* Avatar */}
                <div className="w-12 h-12 bg-[#0F2A71] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white" style={{ fontSize: '18px', fontWeight: 700 }}>
                    {user.name.charAt(0)}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>
                      {user.name}
                    </h3>
                    {/* Status Badge */}
                    <div className={`
                      px-2 py-1 rounded-full flex-shrink-0
                      ${user.status === 'active' ? 'bg-[#F0FDF4] text-[#10B981]' : 'bg-[#F3F3F3] text-[#6B6B6B]'}
                    `} style={{ fontSize: '12px', fontWeight: 600 }}>
                      {user.status}
                    </div>
                  </div>
                  <p className="text-[#6B6B6B] mb-2" style={{ fontSize: '14px' }}>
                    {user.email}
                  </p>
                  {user.nim && (
                    <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      NIM: {user.nim}
                    </p>
                  )}
                </div>
              </div>

              {/* Role Badge */}
              <div className="mb-3">
                <div className={`
                  inline-flex items-center gap-2 px-3 py-1 rounded-full
                  ${getRoleBadgeColor(user.role)}
                `} style={{ fontSize: '14px', fontWeight: 600 }}>
                  {getRoleIcon(user.role)}
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E8E8E8]">
                <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                  Registered: {user.registeredDate}
                </span>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowRoleModal(true);
                  }}
                  className="h-8 px-4 bg-[#F3F3F3] text-[#0F2A71] rounded-[8px] flex items-center gap-2 hover:bg-[#E8E8E8] transition-colors"
                  style={{ fontSize: '14px', fontWeight: 600 }}
                >
                  Change Role
                  <ChevronRight size={14} />
                </button>
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
                Filter by Role
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
                  setFilterRole('all');
                  setShowFilterModal(false);
                }}
                className={`
                  w-full h-14 px-4 rounded-[12px] flex items-center justify-between transition-colors
                  ${filterRole === 'all' ? 'bg-[#0F2A71] text-white' : 'bg-[#F3F3F3] text-[#111]'}
                `}
              >
                <span style={{ fontSize: '16px', fontWeight: 600 }}>All Users</span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {roleCounts.all}
                </span>
              </button>

              {/* Student */}
              <button
                onClick={() => {
                  setFilterRole('student');
                  setShowFilterModal(false);
                }}
                className={`
                  w-full h-14 px-4 rounded-[12px] flex items-center justify-between transition-colors
                  ${filterRole === 'student' ? 'bg-[#3457D5] text-white' : 'bg-[#F3F3F3] text-[#111]'}
                `}
              >
                <div className="flex items-center gap-2">
                  <Users size={20} className={filterRole === 'student' ? 'text-white' : 'text-[#3457D5]'} />
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>Students</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {roleCounts.student}
                </span>
              </button>

              {/* Assistant */}
              <button
                onClick={() => {
                  setFilterRole('assistant');
                  setShowFilterModal(false);
                }}
                className={`
                  w-full h-14 px-4 rounded-[12px] flex items-center justify-between transition-colors
                  ${filterRole === 'assistant' ? 'bg-[#9333EA] text-white' : 'bg-[#F3F3F3] text-[#111]'}
                `}
              >
                <div className="flex items-center gap-2">
                  <UserCog size={20} className={filterRole === 'assistant' ? 'text-white' : 'text-[#9333EA]'} />
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>Assistants</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {roleCounts.assistant}
                </span>
              </button>

              {/* Admin */}
              <button
                onClick={() => {
                  setFilterRole('admin');
                  setShowFilterModal(false);
                }}
                className={`
                  w-full h-14 px-4 rounded-[12px] flex items-center justify-between transition-colors
                  ${filterRole === 'admin' ? 'bg-[#EF4444] text-white' : 'bg-[#F3F3F3] text-[#111]'}
                `}
              >
                <div className="flex items-center gap-2">
                  <Shield size={20} className={filterRole === 'admin' ? 'text-white' : 'text-[#EF4444]'} />
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>Admins</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {roleCounts.admin}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Role Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white w-full max-w-[350px] rounded-[24px] p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#0F2A71] rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCog size={32} className="text-white" />
              </div>
              <h2 className="mb-2" style={{ fontSize: '20px', fontWeight: 700 }}>
                Change User Role
              </h2>
              <p className="text-[#6B6B6B] mb-1" style={{ fontSize: '14px' }}>
                {selectedUser.name}
              </p>
              <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                Current role: {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
              </p>
            </div>

            <div className="space-y-2 mb-6">
              <button
                onClick={() => handleChangeRole('student')}
                disabled={selectedUser.role === 'student'}
                className={`
                  w-full h-12 rounded-[12px] flex items-center justify-center gap-2 transition-colors
                  ${selectedUser.role === 'student' 
                    ? 'bg-[#F3F3F3] text-[#6B6B6B] cursor-not-allowed' 
                    : 'bg-[rgba(52,87,213,0.1)] text-[#3457D5] hover:bg-[rgba(52,87,213,0.2)]'
                  }
                `}
                style={{ fontSize: '16px', fontWeight: 600 }}
              >
                <Users size={18} />
                Student
              </button>

              <button
                onClick={() => handleChangeRole('assistant')}
                disabled={selectedUser.role === 'assistant'}
                className={`
                  w-full h-12 rounded-[12px] flex items-center justify-center gap-2 transition-colors
                  ${selectedUser.role === 'assistant' 
                    ? 'bg-[#F3F3F3] text-[#6B6B6B] cursor-not-allowed' 
                    : 'bg-[rgba(147,51,234,0.1)] text-[#9333EA] hover:bg-[rgba(147,51,234,0.2)]'
                  }
                `}
                style={{ fontSize: '16px', fontWeight: 600 }}
              >
                <UserCog size={18} />
                Assistant
              </button>

              <button
                onClick={() => handleChangeRole('admin')}
                disabled={selectedUser.role === 'admin'}
                className={`
                  w-full h-12 rounded-[12px] flex items-center justify-center gap-2 transition-colors
                  ${selectedUser.role === 'admin' 
                    ? 'bg-[#F3F3F3] text-[#6B6B6B] cursor-not-allowed' 
                    : 'bg-[rgba(239,68,68,0.1)] text-[#EF4444] hover:bg-[rgba(239,68,68,0.2)]'
                  }
                `}
                style={{ fontSize: '16px', fontWeight: 600 }}
              >
                <Shield size={18} />
                Admin
              </button>
            </div>

            <button
              onClick={() => {
                setShowRoleModal(false);
                setSelectedUser(null);
              }}
              className="w-full h-12 bg-[#F3F3F3] text-[#6B6B6B] rounded-[12px] hover:bg-[#E8E8E8] transition-colors"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}