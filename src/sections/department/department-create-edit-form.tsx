import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { USER_STATUS_OPTIONS, _roles } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { emailRegExp } from 'src/utils';

// ----------------------------------------------------------------------
export type TDepartmentCreateEditFormProps = {
  currentUser?: any;
  open: boolean;
  onClose?: any;
};

export function DepartmentCreateEditForm({
  currentUser,
  open,
  onClose,
}: TDepartmentCreateEditFormProps) {
  const defaultValues = useMemo(
    () => ({
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      status: currentUser?.status,
      roles: currentUser?.roles || [],
    }),
    [currentUser]
  );

  const methods = useForm({
    mode: 'all',
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      reset();
      onClose();

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Update success!',
        error: 'Update error!',
      });

      await promise;

      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{currentUser ? 'Update Department' : 'Create Department'}</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            sx={{ mt: 1 }}
          >
            <Field.Select
              rules={{
                required: 'Status is required.',
              }}
              name="status"
              label="Status"
            >
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.Text
              rules={{
                required: 'Full name is required.',
              }}
              name="displayName"
              label="Full name"
            />
            <Field.Text
              rules={{
                required: {
                  value: true,
                  message: 'Email address is required.',
                },
                pattern: {
                  value: emailRegExp,
                  message: 'Please enter an valid email address.',
                },
              }}
              name="email"
              label="Email address"
            />
            <Field.MultiSelect
              rules={{
                required: 'Roles are required.',
              }}
              checkbox
              name="roles"
              label="Roles"
              options={_roles.map((item: string) => ({ key: item, value: item }))}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {currentUser ? 'Update' : 'Create'}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
