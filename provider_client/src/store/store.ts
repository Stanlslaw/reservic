import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import { usersApi } from '../api/usersApi';
import { providersApi } from '../api/providersApi';
import { servicesApi } from '../api/servicesApi';
import { bookingsApi } from '../api/bookingsApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [providersApi.reducerPath]: providersApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      providersApi.middleware,
      servicesApi.middleware,
      bookingsApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
