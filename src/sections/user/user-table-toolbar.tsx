import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ----------------------------------------------------------------------

export function UserTableToolbar({ filters, options, onResetPage }: any) {
  const handleFilterName = useCallback(
    (event: any) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterRole = useCallback(
    (event: any) => {
      filters.setState({ role: event.target.value });
    },
    [filters, onResetPage]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5 }}
      >
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 260 } }}>
          <InputLabel id="user-filter-role-select-label" shrink={true}>
            Role
          </InputLabel>
          <Select
            MenuProps={{ PaperProps: { sx: { maxHeight: 260 } } }}
            labelId="user-filter-role-select-label"
            value={filters.state.role}
            onChange={handleFilterRole}
            displayEmpty
            label="Role"
          >
            <MenuItem value="">All</MenuItem>
            {options.roles.map((option: any) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ width: { xs: 1, md: 260 } }}>
          <TextField
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {(filters.state.name || filters.state.role) && (
          <Box flexGrow={1} gap={1} display="flex" flexWrap="wrap" alignItems="center">
            <Button
              color="error"
              onClick={filters.onResetState}
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            >
              Clear
            </Button>
          </Box>
        )}
      </Stack>
    </>
  );
}
