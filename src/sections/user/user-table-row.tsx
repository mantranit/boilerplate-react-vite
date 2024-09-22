import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { UserCreateEditForm } from './user-create-edit-form';
import { Role } from 'src/data/auth/role.model';
import { UserStatus } from 'src/data/auth/user.model';
import Chip from '@mui/material/Chip';

// ----------------------------------------------------------------------
export type TUserTableRowProps = {
  row?: any;
  selected?: any;
  onSelectRow?: any;
  onDeleteRow?: any;
  onRestoreRow?: any;
  onPermanentlyDeleteRow?: any;
};

export function UserTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onRestoreRow,
  onPermanentlyDeleteRow,
}: TUserTableRowProps) {
  const confirm = useBoolean();
  const confirmRestore = useBoolean();
  const confirmPermanence = useBoolean();

  const quickEdit = useBoolean();

  const renderRoleNames = (roles: Role[]) => {
    return roles.map((role: Role) => (
      <Chip key={role.id} variant="filled" color="success" label={role.name} />
    ));
  };

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row.name} src={row.avatarUrl} />

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              {row.displayName}
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.email}
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{renderRoleNames(row.roles)}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === UserStatus.ACTIVE && 'success') ||
              (row.status === UserStatus.PENDING && 'warning') ||
              (row.status === UserStatus.DISABLED && 'error') ||
              'default'
            }
          >
            {row.status.toLowerCase()}
          </Label>
        </TableCell>

        <TableCell>
          {!!row.deletedAt ? (
            <Stack direction="row" alignItems="center">
              <Tooltip title="Restore" placement="top" arrow>
                <IconButton
                  color={confirmRestore.value ? 'inherit' : 'default'}
                  onClick={confirmRestore.onTrue}
                >
                  <Iconify icon="solar:multiple-forward-left-bold" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Permanently Delete" placement="top" arrow>
                <IconButton color="error" onClick={confirmPermanence.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center">
              <Tooltip title="Edit" placement="top" arrow>
                <IconButton
                  color={quickEdit.value ? 'inherit' : 'default'}
                  onClick={quickEdit.onTrue}
                >
                  <Iconify icon="solar:pen-bold" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete" placement="top" arrow>
                <IconButton color="error" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </TableCell>
      </TableRow>

      <UserCreateEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />

      <ConfirmDialog
        open={confirmRestore.value}
        onClose={confirmRestore.onFalse}
        title="Restore"
        content="Are you sure want to restore?"
        action={
          <Button variant="contained" color="error" onClick={onRestoreRow}>
            Restore
          </Button>
        }
      />

      <ConfirmDialog
        open={confirmPermanence.value}
        onClose={confirmPermanence.onFalse}
        title="Permanently Delete"
        content="Are you sure want to permanently delete?"
        action={
          <Button variant="contained" color="error" onClick={onPermanentlyDeleteRow}>
            Permanently Delete
          </Button>
        }
      />
    </>
  );
}
