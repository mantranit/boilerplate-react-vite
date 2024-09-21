import Button from '@mui/material/Button';
import { Helmet } from 'react-helmet-async';
import { _userList } from 'src/_mock';
import { Iconify } from 'src/components/iconify';

import { CONFIG } from 'src/config-global';

import { EmployeeFormView } from 'src/sections/employee/view';

// ----------------------------------------------------------------------

const metadata = { title: `Employee Details | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EmployeeFormView
        currentEmployee={_userList[0]}
        canEdit={false}
        action={
          <Button variant="contained" color="primary" startIcon={<Iconify icon="solar:pen-bold" />}>
            Request change
          </Button>
        }
      />
    </>
  );
}
