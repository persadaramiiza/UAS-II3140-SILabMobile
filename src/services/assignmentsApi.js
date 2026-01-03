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
  if (!assignmentId) throw new Error('Assignment ID is required');
  
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('id', assignmentId)
    .maybeSingle();

  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error('Assignment not found');
  }
  return data;
}

export async function getSubmissions(assignmentId, userId) {
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('assignment_id', assignmentId)
    .eq('student_id', userId);

  if (error) {
    throw error;
  }
  
  return data || [];
}

export async function createOrUpdateSubmission(assignmentId, userId, submissionData) {
    const { data, error } = await supabase
      .from('submissions')
      .upsert({
        assignment_id: assignmentId,
        student_id: userId,
        ...submissionData
      }, { onConflict: ['assignment_id', 'student_id'] });

    if (error) {
        throw error;
    }
    return data;
}

export async function createAssignment(assignmentData) {
  const { data, error } = await supabase
    .from('assignments')
    .insert([assignmentData])
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
}

export async function updateAssignment(assignmentId, assignmentData) {
  const { data, error } = await supabase
    .from('assignments')
    .update(assignmentData)
    .eq('id', assignmentId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
}

export async function deleteAssignment(assignmentId) {
  const { error } = await supabase
    .from('assignments')
    .delete()
    .eq('id', assignmentId);

  if (error) {
    throw error;
  }
  return true;
}

export async function getAllSubmissions(assignmentId) {
  const { data, error } = await supabase
    .from('submissions')
    .select(`
      *,
      profiles:student_id (
        name,
        nim
      )
    `)
    .eq('assignment_id', assignmentId)
    .order('submitted_at', { ascending: false });

  if (error) {
    throw error;
  }
  return data || [];
}
