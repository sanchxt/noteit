import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import { AppDispatch, type RootState } from '../store/store';

export const ThemeToggle = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <TouchableOpacity
      className={`z-10 p-1 rounded-full ${
        theme === 'light' ? 'bg-light-surface' : 'bg-dark-surface'
      }`}
      onPress={() => dispatch(toggleTheme())}>
      <Icon
        name={theme === 'light' ? 'moon' : 'sunny'}
        size={24}
        color={theme === 'light' ? '#007AFF' : '#0A84FF'}
      />
    </TouchableOpacity>
  );
};
