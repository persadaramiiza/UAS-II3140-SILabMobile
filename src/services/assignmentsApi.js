import { apiFetch } from './apiClient';

function mapAssignment(raw) {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description || '',
    focus: raw.focus || 'General',
    createdAt: raw.createdAt || raw.created_at || null,
    updatedAt: raw.updatedAt || raw.updated_at || null
  };
}

export async function fetchAssignments() {
  // Calls the same Express route your web app uses → which then talks to Supabase
  const data = await apiFetch('/assignments');
  return Array.isArray(data.assignments) ? data.assignments.map(mapAssignment) : [];
}


