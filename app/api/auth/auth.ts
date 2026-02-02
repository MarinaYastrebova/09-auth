import { api } from '../api';

export interface User {
  id: string;
  email: string;
  // додайте інші поля, якщо є
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export const authApi = {
  login: async (data: LoginData): Promise<User> => {
    const response = await api.post<User>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getSession: async (): Promise<User | null> => {
    try {
      const response = await api.get<User>('/auth/session');
      return response.data;
    } catch {
      return null;
    }
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },

  updateMe: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch<User>('/users/me', data);
    return response.data;
  },
};
