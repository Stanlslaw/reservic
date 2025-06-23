import { AppRoot } from 'tmaui';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { useTheme } from '../hooks/useTheme.ts';
import { AppPreload } from './AppPreload.tsx';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const AppProviders = ({ children }: PropsWithChildren) => {
  const appearance = useTheme();

  return (
    <Provider store={store}>
      <AppPreload>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRoot appearance={appearance} platform="ios">
            {children}
          </AppRoot>
        </LocalizationProvider>
      </AppPreload>
    </Provider>
  );
};
