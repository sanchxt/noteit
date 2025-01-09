import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { toggleTheme } from '../store/slices/themeSlice';
import type { NotesListNavigationProp } from '../types/navigation';
import type { RootState } from '../store/store';
import type { Note } from '../types/note';
import {
  deleteBatchNotes,
  deleteNote,
  toggleNoteSelection,
} from '../store/slices/notesSlice';
import type { AppDispatch } from '../store/store';

export const NotesList = () => {
  const navigation = useNavigation<NotesListNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const selectedNotes = useSelector(
    (state: RootState) => state.notes.selectedNotes,
  );
  const theme = useSelector((state: RootState) => state.theme.theme);

  const confirmSingleDelete = (noteId: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteNote(noteId)),
        },
      ],
      { cancelable: true },
    );
  };

  const confirmBatchDelete = () => {
    if (selectedNotes.length === 0) return;

    Alert.alert(
      'Delete Notes',
      `Are you sure you want to delete ${selectedNotes.length} note${
        selectedNotes.length > 1 ? 's' : ''
      }?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteBatchNotes(selectedNotes)),
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('UpdateNote', { note: item })}
      className={`p-4 rounded-lg mb-3 border ${
        theme === 'light'
          ? 'bg-light-background border-light-border'
          : 'bg-dark-background border-dark-border'
      }`}>
      <View className="flex-1">
        <Text
          className={`text-lg font-semibold mb-2 ${
            theme === 'light'
              ? 'text-light-text-primary'
              : 'text-dark-text-primary'
          }`}
          numberOfLines={1}>
          {item.title || 'Untitled'}
        </Text>
        <Text
          className={`text-sm mb-2 ${
            theme === 'light'
              ? 'text-light-text-secondary'
              : 'text-dark-text-secondary'
          }`}
          numberOfLines={2}>
          {item.content}
        </Text>
        <Text
          className={`text-xs ${
            theme === 'light'
              ? 'text-light-text-tertiary'
              : 'text-dark-text-tertiary'
          }`}>
          {new Date(item.timestamp).toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        className="absolute top-2 right-2 p-2"
        onPress={e => {
          e.stopPropagation();
          dispatch(toggleNoteSelection(item.id));
        }}>
        <Icon
          name={
            selectedNotes.includes(item.id)
              ? 'checkbox'
              : 'close-circle-outline'
          }
          size={24}
          color={
            selectedNotes.includes(item.id)
              ? `${theme === 'light' ? '#007AFF' : '#0A84FF'}`
              : `${theme === 'light' ? '#FF3B30' : '#FF453A'}`
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderHiddenItem = ({ item }: { item: Note }) => (
    <View
      className={`flex-1 flex-row justify-between items-center ${
        theme === 'light' ? 'bg-light-surface' : 'bg-dark-surface'
      } rounded-lg mb-3`}>
      <TouchableOpacity
        className={`absolute right-0 top-0 bottom-0 w-[75px] items-center justify-center ${
          theme === 'light' ? 'bg-light-error' : 'bg-dark-error'
        } rounded-r-lg`}
        onPress={() => confirmSingleDelete(item.id)}>
        <Text className="text-white font-semibold">Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center">
      <Text
        className={`text-xl font-semibold mb-2 ${
          theme === 'light'
            ? 'text-light-text-secondary'
            : 'text-dark-text-secondary'
        }`}>
        No notes yet
      </Text>
      <Text
        className={`text-base ${
          theme === 'light'
            ? 'text-light-text-tertiary'
            : 'text-dark-text-tertiary'
        } text-center px-8`}>
        Tap the + button to create your first note
      </Text>
    </View>
  );

  return (
    <View
      className={`flex-1 ${
        theme === 'light' ? 'bg-light-background' : 'bg-dark-background'
      }`}>
      {selectedNotes.length > 0 && (
        <View
          className={`flex-row justify-between items-center p-4 border-b ${
            theme === 'light'
              ? 'bg-light-surface border-light-border'
              : 'bg-dark-surface border-dark-border'
          }`}>
          <Text
            className={`text-base ${
              theme === 'light'
                ? 'text-light-text-secondary'
                : 'text-dark-text-secondary'
            }`}>
            {selectedNotes.length} selected
          </Text>
          <TouchableOpacity
            className={`${
              theme === 'light' ? 'bg-light-error' : 'bg-dark-error'
            } px-3 py-2 rounded-md`}
            onPress={confirmBatchDelete}>
            <Text className="text-white font-semibold">Delete Selected</Text>
          </TouchableOpacity>
        </View>
      )}

      <SwipeListView
        data={notes}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        disableRightSwipe
        keyExtractor={item => item.id}
        closeOnRowPress={true}
        closeOnRowBeginSwipe={true}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={1000}
        contentContainerStyle={
          notes.length === 0 ? { flexGrow: 1 } : { padding: 16 }
        }
        ListEmptyComponent={renderEmptyState}
      />

      <TouchableOpacity
        className={`absolute bg-blue-950 bottom-6 right-6 w-14 h-14 rounded-full ${
          theme === 'light' ? 'bg-light-primary' : 'bg-dark-primary'
        } items-center justify-center`}
        style={{
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
        onPress={() => navigation.navigate('CreateNote')}>
        <Text className="text-2xl text-white">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotesList;
