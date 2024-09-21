import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';
import { _roles, _userList, USER_STATUS_OPTIONS } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { DepartmentTableRow } from '../department-table-row';
import { DepartmentTableToolbar } from '../department-table-toolbar';
import { DepartmentCreateEditForm } from '../department-create-edit-form';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'role', label: 'Role', width: 180 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function DepartmentListView() {
  const table = useTable();

  const confirm = useBoolean();

  const create = useBoolean();

  const [tableData, setTableData] = useState(_userList);

  const filters = useSetState({ name: '', role: [], status: 'all' });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name || filters.state.role.length > 0 || filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id: any) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleFilterStatus = useCallback(
    (event: any, newValue: any) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Departments"
          action={
            <Button
              onClick={create.onTrue}
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New department
            </Button>
          }
        />

        <DepartmentCreateEditForm open={create.value} onClose={create.onFalse} />

        <Card>
          <DepartmentTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ roles: _roles }}
          />

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked: boolean) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row: any) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 720 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked: boolean) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row: any) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row: any) => (
                      <DepartmentTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
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
      (user: any) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
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
