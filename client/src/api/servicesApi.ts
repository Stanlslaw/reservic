import { GetServicesQueryDto } from './../../../api/src/services/service.entity';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { ServiceDto, ServiceWithProviderAndReviewsDto } from './api';

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
    }),

    getServices: builder.query<ServiceDto[], GetServicesQueryDto>({
      query: params => {
        console.log('query params:', params);
        return {
          url: '/services',
          params,
        };
      },
    }),
  }),
});

export const { useGetServiceQuery, useGetServicesQuery } = servicesApi;
