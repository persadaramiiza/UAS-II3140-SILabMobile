import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react';
import { Screen, UserRole } from '../App';

interface EditProfileScreenProps {
  navigate: (screen: Screen) => void;
  userRole: UserRole;
}

export default function EditProfileScreen({ navigate, userRole }: EditProfileScreenProps) {
  // Mock current user data
  const [formData, setFormData] = useState({
    name: 'Persada R',
    email: 'ahmad.fauzan@students.itb.ac.id',
    studentId: '18223033',
    phone: '+62 812 3456 7890',
    address: 'Bandung, Indonesia',
    bio: 'Information Systems student passionate about software engineering and system analysis.',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('profile');
    }, 1000);
  };

  return (
    <div className="min-h-full bg-[#FAFAFA] pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-[var(--brand-divider)]">
        <div className="flex items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate('profile')}
            className="p-2 -ml-2 hover:bg-[var(--brand-surface)] rounded-[8px] transition-colors"
          >
            <ArrowLeft size={20} className="text-[var(--text-primary)]" />
          </button>
          <h2 className="text-[var(--text-primary)]">Edit Profile</h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Photo Section */}
        <div className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-[var(--brand-blue)] flex items-center justify-center">
                <User size={40} className="text-white" strokeWidth={2} />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--brand-blue)] rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
                <Camera size={16} className="text-white" />
              </button>
            </div>
            <p className="text-caption text-[var(--text-secondary)]">
              Click camera icon to change photo
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-6">
          <h3 className="mb-4">Basic Information</h3>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-label text-[var(--text-secondary)] mb-2">
              Full Name
            </label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-12 pl-12 pr-4 bg-[var(--brand-surface)] border border-transparent rounded-[12px] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:bg-white"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-label text-[var(--text-secondary)] mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-12 pl-12 pr-4 bg-[var(--brand-surface)] border border-transparent rounded-[12px] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:bg-white"
              />
            </div>
          </div>

          {/* Student ID (disabled for students) */}
          {userRole === 'student' && (
            <div className="mb-4">
              <label className="block text-label text-[var(--text-secondary)] mb-2">
                Student ID
              </label>
              <input
                type="text"
                value={formData.studentId}
                disabled
                className="w-full h-12 px-4 bg-[var(--brand-divider)] border border-transparent rounded-[12px] text-[var(--text-disabled)] cursor-not-allowed"
              />
              <p className="text-label text-[var(--text-secondary)] mt-1">
                Student ID cannot be changed
              </p>
            </div>
          )}

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-label text-[var(--text-secondary)] mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-12 pl-12 pr-4 bg-[var(--brand-surface)] border border-transparent rounded-[12px] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:bg-white"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-label text-[var(--text-secondary)] mb-2">
              Address
            </label>
            <div className="relative">
              <MapPin size={18} className="absolute left-4 top-4 text-[var(--text-secondary)]" />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full h-12 pl-12 pr-4 bg-[var(--brand-surface)] border border-transparent rounded-[12px] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-6">
          <h3 className="mb-4">Bio</h3>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            maxLength={200}
            className="w-full p-4 bg-[var(--brand-surface)] border border-transparent rounded-[12px] text-[var(--text-primary)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:bg-white"
            placeholder="Write a short bio about yourself..."
          />
          <p className="text-label text-[var(--text-secondary)] mt-2">
            {formData.bio.length}/200 characters
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full h-12 bg-[var(--brand-blue)] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => navigate('profile')}
          className="w-full h-12 bg-white border border-[var(--brand-divider)] text-[var(--text-primary)] rounded-[12px] hover:bg-[var(--brand-surface)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
