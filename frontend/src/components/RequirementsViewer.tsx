import { useState } from 'react';
import { ArrowLeft, Plus, Download, GripVertical, Trash2 } from 'lucide-react';
import { Screen, UserRole } from '../App';
import BottomNav from './BottomNav';

interface RequirementsViewerProps {
  navigate: (screen: Screen) => void;
  userRole: UserRole;
}

type MoSCoWCategory = 'Must Have' | 'Should Have' | 'Could Have' | "Won't Have";

interface Requirement {
  id: string;
  title: string;
  stakeholder: string;
  acceptanceCriteria: string;
  category: MoSCoWCategory;
}

export default function RequirementsViewer({ navigate, userRole }: RequirementsViewerProps) {
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: '1',
      title: 'User Authentication System',
      stakeholder: 'Security Team',
      acceptanceCriteria: 'Users can login with email/password or Google OAuth',
      category: 'Must Have',
    },
    {
      id: '2',
      title: 'Assignment Submission Portal',
      stakeholder: 'Students, Assistants',
      acceptanceCriteria: 'Students can upload files and track submission status',
      category: 'Must Have',
    },
    {
      id: '3',
      title: 'Quiz Auto-Grading',
      stakeholder: 'Assistants',
      acceptanceCriteria: 'Multiple choice quizzes are automatically graded',
      category: 'Must Have',
    },
    {
      id: '4',
      title: 'Real-time Notifications',
      stakeholder: 'All Users',
      acceptanceCriteria: 'Users receive instant notifications for new assignments',
      category: 'Should Have',
    },
    {
      id: '5',
      title: 'Mobile App Version',
      stakeholder: 'Students',
      acceptanceCriteria: 'Native mobile apps for iOS and Android',
      category: 'Should Have',
    },
    {
      id: '6',
      title: 'Advanced Analytics Dashboard',
      stakeholder: 'Admin',
      acceptanceCriteria: 'Detailed reports on student performance trends',
      category: 'Could Have',
    },
    {
      id: '7',
      title: 'AI-Powered Grading Assistant',
      stakeholder: 'Assistants',
      acceptanceCriteria: 'ML model suggests grades for essay questions',
      category: 'Could Have',
    },
    {
      id: '8',
      title: 'Video Conferencing Integration',
      stakeholder: 'All Users',
      acceptanceCriteria: 'Built-in video calls for consultations',
      category: "Won't Have",
    },
  ]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReq, setNewReq] = useState({
    title: '',
    stakeholder: '',
    acceptanceCriteria: '',
    category: 'Must Have' as MoSCoWCategory,
  });

  const tabs: MoSCoWCategory[] = ['Must Have', 'Should Have', 'Could Have', "Won't Have"];

  const getTabColor = (tab: MoSCoWCategory) => {
    switch (tab) {
      case 'Must Have':
        return { bg: '#FEE2E2', border: '#FCA5A5', text: '#DC2626' };
      case 'Should Have':
        return { bg: '#FED7AA', border: '#FDBA74', text: '#EA580C' };
      case 'Could Have':
        return { bg: '#DBEAFE', border: '#93C5FD', text: '#2563EB' };
      case "Won't Have":
        return { bg: '#F3F4F6', border: '#D1D5DB', text: '#6B7280' };
    }
  };

  const handleDragStart = (e: React.DragEvent, reqId: string) => {
    setDraggedItem(reqId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, category: MoSCoWCategory) => {
    e.preventDefault();
    if (!draggedItem) return;

    setRequirements(requirements.map(req =>
      req.id === draggedItem ? { ...req, category } : req
    ));
    setDraggedItem(null);
  };

  const handleAddRequirement = () => {
    if (!newReq.title.trim()) return;
    
    const requirement: Requirement = {
      id: Date.now().toString(),
      ...newReq,
    };
    
    setRequirements([...requirements, requirement]);
    setNewReq({
      title: '',
      stakeholder: '',
      acceptanceCriteria: '',
      category: 'Must Have',
    });
    setShowAddForm(false);
  };

  const handleDeleteRequirement = (id: string) => {
    setRequirements(requirements.filter(req => req.id !== id));
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Category', 'Title', 'Stakeholder', 'Acceptance Criteria'];
    const rows = requirements.map(req => [
      req.category,
      req.title,
      req.stakeholder,
      req.acceptanceCriteria,
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'moscow-requirements.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex flex-col bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E8E8] px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={() => navigate('tools')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F5F5F5] transition-colors"
          >
            <ArrowLeft size={20} color="#0F2A71" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddForm(true)}
              className="h-10 px-4 bg-[#F5F5F5] rounded-[12px] flex items-center gap-2 hover:bg-[#E8E8E8] transition-colors"
            >
              <Plus size={16} color="#111" />
              <span style={{ fontSize: '14px', color: '#111' }}>Add</span>
            </button>
            <button
              onClick={handleExport}
              className="h-10 px-4 bg-[#0F2A71] text-white rounded-[12px] flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Download size={16} />
              <span style={{ fontSize: '14px' }}>Export</span>
            </button>
          </div>
        </div>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px', color: '#FFB800' }}>MoSCoW Requirements</h1>
          <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>Prioritize and manage requirements</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 scrollbar-hide">
        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-[16px] border border-[#E8E8E8] p-4 mb-4">
            <h2 className="mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>Add New Requirement</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Requirement Title"
                value={newReq.title}
                onChange={(e) => setNewReq({ ...newReq, title: e.target.value })}
                className="w-full h-10 px-3 border border-[#E8E8E8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0F2A71]"
                style={{ fontSize: '14px' }}
              />
              <input
                type="text"
                placeholder="Stakeholder"
                value={newReq.stakeholder}
                onChange={(e) => setNewReq({ ...newReq, stakeholder: e.target.value })}
                className="w-full h-10 px-3 border border-[#E8E8E8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0F2A71]"
                style={{ fontSize: '14px' }}
              />
              <textarea
                placeholder="Acceptance Criteria"
                value={newReq.acceptanceCriteria}
                onChange={(e) => setNewReq({ ...newReq, acceptanceCriteria: e.target.value })}
                className="w-full h-20 px-3 py-2 border border-[#E8E8E8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0F2A71] resize-none"
                style={{ fontSize: '14px' }}
              />
              <select
                value={newReq.category}
                onChange={(e) => setNewReq({ ...newReq, category: e.target.value as MoSCoWCategory })}
                className="w-full h-10 px-3 border border-[#E8E8E8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0F2A71]"
                style={{ fontSize: '14px' }}
              >
                {tabs.map(tab => (
                  <option key={tab} value={tab}>{tab}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={handleAddRequirement}
                  className="flex-1 h-10 bg-[#0F2A71] text-white rounded-[8px] hover:opacity-90"
                  style={{ fontSize: '14px' }}
                >
                  Add Requirement
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 h-10 bg-[#F5F5F5] rounded-[8px] hover:bg-[#E8E8E8]"
                  style={{ fontSize: '14px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Kanban Board */}
        <div className="grid grid-cols-1 gap-4">
          {tabs.map((category) => {
            const categoryReqs = requirements.filter(req => req.category === category);
            const colors = getTabColor(category);

            return (
              <div 
                key={category}
                className="bg-white rounded-[16px] border border-[#E8E8E8] p-4"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, category)}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colors.text }}
                    />
                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{category}</h3>
                    <span 
                      className="px-2 py-0.5 rounded-full text-white"
                      style={{ 
                        fontSize: '12px', 
                        fontWeight: 600,
                        backgroundColor: colors.text 
                      }}
                    >
                      {categoryReqs.length}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#6B6B6B] mb-3" style={{ fontSize: '12px' }}>
                  {category === 'Must Have' && 'Critical requirements that must be delivered.'}
                  {category === 'Should Have' && 'Important requirements that should be included.'}
                  {category === 'Could Have' && 'Desirable requirements that could improve the system.'}
                  {category === "Won't Have" && 'Requirements that will not be implemented this time.'}
                </p>

                {/* Requirements */}
                <div className="space-y-2 min-h-[100px]">
                  {categoryReqs.map((req) => (
                    <div
                      key={req.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, req.id)}
                      className="bg-white border border-[#E8E8E8] rounded-[12px] p-3 cursor-move hover:shadow-md transition-shadow"
                      style={{ borderLeftWidth: '4px', borderLeftColor: colors.text }}
                    >
                      <div className="flex items-start gap-2">
                        <GripVertical size={16} className="text-[#6B6B6B] mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-1" style={{ fontSize: '14px', fontWeight: 600 }}>
                            {req.title}
                          </h4>
                          <p className="text-[#6B6B6B] mb-2" style={{ fontSize: '12px' }}>
                            {req.stakeholder}
                          </p>
                          <div 
                            className="rounded-[8px] p-2"
                            style={{ backgroundColor: colors.bg }}
                          >
                            <p style={{ fontSize: '12px', color: '#111' }}>
                              {req.acceptanceCriteria}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteRequirement(req.id)}
                          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-red-50 text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="requirements" navigate={navigate} userRole={userRole} />
    </div>
  );
}