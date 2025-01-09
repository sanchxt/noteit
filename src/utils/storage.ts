import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import type { Note } from '../types/note';

const NOTES_STORAGE_KEY = '1922578';

type OperationType = 'save' | 'delete' | 'batchDelete' | 'update';

const showSuccessToast = (operation: OperationType) => {
  const messages = {
    save: 'Note saved successfully',
    delete: 'Note deleted successfully',
    batchDelete: 'Note(s) deleted successfully',
  };

  if (operation === 'update') return;

  Toast.show({
    type: 'success',
    text1: messages[operation],
    position: 'bottom',
    visibilityTime: 2000,
  });
};

export const saveNotesToStorage = async (
  notes: Note[],
  operation: OperationType = 'save',
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    showSuccessToast(operation);
    return true;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Failed to save notes',
      text2: error instanceof Error ? error.message : 'Unknown error occurred',
      position: 'bottom',
      visibilityTime: 3000,
    });
    return false;
  }
};

export const loadNotesFromStorage = async (): Promise<Note[]> => {
  try {
    const notes = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Failed to load notes',
      text2: error instanceof Error ? error.message : 'Unknown error occurred',
      position: 'bottom',
      visibilityTime: 3000,
    });
    return [];
  }
};
