import { paths } from './paths';

// ----------------------------------------------------------------------

export const navData = [
  {
    key: 'home',
    title: 'Home',
    href: paths.home,
  },
  {
    key: 'portfolio',
    title: 'Portfolio',
    href: paths.public.portfolio,
  },
  {
    key: 'campaign',
    title: 'Campaign',
    href: paths.public.campaign,
  },
  {
    key: 'profile',
    title: 'Profile',
    href: paths.public.profile,
  },
  {
    key: 'login',
    title: 'Login',
    href: paths.auth.default.signIn,
  },
];

export const dashboardItems = [
  {
    key: 'general',
    title: 'General',
    items: [
      {
        key: 'overview',
        title: 'Overview',
        href: paths.dashboard.overview,
        icon: 'material-symbols-light:overview-outline-rounded',
      },
      { key: 'analytics', title: 'Analytics', href: paths.dashboard.analytics, icon: 'hugeicons:analysis-text-link' },
      { key: 'records', title: 'Records', href: paths.dashboard.records, icon: 'pepicons-pencil:file' },
    ],
  },
  {
    key: 'admin',
    title: 'Admin',
    items: [
      { key: 'usrs', title: 'Users', href: paths.dashboard.users, icon: 'solar:user-linear' },
      { key: 'Campaign', title: 'Campaign', href: paths.dashboard.campaign, icon: 'material-symbols-light:ads-click' },

      {
        key: 'partners_by_campaign',
        title: 'Partners by campaign',
        href: paths.dashboard.partners_by_campaign,
        icon: 'ph:handshake-light',
      },

      {
        key: 'needs_offer_approval',
        title: 'Needs offer/ approval',
        href: paths.dashboard.needs_offer_approval,
        icon: 'material-symbols-light:order-approve-outline-rounded',
      },
    ],
  },
];
