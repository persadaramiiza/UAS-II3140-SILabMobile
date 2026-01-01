import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Users, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface QuizMonitorProps {
  navigate: (screen: Screen) => void;
  quizId?: string | null;
}

interface StudentProgress {
  id: string;
  name: string;
  nim: string;
  startedAt: string;
  progress: number; // percentage
  questionsAnswered: number;
  totalQuestions: number;
  timeRemaining: string;
  status: 'in-progress' | 'completed' | 'disconnected';
}

export default function QuizMonitor({ navigate, quizId }: QuizMonitorProps) {
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock quiz data
  const quizData = {
    title: 'UML Diagrams Assessment',
    course: 'System Analysis & Design',
    duration: 45,
    totalQuestions: 25,
    startedAt: '2:00 PM',
    endsAt: '2:45 PM',
  };

  // Mock student progress data
  const students: StudentProgress[] = [
    {
      id: '1',
      name: 'Ahmad Rizki',
      nim: '13520001',
      startedAt: '2:00 PM',
      progress: 92,
      questionsAnswered: 23,
      totalQuestions: 25,
      timeRemaining: '12:45',
      status: 'in-progress',
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      nim: '13520002',
      startedAt: '2:02 PM',
      progress: 100,
      questionsAnswered: 25,
      totalQuestions: 25,
      timeRemaining: '0:00',
      status: 'completed',
    },
    {
      id: '3',
      name: 'Budi Santoso',
      nim: '13520003',
      startedAt: '2:01 PM',
      progress: 68,
      questionsAnswered: 17,
      totalQuestions: 25,
      timeRemaining: '18:22',
      status: 'in-progress',
    },
    {
      id: '4',
      name: 'Dewi Lestari',
      nim: '13520004',
      startedAt: '2:00 PM',
      progress: 84,
      questionsAnswered: 21,
      totalQuestions: 25,
      timeRemaining: '15:10',
      status: 'in-progress',
    },
    {
      id: '5',
      name: 'Eko Prasetyo',
      nim: '13520005',
      startedAt: '2:05 PM',
      progress: 48,
      questionsAnswered: 12,
      totalQuestions: 25,
      timeRemaining: '25:30',
      status: 'disconnected',
    },
  ];

  const totalStudents = 42;
  const activeStudents = students.filter(s => s.status !== 'completed').length;
  const completedStudents = students.filter(s => s.status === 'completed').length;
  const averageProgress = Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length);

  return (
    <div className="min-h-full bg-[#FAFAFA] flex flex-col">
      {/* Fixed Header */}
      <div 
        className="px-6 pt-12 pb-6 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #3457D5 0%, #0F2A71 100%)'
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('quiz-management')}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>
            Monitor Quiz
          </h1>
        </div>
        <div className="space-y-2">
          <p className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>
            {quizData.title}
          </p>
          <p className="text-white/70" style={{ fontSize: '14px' }}>
            {quizData.course} · {quizData.startedAt} - {quizData.endsAt}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-4 flex-shrink-0">
        <div className="grid grid-cols-2 gap-3">
          {/* Active Students */}
          <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[rgba(52,87,213,0.1)] rounded-full flex items-center justify-center">
                <Users size={16} className="text-[#3457D5]" />
              </div>
              <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                Active
              </span>
            </div>
            <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
              {activeStudents}/{totalStudents}
            </p>
          </div>

          {/* Completed */}
          <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[rgba(16,185,129,0.1)] rounded-full flex items-center justify-center">
                <CheckCircle size={16} className="text-[#10B981]" />
              </div>
              <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                Completed
              </span>
            </div>
            <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
              {completedStudents}
            </p>
          </div>

          {/* Average Progress */}
          <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[rgba(251,188,4,0.1)] rounded-full flex items-center justify-center">
                <TrendingUp size={16} className="text-[#FBBC04]" />
              </div>
              <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                Avg Progress
              </span>
            </div>
            <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
              {averageProgress}%
            </p>
          </div>

          {/* Auto Refresh Toggle */}
          <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 flex flex-col justify-between">
            <span className="text-[#6B6B6B] mb-2" style={{ fontSize: '12px' }}>
              Auto Refresh
            </span>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`
                w-full h-8 rounded-full transition-colors flex items-center px-1
                ${autoRefresh ? 'bg-[#10B981]' : 'bg-[#E8E8E8]'}
              `}
            >
              <div className={`
                w-6 h-6 bg-white rounded-full transition-transform
                ${autoRefresh ? 'translate-x-full' : 'translate-x-0'}
              `} />
            </button>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-24">
        <div className="mb-3">
          <h2 style={{ fontSize: '16px', fontWeight: 700 }}>
            Student Progress ({students.length})
          </h2>
        </div>
        
        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white border border-[#E8E8E8] rounded-[16px] p-4"
            >
              {/* Student Info */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                    {student.name}
                  </h3>
                  <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                    NIM: {student.nim}
                  </p>
                </div>

                {/* Status Badge */}
                {student.status === 'completed' && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#F0FDF4] rounded-full">
                    <CheckCircle size={14} className="text-[#10B981]" />
                    <span className="text-[#10B981]" style={{ fontSize: '12px', fontWeight: 600 }}>
                      Completed
                    </span>
                  </div>
                )}
                {student.status === 'disconnected' && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#FEF2F2] rounded-full">
                    <AlertCircle size={14} className="text-[#EF4444]" />
                    <span className="text-[#EF4444]" style={{ fontSize: '12px', fontWeight: 600 }}>
                      Disconnected
                    </span>
                  </div>
                )}
              </div>

              {/* Progress Info */}
              <div className="space-y-3">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      Progress
                    </span>
                    <span className="text-[#3457D5]" style={{ fontSize: '12px', fontWeight: 600 }}>
                      {student.questionsAnswered}/{student.totalQuestions} questions
                    </span>
                  </div>
                  <div className="h-2 bg-[#F3F3F3] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${student.progress}%`,
                        backgroundColor: student.status === 'completed' ? '#10B981' : '#3457D5'
                      }}
                    />
                  </div>
                </div>

                {/* Time & Started At */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#6B6B6B]" />
                    <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      Started: {student.startedAt}
                    </span>
                  </div>
                  {student.status === 'in-progress' && (
                    <span 
                      className="text-[#3457D5]" 
                      style={{ fontSize: '12px', fontWeight: 600 }}
                    >
                      {student.timeRemaining} left
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
