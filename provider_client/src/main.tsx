import { RouterProvider } from 'react-router';
import './reset.css';

import ReactDOM from 'react-dom/client';
import { router } from './router.tsx';
import 'tmaui/dist/styles.css';
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
