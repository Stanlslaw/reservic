import { PropsWithChildren, useEffect } from 'react';
import { useCreateUserMutation, useGetUserQuery } from '../api/usersApi';
import { initData, useSignal } from '@telegram-apps/sdk-react';

export const AppPreload = ({ children }: PropsWithChildren) => {
  const user = useSignal(initData.user);
  const { data: userData, isLoading } = useGetUserQuery();
  const [createUser] = useCreateUserMutation();
  console.log(userData);

  const loadUser = async () => {
    const result = await createUser(user!).unwrap();
    console.log('data');
    console.log(result);
  };
  useEffect(() => {
    if (!userData && user) {
      loadUser();
    }
  }, [userData, isLoading]);

  return isLoading ? children : children;
};
