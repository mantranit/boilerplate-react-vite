import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';
import { _userAbout, _userPlans, _userPayment, _userInvoices, _userAddressBook } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { EmployeeTabGeneral } from '../employee-tab-general';
import { EmployeeTabContract } from '../employee-tab-contract';
import { EmployeeTabSalary } from '../employee-tab-salary';

// ----------------------------------------------------------------------

const TABS_CREATE = [
  { value: 'general', label: 'General', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
];

const TABS_EDIT = [
  { value: 'general', label: 'General', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
  {
    value: 'contract',
    label: 'Contract',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
  { value: 'salary', label: 'Salary', icon: <Iconify icon="ic:round-vpn-key" width={24} /> },
];

// ----------------------------------------------------------------------

export function EmployeeFormView({ currentEmployee, canEdit = true, action }: any) {
  const tabs = useTabs('general');

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={currentEmployee ? 'Employee Details' : 'Create a new employee'}
        action={action}
      />

      <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
        {(currentEmployee ? TABS_EDIT : TABS_CREATE).map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {tabs.value === 'general' && (
        <EmployeeTabGeneral currentEmployee={currentEmployee} canEdit={canEdit} />
      )}

      {tabs.value === 'contract' && (
        <EmployeeTabContract currentEmployee={currentEmployee} canEdit={canEdit} />
      )}

      {tabs.value === 'salary' && (
        <EmployeeTabSalary currentEmployee={currentEmployee} canEdit={canEdit} />
      )}
    </DashboardContent>
  );
}
