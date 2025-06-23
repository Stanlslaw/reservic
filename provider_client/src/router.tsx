import { createBrowserRouter, redirect } from 'react-router';
import { Root } from './Root.tsx';
import { TabBarLayout } from './components/layouts/TabBarLayout.tsx';
import { More } from './features/more/pages/More.tsx';
import { OutsideScreen } from './components/layouts/OutsideScreen.tsx';
import { ProviderProfile } from './features/providerProfile/pages/ProviderProfile.tsx';
import { Services } from './features/services/pages/Services.tsx';
import { CreateService } from './features/services/pages/CreateService.tsx';
import { EditService } from './features/services/pages/EditService.tsx';
import { Service } from './features/common/Service.tsx';
import { CreateProviderProfile } from './features/providerProfile/pages/CreateProviderProfile.tsx';
import { ErrorBoundary } from './features/error/pages/Error.tsx';
import { Bookings } from './features/bookings/pages/Bookings.tsx';
import { Booking } from './features/common/Booking.tsx';

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
            loader: () => redirect('services'),
          },
          {
            path: 'services',
            children: [
              {
                index: true,
                Component: Services,
              },
              {
                Component: OutsideScreen,
                children: [
                  {
                    path: 'create',
                    Component: CreateService,
                  },
                  {
                    path: ':serviceId/update',
                    Component: EditService,
                  },
                  {
                    path: ':serviceId',
                    Component: Service,
                  },
                ],
              },
            ],
          },
          {
            path: 'bookings',
            children: [
              {
                index: true,
                Component: Bookings,
              },
              {
                Component: OutsideScreen,
                children: [{ path: ':id', Component: Booking }],
              },
            ],
          },
          {
            path: 'more',

            children: [
              {
                index: true,
                Component: More,
              },
              {
                Component: OutsideScreen,
                children: [{ path: 'profile', Component: ProviderProfile }],
              },
            ],
          },
        ],
      },
      {
        path: 'registration',
        Component: CreateProviderProfile,
      },
    ],
  },
]);
