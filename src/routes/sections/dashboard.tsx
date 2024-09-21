import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const UserListPage = lazy(() => import('src/pages/user/list'));
const RoleListPage = lazy(() => import('src/pages/role/list'));
const EmployeeListPage = lazy(() => import('src/pages/employee/list'));
const EmployeeNewPage = lazy(() => import('src/pages/employee/new'));
const EmployeeEditPage = lazy(() => import('src/pages/employee/edit'));
const DepartmentListPage = lazy(() => import('src/pages/employee/department'));
const PositionListPage = lazy(() => import('src/pages/employee/position'));
const LeaveTypeListPage = lazy(() => import('src/pages/leave-type/list'));
const EmployeeDetailsViewPage = lazy(() => import('src/pages/employee-details/view'));

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
      { path: 'leave-types', element: <LeaveTypeListPage /> },
      { path: 'submit-leave', element: <LeaveTypeListPage /> },
      { path: 'employee-details', element: <EmployeeDetailsViewPage /> },
      {
        path: 'employees',
        children: [
          { element: <EmployeeListPage />, index: true },
          { path: 'create', element: <EmployeeNewPage /> },
          { path: ':id', element: <EmployeeEditPage /> },
          { path: 'departments', element: <DepartmentListPage /> },
          { path: 'positions', element: <PositionListPage /> },
        ],
      },
      { path: 'users', element: <UserListPage /> },
      { path: 'roles', element: <RoleListPage /> },
    ],
  },
];
