import { RouterProvider } from 'react-router';
import './reset.css';

import ReactDOM from 'react-dom/client';
import { router } from './router.tsx';
import '@telegram-apps/telegram-ui/dist/styles.css';
import eruda from 'eruda';
import {
  backButton,
  init,
  initData,
  mainButton,
  miniApp,
  viewport,
} from '@telegram-apps/sdk-react';

init();
miniApp.mountSync();
initData.restore();
viewport.mount();
backButton.mount();
viewport.expand();
mainButton.mount();
eruda.init();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
