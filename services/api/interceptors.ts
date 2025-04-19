import { AxiosInstance } from 'axios';

export const setupAuthInterceptor = (api: AxiosInstance) => {
  const updateToken = (token: string | null) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  };

  return {
    updateToken,
  };
}; 