import { Helmet } from 'react-helmet-async';
import { _userList } from 'src/_mock';

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

      <EmployeeFormView currentEmployee={_userList[0]} canEdit={false} />
    </>
  );
}
