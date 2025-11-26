import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

// Posts API
export const postsApi = {
  getAll: (tag?: string) => api.get('/posts', { params: { tag } }),
  getOne: (id: string) => api.get(`/posts/${id}`),
  getRelated: (id: string) => api.get(`/posts/${id}/related`),
  getAllTags: () => api.get('/posts/tags/all'),
  create: (data: { title: string; content: string; published?: boolean; tags?: string[]; coverImage?: string }) =>
    api.post('/posts', data),
  update: (id: string, data: { title?: string; content?: string; published?: boolean; tags?: string[]; coverImage?: string }) =>
    api.put(`/posts/${id}`, data),
  toggleLike: (id: string) => api.post(`/posts/${id}/like`),
  delete: (id: string) => api.delete(`/posts/${id}`),
};

export default api;
