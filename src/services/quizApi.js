import { supabase } from './supabase';

export async function listQuizTopics({ includeQuestions = false } = {}) {
  let query = supabase
    .from('quiz_topics')
    .select(includeQuestions ? '*,quiz_questions(*)' : '*');
  
  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  
  // Get question count for each topic
  const topicsWithCount = await Promise.all(
    data.map(async (topic) => {
      const { count } = await supabase
        .from('quiz_questions')
        .select('*', { count: 'exact', head: true })
        .eq('topic_id', topic.id);
      
      return {
        ...topic,
        questionCount: count || 0
      };
    })
  );
  
  return topicsWithCount;
}

export async function getQuizTopic(topicId, { includeQuestions = true } = {}) {
  let query = supabase.from('quiz_topics').select(includeQuestions ? '*,quiz_questions(*)' : '*').eq('id', topicId).single();
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
}

export async function createQuizTopic(payload) {
  const { data, error } = await supabase.from('quiz_topics').insert(payload).single();
  if (error) throw error;
  return data;
}

export async function updateQuizTopic(topicId, payload) {
  const { data, error } = await supabase.from('quiz_topics').update(payload).eq('id', topicId).single();
  if (error) throw error;
  return data;
}

export async function deleteQuizTopic(topicId) {
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
  const { data, error } = await supabase.from('quiz_questions').insert({ ...payload, topic_id: topicId }).single();
  if (error) throw error;
  return data;
}

export async function updateQuizQuestion(questionId, payload) {
  const { data, error } = await supabase.from('quiz_questions').update(payload).eq('id', questionId).single();
  if (error) throw error;
  return data;
}

export async function deleteQuizQuestion(questionId) {
  const { error } = await supabase.from('quiz_questions').delete().eq('id', questionId);
  if (error) throw error;
  return true;
}
