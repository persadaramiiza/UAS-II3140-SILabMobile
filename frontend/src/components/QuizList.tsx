import { useState, useEffect, useRef } from 'react';
import { Clock, Play, CheckCircle } from 'lucide-react';
import { Screen, UserRole } from '../App';
import imgQuizHeader from "figma:asset/d2c142b27d0f791305df796d3a05ac00499fa40f.png";

interface QuizListProps {
  navigate: (screen: Screen, data?: any) => void;
  userRole: UserRole;
}

type QuizFilter = 'Upcoming' | 'Active' | 'Completed';

export default function QuizList({ navigate, userRole }: QuizListProps) {
  const [activeFilter, setActiveFilter] = useState<QuizFilter>('Active');
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        // Trigger scroll state when scrolled more than 50px
        setIsScrolled(scrollContainerRef.current.scrollTop > 50);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Mock quizzes data
  const quizzes = [
    {
      id: '1',
      title: 'Requirements Engineering Fundamentals',
      course: 'Software Engineering',
      timeLimit: '30 minutes',
      attempts: 2,
      status: 'Active' as const,
      availableUntil: 'Today, 11:59 PM',
      accentColor: '#0F2A71',
    },
    {
      id: '2',
      title: 'UML Diagrams Assessment',
      course: 'System Analysis & Design',
      timeLimit: '45 minutes',
      attempts: 1,
      status: 'Upcoming' as const,
      availableFrom: 'Tomorrow, 9:00 AM',
      accentColor: '#3B82F6',
    },
    {
      id: '3',
      title: 'Database Normalization Quiz',
      course: 'Database Systems',
      timeLimit: '20 minutes',
      attempts: 3,
      status: 'Completed' as const,
      score: 85,
      completedAt: 'Dec 20, 2025',
      accentColor: '#10B981',
    },
    {
      id: '4',
      title: 'Enterprise Architecture Concepts',
      course: 'Enterprise Architecture',
      timeLimit: '40 minutes',
      attempts: 2,
      status: 'Completed' as const,
      score: 92,
      completedAt: 'Dec 18, 2025',
      accentColor: '#10B981',
    },
  ];

  const filters: QuizFilter[] = ['Upcoming', 'Active', 'Completed'];

  const filteredQuizzes = quizzes.filter(quiz => quiz.status === activeFilter);

  return (
    <div className="relative min-h-full bg-[#FAFAFA] flex flex-col">
      {/* Fixed Hero Header with Background Image - Only visible when not scrolled */}
      {!isScrolled && (
        <div className="relative w-full flex-shrink-0" style={{ height: '327px' }}>
          {/* Yellow Gradient Strip - Behind everything, larger to show behind rounded corner */}
          <div 
            className="absolute left-0 w-full rounded-br-[30px]"
            style={{ 
              height: '150px',
              bottom: 0,
              background: 'linear-gradient(90deg, #FBBC04 0%, #FFDD60 100%)'
            }}
          />

          {/* Blue Background with 3D City Illustration - On top of yellow, with rounded bl corner */}
          <div 
            className="absolute w-full overflow-hidden rounded-bl-[30px]"
            style={{ 
              height: '265px',
              top: 0,
              left: 0,
              backgroundColor: '#3457D5'
            }}
          >
            <img 
              src={imgQuizHeader} 
              alt=""
              className="absolute w-full h-full object-cover"
              style={{ 
                objectPosition: 'center center'
              }}
            />
          </div>

          {/* Text "Quizzes" - On top of everything */}
          <p 
            className="absolute left-7 bottom-5 text-white z-10"
            style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              lineHeight: '32px' 
            }}
          >
            Quizzes
          </p>
        </div>
      )}

      {/* Sticky Header with Gradient and Filters */}
      <div 
        className="sticky top-0 bg-white z-20 flex-shrink-0 border-b border-[#E8E8E8]"
      >
        <div className="px-6 pt-4 pb-4">
          {/* Title with Gradient Background - Only show when scrolled */}
          {isScrolled && (
            <div className="relative h-6 mb-4 overflow-visible">
              <div 
                className="absolute h-[52px] left-[-24px] top-[-20px] rounded-bl-[30px]"
                style={{ 
                  width: '404px',
                  backgroundImage: 'linear-gradient(42.8103deg, rgb(15, 42, 113) 45.385%, rgb(251, 188, 4) 122.33%)'
                }}
              />
              <h2 className="relative text-white" style={{ fontSize: '16px', fontWeight: 700 }}>
                Quizzes
              </h2>
            </div>
          )}

          {/* Filter Segmented Control */}
          <div className="flex gap-1 p-1 bg-[#F3F3F3] rounded-[12px]">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  flex-1 py-2 rounded-[8px] transition-all
                  ${activeFilter === filter
                    ? 'bg-white text-[#0F2A71] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]'
                    : 'text-[#6B6B6B]'
                  }
                `}
                style={{ fontSize: '16px' }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Quizzes List Container */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto scrollbar-hide"
      >
        {/* Quizzes List */}
        <div className="px-6 py-3 space-y-3 pb-24">
          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[var(--text-secondary)]">No {activeFilter.toLowerCase()} quizzes</p>
            </div>
          ) : (
            filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-4 relative overflow-hidden"
              >
                {/* Colored left accent border */}
                <div 
                  className="absolute top-0 left-0 w-1 h-full rounded-l-[16px]" 
                  style={{ backgroundColor: quiz.accentColor }}
                />
                
                <div className="pl-3">
                  {/* Course Label */}
                  <p className="text-[var(--text-secondary)] mb-2" style={{ fontSize: '14px' }}>
                    {quiz.course}
                  </p>

                  {/* Title with Status Badge */}
                  <div className="flex items-start justify-between mb-3 gap-3">
                    <h3 className="flex-1">{quiz.title}</h3>
                    {quiz.status === 'Active' && (
                      <span 
                        className="px-3 py-1 rounded-full text-nowrap"
                        style={{
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: '#3B82F6',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        active
                      </span>
                    )}
                  </div>

                  {/* Quiz Info - Horizontal Layout */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-[var(--text-secondary)]" />
                      <span className="text-caption text-[var(--text-secondary)]">
                        {quiz.timeLimit}
                      </span>
                    </div>
                    <span className="text-caption text-[var(--text-secondary)]">
                      {quiz.attempts} {quiz.attempts === 1 ? 'attempt' : 'attempts'} allowed
                    </span>
                  </div>

                  {/* Availability / Score Info */}
                  {quiz.status === 'Active' && (
                    <div className="mb-4">
                      <p className="text-caption" style={{ color: '#F97316' }}>
                        Available until {quiz.availableUntil}
                      </p>
                    </div>
                  )}

                  {quiz.status === 'Upcoming' && (
                    <div className="mb-4">
                      <p className="text-caption text-[var(--text-secondary)]">
                        Available from {quiz.availableFrom}
                      </p>
                    </div>
                  )}

                  {quiz.status === 'Completed' && quiz.score !== undefined && (
                    <div className="mb-4 flex items-center justify-between p-3 bg-green-50 rounded-[12px]">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-600" />
                        <span className="text-body-strong text-green-700">
                          Score: {quiz.score}%
                        </span>
                      </div>
                      <span className="text-label text-green-600">
                        {quiz.completedAt}
                      </span>
                    </div>
                  )}

                  {/* Action Button */}
                  {quiz.status === 'Active' && (
                    <button
                      onClick={() => navigate('quiz-taking', { quizId: quiz.id })}
                      className="w-full h-12 text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: quiz.accentColor }}
                    >
                      <Play size={18} fill="white" />
                      Start Quiz
                    </button>
                  )}

                  {quiz.status === 'Upcoming' && (
                    <button
                      disabled
                      className="w-full h-12 bg-[var(--brand-surface)] text-[var(--text-disabled)] rounded-[12px] cursor-not-allowed"
                    >
                      Not Available Yet
                    </button>
                  )}

                  {quiz.status === 'Completed' && (
                    <button
                      onClick={() => navigate('quiz-result')}
                      className="w-full h-12 bg-white border border-[var(--brand-divider)] text-[var(--brand-blue)] rounded-[12px] hover:bg-[var(--brand-surface)] transition-colors"
                    >
                      Review Answers
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}