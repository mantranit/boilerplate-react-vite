import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------
export type TFormHeadProps = BoxProps & {
  icon?: ReactNode;
  description?: ReactNode;
};

export function FormHead({ sx, icon, title, description, ...other }: TFormHeadProps) {
  return (
    <>
      {icon && (
        <Box component="span" display="inline-flex" sx={{ mx: 'auto', mb: 3 }}>
          {icon}
        </Box>
      )}

      <Box
        gap={1.5}
        display="flex"
        flexDirection="column"
        sx={{ mb: 5, textAlign: 'center', whiteSpace: 'pre-line', ...sx }}
        {...other}
      >
        <Typography variant="h5">{title}</Typography>

        {description && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        )}
      </Box>
    </>
  );
}
