import { createBrowserRouter, redirect } from 'react-router';
import { Root } from './Root.tsx';
import { TabBarLayout } from './components/layouts/TabBarLayout.tsx';
import { More } from './features/more/pages/More.tsx';
import { Profile } from './features/profile/pages/Profile.tsx';
import { OutsideScreen } from './components/layouts/OutsideScreen.tsx';
import { Catalog } from './features/catalog/pages/Catalog.tsx';
import { Appointments } from './features/appointments/pages/Appointments.tsx';
import { Favorites } from './features/favorites/pages/Favorites.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,

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
            children: [
              { path: 'history', Component: null },
              {
                path: 'upcoming',
                Component: null,
                children: [{ path: 'appointment', Component: null }],
              },
            ],
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
        ],
      },
    ],
  },
]);
