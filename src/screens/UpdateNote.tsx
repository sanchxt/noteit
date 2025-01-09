import React, { useState } from 'react';
import Markdown from 'react-native-markdown-display';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import { RootStackParamList } from '../types/navigation';
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
  const [isPreview, setIsPreview] = useState(true);
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

      {/* preview toggle btn */}
      <TouchableOpacity
        className={`absolute top-2 right-20 p-2`}
        onPress={() => setIsPreview(!isPreview)}>
        <Text
          className={
            theme === 'light' ? 'text-light-primary' : 'text-dark-primary'
          }>
          {isPreview ? 'Edit' : 'Preview'}
        </Text>
      </TouchableOpacity>

      <ScrollView className="flex-1">
        {isPreview ? (
          <View className="flex-1">
            <Markdown
              style={{
                body: {
                  color: theme === 'light' ? '#666666' : '#EBEBF5',
                },
                heading1: {
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginBottom: 8,
                  color: theme === 'light' ? '#000000' : '#FFFFFF',
                },
                heading2: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 8,
                  color: theme === 'light' ? '#000000' : '#FFFFFF',
                },
                paragraph: {
                  fontSize: 16,
                  marginBottom: 8,
                },
                link: {
                  color: theme === 'light' ? '#007AFF' : '#0A84FF',
                },
                list_item: {
                  marginVertical: 4,
                },
                code_inline: {
                  backgroundColor: theme === 'light' ? '#F8F9FA' : '#1E1E1E',
                  padding: 4,
                  borderRadius: 4,
                  color: theme === 'light' ? '#000' : '#e4e4e4',
                  fontFamily: 'monospace',
                },
                code_block: {
                  backgroundColor: theme === 'light' ? '#F8F9FA' : '#1E1E1E',
                  padding: 8,
                  borderRadius: 4,
                  marginVertical: 8,
                  color: theme === 'light' ? '#000' : '#e4e4e4',
                  fontFamily: 'monospace',
                },
                fence: {
                  backgroundColor: theme === 'light' ? '#f8f9fa' : '#1e1e1e',
                  borderRadius: 4,
                  color: theme === 'light' ? '#000' : '#e4e4e4',
                  fontFamily: 'monospace',
                },
              }}>
              {content || '_No content_'}
            </Markdown>
          </View>
        ) : (
          <TextInput
            className={`flex-1 text-base ${
              theme === 'light'
                ? 'text-light-text-primary'
                : 'text-dark-text-primary'
            }`}
            placeholder="Note (supports markdown)"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            placeholderTextColor={theme === 'light' ? '#999999' : '#8E8E93'}
          />
        )}
      </ScrollView>

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
