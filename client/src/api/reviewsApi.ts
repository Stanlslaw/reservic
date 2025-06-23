import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { CreateServiceReviewDto, ServiceReviewDto } from './api';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: baseQuery,
  tagTypes: ['Reviews'],
  endpoints: builder => ({
    createServiceReview: builder.mutation<
      ServiceReviewDto,
      CreateServiceReviewDto
    >({
      query: body => ({
        url: `/reviews/create`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const { useCreateServiceReviewMutation } = reviewsApi;
