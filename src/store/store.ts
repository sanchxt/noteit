import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
