import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import { usersApi } from '../api/usersApi';
import { servicesApi } from '../api/servicesApi';
import { providersApi } from '../api/providersApi';
import { bookingsApi } from '../api/bookingsApi';
import { reviewsApi } from '../api/reviewsApi';
import { favoritesApi } from '../api/favoritesApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [providersApi.reducerPath]: providersApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      servicesApi.middleware,
      providersApi.middleware,
      bookingsApi.middleware,
      reviewsApi.middleware,
      favoritesApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
