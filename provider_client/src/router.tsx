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
                    path: 'edit',
                    Component: EditService,
                  },
                  {
                    path: 'service',
                    Component: Service,
                  },
                ],
              },
            ],
          },
          {
            path: 'appointments',
            Component: null,
          },
          { path: 'history', Component: null },
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
