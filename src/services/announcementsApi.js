import { supabase } from './supabase';

export async function fetchAnnouncements() {
  const { data, error } = await supabase
    .from('announcements')
    .select(`
      *,
      users:created_by (
        id,
        name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  
  // Transform data to include createdByName
  return data.map(announcement => ({
    ...announcement,
    createdByName: announcement.users?.name || 'Unknown'
  }));
}

export async function createAnnouncement(payload) {
  const { data, error } = await supabase
    .from('announcements')
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
}
