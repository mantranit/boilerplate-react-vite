import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

/** **************************************
 * Jwt
 *************************************** */
const Jwt = {
  SignInPage: lazy(() => import('src/pages/auth/jwt/sign-in')),
  ForgotPasswordPage: lazy(() => import('src/pages/auth/jwt/sign-up')),
  NewPasswordPage: lazy(() => import('src/pages/auth/jwt/sign-up')),
};

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'sign-in',
        element: (
          <GuestGuard>
            <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>
              <Jwt.SignInPage />
            </AuthSplitLayout>
          </GuestGuard>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <GuestGuard>
            <AuthSplitLayout>
              <Jwt.ForgotPasswordPage />
            </AuthSplitLayout>
          </GuestGuard>
        ),
      },
      {
        path: 'new-password',
        element: (
          <GuestGuard>
            <AuthSplitLayout>
              <Jwt.NewPasswordPage />
            </AuthSplitLayout>
          </GuestGuard>
        ),
      },
    ],
  },
];
