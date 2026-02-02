import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

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

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`/notes`, { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<CreateNoteResponse> => {
  const response = await axios.post<CreateNoteResponse>(`/notes`, noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response = await axios.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
};
