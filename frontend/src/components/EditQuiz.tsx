import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Plus, X, Trash2 } from 'lucide-react';

interface EditQuizProps {
  navigate: (screen: Screen) => void;
  quizId?: string | null;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export default function EditQuiz({ navigate, quizId }: EditQuizProps) {
  // Pre-filled with existing data
  const [title, setTitle] = useState('Requirements Engineering Fundamentals');
  const [course, setCourse] = useState('Software Engineering');
  const [scheduledDate, setScheduledDate] = useState('2025-12-28');
  const [scheduledTime, setScheduledTime] = useState('14:00');
  const [duration, setDuration] = useState('30');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: 'What does MoSCoW stand for in requirements prioritization?',
      options: [
        'Must have, Should have, Could have, Won\'t have',
        'Major, Secondary, Common, Optional, Wishlist',
        'Mandatory, Standard, Critical, Optional, Wanted',
        'Main, Sub, Core, Other, Wanted'
      ],
      correctAnswer: 0,
      points: 10,
    },
    {
      id: '2',
      text: 'Which is NOT a functional requirement?',
      options: [
        'System must process 1000 transactions per second',
        'User can login with username and password',
        'System generates monthly reports',
        'User can reset password via email'
      ],
      correctAnswer: 0,
      points: 10,
    }
  ]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Question form state
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [points, setPoints] = useState('10');

  const courses = [
    'Database Systems',
    'Software Engineering',
    'System Analysis & Design',
    'Enterprise Architecture',
    'Data Structures',
  ];

  const handleAddQuestion = () => {
    if (questionText.trim() && options.every(o => o.trim())) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: questionText,
        options: [...options],
        correctAnswer,
        points: parseInt(points),
      };
      setQuestions([...questions, newQuestion]);
      // Reset form
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(0);
      setPoints('10');
      setShowAddQuestion(false);
    }
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleUpdateQuiz = () => {
    console.log('Updating quiz:', {
      quizId,
      title,
      course,
      scheduledDate,
      scheduledTime,
      duration,
      questions,
    });
    navigate('quiz-management');
  };

  const handleDeleteQuiz = () => {
    console.log('Deleting quiz:', quizId);
    navigate('quiz-management');
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

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
            Edit Quiz
          </h1>
        </div>
        <p className="text-white/70" style={{ fontSize: '14px' }}>
          Update quiz details and questions
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6 pb-24">
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Basic Information</h2>
            
            {/* Title */}
            <div>
              <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                Quiz Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title"
                className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#3457D5]"
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* Course */}
            <div>
              <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                Course *
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#3457D5]"
                style={{ fontSize: '16px' }}
              >
                <option value="">Select course</option>
                {courses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Date *
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#3457D5]"
                  style={{ fontSize: '16px' }}
                />
              </div>
              <div>
                <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Time *
                </label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#3457D5]"
                  style={{ fontSize: '16px' }}
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                Duration (minutes) *
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="30"
                className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#3457D5]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Questions</h2>
                <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                  {questions.length} questions · {totalPoints} points total
                </p>
              </div>
              <button
                onClick={() => setShowAddQuestion(true)}
                className="h-10 px-4 bg-[#3457D5] text-white rounded-[12px] flex items-center gap-2 hover:opacity-90 transition-opacity"
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                <Plus size={18} />
                Add
              </button>
            </div>

            {/* Questions List */}
            {questions.length > 0 && (
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-white border border-[#E8E8E8] rounded-[16px] p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 bg-[#3457D5] text-white rounded-full flex items-center justify-center" style={{ fontSize: '12px', fontWeight: 600 }}>
                            {index + 1}
                          </span>
                          <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>
                            {question.points} points
                          </span>
                        </div>
                        <p className="mb-3" style={{ fontSize: '14px', fontWeight: 600 }}>
                          {question.text}
                        </p>
                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`
                                p-2 rounded-[8px] text-sm
                                ${optIndex === question.correctAnswer
                                  ? 'bg-[#F0FDF4] border border-[#10B981] text-[#10B981]'
                                  : 'bg-[#F3F3F3] text-[#6B6B6B]'
                                }
                              `}
                              style={{ fontSize: '14px' }}
                            >
                              {String.fromCharCode(65 + optIndex)}. {option}
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveQuestion(question.id)}
                        className="ml-3 w-8 h-8 bg-[#FEF2F2] rounded-lg flex items-center justify-center hover:bg-[#FEE2E2] transition-colors"
                      >
                        <Trash2 size={16} className="text-[#EF4444]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delete Button */}
          <div className="pt-4 border-t border-[#E8E8E8]">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full h-12 bg-[#FEF2F2] text-[#EF4444] rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#FEE2E2] transition-colors"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              <Trash2 size={18} />
              Delete Quiz
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigate('quiz-management')}
              className="flex-1 h-12 bg-[#F3F3F3] text-[#6B6B6B] rounded-[12px] hover:bg-[#E8E8E8] transition-colors"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateQuiz}
              disabled={!title.trim() || !course || !scheduledDate || !scheduledTime || questions.length === 0}
              className="flex-1 h-12 bg-[#3457D5] text-white rounded-[12px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              Update Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Add Question Modal - Same as CreateQuiz */}
      {showAddQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-[402px] rounded-t-[24px] p-6 pb-8 max-h-[85vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontSize: '20px', fontWeight: 700 }}>
                Add Question
              </h2>
              <button
                onClick={() => setShowAddQuestion(false)}
                className="w-8 h-8 bg-[#F3F3F3] rounded-full flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Question *
                </label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter question"
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-[#E8E8E8] rounded-[12px] resize-none focus:outline-none focus:border-[#3457D5]"
                  style={{ fontSize: '16px' }}
                />
              </div>

              <div>
                <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Options *
                </label>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <button
                        onClick={() => setCorrectAnswer(index)}
                        className={`
                          w-8 h-12 flex items-center justify-center rounded-[12px] border-2 transition-colors flex-shrink-0
                          ${correctAnswer === index
                            ? 'bg-[#10B981] border-[#10B981] text-white'
                            : 'bg-white border-[#E8E8E8] text-[#6B6B6B]'
                          }
                        `}
                        style={{ fontSize: '14px', fontWeight: 600 }}
                      >
                        {String.fromCharCode(65 + index)}
                      </button>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...options];
                          newOptions[index] = e.target.value;
                          setOptions(newOptions);
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        className="flex-1 h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#3457D5]"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[#6B6B6B] mt-2" style={{ fontSize: '12px' }}>
                  Click letter to mark as correct answer
                </p>
              </div>

              <div>
                <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Points *
                </label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="10"
                  className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#3457D5]"
                  style={{ fontSize: '16px' }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddQuestion(false)}
                  className="flex-1 h-12 bg-[#F3F3F3] text-[#6B6B6B] rounded-[12px] hover:bg-[#E8E8E8] transition-colors"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddQuestion}
                  disabled={!questionText.trim() || !options.every(o => o.trim())}
                  className="flex-1 h-12 bg-[#3457D5] text-white rounded-[12px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white w-full max-w-[350px] rounded-[24px] p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} className="text-[#EF4444]" />
              </div>
              <h2 className="mb-2" style={{ fontSize: '20px', fontWeight: 700 }}>
                Delete Quiz?
              </h2>
              <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                This action cannot be undone. All quiz data and student responses will be permanently deleted.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 h-12 bg-[#F3F3F3] text-[#6B6B6B] rounded-[12px] hover:bg-[#E8E8E8] transition-colors"
                style={{ fontSize: '16px', fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteQuiz}
                className="flex-1 h-12 bg-[#EF4444] text-white rounded-[12px] hover:opacity-90 transition-opacity"
                style={{ fontSize: '16px', fontWeight: 600 }}
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
