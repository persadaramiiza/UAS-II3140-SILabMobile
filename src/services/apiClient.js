import AsyncStorage from '@react-native-async-storage/async-storage';

// GANTI IP INI SESUAI KONDISI:
// - Emulator Android Studio: 'http://10.0.2.2:4000/api'
// - HP Fisik (USB/Wifi): 'http://192.168.X.X:4000/api' (Cek IP Laptopmu)
const BASE_URL = 'http://10.0.2.2:4000/api'; 

async function getAuthToken() {
  try {
    return await AsyncStorage.getItem('isl-token');
  } catch (e) {
    return null;r
  }
}

export async function apiFetch(path, { method = 'GET', body, headers } = {}) {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  
  const token = await getAuthToken();
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...headers,
  };

  const options = {
    method,
    headers: defaultHeaders,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Terjadi kesalahan server');
    }

    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function saveToken(token) {
  await AsyncStorage.setItem('isl-token', token);
}

export async function removeToken() {
  await AsyncStorage.removeItem('isl-token');
}