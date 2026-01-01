import { useState } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Screen } from '../App';

interface QuizTakingProps {
  quizId: string | null;
  navigate: (screen: Screen) => void;
}

export default function QuizTaking({ quizId, navigate }: QuizTakingProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

  // Mock quiz data
  const quiz = {
    id: quizId,
    title: 'Requirements Engineering Fundamentals',
    questions: [
      {
        id: 1,
        text: 'What is the primary purpose of requirements engineering?',
        options: [
          'To write code for the system',
          'To understand and document what the system should do',
          'To design the user interface',
          'To test the final product',
        ],
      },
      {
        id: 2,
        text: 'Which of the following is NOT a type of requirement?',
        options: [
          'Functional requirement',
          'Non-functional requirement',
          'Design requirement',
          'Implementation requirement',
        ],
      },
      {
        id: 3,
        text: 'What does the MoSCoW method stand for?',
        options: [
          'Most, Should, Could, Would',
          'Must, Should, Could, Won\'t',
          'May, Shall, Can, Will',
          'Mandatory, Secondary, Conditional, Wishlist',
        ],
      },
      {
        id: 4,
        text: 'Which stakeholder analysis technique helps identify stakeholder influence and interest?',
        options: [
          'SWOT Analysis',
          'Power/Interest Grid',
          'PESTLE Analysis',
          'Porter\'s Five Forces',
        ],
      },
      {
        id: 5,
        text: 'What is a user story in agile development?',
        options: [
          'A detailed technical specification',
          'A short description of functionality from user perspective',
          'A biography of the end user',
          'A list of all system features',
        ],
      },
    ],
  };

  const totalQuestions = quiz.questions.length;
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Format time
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const handleSelectAnswer = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    navigate('quiz-result');
  };

  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Bar with Timer and Progress */}
      <div className="sticky top-0 bg-white z-10 border-b border-[var(--brand-divider)]">
        <div className="px-6 py-4">
          {/* Timer and Question Counter */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[var(--brand-blue)]" />
              <span className="text-body-strong text-[var(--text-primary)]">
                {timeString}
              </span>
            </div>
            <span className="text-caption text-[var(--text-secondary)]">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[var(--brand-surface)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--brand-blue)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Question Card */}
        <div className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-6 mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-[var(--radius-chip)] bg-[var(--brand-blue)] text-white mb-4">
            <span className="text-label">Q{currentQuestion + 1}</span>
          </div>
          
          <h3 className="mb-6">{question.text}</h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={`
                    w-full p-4 rounded-[12px] text-left transition-all
                    ${isSelected
                      ? 'bg-[var(--brand-blue)] text-white border-2 border-[var(--brand-blue)]'
                      : 'bg-white border-2 border-[var(--brand-divider)] hover:border-[var(--brand-blue)]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${isSelected
                        ? 'border-white bg-white'
                        : 'border-[var(--brand-divider)]'
                      }
                    `}>
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-[var(--brand-blue)]" />
                      )}
                    </div>
                    <span className={isSelected ? 'text-white' : 'text-[var(--text-primary)]'}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Answer Status Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`
                w-2 h-2 rounded-full transition-all
                ${index === currentQuestion
                  ? 'w-6 bg-[var(--brand-blue)]'
                  : selectedAnswers[index] !== undefined
                  ? 'bg-[var(--brand-blue)]'
                  : 'bg-[var(--brand-divider)]'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-[var(--brand-divider)] bg-white p-6">
        <div className="flex gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`
              h-12 px-6 rounded-[12px] flex items-center justify-center gap-2 transition-colors
              ${currentQuestion === 0
                ? 'bg-[var(--brand-surface)] text-[var(--text-disabled)] cursor-not-allowed'
                : 'bg-white border border-[var(--brand-divider)] text-[var(--brand-blue)] hover:bg-[var(--brand-surface)]'
              }
            `}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {!isLastQuestion ? (
            <button
              onClick={handleNext}
              disabled={!hasSelectedAnswer}
              className={`
                flex-1 h-12 rounded-[12px] flex items-center justify-center gap-2 transition-opacity
                ${hasSelectedAnswer
                  ? 'bg-[var(--brand-blue)] text-white hover:opacity-90'
                  : 'bg-[var(--brand-surface)] text-[var(--text-disabled)] cursor-not-allowed'
                }
              `}
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!hasSelectedAnswer}
              className={`
                flex-1 h-12 rounded-[12px] transition-opacity
                ${hasSelectedAnswer
                  ? 'bg-green-600 text-white hover:opacity-90'
                  : 'bg-[var(--brand-surface)] text-[var(--text-disabled)] cursor-not-allowed'
                }
              `}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
