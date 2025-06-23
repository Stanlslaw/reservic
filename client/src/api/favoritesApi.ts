import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import {
  CreateUserFavoriteDto,
  UserFavoritesWithService,
  DeleteUserFavoriteDto,
} from './api';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: baseQuery,
  tagTypes: ['Favorites'],
  endpoints: builder => ({
    getUserFavorites: builder.query<
      UserFavoritesWithService[],
      { userId: number }
    >({
      query: ({ userId }) => `/favorites/${+userId}`,
      providesTags: ['Favorites'],
    }),

    addUserFavorite: builder.mutation<
      UserFavoritesWithService,
      CreateUserFavoriteDto
    >({
      query: providerData => ({
        url: `/favorites/add`,
        method: 'POST',
        body: providerData,
      }),
      invalidatesTags: ['Favorites'],
    }),

    deleteUserFavorite: builder.mutation<
      UserFavoritesWithService,
      DeleteUserFavoriteDto
    >({
      query: body => ({
        url: `/favorites/delete`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const {
  useAddUserFavoriteMutation,
  useGetUserFavoritesQuery,
  useDeleteUserFavoriteMutation,
} = favoritesApi;
