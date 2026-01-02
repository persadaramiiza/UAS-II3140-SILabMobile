import { useEffect, useState } from 'react';
import { supabase, Announcement } from '../lib/supabase';

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createAnnouncement = async (announcement: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .insert(announcement)
        .select()
        .single();

      if (error) throw error;
      setAnnouncements(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  };

  const updateAnnouncement = async (id: string, updates: Partial<Announcement>) => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setAnnouncements(prev => prev.map(a => a.id === id ? data : a));
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setAnnouncements(prev => prev.filter(a => a.id !== id));
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  return {
    announcements,
    loading,
    error,
    fetchAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  };
}
