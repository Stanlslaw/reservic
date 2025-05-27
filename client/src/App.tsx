import { Outlet } from 'react-router';
import { SafeAreaView } from './components/telegram/SafeAreaView';

export const App = () => {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'var(--tgui--secondary_bg_color)',
      }}
    >
      <SafeAreaView>
        <Outlet />
      </SafeAreaView>
    </div>
  );
};
