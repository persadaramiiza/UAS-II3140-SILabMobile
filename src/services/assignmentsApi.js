import { supabase } from './supabase';

export async function fetchAssignments(filters = {}) {
  let query = supabase.from('assignments').select('*');

  if (filters.focus) {
    query = query.eq('focus', filters.focus);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  return data;
}

export async function getAssignment(assignmentId) {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('id', assignmentId)
    .single();

  if (error) {
    throw error;
  }
  return data;
}

export async function getSubmissions(assignmentId, userId) {
  const { data, error } = await supabase
    .from('submissions')
    .select(`
      *,
      grades (
        id,
        score,
        feedback,
        created_at
      )
    `)
    .eq('assignment_id', assignmentId)
    .eq('user_id', userId);

  if (error) {
    throw error;
  }
  
  // Transform data to make grade easier to access
  return data.map(submission => ({
    ...submission,
    grade: submission.grades?.[0] || null
  }));
}

export async function createOrUpdateSubmission(assignmentId, userId, submissionData) {
    const { data, error } = await supabase
      .from('submissions')
      .upsert({
        assignment_id: assignmentId,
        user_id: userId,
        ...submissionData
      }, { onConflict: ['assignment_id', 'user_id'] });

    if (error) {
        throw error;
    }
    return data;
}
