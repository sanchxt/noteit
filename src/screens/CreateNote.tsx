import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { saveNote } from '../store/slices/notesSlice';

type CreateNoteNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateNote'
>;

export const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<CreateNoteNavigationProp>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleSave = async () => {
    if (title.trim() || content.trim()) {
      await dispatch(
        saveNote({
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
        onPress={handleSave}>
        <Text
          className={
            theme === 'light' ? 'text-light-primary' : 'text-dark-primary'
          }>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};
