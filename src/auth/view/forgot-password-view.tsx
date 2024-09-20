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
import { emailRegExp } from 'src/utils';

// ----------------------------------------------------------------------

export function ForgotPasswordView() {
  const { checkUserSession }: any = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const methods = useForm({
    defaultValues: {
      email: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
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

      <LoadingButton
        fullWidth
        color="error"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Reset password..."
      >
        Reset password
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
        title="Forgot password?"
        description="Enter you email and we'll send you a link to reset your password."
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
