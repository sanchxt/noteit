import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import { store } from './src/store/store';
import { loadNotes } from './src/store/slices/notesSlice';
import { loadTheme } from './src/store/slices/themeSlice';
import { AppNavigator } from './src/navigation/AppNavigator';
import './globals.css';

function App(): React.JSX.Element {
  useEffect(() => {
    store.dispatch(loadNotes());
    store.dispatch(loadTheme());
  }, []);

  return (
    <React.Fragment>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
      <Toast />
    </React.Fragment>
  );
}

export default App;
