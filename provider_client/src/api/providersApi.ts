import { initData } from '@telegram-apps/sdk-react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { ProviderDto, CreateProviderDto, UpdateProviderDto } from './api';

export const providersApi = createApi({
  reducerPath: 'providersApi',
  baseQuery: baseQuery,
  tagTypes: ['Provider'],
  endpoints: builder => ({
    getProvider: builder.query<ProviderDto, void>({
      query: () => `/provider/${initData.user()?.id}`,
      providesTags: ['Provider'],
    }),

    createProvider: builder.mutation<CreateProviderDto, ProviderDto>({
      query: providerData => ({
        url: `/provider/create`,
        method: 'POST',
        body: providerData,
      }),
      invalidatesTags: ['Provider'],
    }),

    updateProvider: builder.mutation<UpdateProviderDto, ProviderDto>({
      query: providerData => ({
        url: `/provider/update`,
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
