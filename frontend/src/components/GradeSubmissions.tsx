import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, FileText, Download, CheckCircle, Clock, X } from 'lucide-react';

interface GradeSubmissionsProps {
  navigate: (screen: Screen) => void;
  assignmentId?: string;
}

interface Submission {
  id: string;
  studentName: string;
  studentNIM: string;
  submittedDate: string;
  files: string[];
  status: 'pending' | 'graded' | 'late';
  grade?: number;
  feedback?: string;
}

export default function GradeSubmissions({ navigate, assignmentId }: GradeSubmissionsProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [gradeInput, setGradeInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  // Mock submissions data
  const submissions: Submission[] = [
    {
      id: '1',
      studentName: 'Ahmad Rizki',
      studentNIM: '13520001',
      submittedDate: 'Dec 27, 2025 14:30',
      files: ['ERD_Diagram.pdf', 'Database_Schema.sql'],
      status: 'pending',
    },
    {
      id: '2',
      studentName: 'Siti Nurhaliza',
      studentNIM: '13520002',
      submittedDate: 'Dec 27, 2025 16:45',
      files: ['ERD_Assignment.pdf'],
      status: 'pending',
    },
    {
      id: '3',
      studentName: 'Budi Santoso',
      studentNIM: '13520003',
      submittedDate: 'Dec 26, 2025 10:20',
      files: ['Database_ERD.pdf', 'Documentation.docx'],
      status: 'graded',
      grade: 95,
      feedback: 'Excellent work! Very detailed ERD with proper normalization.',
    },
    {
      id: '4',
      studentName: 'Dewi Lestari',
      studentNIM: '13520004',
      submittedDate: 'Dec 28, 2025 23:50',
      files: ['ERD.pdf'],
      status: 'late',
    },
  ];

  const handleGradeSubmit = () => {
    console.log('Grading submission:', {
      submissionId: selectedSubmission?.id,
      grade: gradeInput,
      feedback: feedbackInput,
    });
    setSelectedSubmission(null);
    setGradeInput('');
    setFeedbackInput('');
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
            onClick={() => navigate('assignment-management')}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>
            Grade Submissions
          </h1>
        </div>
        <p className="text-white/70" style={{ fontSize: '14px' }}>
          Database ERD Assignment
        </p>
      </div>

      {/* Scrollable Submissions List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6 pb-24">
        <div className="space-y-3">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white border border-[#E8E8E8] rounded-[16px] p-4"
            >
              {/* Student Info */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                    {submission.studentName}
                  </h3>
                  <p className="text-[#6B6B6B] mb-1" style={{ fontSize: '14px' }}>
                    NIM: {submission.studentNIM}
                  </p>
                  <p className="text-[#999]" style={{ fontSize: '12px' }}>
                    Submitted: {submission.submittedDate}
                  </p>
                </div>
                
                {/* Status Badge */}
                {submission.status === 'graded' && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#F0FDF4] rounded-full">
                    <CheckCircle size={14} className="text-[#10B981]" />
                    <span className="text-[#10B981]" style={{ fontSize: '12px', fontWeight: 600 }}>
                      Graded
                    </span>
                  </div>
                )}
                {submission.status === 'late' && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#FEF2F2] rounded-full">
                    <Clock size={14} className="text-[#EF4444]" />
                    <span className="text-[#EF4444]" style={{ fontSize: '12px', fontWeight: 600 }}>
                      Late
                    </span>
                  </div>
                )}
              </div>

              {/* Files */}
              <div className="mb-3">
                <p className="text-[#6B6B6B] mb-2" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Submitted Files:
                </p>
                <div className="space-y-2">
                  {submission.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-[#F3F3F3] rounded-[8px]">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-[#0F2A71]" />
                        <span style={{ fontSize: '14px' }}>{file}</span>
                      </div>
                      <button className="text-[#0F2A71]">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grade Display or Button */}
              {submission.status === 'graded' ? (
                <div className="p-3 bg-[#F0F9FF] rounded-[12px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#0F2A71]" style={{ fontSize: '14px', fontWeight: 600 }}>
                      Grade
                    </span>
                    <span className="text-[#0F2A71]" style={{ fontSize: '20px', fontWeight: 700 }}>
                      {submission.grade}/100
                    </span>
                  </div>
                  {submission.feedback && (
                    <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                      {submission.feedback}
                    </p>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSelectedSubmission(submission);
                    setGradeInput('');
                    setFeedbackInput('');
                  }}
                  className="w-full h-12 bg-[#0F2A71] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Grade Submission
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grading Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-[402px] rounded-t-[24px] p-6 pb-8 max-h-[80vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontSize: '20px', fontWeight: 700 }}>
                Grade Submission
              </h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="w-8 h-8 bg-[#F3F3F3] rounded-full flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Student Info */}
              <div className="p-4 bg-[#F3F3F3] rounded-[12px]">
                <p style={{ fontSize: '16px', fontWeight: 600 }}>
                  {selectedSubmission.studentName}
                </p>
                <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                  NIM: {selectedSubmission.studentNIM}
                </p>
              </div>

              {/* Grade Input */}
              <div>
                <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Grade (0-100) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  placeholder="Enter grade"
                  className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#0F2A71]"
                  style={{ fontSize: '16px' }}
                />
              </div>

              {/* Feedback */}
              <div>
                <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Feedback (Optional)
                </label>
                <textarea
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="Enter feedback for student"
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-[#E8E8E8] rounded-[12px] resize-none focus:outline-none focus:border-[#0F2A71]"
                  style={{ fontSize: '16px' }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="flex-1 h-12 bg-[#F3F3F3] text-[#6B6B6B] rounded-[12px] hover:bg-[#E8E8E8] transition-colors"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleGradeSubmit}
                  disabled={!gradeInput || parseInt(gradeInput) < 0 || parseInt(gradeInput) > 100}
                  className="flex-1 h-12 bg-[#10B981] text-white rounded-[12px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Submit Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
