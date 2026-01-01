import { CheckCircle, XCircle, Award } from 'lucide-react';
import { Screen } from '../App';

interface QuizResultProps {
  navigate: (screen: Screen) => void;
}

export default function QuizResult({ navigate }: QuizResultProps) {
  // Mock result data
  const result = {
    score: 85,
    correctAnswers: 17,
    totalQuestions: 20,
    timeSpent: '24:35',
    passingScore: 70,
  };

  const questions = [
    {
      id: 1,
      text: 'What is the primary purpose of requirements engineering?',
      userAnswer: 'To understand and document what the system should do',
      correctAnswer: 'To understand and document what the system should do',
      isCorrect: true,
    },
    {
      id: 2,
      text: 'Which of the following is NOT a type of requirement?',
      userAnswer: 'Design requirement',
      correctAnswer: 'Implementation requirement',
      isCorrect: false,
    },
    {
      id: 3,
      text: 'What does the MoSCoW method stand for?',
      userAnswer: 'Must, Should, Could, Won\'t',
      correctAnswer: 'Must, Should, Could, Won\'t',
      isCorrect: true,
    },
    // ... more questions
  ];

  const isPassed = result.score >= result.passingScore;

  return (
    <div className="min-h-full bg-white pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-[var(--brand-divider)]">
        <div className="px-6 py-4">
          <h2 className="text-[var(--text-primary)]">Quiz Results</h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Score Card */}
        <div className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-6 text-center">
          {/* Icon */}
          <div className={`
            w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center
            ${isPassed ? 'bg-green-100' : 'bg-orange-100'}
          `}>
            <Award 
              size={40} 
              className={isPassed ? 'text-green-600' : 'text-orange-600'}
            />
          </div>

          {/* Score */}
          <p className="text-caption text-[var(--text-secondary)] mb-2">Your Score</p>
          <p className="text-[56px] leading-[1.1] mb-2" style={{ fontWeight: 600 }}>
            {result.score}%
          </p>
          <p className={`text-body-strong mb-4 ${isPassed ? 'text-green-600' : 'text-orange-600'}`}>
            {isPassed ? 'Passed!' : 'Keep practicing!'}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--brand-divider)]">
            <div>
              <p className="text-caption text-[var(--text-secondary)] mb-1">Correct Answers</p>
              <p className="text-body-strong text-[var(--text-primary)]">
                {result.correctAnswers} / {result.totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-caption text-[var(--text-secondary)] mb-1">Time Spent</p>
              <p className="text-body-strong text-[var(--text-primary)]">
                {result.timeSpent}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 rounded-[12px] p-4 text-center">
            <CheckCircle size={24} className="text-green-600 mx-auto mb-2" />
            <p className="text-[24px] leading-[1.2] mb-1" style={{ fontWeight: 600 }}>
              {result.correctAnswers}
            </p>
            <p className="text-label text-green-700">Correct</p>
          </div>

          <div className="bg-red-50 rounded-[12px] p-4 text-center">
            <XCircle size={24} className="text-red-600 mx-auto mb-2" />
            <p className="text-[24px] leading-[1.2] mb-1" style={{ fontWeight: 600 }}>
              {result.totalQuestions - result.correctAnswers}
            </p>
            <p className="text-label text-red-700">Incorrect</p>
          </div>

          <div className="bg-blue-50 rounded-[12px] p-4 text-center">
            <Award size={24} className="text-[var(--brand-blue)] mx-auto mb-2" />
            <p className="text-[24px] leading-[1.2] mb-1" style={{ fontWeight: 600 }}>
              {result.score}%
            </p>
            <p className="text-label text-[var(--brand-blue)]">Score</p>
          </div>
        </div>

        {/* Review Section */}
        <div>
          <h3 className="mb-4">Review Answers</h3>
          <div className="space-y-3">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-4"
              >
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-3">
                  {question.isCorrect ? (
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <h4 className="mb-2">Question {question.id}</h4>
                    <p className="text-[var(--text-secondary)] mb-3">{question.text}</p>
                  </div>
                </div>

                {/* Answers */}
                <div className="pl-8 space-y-2">
                  <div className={`
                    p-3 rounded-[8px]
                    ${question.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
                  `}>
                    <p className="text-label text-[var(--text-secondary)] mb-1">Your Answer:</p>
                    <p className={`text-body-strong ${question.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {question.userAnswer}
                    </p>
                  </div>

                  {!question.isCorrect && (
                    <div className="p-3 rounded-[8px] bg-green-50 border border-green-200">
                      <p className="text-label text-[var(--text-secondary)] mb-1">Correct Answer:</p>
                      <p className="text-body-strong text-green-700">
                        {question.correctAnswer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('quiz-list')}
            className="w-full h-12 bg-[var(--brand-blue)] text-white rounded-[12px] hover:opacity-90 transition-opacity"
          >
            Back to Quizzes
          </button>
          <button
            onClick={() => navigate('home')}
            className="w-full h-12 bg-white border border-[var(--brand-divider)] text-[var(--brand-blue)] rounded-[12px] hover:bg-[var(--brand-surface)] transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
