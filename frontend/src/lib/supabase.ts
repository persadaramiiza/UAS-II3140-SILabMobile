import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
});

// Helper types for database schema
export type UserRole = 'student' | 'assistant' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string;
  nim?: string;
  role: UserRole;
  avatar_url?: string;
  phone?: string;
  class_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  due_date: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  attachment_url?: string;
  max_score: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  start_time: string;
  end_time: string;
  created_by: string;
  created_at: string;
  is_active: boolean;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'essay';
  options?: string[];
  correct_answer?: string;
  points: number;
  order_number: number;
}
