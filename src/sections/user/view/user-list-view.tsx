import { useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { UserTableRow } from '../user-table-row';
import { UserTableToolbar } from '../user-table-toolbar';
import { TTheme } from 'src/theme/create-theme';
import { UserCreateEditForm } from '../user-create-edit-form';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { selectUsers } from 'src/redux/auth/users.slice';
import {
  countAllStatusAsync,
  deleteUserAsync,
  getUsersAsync,
  permanentlyDeleteUserAsync,
  restoreUserAsync,
} from 'src/services/Auth/user.service';
import { getAllRolesAsync } from 'src/services/selection.service';
import { selectSelections } from 'src/redux/selections/selections.slice';
import { UserStatus } from 'src/data/auth/user.model';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All' },
  { value: UserStatus.ACTIVE, label: 'Active' },
  { value: UserStatus.PENDING, label: 'Pending' },
  { value: UserStatus.DISABLED, label: 'Disabled' },
  { value: 'TRASH', label: 'Trash' },
];

const TABLE_HEAD = [
  { id: 'displayName', label: 'Name', sortable: true },
  { id: 'roles', label: 'Roles', width: 180 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function UserListView() {
  const table = useTable({
    defaultOrderBy: 'displayName',
    defaultRowsPerPage: 10,
  });
  const createEdit = useBoolean();
  const confirmDelete = useBoolean();
  const confirmRestore = useBoolean();
  const confirmPermanentlyDelete = useBoolean();
  const selectedUser = useSetState(null);

  const filters = useSetState({ name: '', role: '', status: 'ALL' });

  const handleFilterStatus = useCallback(
    (event: any, newValue: any) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  const { userList, count, countAllStatus } = useAppSelector(selectUsers);
  const { roles } = useAppSelector(selectSelections);
  const dispatch = useAppDispatch();

  const handleDeleteRow = useCallback(async () => {
    await dispatch(deleteUserAsync(selectedUser.state.id));
    await dispatch(countAllStatusAsync());
    await fetchUserList();
  }, [userList]);

  const handleRestoreRow = useCallback(async () => {
    await dispatch(restoreUserAsync(selectedUser.state.id));
    await dispatch(countAllStatusAsync());
    await fetchUserList();
  }, [userList]);

  const handlePermanentlyDeleteRow = useCallback(async () => {
    await dispatch(permanentlyDeleteUserAsync(selectedUser.state.id));
    await dispatch(countAllStatusAsync());
    await fetchUserList();
  }, [userList]);

  const fetchUserList = async () => {
    await dispatch(
      getUsersAsync({
        ...filters.state,
        pageIndex: table.page + 1,
        pageSize: table.rowsPerPage,
        sortField: table.orderBy,
        sortOrder: table.order,
      })
    );
  };

  useEffect(() => {
    fetchUserList();
  }, [filters.state, table.page, table.rowsPerPage, table.orderBy, table.order]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(countAllStatusAsync());
      await dispatch(getAllRolesAsync());
    };
    fetchData();
  }, []);

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Users"
          action={
            <Button
              onClick={createEdit.onTrue}
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New user
            </Button>
          }
        />

        <UserCreateEditForm
          currentUser={selectedUser.state}
          open={createEdit.value}
          onClose={() => {
            createEdit.onFalse();
            selectedUser.onResetState();
          }}
        />

        <Card>
          <Tabs
            value={filters.state.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme: TTheme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value === 'ALL' && 'primary') ||
                      (tab.value === UserStatus.ACTIVE && 'success') ||
                      (tab.value === UserStatus.PENDING && 'warning') ||
                      (tab.value === UserStatus.DISABLED && 'error') ||
                      'default'
                    }
                  >
                    {tab.value === 'ALL' && countAllStatus.total}
                    {tab.value === UserStatus.ACTIVE && countAllStatus.totalActive}
                    {tab.value === UserStatus.PENDING && countAllStatus.totalPending}
                    {tab.value === UserStatus.DISABLED && countAllStatus.totalDisabled}
                    {tab.value === 'TRASH' && countAllStatus.totalDeleted}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <UserTableToolbar filters={filters} onResetPage={table.onResetPage} options={{ roles }} />

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={count}
              onSelectAllRows={(checked: boolean) =>
                table.onSelectAllRows(
                  checked,
                  userList.map((row: any) => row.id)
                )
              }
              action={<></>}
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 720 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={count}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked: boolean) =>
                    table.onSelectAllRows(
                      checked,
                      userList.map((row: any) => row.id)
                    )
                  }
                />

                <TableBody>
                  {userList.map((row: any) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onEditRow={() => {
                        createEdit.onTrue();
                        selectedUser.setState(row);
                      }}
                      onDeleteRow={() => {
                        confirmDelete.onTrue();
                        selectedUser.setState(row);
                      }}
                      onRestoreRow={() => {
                        confirmRestore.onTrue();
                        selectedUser.setState(row);
                      }}
                      onPermanentlyDeleteRow={() => {
                        confirmPermanentlyDelete.onTrue();
                        selectedUser.setState(row);
                      }}
                    />
                  ))}

                  {userList.length === 0 && (
                    <>
                      <TableEmptyRows
                        height={table.dense ? 56 : 56 + 20}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, userList.length)}
                      />

                      <TableNoData notFound={!userList.length} />
                    </>
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={count}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirmDelete.value}
        onClose={() => {
          confirmDelete.onFalse();
          selectedUser.onResetState();
        }}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDeleteRow}>
            Delete
          </Button>
        }
      />

      <ConfirmDialog
        open={confirmRestore.value}
        onClose={() => {
          confirmRestore.onFalse();
          selectedUser.onResetState();
        }}
        title="Restore"
        content="Are you sure want to restore?"
        action={
          <Button variant="contained" color="error" onClick={handleRestoreRow}>
            Restore
          </Button>
        }
      />

      <ConfirmDialog
        open={confirmPermanentlyDelete.value}
        onClose={() => {
          confirmPermanentlyDelete.onFalse();
          selectedUser.onResetState();
        }}
        title="Permanently Delete"
        content="Are you sure want to permanently delete?"
        action={
          <Button variant="contained" color="error" onClick={handlePermanentlyDeleteRow}>
            Permanently Delete
          </Button>
        }
      />
    </>
  );
}
