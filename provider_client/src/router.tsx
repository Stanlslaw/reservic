import { createBrowserRouter } from 'react-router';
import { Root } from './Root.tsx';
import { Home } from './features/home/pages/Home.tsx';
import { TabBarLayout } from './components/layouts/TabBarLayout.tsx';
import { More } from './features/more/pages/More.tsx';
import { Profile } from './features/profile/pages/Profile.tsx';
import { OutsideScreen } from './components/layouts/OutsideScreen.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        Component: TabBarLayout,
        children: [
          { index: true, Component: Home },
          { path: 'catalog', Component: null },
          {
            path: 'appointments',
            Component: null,
            children: [
              { path: 'history', Component: null },
              {
                path: 'upcoming',
                Component: null,
                children: [{ path: 'appointment', Component: null }],
              },
            ],
          },
          { path: 'favorites', Component: null },
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
