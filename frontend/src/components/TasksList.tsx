import { useState } from 'react';
import { Search, Clock, ChevronRight } from 'lucide-react';
import { Screen, UserRole } from '../App';

interface TasksListProps {
  navigate: (screen: Screen, data?: any) => void;
  userRole: UserRole;
}

type TaskStatus = 'All' | 'Active' | 'Submitted' | 'Graded';

export default function TasksList({ navigate, userRole }: TasksListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<TaskStatus>('All');

  // Mock tasks data
  const tasks = [
    {
      id: '1',
      title: 'UML Class Diagram Assignment',
      course: 'System Analysis & Design',
      dueDate: 'Tomorrow, 11:59 PM',
      status: 'Active' as const,
    },
    {
      id: '2',
      title: 'Requirements Engineering Report',
      course: 'Software Engineering',
      dueDate: 'Dec 28, 2025',
      status: 'Submitted' as const,
    },
    {
      id: '3',
      title: 'Database ERD Design',
      course: 'Database Systems',
      dueDate: 'Dec 25, 2025',
      status: 'Graded' as const,
      score: 95,
    },
    {
      id: '4',
      title: 'Business Process Modeling',
      course: 'Enterprise Architecture',
      dueDate: 'Jan 5, 2026',
      status: 'Active' as const,
    },
    {
      id: '5',
      title: 'UI/UX Wireframe Prototype',
      course: 'Interaction Design',
      dueDate: 'Dec 30, 2025',
      status: 'Submitted' as const,
    },
  ];

  const filters: TaskStatus[] = ['All', 'Active', 'Submitted', 'Graded'];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || task.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-700';
      case 'Submitted':
        return 'bg-yellow-100 text-yellow-700';
      case 'Graded':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-full bg-[#FAFAFA]">
      {/* Header with Gradient */}
      <div className="sticky top-0 bg-white z-10 border-b border-[#E8E8E8]">
        <div className="px-6 pt-4 pb-4">
          {/* Title with Gradient Background */}
          <div className="relative h-6 mb-4 overflow-visible">
            <div 
              className="absolute h-[52px] left-[-24px] top-[-20px] rounded-bl-[30px]"
              style={{ 
                width: '404px',
                backgroundImage: 'linear-gradient(42.8103deg, rgb(15, 42, 113) 45.385%, rgb(251, 188, 4) 122.33%)'
              }}
            />
            <h2 className="relative text-white" style={{ fontSize: '16px', fontWeight: 700 }}>
              {userRole === 'student' ? 'My Tasks' : 'Submissions'}
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search 
              size={18} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]" 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full h-12 pl-12 pr-4 bg-[#F3F3F3] border border-transparent rounded-[12px] text-[#111111] placeholder:text-[rgba(17,17,17,0.5)] focus:outline-none focus:ring-2 focus:ring-[#0F2A71]"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-[999px] transition-colors
                  ${activeFilter === filter
                    ? 'bg-[#0F2A71] text-white'
                    : 'bg-[#F3F3F3] text-[#6B6B6B]'
                  }
                `}
                style={{ fontSize: '16px', height: '40px' }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="px-6 py-3 space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--text-secondary)]">No tasks found</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => navigate('task-detail', { taskId: task.id })}
              className="w-full bg-white border border-[var(--brand-divider)] rounded-[16px] p-4 text-left hover:shadow-[var(--shadow-card)] transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Course Chip */}
                  <div className="inline-flex items-center px-2 py-1 rounded-[var(--radius-chip)] bg-[var(--brand-surface)] mb-2">
                    <span className="text-label text-[var(--text-secondary)]">
                      {task.course}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="mb-2 truncate">{task.title}</h4>

                  {/* Due Date */}
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[var(--text-secondary)] flex-shrink-0" />
                    <span className="text-caption text-[var(--text-secondary)]">
                      {task.dueDate}
                    </span>
                  </div>

                  {/* Score (if graded) */}
                  {task.status === 'Graded' && task.score && (
                    <div className="mt-2">
                      <span className="text-body-strong text-[var(--brand-blue)]">
                        Score: {task.score}/100
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  {/* Status Badge */}
                  <div className={`
                    inline-flex items-center px-3 py-1 rounded-[var(--radius-chip)]
                    ${getStatusColor(task.status)}
                  `}>
                    <span className="text-label whitespace-nowrap">
                      {task.status}
                    </span>
                  </div>

                  {/* Chevron */}
                  <ChevronRight size={20} className="text-[var(--text-secondary)]" />
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}