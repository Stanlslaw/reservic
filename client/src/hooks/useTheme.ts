import { miniApp, useSignal } from '@telegram-apps/sdk-react';
import { useLocalStorage } from './useLocalStorage';

export const useTheme = (): 'dark' | 'light' => {
  const tgTheme = useSignal(miniApp.isDark) ? 'dark' : 'light';
  const [userTheme] = useLocalStorage<'dark' | 'light'>(
    'userPreferences.theme',
  );

  return userTheme ? userTheme : tgTheme;
};
