import { GetServicesQueryDto } from './../../../api/src/services/service.entity';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import {
  DeleteServiceDto,
  ServiceDto,
  ServiceWithProviderAndReviewsDto,
} from './api';

export const servicesApi = createApi({
  reducerPath: 'servicesApi',
  baseQuery: baseQuery,
  tagTypes: ['Services'],
  endpoints: builder => ({
    getService: builder.query<
      ServiceWithProviderAndReviewsDto,
      { serviceId: number }
    >({
      query: ({ serviceId }) => `/services/${serviceId}`,
      providesTags: ['Services'],
    }),

    getServices: builder.query<ServiceDto[], GetServicesQueryDto>({
      query: params => {
        console.log('query params:', params);
        return {
          url: '/services',
          params,
        };
      },
      providesTags: ['Services'],
    }),

    createService: builder.mutation<ServiceDto, FormData>({
      query: providerData => ({
        url: `/services/create`,
        method: 'POST',
        body: providerData,
      }),
      invalidatesTags: ['Services'],
    }),

    updateService: builder.mutation<ServiceDto, FormData>({
      query: providerData => ({
        url: `/services/update`,
        method: 'POST',
        body: providerData,
      }),
      invalidatesTags: ['Services'],
    }),

    deleteService: builder.mutation<ServiceDto, DeleteServiceDto>({
      query: body => ({
        url: `/services/delete`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Services'],
    }),
  }),
});

export const {
  useGetServiceQuery,
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
