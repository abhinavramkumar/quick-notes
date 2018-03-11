// @ts-check
export interface Filters {
  text: string;
  sortOrder: string;
  sortBy: string;
}

export interface FiltersAction {
  type: string;
  text?: string;
  sortOrder?: string;
  sortBy?: string;
}

export interface Note {
  id?: string;
  publicId?: string;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  noteColorDark?: string;
  noteColorLight?: string;
}

export interface NotesAction {
  type: string;
  note?: Note;
  id?: string;
  notes?: Array<Note>;
}
