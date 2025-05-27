import { PropsWithChildren } from 'react';
import { useGetUserQuery } from '../api/usersApi';

export const AppPreload = ({ children }: PropsWithChildren) => {
  useGetUserQuery();
  return children;
};
