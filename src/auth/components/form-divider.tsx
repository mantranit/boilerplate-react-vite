import Divider, { DividerProps } from '@mui/material/Divider';

// ----------------------------------------------------------------------
export type TFormDividerProps = DividerProps & {
  label?: string;
};

export function FormDivider({ sx, label = 'OR' }: TFormDividerProps) {
  return (
    <Divider
      sx={{
        my: 3,
        typography: 'overline',
        color: 'text.disabled',
        '&::before, :after': { borderTopStyle: 'dashed' },
        ...sx,
      }}
    >
      {label}
    </Divider>
  );
}
