import { useState } from 'react';
import { Screen } from '../App';
import { Plus, Bell, Calendar, Users, Edit2, Trash2, Send } from 'lucide-react';

interface AnnouncementManagementProps {
  navigate: (screen: Screen, data?: any) => void;
}

export default function AnnouncementManagement({ navigate }: AnnouncementManagementProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'normal' | 'important'>('normal');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null);

  // Mock announcements data
  const announcements = [
    {
      id: '1',
      title: 'Lab Session Schedule Update',
      content: 'Lab sessions for next week will be held on Tuesday and Thursday at 2 PM. Please make sure to attend on time.',
      date: 'Dec 25, 2025',
      priority: 'important' as const,
      views: 38,
    },
    {
      id: '2',
      title: 'New Assignment Posted',
      content: 'Database ERD Assignment has been posted. Due date is December 28, 2025.',
      date: 'Dec 22, 2025',
      priority: 'normal' as const,
      views: 42,
    },
    {
      id: '3',
      title: 'Office Hours Reminder',
      content: 'Office hours are available every Monday and Wednesday from 1-3 PM at Lab 1.',
      date: 'Dec 20, 2025',
      priority: 'normal' as const,
      views: 35,
    },
  ];

  const handlePublish = () => {
    // Handle publish logic
    console.log('Publishing announcement:', { title, content, priority });
    setShowCreateForm(false);
    setTitle('');
    setContent('');
    setPriority('normal');
  };

  const handleDelete = (id: string) => {
    // Handle delete logic
    console.log('Deleting announcement:', id);
    setShowDeleteConfirm(false);
    setSelectedAnnouncementId(null);
  };

  return (
    <div className="min-h-full bg-[#FAFAFA] flex flex-col pb-24">
      {/* Header */}
      <div 
        className="px-6 pt-12 pb-6 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #FBBC04 0%, #F59E0B 100%)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>
            Announcements
          </h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Plus size={20} className="text-[#FBBC04]" />
          </button>
        </div>
        <p className="text-white/90" style={{ fontSize: '14px' }}>
          Create and manage announcements for students
        </p>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white border-b border-[#E8E8E8] px-6 py-4 flex-shrink-0">
          <h2 className="mb-4" style={{ fontSize: '18px', fontWeight: 700 }}>
            New Announcement
          </h2>
          
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block mb-2 text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
                className="w-full h-12 px-4 border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#FBBC04]"
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block mb-2 text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter announcement content"
                rows={4}
                className="w-full px-4 py-3 border border-[#E8E8E8] rounded-[12px] resize-none focus:outline-none focus:border-[#FBBC04]"
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* Priority Selection */}
            <div>
              <label className="block mb-2 text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                Priority
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setPriority('normal')}
                  className={`
                    flex-1 h-12 rounded-[12px] transition-all
                    ${priority === 'normal' 
                      ? 'bg-[#0F2A71] text-white' 
                      : 'bg-[#F3F3F3] text-[#6B6B6B]'
                    }
                  `}
                  style={{ fontSize: '16px' }}
                >
                  Normal
                </button>
                <button
                  onClick={() => setPriority('important')}
                  className={`
                    flex-1 h-12 rounded-[12px] transition-all
                    ${priority === 'important' 
                      ? 'bg-[#EF4444] text-white' 
                      : 'bg-[#F3F3F3] text-[#6B6B6B]'
                    }
                  `}
                  style={{ fontSize: '16px' }}
                >
                  Important
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 h-12 bg-[#F3F3F3] text-[#6B6B6B] rounded-[12px] hover:bg-[#E8E8E8] transition-colors"
                style={{ fontSize: '16px' }}
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                disabled={!title.trim() || !content.trim()}
                className="flex-1 h-12 bg-[#FBBC04] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: '16px' }}
              >
                <Send size={18} />
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4">
        {announcements.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto mb-4 text-[#E8E8E8]" />
            <p className="text-[#6B6B6B]" style={{ fontSize: '16px' }}>
              No announcements yet
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-4 px-6 h-12 bg-[#FBBC04] text-white rounded-[12px] hover:opacity-90 transition-opacity"
            >
              Create Announcement
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`
                  bg-white border rounded-[16px] p-4
                  ${announcement.priority === 'important' 
                    ? 'border-[#EF4444]' 
                    : 'border-[#E8E8E8]'
                  }
                `}
              >
                {/* Priority Badge */}
                {announcement.priority === 'important' && (
                  <div className="mb-3">
                    <span 
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#FEF2F2] text-[#EF4444] rounded-full"
                      style={{ fontSize: '12px', fontWeight: 600 }}
                    >
                      <Bell size={14} />
                      Important
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                      {announcement.title}
                    </h3>
                    <p className="text-[#6B6B6B] mb-3" style={{ fontSize: '14px' }}>
                      {announcement.content}
                    </p>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E8E8E8]">
                  <div className="flex items-center gap-4 text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {announcement.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      {announcement.views} views
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate('edit-announcement', { announcementId: announcement.id })}
                      className="w-8 h-8 bg-[#F3F3F3] rounded-lg flex items-center justify-center hover:bg-[#E8E8E8] transition-colors"
                    >
                      <Edit2 size={16} className="text-[#0F2A71]" />
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(true);
                        setSelectedAnnouncementId(announcement.id);
                      }}
                      className="w-8 h-8 bg-[#FEF2F2] rounded-lg flex items-center justify-center hover:bg-[#FEE2E2] transition-colors"
                    >
                      <Trash2 size={16} className="text-[#EF4444]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this announcement?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 h-12 bg-[#F3F3F3] text-[#6B6B6B] rounded-[12px] hover:bg-[#E8E8E8] transition-colors"
                style={{ fontSize: '16px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedAnnouncementId!)}
                className="flex-1 h-12 bg-[#EF4444] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ fontSize: '16px' }}
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