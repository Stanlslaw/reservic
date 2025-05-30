import { initData } from '@telegram-apps/sdk-react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { ProviderDto } from './dto/provider';

export const providersApi = createApi({
  reducerPath: 'providersApi',
  baseQuery: baseQuery,
  tagTypes: ['Provider'],
  endpoints: builder => ({
    getProvider: builder.query<ProviderDto, void>({
      query: () => `/providers/${initData.user()?.id}`,
      providesTags: ['Provider'],
    }),

    createProvider: builder.mutation<ProviderDto, ProviderDto | null>({
      query: providerData => ({
        url: `/providers/create`,
        method: 'POST',
        body: providerData,
      }),
      invalidatesTags: ['Provider'],
    }),

    updateProvider: builder.mutation<ProviderDto, ProviderDto | null>({
      query: providerData => ({
        url: `/providers/${initData.user()?.id}/update`,
        method: 'POST',
        body: providerData,
      }),
      invalidatesTags: ['Provider'],
    }),
  }),
});

export const {
  useGetProviderQuery,
  useUpdateProviderMutation,
  useCreateProviderMutation,
} = providersApi;
