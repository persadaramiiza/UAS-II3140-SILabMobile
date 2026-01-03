// Date formatting utilities
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '-';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Date(dateString).toLocaleDateString('id-ID', defaultOptions);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  
  return new Date(dateString).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Baru saja';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
  
  return formatDate(dateString);
};

// String utilities
export const truncate = (str, maxLength = 100) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Validation utilities
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Score/Grade utilities
export const getGradeColor = (score) => {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#f59e0b'; // yellow
  return '#ef4444'; // red
};

export const getGradeLetter = (score) => {
  if (score >= 85) return 'A';
  if (score >= 75) return 'B';
  if (score >= 65) return 'C';
  if (score >= 55) return 'D';
  return 'E';
};

// Role check utilities
export const isInstructor = (userProfile) => {
  return userProfile?.role === 'instructor' || userProfile?.role === 'admin';
};

export const isAdmin = (userProfile) => {
  return userProfile?.role === 'admin';
};

export const isAssistant = (userProfile) => {
  return userProfile?.role === 'assistant' || userProfile?.role === 'instructor';
};

export const isStudent = (userProfile) => {
  return userProfile?.role === 'student' || !userProfile?.role;
};

// Check if user can manage content (assistant, instructor, or admin)
export const canManageContent = (userProfile) => {
  const role = userProfile?.role;
  return role === 'assistant' || role === 'instructor' || role === 'admin';
};
