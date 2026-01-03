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

export async function getAnnouncement(announcementId) {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('id', announcementId)
    .single();

  if (error) {
    throw error;
  }
  return data;
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

export async function updateAnnouncement(announcementId, payload) {
  const { data, error } = await supabase
    .from('announcements')
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq('id', announcementId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
}

export async function deleteAnnouncement(announcementId) {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', announcementId);

  if (error) {
    throw error;
  }
  return true;
}

export async function incrementViews(announcementId) {
  const { data: current } = await supabase
    .from('announcements')
    .select('views')
    .eq('id', announcementId)
    .single();

  const { error } = await supabase
    .from('announcements')
    .update({ views: (current?.views || 0) + 1 })
    .eq('id', announcementId);

  if (error) {
    throw error;
  }
  return true;
}
