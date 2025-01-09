import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Theme, ThemeState } from '../../types/theme';

const THEME_STORAGE_KEY = 'app_theme';

const initialState: ThemeState = {
  theme: 'light',
};

export const loadTheme = createAsyncThunk('theme/load', async () => {
  const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
  return (savedTheme as Theme) || 'light';
});

export const toggleTheme = createAsyncThunk(
  'theme/toggle',
  async (_, { getState }) => {
    const state = getState() as { theme: ThemeState };
    const newTheme = state.theme.theme === 'light' ? 'dark' : 'light';
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    return newTheme;
  },
);

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      })
      .addCase(toggleTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      });
  },
});

export default themeSlice.reducer;
