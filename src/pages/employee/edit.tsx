import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { _userList } from 'src/_mock/_user';

import { EmployeeFormView } from 'src/sections/employee/view';

// ----------------------------------------------------------------------

const metadata = { title: `Employee edit | ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const currentUser = _userList.find((user) => user.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EmployeeFormView currentEmployee={currentUser} />
    </>
  );
}
