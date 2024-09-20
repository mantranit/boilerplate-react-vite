import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Form, Field } from 'src/components/hook-form';

import { signUp } from '../context';
import { useAuthContext } from '../hooks';
import { FormHead } from '../components/form-head';
import { passwordRegExp } from 'src/utils';

// ----------------------------------------------------------------------

export function SetPasswordView() {
  const { checkUserSession }: any = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const methods = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        newPassword: data.newPassword,
      });
      await checkUserSession?.();

      router.refresh();
    } catch (error: any) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Password
        rules={{
          required: {
            value: true,
            message: 'New password is required.',
          },
          pattern: {
            value: passwordRegExp,
            message: 'Please enter an valid password.',
          },
        }}
        name="newPassword"
        label="New password"
      />

      <Field.Password
        rules={{
          required: {
            value: true,
            message: 'Confirm password is required.',
          },
          pattern: {
            value: passwordRegExp,
            message: 'Please enter an valid password.',
          },
        }}
        name="confirmPassword"
        label="Confirm password"
      />

      <LoadingButton
        fullWidth
        color="error"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Set password..."
      >
        Set password
      </LoadingButton>

      <Box sx={{ textAlign: 'center' }}>
        <Link
          component={RouterLink}
          href={paths.auth.signIn}
          to={paths.auth.signIn}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          Go back to Sign in
        </Link>
      </Box>
    </Box>
  );

  return (
    <>
      <FormHead
        title="New password"
        description="Your new password must have at least 8 characters and least one lowercase letter, uppercase letter, number and symbol."
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
