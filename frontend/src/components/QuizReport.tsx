import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, TrendingUp, Users, Award, Download, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

interface QuizReportProps {
  navigate: (screen: Screen) => void;
  quizId?: string | null;
}

interface StudentResult {
  id: string;
  name: string;
  nim: string;
  score: number;
  totalPoints: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
  duration: string;
  rank: number;
}

export default function QuizReport({ navigate, quizId }: QuizReportProps) {
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);

  // Mock quiz data
  const quizData = {
    title: 'Database Normalization Quiz',
    course: 'Database Systems',
    scheduledDate: 'Dec 20, 2025',
    duration: 20,
    totalQuestions: 15,
    totalPoints: 150,
  };

  // Mock student results
  const results: StudentResult[] = [
    {
      id: '1',
      name: 'Andi Wijaya',
      nim: '13520010',
      score: 148,
      totalPoints: 150,
      percentage: 99,
      correctAnswers: 15,
      totalQuestions: 15,
      completedAt: 'Dec 20, 2025 14:18',
      duration: '18:20',
      rank: 1,
    },
    {
      id: '2',
      name: 'Budi Santoso',
      nim: '13520003',
      score: 142,
      totalPoints: 150,
      percentage: 95,
      correctAnswers: 14,
      totalQuestions: 15,
      completedAt: 'Dec 20, 2025 14:15',
      duration: '15:45',
      rank: 2,
    },
    {
      id: '3',
      name: 'Siti Nurhaliza',
      nim: '13520002',
      score: 135,
      totalPoints: 150,
      percentage: 90,
      correctAnswers: 14,
      totalQuestions: 15,
      completedAt: 'Dec 20, 2025 14:19',
      duration: '19:12',
      rank: 3,
    },
    {
      id: '4',
      name: 'Dewi Lestari',
      nim: '13520004',
      score: 128,
      totalPoints: 150,
      percentage: 85,
      correctAnswers: 13,
      totalQuestions: 15,
      completedAt: 'Dec 20, 2025 14:17',
      duration: '17:30',
      rank: 4,
    },
    {
      id: '5',
      name: 'Ahmad Rizki',
      nim: '13520001',
      score: 120,
      totalPoints: 150,
      percentage: 80,
      correctAnswers: 12,
      totalQuestions: 15,
      completedAt: 'Dec 20, 2025 14:16',
      duration: '16:50',
      rank: 5,
    },
  ];

  const totalParticipants = 40;
  const averageScore = Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length);
  const highestScore = Math.max(...results.map(r => r.percentage));
  const lowestScore = Math.min(...results.map(r => r.percentage));
  const passRate = Math.round((results.filter(r => r.percentage >= 70).length / results.length) * 100);

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
            onClick={() => navigate('quiz-management')}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>
            Grade Report
          </h1>
        </div>
        <div className="space-y-2">
          <p className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>
            {quizData.title}
          </p>
          <p className="text-white/80" style={{ fontSize: '14px' }}>
            {quizData.course} · {quizData.scheduledDate}
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-6 py-4 flex-shrink-0 space-y-4">
        {/* Top Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[rgba(16,185,129,0.1)] rounded-full flex items-center justify-center">
                <TrendingUp size={16} className="text-[#10B981]" />
              </div>
              <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                Average
              </span>
            </div>
            <p className="text-[#10B981]" style={{ fontSize: '24px', fontWeight: 700 }}>
              {averageScore}%
            </p>
          </div>

          <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[rgba(52,87,213,0.1)] rounded-full flex items-center justify-center">
                <Users size={16} className="text-[#3457D5]" />
              </div>
              <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                Participants
              </span>
            </div>
            <p className="text-[#0F2A71]" style={{ fontSize: '24px', fontWeight: 700 }}>
              {totalParticipants}
            </p>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
              Highest Score
            </span>
            <span className="text-[#10B981]" style={{ fontSize: '16px', fontWeight: 700 }}>
              {highestScore}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
              Lowest Score
            </span>
            <span className="text-[#EF4444]" style={{ fontSize: '16px', fontWeight: 700 }}>
              {lowestScore}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
              Pass Rate (≥70%)
            </span>
            <span className="text-[#3457D5]" style={{ fontSize: '16px', fontWeight: 700 }}>
              {passRate}%
            </span>
          </div>
        </div>

        {/* Export Button */}
        <button
          className="w-full h-12 bg-[#10B981] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          style={{ fontSize: '16px', fontWeight: 600 }}
        >
          <Download size={18} />
          Export to CSV
        </button>
      </div>

      {/* Student Results List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-24">
        <div className="mb-3 flex items-center justify-between">
          <h2 style={{ fontSize: '16px', fontWeight: 700 }}>
            Student Results
          </h2>
          <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
            {results.length} students
          </span>
        </div>
        
        <div className="space-y-3">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white border border-[#E8E8E8] rounded-[16px] p-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-3 flex-1">
                  {/* Rank Badge */}
                  <div 
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                      ${result.rank === 1 ? 'bg-[#FBBF24]' : result.rank === 2 ? 'bg-[#D1D5DB]' : result.rank === 3 ? 'bg-[#F59E0B]' : 'bg-[#F3F3F3]'}
                    `}
                  >
                    {result.rank <= 3 ? (
                      <Award size={20} className="text-white" />
                    ) : (
                      <span style={{ fontSize: '16px', fontWeight: 700, color: '#6B6B6B' }}>
                        {result.rank}
                      </span>
                    )}
                  </div>

                  {/* Student Info */}
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                      {result.name}
                    </h3>
                    <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                      NIM: {result.nim}
                    </p>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <p 
                    className={`
                      mb-1
                      ${result.percentage >= 90 ? 'text-[#10B981]' : result.percentage >= 70 ? 'text-[#3457D5]' : 'text-[#EF4444]'}
                    `}
                    style={{ fontSize: '24px', fontWeight: 700 }}
                  >
                    {result.percentage}%
                  </p>
                  <p className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                    {result.score}/{result.totalPoints}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="pt-3 border-t border-[#E8E8E8]">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-[#10B981]" />
                    <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      {result.correctAnswers}/{result.totalQuestions} correct
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle size={14} className="text-[#EF4444]" />
                    <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                      {result.totalQuestions - result.correctAnswers} wrong
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedStudent(result)}
                  className="w-full h-10 bg-[#F3F3F3] text-[#0F2A71] rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#E8E8E8] transition-colors"
                  style={{ fontSize: '14px', fontWeight: 600 }}
                >
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-[402px] rounded-t-[24px] p-6 pb-8 max-h-[80vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700 }}>
                  {selectedStudent.name}
                </h2>
                <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                  NIM: {selectedStudent.nim}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-8 h-8 bg-[#F3F3F3] rounded-full flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Score Card */}
              <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-[16px] p-6 text-white text-center">
                <p style={{ fontSize: '16px' }} className="mb-2 opacity-90">
                  Final Score
                </p>
                <p style={{ fontSize: '48px', fontWeight: 700 }}>
                  {selectedStudent.percentage}%
                </p>
                <p style={{ fontSize: '14px' }} className="opacity-90">
                  {selectedStudent.score} / {selectedStudent.totalPoints} points
                </p>
              </div>

              {/* Details */}
              <div className="bg-[#F3F3F3] rounded-[16px] p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                    Rank
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    #{selectedStudent.rank} of {totalParticipants}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                    Correct Answers
                  </span>
                  <span className="text-[#10B981]" style={{ fontSize: '14px', fontWeight: 600 }}>
                    {selectedStudent.correctAnswers}/{selectedStudent.totalQuestions}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                    Time Taken
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    {selectedStudent.duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                    Completed At
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    {selectedStudent.completedAt}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="w-full h-12 bg-[#10B981] text-white rounded-[12px] hover:opacity-90 transition-opacity"
                style={{ fontSize: '16px', fontWeight: 600 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
