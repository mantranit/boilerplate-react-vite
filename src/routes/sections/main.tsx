import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// Error
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));
const Page500 = lazy(() => import('src/pages/error/500'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      { path: '403', element: <Page403 /> },
      { path: '404', element: <Page404 /> },
      { path: '500', element: <Page500 /> },
    ],
  },
];
