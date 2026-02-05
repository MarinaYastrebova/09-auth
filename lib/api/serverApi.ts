import axios from 'axios';
import { cookies } from 'next/headers';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

const createServerApi = () => {
  const cookieStore = cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');

  return axios.create({
    baseURL,
    headers: {
      Cookie: cookieHeader,
    },
    withCredentials: true,
  });
};

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const api = createServerApi();
  const response = await api.get<FetchNotesResponse>('/notes', { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const api = createServerApi();
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const api = createServerApi();
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const api = createServerApi();
    const response = await api.get<User | null>('/auth/session');
    return response.data;
  } catch {
    return null;
  }
};
