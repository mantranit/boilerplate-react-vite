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

import { RoleTableRow } from '../role-table-row';
import { TTheme } from 'src/theme/create-theme';
import { RoleCreateEditForm } from '../role-create-edit-form';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  countRoleSeparatedStatusAsync,
  deleteRoleAsync,
  getRolesAsync,
  permanentlyDeleteRoleAsync,
  restoreRoleAsync,
} from 'src/services/Auth/role.service';
import { selectRoles } from 'src/redux/auth/roles.slice';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All' },
  { value: 'TRASH', label: 'Trash' },
];

const TABLE_HEAD = [
  { id: 'name', label: 'Role', width: 100, sortable: true },
  { id: 'description', label: 'Description', width: 200 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function RoleListView() {
  const table = useTable({
    defaultOrderBy: 'name',
    defaultRowsPerPage: 10,
  });
  const createEdit = useBoolean();
  const confirmDelete = useBoolean();
  const confirmRestore = useBoolean();
  const confirmPermanentlyDelete = useBoolean();
  const selectedRole = useSetState(null);

  const filters = useSetState({ status: 'ALL' });

  const handleFilterStatus = useCallback(
    (event: any, newValue: any) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  const { roleList, count, countAllStatus } = useAppSelector(selectRoles);
  const dispatch = useAppDispatch();

  const handleDeleteRow = async () => {
    await dispatch(deleteRoleAsync(selectedRole.state.id));
    await dispatch(countRoleSeparatedStatusAsync());
    await fetchDataList();
    confirmDelete.onFalse();
  };

  const handleRestoreRow = async () => {
    await dispatch(restoreRoleAsync(selectedRole.state.id));
    await dispatch(countRoleSeparatedStatusAsync());
    await fetchDataList();
    confirmRestore.onFalse();
  };

  const handlePermanentlyDeleteRow = async () => {
    await dispatch(permanentlyDeleteRoleAsync(selectedRole.state.id));
    await dispatch(countRoleSeparatedStatusAsync());
    await fetchDataList();
    confirmPermanentlyDelete.onFalse();
  };

  const fetchDataList = async () => {
    await dispatch(
      getRolesAsync({
        ...filters.state,
        pageIndex: table.page + 1,
        pageSize: table.rowsPerPage,
        sortField: table.orderBy,
        sortOrder: table.order,
      })
    );
  };

  useEffect(() => {
    fetchDataList();
  }, [filters.state, table.page, table.rowsPerPage, table.orderBy, table.order]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(countRoleSeparatedStatusAsync());
    };
    fetchData();
  }, []);

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Roles"
          action={
            <Button
              onClick={createEdit.onTrue}
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New role
            </Button>
          }
        />

        <RoleCreateEditForm
          currentRole={selectedRole.state}
          open={createEdit.value}
          onClose={() => {
            createEdit.onFalse();
            selectedRole.onResetState();
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
                    color={(tab.value === 'ALL' && 'primary') || 'default'}
                  >
                    {tab.value === 'ALL' && countAllStatus.total}
                    {tab.value === 'TRASH' && countAllStatus.totalDeleted}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={count}
              onSelectAllRows={(checked: boolean) =>
                table.onSelectAllRows(
                  checked,
                  roleList.map((row: any) => row.id)
                )
              }
              action={<></>}
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 600 }}>
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
                      roleList.map((row: any) => row.id)
                    )
                  }
                />

                <TableBody>
                  {roleList.map((row: any) => (
                    <RoleTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onEditRow={() => {
                        createEdit.onTrue();
                        selectedRole.setState(row);
                      }}
                      onDeleteRow={() => {
                        confirmDelete.onTrue();
                        selectedRole.setState(row);
                        console.log(row);
                      }}
                      onRestoreRow={() => {
                        confirmRestore.onTrue();
                        selectedRole.setState(row);
                      }}
                      onPermanentlyDeleteRow={() => {
                        confirmPermanentlyDelete.onTrue();
                        selectedRole.setState(row);
                      }}
                    />
                  ))}

                  {roleList.length === 0 && (
                    <>
                      <TableEmptyRows
                        height={table.dense ? 56 : 56 + 20}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, roleList.length)}
                      />

                      <TableNoData notFound={!roleList.length} />
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
          selectedRole.onResetState();
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
          selectedRole.onResetState();
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
          selectedRole.onResetState();
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
