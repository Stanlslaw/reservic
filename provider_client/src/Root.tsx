import { SafeAreaView } from './components/telegram/SafeAreaView.tsx';
import { AppProviders } from './providers/AppProviders.tsx';
import { Outlet } from 'react-router';

export const Root = () => {
  return (
    <AppProviders>
      <div style={{ width: '100%', height: '100%' }}>
        <SafeAreaView>
          <Outlet />
        </SafeAreaView>
      </div>
    </AppProviders>
  );
};
