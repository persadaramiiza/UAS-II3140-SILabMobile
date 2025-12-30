import { apiFetch } from './apiClient';

export async function fetchCurrentUser() {
  const data = await apiFetch('/auth/me');
  return data?.user || null;
}

