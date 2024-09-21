import Box from '@mui/material/Box';
import { EmployeeTabGeneralCommon } from './employee-tab-general-common';
import { EmployeeTabGeneralGoverment } from './employee-tab-general-goverment';
import { EmployeeTabGeneralBank } from './employee-tab-general-bank';

// ----------------------------------------------------------------------

export function EmployeeTabGeneral({ currentEmployee, canEdit }: any) {
  return (
    <Box display="flex" gap={5} flexDirection="column">
      <EmployeeTabGeneralCommon currentEmployee={currentEmployee} canEdit={canEdit} />

      {currentEmployee && (
        <>
          <EmployeeTabGeneralGoverment currentEmployee={currentEmployee} canEdit={canEdit} />

          <EmployeeTabGeneralBank currentEmployee={currentEmployee} canEdit={canEdit} />
        </>
      )}
    </Box>
  );
}
