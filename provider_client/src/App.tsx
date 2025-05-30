import { Outlet, useNavigate } from 'react-router';
import { SafeAreaView } from './components/telegram/SafeAreaView';
import { useGetProviderQuery } from './api/providersApi';
import { useEffect } from 'react';

export const App = () => {
  const navigate = useNavigate();

  const { data: providerData, isLoading } = useGetProviderQuery();

  useEffect(() => {
    if (!isLoading && !providerData) {
      console.log(providerData);
      navigate('registration');
    }
  }, [isLoading, navigate, providerData]);

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
