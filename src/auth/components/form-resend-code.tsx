import Box, { BoxProps } from '@mui/material/Box';
import Link from '@mui/material/Link';

// ----------------------------------------------------------------------
export type TFormResendCodeProps = BoxProps & {
  value?: any;
  disabled?: any;
  onResendCode?: any;
};

export function FormResendCode({
  value,
  disabled,
  onResendCode,
  sx,
  ...other
}: TFormResendCodeProps) {
  return (
    <Box
      sx={{
        mt: 3,
        typography: 'body2',
        alignSelf: 'center',
        ...sx,
      }}
      {...other}
    >
      {`Don’t have a code? `}
      <Link
        variant="subtitle2"
        onClick={onResendCode}
        sx={{
          cursor: 'pointer',
          ...(disabled && {
            color: 'text.disabled',
            pointerEvents: 'none',
          }),
        }}
      >
        Resend {disabled && value && value > 0 && `(${value}s)`}
      </Link>
    </Box>
  );
}
