import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { EmployeeNewEditForm } from '../employee-new-edit-form';

// ----------------------------------------------------------------------

export function EmployeeEditView({ user: currentUser }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs heading="Edit employee" sx={{ mb: { xs: 3, md: 5 } }} />

      <EmployeeNewEditForm currentUser={currentUser} />
    </DashboardContent>
  );
}
