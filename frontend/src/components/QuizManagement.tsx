import { useState } from 'react';
import { Screen } from '../App';
import { Plus, ClipboardList, Calendar, Users, TrendingUp, ChevronRight, Edit2, Trash2, BarChart3 } from 'lucide-react';

interface QuizManagementProps {
  navigate: (screen: Screen, data?: any) => void;
}

type TabType = 'upcoming' | 'active' | 'completed';

export default function QuizManagement({ navigate }: QuizManagementProps) {
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  // Mock quizzes data
  const quizzes = [
    {
      id: '1',
      title: 'Requirements Engineering Fundamentals',
      course: 'Software Engineering',
      scheduledDate: 'Dec 28, 2025',
      duration: 30,
      totalQuestions: 20,
      participants: 0,
      totalStudents: 42,
      status: 'upcoming' as const,
      averageScore: 0,
    },
    {
      id: '2',
      title: 'UML Diagrams Assessment',
      course: 'System Analysis & Design',
      scheduledDate: 'Dec 27, 2025',
      duration: 45,
      totalQuestions: 25,
      participants: 28,
      totalStudents: 42,
      status: 'active' as const,
      averageScore: 78,
    },
    {
      id: '3',
      title: 'Database Normalization Quiz',
      course: 'Database Systems',
      scheduledDate: 'Dec 20, 2025',
      duration: 20,
      totalQuestions: 15,
      participants: 40,
      totalStudents: 42,
      status: 'completed' as const,
      averageScore: 85,
    },
    {
      id: '4',
      title: 'Enterprise Architecture Concepts',
      course: 'Enterprise Architecture',
      scheduledDate: 'Dec 18, 2025',
      duration: 40,
      totalQuestions: 30,
      participants: 42,
      totalStudents: 42,
      status: 'completed' as const,
      averageScore: 92,
    },
  ];

  const tabs: { value: TabType; label: string }[] = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  const filteredQuizzes = quizzes.filter(q => q.status === activeTab);

  return (
    <div className="min-h-full bg-[#FAFAFA] flex flex-col pb-24">
      {/* Header */}
      <div 
        className="px-6 pt-12 pb-6 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #3457D5 0%, #0F2A71 100%)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>
            Quiz Management
          </h1>
          <button
            onClick={() => navigate('create-quiz')}
            className="w-10 h-10 bg-[#FBBC04] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Plus size={20} className="text-[#0F2A71]" />
          </button>
        </div>
        <p className="text-white/70" style={{ fontSize: '14px' }}>
          Create quizzes and view grade reports
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
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F2A71]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quizzes List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4">
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardList size={48} className="mx-auto mb-4 text-[#E8E8E8]" />
            <p className="text-[#6B6B6B]" style={{ fontSize: '16px' }}>
              No {activeTab} quizzes
            </p>
            <button
              onClick={() => navigate('create-quiz')}
              className="mt-4 px-6 h-12 bg-[#3457D5] text-white rounded-[12px] hover:opacity-90 transition-opacity"
            >
              Create Quiz
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white border border-[#E8E8E8] rounded-[16px] p-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                      {quiz.title}
                    </h3>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                      {quiz.course}
                    </p>
                  </div>
                  {quiz.status === 'upcoming' && (
                    <div className="flex gap-2">
                      <button className="w-8 h-8 bg-[#F3F3F3] rounded-lg flex items-center justify-center hover:bg-[#E8E8E8] transition-colors">
                        <Edit2 size={16} className="text-[#0F2A71]" />
                      </button>
                      <button
                        className="w-8 h-8 bg-[#FEF2F2] rounded-lg flex items-center justify-center hover:bg-[#FEE2E2] transition-colors"
                        onClick={() => {
                          setSelectedQuizId(quiz.id);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        <Trash2 size={16} className="text-[#EF4444]" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#6B6B6B]" />
                    <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                      {quiz.scheduledDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClipboardList size={16} className="text-[#6B6B6B]" />
                    <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                      {quiz.totalQuestions} questions
                    </span>
                  </div>
                </div>

                {/* Participation Stats */}
                {quiz.status !== 'upcoming' && (
                  <>
                    <div className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                          Participation
                        </span>
                        <span className="text-[#0F2A71]" style={{ fontSize: '12px', fontWeight: 600 }}>
                          {quiz.participants}/{quiz.totalStudents} students
                        </span>
                      </div>
                      <div className="h-2 bg-[#F3F3F3] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#3457D5] rounded-full transition-all"
                          style={{ 
                            width: `${(quiz.participants / quiz.totalStudents) * 100}%` 
                          }}
                        />
                      </div>
                    </div>

                    {/* Average Score */}
                    {quiz.averageScore > 0 && (
                      <div className="mb-3 p-3 bg-[#F0F9FF] rounded-[12px] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp size={18} className="text-[#3457D5]" />
                          <span className="text-[#0F2A71]" style={{ fontSize: '14px', fontWeight: 600 }}>
                            Average Score
                          </span>
                        </div>
                        <span 
                          className="text-[#3457D5]" 
                          style={{ fontSize: '20px', fontWeight: 700 }}
                        >
                          {quiz.averageScore}%
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* Action Button */}
                {quiz.status === 'upcoming' && (
                  <button
                    onClick={() => navigate('edit-quiz', { quizId: quiz.id })}
                    className="w-full h-12 bg-[#F3F3F3] text-[#0F2A71] rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#E8E8E8] transition-colors"
                  >
                    Edit Quiz
                    <ChevronRight size={18} />
                  </button>
                )}

                {quiz.status === 'active' && (
                  <button
                    onClick={() => navigate('quiz-monitor', { quizId: quiz.id })}
                    className="w-full h-12 bg-[#3457D5] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Monitor Quiz
                    <ChevronRight size={18} />
                  </button>
                )}

                {quiz.status === 'completed' && (
                  <button
                    onClick={() => navigate('quiz-report', { quizId: quiz.id })}
                    className="w-full h-12 bg-[#10B981] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <BarChart3 size={18} />
                    View Grade Report
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[12px] shadow-lg">
            <h2 className="text-[#0F2A71] text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-[#6B6B6B] text-sm mb-6">
              Are you sure you want to delete this quiz? This action cannot be undone.
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-[#F3F3F3] text-[#0F2A71] rounded-[12px] mr-2 hover:bg-[#E8E8E8] transition-colors"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#FEF2F2] text-[#EF4444] rounded-[12px] hover:bg-[#FEE2E2] transition-colors"
                onClick={() => {
                  // Add logic to delete the quiz
                  setShowDeleteConfirm(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}