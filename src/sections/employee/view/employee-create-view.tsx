import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { EmployeeNewEditForm } from '../employee-new-edit-form';

// ----------------------------------------------------------------------

export function EmployeeCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs heading="Create an employee" sx={{ mb: { xs: 3, md: 5 } }} />

      <EmployeeNewEditForm />
    </DashboardContent>
  );
}
