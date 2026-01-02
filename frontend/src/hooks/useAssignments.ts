import { useEffect, useState } from 'react';
import { supabase, Assignment } from '../lib/supabase';

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;
      setAssignments(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createAssignment = async (assignment: Omit<Assignment, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .insert(assignment)
        .select()
        .single();

      if (error) throw error;
      setAssignments(prev => [...prev, data]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  };

  const updateAssignment = async (id: string, updates: Partial<Assignment>) => {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setAssignments(prev => prev.map(a => a.id === id ? data : a));
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  };

  const deleteAssignment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setAssignments(prev => prev.filter(a => a.id !== id));
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  return {
    assignments,
    loading,
    error,
    fetchAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
