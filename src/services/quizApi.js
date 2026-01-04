import { supabase } from './supabase';

// Helper to parse metadata stored in description
const parseQuizMetadata = (topic) => {
  if (!topic) return topic;
  try {
    // Check if description looks like JSON
    if (topic.description && (topic.description.startsWith('{') || topic.description.startsWith('['))) {
      const metadata = JSON.parse(topic.description);
      return {
        ...topic,
        ...metadata, // Spread metadata (start_time, end_time, duration, course)
        original_description: topic.description // Keep raw string just in case
      };
    }
  } catch (e) {
    // Not JSON, ignore
  }
  return topic;
};

export async function listQuizTopics({ includeQuestions = false, userId = null } = {}) {
  let query = supabase
    .from('quiz_topics')
    .select(includeQuestions ? '*,quiz_questions(*)' : '*');
  
  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;

  // If userId is provided, fetch submissions to check completion status
  let userSubmissions = [];
  if (userId) {
    const { data: submissions } = await supabase
      .from('submissions')
      .select('assignment_id, grade')
      .eq('student_id', userId);
    userSubmissions = submissions || [];
  }
  
  // Get question count for each topic
  const topicsWithCount = await Promise.all(
    data.map(async (topic) => {
      const { count } = await supabase
        .from('quiz_questions')
        .select('*', { count: 'exact', head: true })
        .eq('topic_id', topic.id);
      
      const submission = userSubmissions.find(s => s.assignment_id === topic.id);

      return parseQuizMetadata({
        ...topic,
        questionCount: count || 0,
        isSubmitted: !!submission,
        score: submission?.grade?.score
      });
    })
  );
  
  return topicsWithCount;
}

export async function getQuizTopic(topicId, { includeQuestions = true } = {}) {
  let query = supabase.from('quiz_topics').select(includeQuestions ? '*,quiz_questions(*)' : '*').eq('id', topicId).single();
  const { data, error } = await query;
  
  if (error) throw error;
  return parseQuizMetadata(data);
}

export async function createQuizTopic(payload) {
  const { data, error } = await supabase.from('quiz_topics').insert(payload).select().single();
  if (error) throw error;

  // Sync with assignments table to satisfy FK constraints in submissions
  try {
    await supabase.from('assignments').upsert({
      id: data.id,
      title: payload.title,
      description: 'Quiz Topic',
      focus: 'quiz'
    });
  } catch (e) {
    console.warn('Failed to sync quiz to assignments table:', e);
  }

  return data;
}

export async function updateQuizTopic(topicId, payload) {
  const { data, error } = await supabase.from('quiz_topics').update(payload).eq('id', topicId).select().single();
  if (error) throw error;

  // Sync update to assignments
  try {
    await supabase.from('assignments').update({
      title: payload.title
    }).eq('id', topicId);
  } catch (e) {
    // Ignore
  }

  return data;
}

export async function deleteQuizTopic(topicId) {
  // Delete from assignments first (if it exists) or after? 
  // FK is from submissions to assignments. 
  // If we delete quiz_topic, we might want to keep assignment record if submissions exist?
  // But usually we delete everything.
  // Let's try to delete from assignments too.
  try {
    await supabase.from('assignments').delete().eq('id', topicId);
  } catch (e) {
    // Ignore
  }

  const { error } = await supabase.from('quiz_topics').delete().eq('id', topicId);
  if (error) throw error;
  return true;
}

export async function listQuizQuestions(topicId) {
  const { data, error } = await supabase.from('quiz_questions').select('*').eq('topic_id', topicId);
  if (error) throw error;
  return data;
}

export async function createQuizQuestion(topicId, payload) {
  const { data, error } = await supabase.from('quiz_questions').insert({ ...payload, topic_id: topicId }).select().single();
  if (error) throw error;
  return data;
}

export async function updateQuizQuestion(questionId, payload) {
  const { data, error } = await supabase.from('quiz_questions').update(payload).eq('id', questionId).select().single();
  if (error) throw error;
  return data;
}

export async function deleteQuizQuestion(questionId) {
  const { error } = await supabase.from('quiz_questions').delete().eq('id', questionId);
  if (error) throw error;
  return true;
}

// Get quiz participation stats for a quiz topic
export async function getQuizParticipationStats(topicId) {
  try {
    // Get total student count
    const { count: totalStudents } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student');

    // Get submissions for this quiz
    const { data: submissions, error } = await supabase
      .from('submissions')
      .select('id, student_id, grade, submitted_at')
      .eq('assignment_id', topicId);

    if (error) throw error;

    const participationCount = submissions?.length || 0;
    
    // Calculate average score
    let totalScore = 0;
    let scoredCount = 0;
    submissions?.forEach(sub => {
      if (sub.grade && typeof sub.grade === 'object' && sub.grade.score !== undefined) {
        totalScore += sub.grade.score;
        scoredCount++;
      } else if (typeof sub.grade === 'number') {
        totalScore += sub.grade;
        scoredCount++;
      }
    });

    const averageScore = scoredCount > 0 ? Math.round(totalScore / scoredCount) : 0;

    return {
      totalStudents: totalStudents || 0,
      participationCount,
      averageScore,
      submissions: submissions || []
    };
  } catch (error) {
    console.error('Failed to get quiz stats:', error);
    return {
      totalStudents: 0,
      participationCount: 0,
      averageScore: 0,
      submissions: []
    };
  }
}

// Get all quiz attempts/submissions for a specific quiz
export async function getQuizAttempts(topicId) {
  const { data, error } = await supabase
    .from('submissions')
    .select(`
      id,
      student_id,
      student_name,
      submitted_at,
      grade,
      notes,
      users:student_id (
        id,
        name,
        student_id
      )
    `)
    .eq('assignment_id', topicId)
    .order('submitted_at', { ascending: false });

  if (error) throw error;
  return data || [];
}
