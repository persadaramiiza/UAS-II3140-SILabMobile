import { useState } from 'react';
import { ArrowLeft, Clock, FileText, Upload, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Screen } from '../App';

interface TaskDetailProps {
  taskId: string | null;
  navigate: (screen: Screen) => void;
}

export default function TaskDetail({ taskId, navigate }: TaskDetailProps) {
  const [showDescription, setShowDescription] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock task data
  const task = {
    id: taskId,
    title: 'UML Class Diagram Assignment',
    course: 'System Analysis & Design',
    dueDate: 'Tomorrow, 11:59 PM',
    status: isSubmitted ? 'Submitted' : 'Active',
    description: 'Create a comprehensive UML class diagram for the given e-commerce system. Include all relevant classes, attributes, methods, and relationships. Pay special attention to inheritance, composition, and association relationships.',
    maxScore: 100,
    resources: [
      { name: 'Assignment Brief.pdf', size: '245 KB' },
      { name: 'UML Reference Guide.pdf', size: '1.2 MB' },
    ],
    feedback: isSubmitted ? {
      score: 95,
      notes: 'Excellent work! Your class diagram shows a clear understanding of OOP principles. Minor suggestion: consider adding more detailed method signatures for the Payment class.',
      gradedBy: 'Dr. Sarah Johnson',
      gradedAt: 'Dec 27, 2025',
    } : null,
  };

  const handleFileUpload = () => {
    // Mock file upload
    setUploadedFile('UML_ClassDiagram_Final.pdf');
  };

  const handleSubmit = () => {
    if (uploadedFile) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-full bg-white pb-6">
      {/* Header */}
      <div 
        className="sticky top-0 z-10 border-b border-[rgba(234,88,12,0.3)]"
        style={{ background: '#FBBC04' }}
      >
        <div className="flex items-center gap-4 px-6 h-16">
          <button 
            onClick={() => navigate('tasks')}
            className="p-2 -ml-2 hover:bg-black/5 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-[#111]" />
          </button>
          <h2 className="text-[#0F2A71]" style={{ fontWeight: 700 }}>Task Detail</h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Header Info */}
        <div>
          {/* Course Chip */}
          <div className="inline-flex items-center px-3 py-1 rounded-[var(--radius-chip)] bg-[var(--brand-surface)] mb-3">
            <span className="text-caption text-[var(--text-secondary)]">
              {task.course}
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-3">{task.title}</h2>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[var(--text-secondary)]" />
              <span className="text-caption text-[var(--text-secondary)]">
                {task.dueDate}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`
            inline-flex items-center px-3 py-1 rounded-[var(--radius-chip)]
            ${task.status === 'Submitted' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}
          `}>
            <span className="text-caption">{task.status}</span>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white border border-[var(--brand-divider)] rounded-[16px] overflow-hidden">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="w-full flex items-center justify-between p-4 hover:bg-[var(--brand-surface)] transition-colors"
          >
            <h3>Description</h3>
            {showDescription ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {showDescription && (
            <div className="px-4 pb-4">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {task.description}
              </p>
              <div className="mt-3 inline-flex items-center px-3 py-1 rounded-[var(--radius-chip)] bg-[var(--brand-surface)]">
                <span className="text-caption text-[var(--text-secondary)]">
                  Max Score: {task.maxScore} points
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Resources Card */}
        <div className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-4">
          <h3 className="mb-3">Resources</h3>
          <div className="space-y-2">
            {task.resources.map((resource, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 p-3 bg-[var(--brand-surface)] rounded-[12px] hover:bg-[var(--brand-divider)] transition-colors"
              >
                <FileText size={20} className="text-[var(--brand-blue)] flex-shrink-0" />
                <div className="flex-1 text-left min-w-0">
                  <p className="text-body-strong truncate">{resource.name}</p>
                  <p className="text-label text-[var(--text-secondary)]">{resource.size}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submission Card */}
        {!isSubmitted && (
          <div className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-4">
            <h3 className="mb-3">Submission</h3>
            
            {uploadedFile ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-[12px] mb-4">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-body-strong text-green-700 truncate">{uploadedFile}</p>
                  <p className="text-label text-green-600">File uploaded successfully</p>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <p className="text-caption text-[var(--text-secondary)] mb-3">
                  Upload your assignment file (PDF, DOC, or ZIP)
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleFileUpload}
                className="flex-1 h-12 bg-white border border-[var(--brand-divider)] text-[var(--brand-blue)] rounded-[12px] flex items-center justify-center gap-2 hover:bg-[var(--brand-surface)] transition-colors"
              >
                <Upload size={18} />
                {uploadedFile ? 'Change File' : 'Upload File'}
              </button>
              
              {uploadedFile && (
                <button
                  onClick={handleSubmit}
                  className="flex-1 h-12 bg-[var(--brand-blue)] text-white rounded-[12px] hover:opacity-90 transition-opacity"
                >
                  Submit Assignment
                </button>
              )}
            </div>
          </div>
        )}

        {/* Feedback Card (only shown when graded) */}
        {task.feedback && (
          <div className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-4">
            <h3 className="mb-4">Feedback</h3>
            
            {/* Score Display */}
            <div className="text-center mb-4 p-6 bg-[var(--brand-surface)] rounded-[12px]">
              <p className="text-caption text-[var(--text-secondary)] mb-2">Your Score</p>
              <p className="text-[48px] leading-[1.2]" style={{ fontWeight: 600 }}>
                {task.feedback.score}
              </p>
              <p className="text-caption text-[var(--text-secondary)]">out of {task.maxScore}</p>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <p className="text-body-strong mb-2">Assistant Notes</p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {task.feedback.notes}
              </p>
            </div>

            {/* Meta */}
            <div className="pt-4 border-t border-[var(--brand-divider)]">
              <p className="text-caption text-[var(--text-secondary)]">
                Graded by {task.feedback.gradedBy} on {task.feedback.gradedAt}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}