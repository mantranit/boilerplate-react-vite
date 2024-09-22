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
import { _roles, _userList } from 'src/_mock';

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

  const confirm = useBoolean();

  const create = useBoolean();

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

  const handleDeleteRow = useCallback(
    async (id: string) => {
      await dispatch(deleteUserAsync(id));
      await dispatch(countAllStatusAsync());
      await fetchUserList();
    },
    [userList]
  );

  const handleRestoreRow = useCallback(
    async (id: string) => {
      await dispatch(restoreUserAsync(id));
      await dispatch(countAllStatusAsync());
      await fetchUserList();
    },
    [userList]
  );

  const handlePermanentlyDeleteRow = useCallback(
    async (id: string) => {
      await dispatch(permanentlyDeleteUserAsync(id));
      await dispatch(countAllStatusAsync());
      await fetchUserList();
    },
    [userList]
  );

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
              onClick={create.onTrue}
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New user
            </Button>
          }
        />

        <UserCreateEditForm open={create.value} onClose={create.onFalse} />

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
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onRestoreRow={() => handleRestoreRow(row.id)}
                      onPermanentlyDeleteRow={() => handlePermanentlyDeleteRow(row.id)}
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
    </>
  );
}

function applyFilter({ inputData, comparator, filters }: any) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el: any, index: any) => [el, index]);

  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el: any) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user: any) => user.displayName.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user: any) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user: any) => role.includes(user.role));
  }

  return inputData;
}
