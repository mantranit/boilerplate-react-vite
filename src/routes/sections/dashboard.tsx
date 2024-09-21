import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));

// ----------------------------------------------------------------------

const UserListPage = lazy(() => import('src/pages/user/list'));
const EmployeeListPage = lazy(() => import('src/pages/employee/list'));
const EmployeeNewPage = lazy(() => import('src/pages/employee/new'));
const EmployeeEditPage = lazy(() => import('src/pages/employee/edit'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    // path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
      { path: 'users', element: <UserListPage /> },
      {
        path: 'employees',
        children: [
          { element: <EmployeeListPage />, index: true },
          { path: 'create', element: <EmployeeNewPage /> },
          { path: ':id', element: <EmployeeEditPage /> },
          { path: 'departments', element: <PageFive /> },
          { path: 'positions', element: <PageSix /> },
        ],
      },
    ],
  },
];
