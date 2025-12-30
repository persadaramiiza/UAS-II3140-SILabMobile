import { apiFetch } from './apiClient';

export async function listQuizTopics({ includeQuestions = false } = {}) {
  const params = includeQuestions ? '?includeQuestions=1' : '';
  const data = await apiFetch(`/quizzes/topics${params}`);
  return Array.isArray(data.topics) ? data.topics : [];
}

export async function getQuizTopic(topicId, { includeQuestions = true } = {}) {
  const params = includeQuestions ? '?includeQuestions=1' : '';
  const data = await apiFetch(`/quizzes/topics/${topicId}${params}`);
  return data.topic;
}

export async function createQuizTopic(payload) {
  const data = await apiFetch('/quizzes/topics', {
    method: 'POST',
    body: payload
  });
  return data.topic;
}

export async function updateQuizTopic(topicId, payload) {
  const data = await apiFetch(`/quizzes/topics/${topicId}`, {
    method: 'PUT',
    body: payload
  });
  return data.topic;
}

export async function deleteQuizTopic(topicId) {
  await apiFetch(`/quizzes/topics/${topicId}`, { method: 'DELETE' });
}

export async function listQuizQuestions(topicId) {
  const data = await apiFetch(`/quizzes/topics/${topicId}/questions`);
  return Array.isArray(data.questions) ? data.questions : [];
}

export async function createQuizQuestion(topicId, payload) {
  const data = await apiFetch(`/quizzes/topics/${topicId}/questions`, {
    method: 'POST',
    body: payload
  });
  return data.question;
}

export async function updateQuizQuestion(topicId, questionId, payload) {
  const data = await apiFetch(`/quizzes/topics/${topicId}/questions/${questionId}`, {
    method: 'PUT',
    body: payload
  });
  return data.question;
}

export async function deleteQuizQuestion(topicId, questionId) {
  await apiFetch(`/quizzes/topics/${topicId}/questions/${questionId}`, {
    method: 'DELETE'
  });
}

