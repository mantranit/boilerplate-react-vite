import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export function EmployeeTabSalary({ currentEmployee, canEdit }: any) {
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
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
            >
              <Field.Text name="displayName" label="Full name" />
              <Field.Text name="email" label="Email address" />
              <Field.Text name="phoneNumber" label="Phone number" />

              <Field.Text name="state" label="State/region" />
              <Field.Text name="city" label="City" />
              <Field.Text name="address" label="Address" />
              <Field.Text name="zipCode" label="Zip/code" />
              <Field.Text name="company" label="Company" />
              <Field.Text name="role" label="Role" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentEmployee ? 'Create employee' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
