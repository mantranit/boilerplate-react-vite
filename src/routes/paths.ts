// ----------------------------------------------------------------------

export const paths = {
  auth: {
    signIn: '/auth/sign-in',
    forgotPassword: '/auth/forgot-password',
    newPassword: '/auth/new-password',
  },
  user: {
    list: '/users',
    role: '/roles',
  },
  employee: {
    list: '/employees',
    new: '/employees/create',
    edit: (id: string) => `/employees/${id}`,
    departments: '/employees/departments',
    positions: '/employees/positions',
  },
  dashboard: {
    root: '/',
    two: '/two',
    three: '/three',
    group: {
      root: '/group',
      five: '/group/five',
      six: '/group/six',
    },
  },
};
