import { cookies } from 'next/headers';
import type { AxiosResponse } from 'axios';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { api } from './api';

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

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((cookie: { name: string; value: string }) => `${cookie.name}=${cookie.value}`)
    .join('; ');
};

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<FetchNotesResponse>(`/notes`, {
    params,
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<User>(`/users/me`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const checkSession = async (): Promise<AxiosResponse<User>> => {
  const cookieHeader = await getCookieHeader();

  return api.get<User>('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });
};

export const checkServerSession = async (): Promise<AxiosResponse<User>> => {
  const cookieStore = await cookies();

  return api.get<User>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};
