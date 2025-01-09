import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { updateNote } from '../store/slices/notesSlice';

type UpdateNoteNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UpdateNote'
>;

type UpdateNoteRouteProp = RouteProp<RootStackParamList, 'UpdateNote'>;

export const UpdateNote = () => {
  const route = useRoute<UpdateNoteRouteProp>();
  const { note } = route.params;

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<UpdateNoteNavigationProp>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleUpdate = async () => {
    if (title.trim() || content.trim()) {
      await dispatch(
        updateNote({
          ...note,
          title: title.trim(),
          content: content.trim(),
        }),
      );
      navigation.goBack();
    }
  };

  return (
    <View
      className={`flex-1 p-4 ${
        theme === 'light' ? 'bg-light-background' : 'bg-dark-background'
      }`}>
      <TextInput
        className={`text-2xl font-semibold mb-4 ${
          theme === 'light'
            ? 'text-light-text-primary'
            : 'text-dark-text-primary'
        }`}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={theme === 'light' ? '#999999' : '#8E8E93'}
      />
      <TextInput
        className={`flex-1 text-base ${
          theme === 'light'
            ? 'text-light-text-primary'
            : 'text-dark-text-primary'
        }`}
        placeholder="Note"
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
        placeholderTextColor={theme === 'light' ? '#999999' : '#8E8E93'}
      />
      <TouchableOpacity
        className="absolute top-2 right-4 p-2"
        onPress={handleUpdate}>
        <Text
          className={
            theme === 'light' ? 'text-light-primary' : 'text-dark-primary'
          }>
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
};
