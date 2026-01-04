import { supabase } from './supabase';

// Generate UUID v4
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

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
  // Check if submission already exists
  const { data: existing, error: checkError } = await supabase
    .from('submissions')
    .select('id')
    .eq('assignment_id', assignmentId)
    .eq('student_id', userId)
    .maybeSingle();

  if (checkError) {
    throw checkError;
  }

  let result;
  if (existing) {
    // Update existing submission
    const { data, error } = await supabase
      .from('submissions')
      .update({
        ...submissionData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single();
    
    if (error) throw error;
    result = data;
  } else {
    // Create new submission
    const { data, error } = await supabase
      .from('submissions')
      .insert({
        assignment_id: assignmentId,
        student_id: userId,
        ...submissionData,
      })
      .select()
      .single();
    
    if (error) throw error;
    result = data;
  }

  return result;
}

export async function createAssignment(assignmentData) {
  const { data, error } = await supabase
    .from('assignments')
    .insert([{ id: generateUUID(), ...assignmentData }])
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
        student_id
      )
    `)
    .eq('assignment_id', assignmentId)
    .order('submitted_at', { ascending: false });

  if (error) {
    throw error;
  }
  return data || [];
}

export async function getSubmissionFiles(submissionId) {
  const { data, error } = await supabase
    .from('submission_files')
    .select('*')
    .eq('submission_id', submissionId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  return data || [];
}
