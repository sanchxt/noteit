import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NotesList } from '../screens/NotesList';
import { CreateNote } from '../screens/CreateNote';
import { RootStackParamList } from '../types/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ThemeToggle } from '../components/ThemeToggle';
import { UpdateNote } from '../screens/UpdateNote';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme === 'light' ? '#fff' : '#1C1C1E',
          },
          headerTintColor: theme === 'light' ? '#000' : '#fff',
          headerTitleStyle: {
            color: theme === 'light' ? '#000' : '#fff',
          },
        }}>
        <Stack.Screen
          name="NotesList"
          component={NotesList}
          options={{ title: 'NoteIt', headerRight: () => <ThemeToggle /> }}
        />
        <Stack.Screen
          name="CreateNote"
          component={CreateNote}
          options={{ title: 'New Note' }}
        />
        <Stack.Screen
          name="UpdateNote"
          component={UpdateNote}
          options={{ title: 'Edit Note' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
