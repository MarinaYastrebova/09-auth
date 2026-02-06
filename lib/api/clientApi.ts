import { api } from './api';
import type { Note, NoteTag } from '../../types/note';
import type { User } from '@/types/user';

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

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface CreateNoteResponse {
  note: Note;
}

export interface DeleteNoteResponse {
  note: Note;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

type CheckSessionResponse = {
  success: boolean;
};

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<CreateNoteResponse> => {
  const response = await api.post<CreateNoteResponse>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response = await api.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
};

export const register = async (data: RegisterData): Promise<User> => {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginData): Promise<User> => {
  const response = await api.post<User>('/auth/login', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await api.get<CheckSessionResponse>('/auth/session');
    return res.data.success;
  } catch {
    return false;
  }
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const updateMe = async (data: { username: string }): Promise<User> => {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
};
