import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { EmployeeTabGeneralCommon } from './employee-tab-general-common';
import { EmployeeTabGeneralGoverment } from './employee-tab-general-goverment';
import { EmployeeTabGeneralBank } from './employee-tab-general-bank';

// ----------------------------------------------------------------------

export function EmployeeTabGeneral({ currentEmployee }: any) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      status: currentEmployee?.status || '',
      avatarUrl: currentEmployee?.avatarUrl || null,
      createUser: true,
      displayName: currentEmployee?.displayName || '',
      email: currentEmployee?.email || '',
      phoneNumber: currentEmployee?.phoneNumber || '',
      country: currentEmployee?.country || '',
      state: currentEmployee?.state || '',
      city: currentEmployee?.city || '',
      address: currentEmployee?.address || '',
      zipCode: currentEmployee?.zipCode || '',
      company: currentEmployee?.company || '',
      role: currentEmployee?.role || [],
    }),
    [currentEmployee]
  );

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentEmployee ? 'Update success!' : 'Create success!');
      router.push(paths.employee.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Box display="flex" gap={5} flexDirection="column">
      <EmployeeTabGeneralCommon currentEmployee={currentEmployee} />

      <EmployeeTabGeneralGoverment currentEmployee={currentEmployee} />

      <EmployeeTabGeneralBank currentEmployee={currentEmployee} />
    </Box>
  );
}
