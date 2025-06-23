import { createBrowserRouter, redirect } from 'react-router';
import { Root } from './Root.tsx';
import { TabBarLayout } from './components/layouts/TabBarLayout.tsx';
import { More } from './features/more/pages/More.tsx';
import { Profile } from './features/profile/pages/Profile.tsx';
import { OutsideScreen } from './components/layouts/OutsideScreen.tsx';
import { Catalog } from './features/catalog/pages/Catalog.tsx';
import { Appointments } from './features/appointments/pages/Appointments.tsx';
import { Favorites } from './features/favorites/pages/Favorites.tsx';
import { ErrorBoundary } from './features/error/pages/Error.tsx';
import { Booking } from './features/common/Booking.tsx';
import { Service } from './features/common/Service.tsx';
import { CreateBooking } from './features/bookings/pages/CreateBooking.tsx';
import { ProviderProfile } from './features/pages/ProviderProfile.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <ErrorBoundary />,
    children: [
      {
        Component: TabBarLayout,
        children: [
          {
            index: true,
            loader: () => redirect('catalog'),
          },
          { path: 'catalog', Component: Catalog },
          {
            path: 'appointments',
            Component: Appointments,
          },
          { path: 'favorites', Component: Favorites },
          {
            path: 'more',
            children: [
              {
                index: true,
                Component: More,
              },
              {
                Component: OutsideScreen,
                children: [
                  {
                    path: 'profile',
                    Component: Profile,
                  },
                ],
              },
            ],
          },
          {
            path: 'service',
            Component: OutsideScreen,
            children: [
              {
                path: ':serviceId',
                element: <Service />,
              },
            ],
          },
          {
            path: 'bookings',
            Component: OutsideScreen,
            children: [
              {
                path: ':id',
                Component: Booking,
              },
            ],
          },
          {
            path: 'provider',
            Component: OutsideScreen,
            children: [
              {
                path: ':providerId',
                Component: ProviderProfile,
              },
            ],
          },
          {
            path: 'createbooking',
            Component: OutsideScreen,
            children: [
              {
                path: ':serviceId',
                Component: CreateBooking,
              },
            ],
          },
        ],
      },
    ],
  },
]);
