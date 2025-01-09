// src/types/navigation.ts
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Note } from './note';

export type RootStackParamList = {
  NotesList: undefined;
  CreateNote: undefined;
  UpdateNote: {
    note: Note;
  };
};

export type NotesListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NotesList'
>;
