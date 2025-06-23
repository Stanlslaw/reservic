import {
  BookingDto,
  CreateBookingDto,
  DeleteBookingDto,
  BookingWithUserAndServiceDto,
} from './../../../api/src/bookings/booking.entity';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery: baseQuery,
  tagTypes: ['Bookings'],
  endpoints: builder => ({
    getBookings: builder.query<
      BookingWithUserAndServiceDto[],
      GetBookingsQueryDto
    >({
      query: params => ({
        url: 'bookings',
        method: 'GET',
        params: params,
      }),
      providesTags: ['Bookings'],
    }),

    getBooking: builder.query<
      BookingWithUserAndServiceDto,
      { bookingId: number }
    >({
      query: params => `/bookings/id/${params.bookingId}`,
      providesTags: ['Bookings'],
    }),

    getAvailableSlots: builder.query<
      GetAvailableSlotsDto,
      GetAvailableSlotsQueryDto
    >({
      query: params => {
        console.log('query params:', params);
        return {
          url: '/bookings/slots',
          params,
        };
      },
    }),

    createBooking: builder.mutation<BookingDto, CreateBookingDto>({
      query: bookingData => ({
        url: `/bookings/create`,
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: ['Bookings'],
    }),

    deleteBooking: builder.mutation<BookingDto, DeleteBookingDto>({
      query: providerData => ({
        url: `/bookings/delete`,
        method: 'POST',
        body: providerData,
      }),
      invalidatesTags: ['Bookings'],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  useGetAvailableSlotsQuery,
  useCreateBookingMutation,
  useDeleteBookingMutation,
} = bookingsApi;

type GetBookingsQueryDto = {
  userId?: number;

  providerId?: number;

  isLast?: boolean;
};

type GetAvailableSlotsQueryDto = {
  serviceId: number;
  date: number;
};

type GetAvailableSlotsDto = {
  appointment_dates: AppointmentData[];
};

export type AppointmentData = {
  isAvailable: boolean;
  time: number;
};
