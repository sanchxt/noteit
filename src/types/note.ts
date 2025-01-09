export interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

export interface NotesState {
  notes: Note[];
  loading: boolean;
  error: null | string;
  selectedNotes: string[];
}
