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
    key: 'content',
    title: 'Content',
    href: paths.public.content,
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
      { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'house' },
      { key: 'analytics', title: 'Analytics', href: paths.dashboard.analytics, icon: 'chart-pie' },
      { key: 'records', title: 'Records', href: paths.dashboard.records, icon: 'address-book' },
    ],
  },
  {
    key: 'admin',
    title: 'Admin',
    items: [
      { key: 'usrs', title: 'Users', href: paths.dashboard.users, icon: 'users' },
      { key: 'Campaign', title: 'Campaign', href: paths.dashboard.campaign, icon: 'users' },

      {
        key: 'partners_by_campaign',
        title: 'Partners by campaign',
        href: paths.dashboard.partners_by_campaign,
        icon: 'users',
      },

      {
        key: 'needs_offer_approval',
        title: 'Needs offer/ approval',
        href: paths.dashboard.needs_offer_approval,
        icon: 'users',
      },
    ],
  },
];
