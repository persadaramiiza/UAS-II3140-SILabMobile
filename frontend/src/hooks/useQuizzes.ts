import { useEffect, useState } from 'react';
import { supabase, Quiz } from '../lib/supabase';

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('start_time', { ascending: false });

      if (error) throw error;
      setQuizzes(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createQuiz = async (quiz: Omit<Quiz, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .insert(quiz)
        .select()
        .single();

      if (error) throw error;
      setQuizzes(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  };

  const updateQuiz = async (id: string, updates: Partial<Quiz>) => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setQuizzes(prev => prev.map(q => q.id === id ? data : q));
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  };

  const deleteQuiz = async (id: string) => {
    try {
      const { error } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setQuizzes(prev => prev.filter(q => q.id !== id));
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const getActiveQuizzes = () => {
    const now = new Date();
    return quizzes.filter(quiz => {
      const start = new Date(quiz.start_time);
      const end = new Date(quiz.end_time);
      return quiz.is_active && now >= start && now <= end;
    });
  };

  const getUpcomingQuizzes = () => {
    const now = new Date();
    return quizzes.filter(quiz => {
      const start = new Date(quiz.start_time);
      return quiz.is_active && now < start;
    });
  };

  const getCompletedQuizzes = () => {
    const now = new Date();
    return quizzes.filter(quiz => {
      const end = new Date(quiz.end_time);
      return now > end || !quiz.is_active;
    });
  };

  return {
    quizzes,
    loading,
    error,
    fetchQuizzes,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getActiveQuizzes,
    getUpcomingQuizzes,
    getCompletedQuizzes,
  };
}
