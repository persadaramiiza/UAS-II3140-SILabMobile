import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Send, Trash2, Bell } from 'lucide-react';

interface EditAnnouncementProps {
  navigate: (screen: Screen) => void;
  announcementId?: string | null;
}

export default function EditAnnouncement({ navigate, announcementId }: EditAnnouncementProps) {
  // Pre-filled with existing data
  const [title, setTitle] = useState('Lab Session Schedule Update');
  const [content, setContent] = useState('Lab sessions for next week will be held on Tuesday and Thursday at 2 PM. Please make sure to attend on time.');
  const [priority, setPriority] = useState<'normal' | 'important'>('important');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = () => {
    console.log('Updating announcement:', { announcementId, title, content, priority });
    navigate('announcement-management');
  };

  const handleDelete = () => {
    console.log('Deleting announcement:', announcementId);
    navigate('announcement-management');
  };

  return (
    <div className="min-h-full bg-[#FAFAFA] flex flex-col">
      {/* Fixed Header */}
      <div 
        className="px-6 pt-12 pb-6 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #FBBC04 0%, #F59E0B 100%)'
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('announcement-management')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>
            Edit Announcement
          </h1>
        </div>
        <p className="text-white/90" style={{ fontSize: '14px' }}>
          Update announcement details
        </p>
      </div>

      {/* Scrollable Form */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6 pb-24">
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
              className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#FBBC04]"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
              Content *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter announcement content"
              rows={6}
              className="w-full px-4 py-3 bg-white border border-[#E8E8E8] rounded-[12px] resize-none focus:outline-none focus:border-[#FBBC04]"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Priority Selection */}
          <div>
            <label className="block mb-2 text-[#111]" style={{ fontSize: '14px', fontWeight: 600 }}>
              Priority *
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setPriority('normal')}
                className={`
                  flex-1 h-12 rounded-[12px] transition-all
                  ${priority === 'normal' 
                    ? 'bg-[#0F2A71] text-white' 
                    : 'bg-white border border-[#E8E8E8] text-[#6B6B6B]'
                  }
                `}
                style={{ fontSize: '16px', fontWeight: 600 }}
              >
                Normal
              </button>
              <button
                onClick={() => setPriority('important')}
                className={`
                  flex-1 h-12 rounded-[12px] transition-all flex items-center justify-center gap-2
                  ${priority === 'important' 
                    ? 'bg-[#EF4444] text-white' 
                    : 'bg-white border border-[#E8E8E8] text-[#6B6B6B]'
                  }
                `}
                style={{ fontSize: '16px', fontWeight: 600 }}
              >
                <Bell size={18} />
                Important
              </button>
            </div>
          </div>

          {/* Delete Button */}
          <div className="pt-4 border-t border-[#E8E8E8]">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full h-12 bg-[#FEF2F2] text-[#EF4444] rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#FEE2E2] transition-colors"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              <Trash2 size={18} />
              Delete Announcement
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigate('announcement-management')}
              className="flex-1 h-12 bg-[#F3F3F3] text-[#6B6B6B] rounded-[12px] hover:bg-[#E8E8E8] transition-colors"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={!title.trim() || !content.trim()}
              className="flex-1 h-12 bg-[#FBBC04] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              <Send size={18} />
              Update
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
                Delete Announcement?
              </h2>
              <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>
                This action cannot be undone. The announcement will be permanently removed.
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
