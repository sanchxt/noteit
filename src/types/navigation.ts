// src/types/navigation.ts
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  NotesList: undefined;
  CreateNote: undefined;
};

export type NotesListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NotesList'
>;
