import { paths } from '@/paths';

export const layoutConfig = {
  navItems: [
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
        { key: 'needs_offer_approval', title: 'Needs offer/ approval', href: paths.needs_offer_approval, icon: 'users' },
      ],
    }
  ],
};
