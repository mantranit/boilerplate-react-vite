import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export type TWorkspaceType = {
  id: string;
  name: string;
  logo: string;
};

export const _workspaces: TWorkspaceType[] = [
  {
    id: 'WATA Software',
    name: 'WATA Software',
    logo: `${CONFIG.assetsDir}/assets/icons/workspaces/logo-2.webp`,
  },
];
