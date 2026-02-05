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

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((cookie: { name: string; value: string }) => `${cookie.name}=${cookie.value}`)
    .join('; ');
};

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const cookieHeader = await getCookieHeader();

  const response = await axios.get<FetchNotesResponse>(`${baseURL}/notes`, {
    params,
    headers: {
      Cookie: cookieHeader,
    },
    withCredentials: true,
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const response = await axios.get<Note>(`${baseURL}/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
    withCredentials: true,
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const response = await axios.get<User>(`${baseURL}/users/me`, {
    headers: {
      Cookie: cookieHeader,
    },
    withCredentials: true,
  });

  return response.data;
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const cookieHeader = await getCookieHeader();

    const response = await axios.get<User>(`${baseURL}/auth/session`, {
      headers: {
        Cookie: cookieHeader,
      },
      withCredentials: true,
    });

    return response.data || null;
  } catch {
    return null;
  }
};
