import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NotesList } from '../screens/NotesList';
import { CreateNote } from '../screens/CreateNote';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NotesList"
          component={NotesList}
          options={{ title: 'NoteIt' }}
        />
        <Stack.Screen
          name="CreateNote"
          component={CreateNote}
          options={{ title: 'New Note' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
