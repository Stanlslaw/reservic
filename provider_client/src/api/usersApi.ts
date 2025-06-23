import { initData } from '@telegram-apps/sdk-react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { UpdateUserDto, UserDto } from './api';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: builder => ({
    getUser: builder.query<UserDto, void>({
      query: () => `/user/${initData.user()?.id}`,
      transformResponse: (res: { user: UserDto }) => res.user,
      providesTags: ['User'],
    }),

    updateUser: builder.mutation<UpdateUserDto, UserDto>({
      query: userData => ({
        url: `/user/${initData.user()?.id}/update`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = usersApi;
