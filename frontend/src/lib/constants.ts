export const APP_NAME = 'SILab Suite';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  SPLASH: '/splash',
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/home',
  TASKS: '/tasks',
  QUIZ_LIST: '/quiz-list',
  TOOLS: '/tools',
  PROFILE: '/profile',
  ASSISTANT: '/assistant',
  ADMIN: '/admin',
} as const;

export const USER_ROLES = {
  STUDENT: 'student',
  ASSISTANT: 'assistant',
  ADMIN: 'admin',
} as const;

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export const PRIORITY_COLORS = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
} as const;

export const QUIZ_STATUS = {
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
} as const;

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TRUE_FALSE: 'true_false',
  ESSAY: 'essay',
} as const;

export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
} as const;

export const DATE_FORMATS = {
  DISPLAY: 'dd MMMM yyyy',
  DISPLAY_WITH_TIME: 'dd MMMM yyyy, HH:mm',
  INPUT: 'yyyy-MM-dd',
  INPUT_WITH_TIME: "yyyy-MM-dd'T'HH:mm",
} as const;

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;
