import { App } from './App.tsx';
import { AppProviders } from './providers/AppProviders.tsx';

export const Root = () => {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
};
