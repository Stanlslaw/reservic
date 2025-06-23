import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { ProviderDto } from './api';

export const providersApi = createApi({
  reducerPath: 'providersApi',
  baseQuery: baseQuery,
  tagTypes: ['Provider'],
  endpoints: builder => ({
    getProvider: builder.query<ProviderDto, { providerId: number }>({
      query: ({ providerId }) => `/provider/${providerId}`,
      providesTags: ['Provider'],
    }),
  }),
});

export const { useGetProviderQuery } = providersApi;
