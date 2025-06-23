import { initData } from '@telegram-apps/sdk-react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { CreateUserDto, UpdateUserDto, UserDto } from './api';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: builder => ({
    getUser: builder.query<UserDto, void>({
      query: () => `/users/${initData.user()?.id}`,
      providesTags: ['User'],
    }),

    updateUser: builder.mutation<UserDto, UpdateUserDto>({
      query: userData => ({
        url: `/users/update`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    createUser: builder.mutation<UserDto, CreateUserDto>({
      query: userData => ({
        url: `/users/create`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery, useCreateUserMutation, useUpdateUserMutation } =
  usersApi;
