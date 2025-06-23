import { AppRoot } from 'tmaui';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { useTheme } from '../hooks/useTheme.ts';
import { AppPreload } from './AppPreload.tsx';

export const AppProviders = ({ children }: PropsWithChildren) => {
  const appearance = useTheme();

  return (
    <Provider store={store}>
      <AppPreload>
        <AppRoot appearance={appearance} platform="ios">
          {children}
        </AppRoot>
      </AppPreload>
    </Provider>
  );
};
