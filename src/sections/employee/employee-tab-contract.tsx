import Grid from '@mui/material/Unstable_Grid2';
import { ContractListView } from '../contract/view';

// ----------------------------------------------------------------------

export function EmployeeTabContract({ currentEmployee, canEdit }: any) {
  return (
    <>
      <ContractListView currentEmployee={currentEmployee} canEdit={canEdit} />
    </>
  );
}
