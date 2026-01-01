import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, FileText, Plus, X, Trash2 } from 'lucide-react';

interface EditAssignmentProps {
  navigate: (screen: Screen) => void;
  assignmentId?: string;
}

export default function EditAssignment({ navigate, assignmentId }: EditAssignmentProps) {
  // Pre-filled with existing data
  const [title, setTitle] = useState('Database ERD Assignment');
  const [course, setCourse] = useState('Database Systems');
  const [dueDate, setDueDate] = useState('2025-12-28');
  const [dueTime, setDueTime] = useState('23:59');
  const [maxPoints, setMaxPoints] = useState('100');
  const [description, setDescription] = useState('Create a complete Entity-Relationship Diagram (ERD) for a library management system. Include all entities, attributes, relationships, and cardinalities.');
  const [attachments, setAttachments] = useState<string[]>(['Requirements.pdf', 'Template.pdf']);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const courses = [
    'Database Systems',
    'Software Engineering',
    'System Analysis & Design',
    'Enterprise Architecture',
    'Data Structures',
  ];

  const handleUpdate = () => {
    console.log('Updating assignment:', { title, course, dueDate, dueTime, maxPoints, description });
    navigate('assignment-management');
  };

  const handleDelete = () => {
    console.log('Deleting assignment:', assignmentId);
    navigate('assignment-management');
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
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
            Edit Assignment
          </h1>
        </div>
        <p className="text-white/70" style={{ fontSize: '14px' }}>
          Update assignment details
        </p>
      </div>

      {/* Scrollable Form */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6 pb-24">
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
              Assignment Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter assignment title"
              className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#0F2A71]"
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
              className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#0F2A71]"
              style={{ fontSize: '16px' }}
            >
              <option value="">Select course</option>
              {courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Due Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                Due Date *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#0F2A71]"
                style={{ fontSize: '16px' }}
              />
            </div>
            <div>
              <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
                Due Time *
              </label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#0F2A71]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Max Points */}
          <div>
            <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
              Maximum Points *
            </label>
            <input
              type="number"
              value={maxPoints}
              onChange={(e) => setMaxPoints(e.target.value)}
              placeholder="100"
              className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#0F2A71]"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter assignment description and requirements"
              rows={6}
              className="w-full px-4 py-3 bg-white border border-[#E8E8E8] rounded-[12px] resize-none focus:outline-none focus:border-[#0F2A71]"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
              Attachments (Optional)
            </label>
            <button
              className="w-full h-12 bg-white border border-dashed border-[#0F2A71] rounded-[12px] flex items-center justify-center gap-2 text-[#0F2A71] hover:bg-[#F0F4FF] transition-colors"
              style={{ fontSize: '14px', fontWeight: 600 }}
            >
              <Plus size={18} />
              Add File
            </button>
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white border border-[#E8E8E8] rounded-[12px]">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-[#0F2A71]" />
                      <span style={{ fontSize: '14px' }}>{file}</span>
                    </div>
                    <button onClick={() => removeAttachment(index)} className="text-[#EF4444]">
                      <X size={18} />
                    </button>
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
              Delete Assignment
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigate('assignment-management')}
              className="flex-1 h-12 bg-[#F3F3F3] text-[#6B6B6B] rounded-[12px] hover:bg-[#E8E8E8] transition-colors"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={!title.trim() || !course || !dueDate || !dueTime || !description.trim()}
              className="flex-1 h-12 bg-[#0F2A71] text-white rounded-[12px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              Update Assignment
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white w-full max-w-[350px] rounded-[24px] p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} className="text-[#EF4444]" />
              </div>
              <h2 className="mb-2" style={{ fontSize: '20px', fontWeight: 700 }}>
                Delete Assignment?
              </h2>
              <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                This action cannot be undone. All student submissions will be permanently deleted.
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
                onClick={handleDelete}
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
