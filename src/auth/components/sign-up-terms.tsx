import Box, { BoxProps } from '@mui/material/Box';
import Link from '@mui/material/Link';

// ----------------------------------------------------------------------
export type TSignUpTermsProps = BoxProps & {};

export function SignUpTerms({ sx, ...other }: TSignUpTermsProps) {
  return (
    <Box
      component="span"
      sx={{
        mt: 3,
        display: 'block',
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
        ...sx,
      }}
      {...other}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy policy
      </Link>
      .
    </Box>
  );
}
