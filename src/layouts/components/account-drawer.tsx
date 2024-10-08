import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import { useColorScheme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { _mock } from 'src/_mock';
import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { AnimateAvatar } from 'src/components/animate';

import { useMockedUser } from 'src/auth/hooks';

import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';
import { BaseOption } from '../../components/settings/drawer/base-option';
import { useSettingsContext } from '../../components/settings/context';
import { TAccountMenu } from '../config-nav-account';
import { TAccountButtonProps } from './account-button';
import { TTheme } from 'src/theme/create-theme';

// ----------------------------------------------------------------------
type TAccountDrawerProps = TAccountButtonProps & {
  data: TAccountMenu[];
};

export function AccountDrawer({ data = [], sx, ...other }: TAccountDrawerProps) {
  const theme = useTheme<TTheme>();

  const router = useRouter();

  const pathname = usePathname();

  const settings = useSettingsContext();

  const { mode, setMode } = useColorScheme();

  const { user } = useMockedUser();

  const [open, setOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleCloseDrawer();
      router.push(path);
    },
    [handleCloseDrawer, router]
  );

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: user?.photoURL, alt: user?.displayName },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 25%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      {user?.displayName?.charAt(0).toUpperCase()}
    </AnimateAvatar>
  );

  return (
    <>
      <AccountButton
        onClick={handleOpenDrawer}
        photoURL={user?.photoURL}
        displayName={user?.displayName}
        sx={sx}
        {...other}
      />

      <Drawer
        open={open}
        onClose={handleCloseDrawer}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: 'absolute' }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>

        <Scrollbar>
          <Stack alignItems="center" sx={{ pt: 8, pb: 3 }}>
            {renderAvatar}

            <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
              {user?.displayName}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }} noWrap>
              {user?.email}
            </Typography>
          </Stack>

          <Stack
            sx={{
              py: 3,
              px: 2.5,
              borderTop: `dashed 1px ${theme.vars.palette.divider}`,
            }}
          >
            {data.map((option) => {
              const rootLabel = pathname.includes('/dashboard') ? 'Home' : 'Dashboard';

              const rootHref = pathname.includes('/dashboard') ? '/' : paths.dashboard.root;

              return (
                <MenuItem
                  key={option.label}
                  onClick={() => handleClickItem(option.label === 'Home' ? rootHref : option.href)}
                  sx={{
                    py: 1,
                    color: 'text.secondary',
                    '& svg': { width: 24, height: 24 },
                    '&:hover': { color: 'text.primary' },
                  }}
                >
                  {option.icon}

                  <Box component="span" sx={{ ml: 2 }}>
                    {option.label === 'Home' ? rootLabel : option.label}
                  </Box>

                  {option.info && (
                    <Label color="error" sx={{ ml: 1 }}>
                      {option.info}
                    </Label>
                  )}
                </MenuItem>
              );
            })}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <Stack spacing={6} sx={{ pb: 2.5 }}>
            <Box gap={2} display="grid" gridTemplateColumns="repeat(2, 1fr)">
              <BaseOption
                label="Dark mode"
                icon="moon"
                selected={settings.colorScheme === 'dark'}
                onClick={() => {
                  settings.onUpdateField('colorScheme', mode === 'light' ? 'dark' : 'light');
                  setMode(mode === 'light' ? 'dark' : 'light');
                }}
              />
              <BaseOption
                label="Contrast"
                icon="contrast"
                selected={settings.contrast === 'hight'}
                onClick={() =>
                  settings.onUpdateField(
                    'contrast',
                    settings.contrast === 'default' ? 'hight' : 'default'
                  )
                }
              />
              <BaseOption
                tooltip="Dashboard only and available at large resolutions > 1600px (xl)"
                label="Compact"
                icon="autofit-width"
                selected={settings.compactLayout}
                onClick={() => settings.onUpdateField('compactLayout', !settings.compactLayout)}
              />
            </Box>
          </Stack>
          <Box>
            <SignOutButton onClose={handleCloseDrawer} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
