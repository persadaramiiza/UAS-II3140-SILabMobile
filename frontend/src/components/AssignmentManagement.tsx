import { useState } from 'react';
import { Screen } from '../App';
import { Plus, FileText, Calendar, Users, Clock, ChevronRight, Edit2, Trash2 } from 'lucide-react';

interface AssignmentManagementProps {
  navigate: (screen: Screen, data?: any) => void;
}

type TabType = 'active' | 'grading' | 'closed';

export default function AssignmentManagement({ navigate }: AssignmentManagementProps) {
  const [activeTab, setActiveTab] = useState<TabType>('active');

  // Mock assignments data
  const assignments = [
    {
      id: '1',
      title: 'Database ERD Assignment',
      course: 'Database Systems',
      dueDate: 'Dec 28, 2025',
      totalSubmissions: 8,
      totalStudents: 42,
      status: 'active' as const,
      pendingGrades: 8,
    },
    {
      id: '2',
      title: 'Requirements Engineering Analysis',
      course: 'Software Engineering',
      dueDate: 'Dec 30, 2025',
      totalSubmissions: 12,
      totalStudents: 42,
      status: 'grading' as const,
      pendingGrades: 5,
    },
    {
      id: '3',
      title: 'UML Class Diagram Design',
      course: 'System Analysis & Design',
      dueDate: 'Dec 20, 2025',
      totalSubmissions: 40,
      totalStudents: 42,
      status: 'closed' as const,
      pendingGrades: 0,
    },
  ];

  const tabs: { value: TabType; label: string }[] = [
    { value: 'active', label: 'Active' },
    { value: 'grading', label: 'Grading' },
    { value: 'closed', label: 'Closed' },
  ];

  const filteredAssignments = assignments.filter(a => a.status === activeTab);

  return (
    <div className="min-h-full bg-[#FAFAFA] flex flex-col pb-24">
      {/* Header */}
      <div 
        className="px-6 pt-12 pb-6 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #0F2A71 0%, #001740 100%)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>
            Assignments
          </h1>
          <button
            onClick={() => navigate('create-assignment')}
            className="w-10 h-10 bg-[#FBBC04] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Plus size={20} className="text-[#0F2A71]" />
          </button>
        </div>
        <p className="text-white/70" style={{ fontSize: '14px' }}>
          Manage assignments and grade submissions
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#E8E8E8] px-6 flex-shrink-0">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`
                py-3 relative transition-colors
                ${activeTab === tab.value ? 'text-[#0F2A71]' : 'text-[#6B6B6B]'}
              `}
              style={{ fontSize: '16px', fontWeight: activeTab === tab.value ? 600 : 400 }}
            >
              {tab.label}
              {activeTab === tab.value && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F2A71]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto mb-4 text-[#E8E8E8]" />
            <p className="text-[#6B6B6B]" style={{ fontSize: '16px' }}>
              No {activeTab} assignments
            </p>
            <button
              onClick={() => navigate('create-assignment')}
              className="mt-4 px-6 h-12 bg-[#0F2A71] text-white rounded-[12px] hover:opacity-90 transition-opacity"
            >
              Create Assignment
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white border border-[#E8E8E8] rounded-[16px] p-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                      {assignment.title}
                    </h3>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                      {assignment.course}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('edit-assignment', { id: assignment.id })}
                      className="w-8 h-8 bg-[#F3F3F3] rounded-lg flex items-center justify-center hover:bg-[#E8E8E8] transition-colors"
                    >
                      <Edit2 size={16} className="text-[#0F2A71]" />
                    </button>
                    <button
                      className="w-8 h-8 bg-[#FEF2F2] rounded-lg flex items-center justify-center hover:bg-[#FEE2E2] transition-colors"
                    >
                      <Trash2 size={16} className="text-[#EF4444]" />
                    </button>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#6B6B6B]" />
                    <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                      Due: {assignment.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-[#6B6B6B]" />
                    <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                      {assignment.totalSubmissions}/{assignment.totalStudents} submitted
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      Submission Progress
                    </span>
                    <span className="text-[#0F2A71]" style={{ fontSize: '12px', fontWeight: 600 }}>
                      {Math.round((assignment.totalSubmissions / assignment.totalStudents) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#F3F3F3] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0F2A71] rounded-full transition-all"
                      style={{ 
                        width: `${(assignment.totalSubmissions / assignment.totalStudents) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Pending Grades Alert */}
                {assignment.pendingGrades > 0 && (
                  <div className="mb-3 p-3 bg-[#FEF3C7] rounded-[12px] flex items-center gap-2">
                    <Clock size={16} className="text-[#F59E0B]" />
                    <span className="text-[#92400E]" style={{ fontSize: '14px' }}>
                      {assignment.pendingGrades} submission{assignment.pendingGrades > 1 ? 's' : ''} pending grade
                    </span>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => navigate('grade-submissions', { assignmentId: assignment.id })}
                  className="w-full h-12 bg-[#0F2A71] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  {assignment.pendingGrades > 0 ? 'Grade Submissions' : 'View Submissions'}
                  <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
