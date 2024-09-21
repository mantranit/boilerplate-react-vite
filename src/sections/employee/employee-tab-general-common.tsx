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
import { CardHeader, Divider } from '@mui/material';

// ----------------------------------------------------------------------

export function EmployeeTabGeneralCommon({ currentEmployee, canEdit }: any) {
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
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentEmployee && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'disabled' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {currentEmployee && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'disabled' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Disabled
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{
                  mx: 0,
                  mb: 3,
                  width: 1,
                  justifyContent: 'space-between',
                }}
              />
            )}

            {!currentEmployee && (
              <Field.Switch
                name="createUser"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Create a user
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Automatically create a user for the email address
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            )}

            {currentEmployee && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="contained" color="error">
                  Delete employee
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card>
            {currentEmployee && <CardHeader title="Common" />}
            <Stack sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
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
                {!currentEmployee && <Field.Text name="role" label="Role" />}
              </Box>
            </Stack>

            {currentEmployee && <Divider sx={{ borderStyle: 'dashed' }} />}

            <Stack
              spacing={1.5}
              direction="row"
              justifyContent="flex-end"
              sx={{ p: 3, pt: currentEmployee ? 3 : 0 }}
            >
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
