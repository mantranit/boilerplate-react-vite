import { Navigate, useRoutes } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { dashboardRoutes } from './dashboard';

import { lazy, Suspense } from 'react';
import { SplashScreen } from 'src/components/loading-screen';
import { SimpleLayout } from 'src/layouts/simple';
import dayjs from 'dayjs';

const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: dayjs(CONFIG.comingSoon).isValid() ? (
        <Suspense fallback={<SplashScreen />}>
          <SimpleLayout content={{ compact: true }}>
            <ComingSoonPage />
          </SimpleLayout>
        </Suspense>
      ) : (
        <Navigate to={CONFIG.auth.redirectPath} replace />
      ),
    },

    // Auth
    ...authRoutes,

    // Dashboard
    ...dashboardRoutes,

    // Main
    ...mainRoutes,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
