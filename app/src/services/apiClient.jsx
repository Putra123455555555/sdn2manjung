import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await apiClient.get('/api/auth/token', { withCredentials: true });
        const newAccessToken = data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        if (window.location.pathname !== '/auth/login') {
          localStorage.removeItem('accessToken');
          window.location.href = '/auth/login';
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
