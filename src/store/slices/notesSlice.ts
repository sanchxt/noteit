import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Note, NotesState } from '../../types/note';
import { saveNotesToStorage, loadNotesFromStorage } from '../../utils/storage';

export const loadNotes = createAsyncThunk('notes/loadNotes', async () => {
  const notes = await loadNotesFromStorage();
  return notes;
});

export const saveNote = createAsyncThunk(
  'notes/saveNote',
  async (note: Omit<Note, 'id' | 'timestamp'>, { getState, dispatch }) => {
    const newNote = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...note,
    };
    dispatch(addNote(newNote));

    const state = getState() as { notes: NotesState };
    await saveNotesToStorage(state.notes.notes, 'save');
    return newNote;
  },
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (noteId: string, { getState, dispatch }) => {
    dispatch(removeNote(noteId));
    const state = getState() as { notes: NotesState };
    await saveNotesToStorage(state.notes.notes, 'delete');
    return noteId;
  },
);

export const deleteBatchNotes = createAsyncThunk(
  'notes/deleteBatchNotes',
  async (noteIds: string[], { getState, dispatch }) => {
    dispatch(removeMultipleNotes(noteIds));
    const state = getState() as { notes: NotesState };
    await saveNotesToStorage(state.notes.notes, 'batchDelete');
    return noteIds;
  },
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (updatedNote: Note, { getState, dispatch }) => {
    dispatch(modifyNote(updatedNote));
    const state = getState() as { notes: NotesState };
    await saveNotesToStorage(state.notes.notes, 'update');
    return updatedNote;
  },
);

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
  selectedNotes: [] as string[],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    removeMultipleNotes: (state, action: PayloadAction<string[]>) => {
      state.notes = state.notes.filter(
        note => !action.payload.includes(note.id),
      );
      state.selectedNotes = [];
    },
    toggleNoteSelection: (state, action: PayloadAction<string>) => {
      const noteId = action.payload;
      if (state.selectedNotes.includes(noteId))
        state.selectedNotes = state.selectedNotes.filter(id => id !== noteId);
      else state.selectedNotes.push(noteId);
    },
    clearSelectedNotes: state => {
      state.selectedNotes = [];
    },
    modifyNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        note => note.id === action.payload.id,
      );
      if (index !== -1) {
        state.notes[index] = {
          ...state.notes[index],
          ...action.payload,
          timestamp: new Date().toISOString(),
        };
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadNotes.pending, state => {
        state.loading = true;
      })
      .addCase(loadNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(loadNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load notes';
      });
  },
});

export const {
  addNote,
  setNotes,
  removeNote,
  removeMultipleNotes,
  toggleNoteSelection,
  clearSelectedNotes,
  modifyNote,
} = notesSlice.actions;
export default notesSlice.reducer;
