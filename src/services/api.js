import axios from 'axios';

// Base URL for the API
const BASE_URL = 'https://kcb-boma-yangu-backend-kcb-boma-yangu.apps.dev.aro.kcbgroup.com/api';

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Basic Auth credentials for login endpoint
const BASIC_AUTH_HEADER = 'Basic Qm9tYVBvcnRhbENsaWVudDpjYmZiZDBhYi0yODc2LTQ0MmItYTNjOC04YWVkOTYzMmJhODM=';

// Request interceptor to add Authorization header with JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  // Add Basic Auth for login requests
  if (config.url === '/users/login') {
    config.headers['Authorization'] = BASIC_AUTH_HEADER;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Function to perform login
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, null, {
      auth: {
        username: 'BomaPortalClient',
        password: 'cbfbd0ab-2876-442b-a3c8-8aed9632ba83'
      }
    });
    if (response.data && response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Function to perform logout
export const logout = async () => {
  try {
    await api.post('/users/logOut');
    localStorage.removeItem('jwtToken');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

// Function to list all users
export const listUsers = async () => {
  try {
    const response = await api.post('/users/listAll');
    return response.data;
  } catch (error) {
    console.error('Failed to list users:', error);
    throw error;
  }
};

// Function to create a new user
export const createUser = async (payload) => {
  try {
    const response = await api.post('/users/create', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

// Function to edit an existing user
export const editUser = async (payload) => {
  try {
    const response = await api.post('/users/edit', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to edit user:', error);
    throw error;
  }
};

// Function to search users
export const searchUsers = async (searchTerm) => {
  try {
    const response = await api.post('/users/search', { searchTerm });
    return response.data;
  } catch (error) {
    console.error('Failed to search users:', error);
    throw error;
  }
};

export default api;
