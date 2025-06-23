import { Outlet, useNavigate } from 'react-router';
import { SafeAreaView } from './components/telegram/SafeAreaView';
import { useGetProviderQuery } from './api/providersApi';
import { useEffect } from 'react';

export const App = () => {
  const navigate = useNavigate();

  const {
    data: providerData,
    isLoading,
    isError,
    error,
  } = useGetProviderQuery();

  useEffect(() => {
    console.log(error, isError, providerData);
    if (!isLoading && isError && !providerData) {
      console.log(providerData);
      navigate('registration');
    }
  }, [isLoading, isError, navigate, providerData]);

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
