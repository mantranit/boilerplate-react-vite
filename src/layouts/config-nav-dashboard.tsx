import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Employee',
    items: [
      { title: 'Individual', path: paths.dashboard.two, icon: ICONS.user },
      { title: 'Leave', path: paths.dashboard.root, icon: ICONS.chat },
    ],
  },
  {
    subheader: 'Employer',
    items: [
      {
        title: 'Employees',
        path: paths.dashboard.group.root,
        icon: ICONS.user,
        children: [
          { title: 'List', path: paths.dashboard.group.root },
          { title: 'Departments', path: paths.dashboard.group.six },
          { title: 'Positions & Level', path: paths.dashboard.group.five },
        ],
      },
      { title: 'Leave Types', path: paths.dashboard.three, icon: ICONS.folder },
      {
        title: 'Timesheet',
        path: '/timesheet',
        icon: ICONS.calendar,
      },
    ],
  },
  {
    subheader: 'Administrator',
    items: [
      { title: 'Users', path: '/users', icon: ICONS.user },
      { title: 'Roles & Permission', path: '/roles', icon: ICONS.lock },
    ],
  },
];
