import { paths } from './paths';

// public header routes
export const publicRoutes = [
  {
    key: 'public-navitems',
    items: [
      {
        key: 'campaign',
        title: 'Campaign',
        href: paths.dashboardPublic.campaign,
      },
      {
        key: 'portfolio',
        title: 'Portfolio',
        href: paths.dashboardPublic.portfolio,
      },
      {
        key: 'content',
        title: 'Content',
        href: paths.dashboardPublic.content,
      },
      {
        key: 'production',
        title: 'Production',
        href: paths.dashboardPublic.production,
      },
      {
        key: 'partner',
        title: 'Partner',
        href: paths.public.partner,
      },
      {
        key: 'spaces',
        title: 'Spaces',
        href: paths.dashboardPublic.spaces,
      },
      {
        key: 'services',
        title: 'Services',
        href: paths.dashboardPublic.services,
      },
    ],
  },
];

// dashboard fav items
export const dashboardFavItems = [
  {
    key: 'favorite',
    title: 'Favorite',
    icon: 'iconamoon:heart-light',
    items: [
      {
        key: 'campaign',
        title: 'Campaign',
        icon: 'nimbus:marketing',
        href: paths.private.campaign_add_new, // adjust the href to your campaign route if needed
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'analytics',
        title: 'Analytics',
        icon: 'material-symbols-light:analytics-outline-rounded',
        href: paths.private.analytics,
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
];

// footer routes
export const footerRoutes = [
  { label: 'Learn', href: '/learn' },
  { label: 'Chat', href: '/dms' },
  { label: 'Spectate', href: '/spectate' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collaborate', href: '/collaborate' },
  { label: 'Services', href: '/services' },
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Blog', href: '/blog' },
];

export const workspacesItems = [
  {
    key: 'workspace-product',
    title: 'Product',
    icon: 'streamline-pixel:business-product-check',
    href: '/product',
    items: [
      {
        key: 'reporting',
        title: 'Reporting',
        icon: 'ph:dot-fill',
        href: '/product/reporting',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'workspace-content',
    title: 'Content',
    icon: 'bx:book-content',
    href: '/all-content',
    items: [
      {
        key: 'by client',
        title: 'By Client',
        icon: 'ph:dot-fill',
        href: '/by-client',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'Analytics',
        title: 'Analytics',
        icon: 'ph:dot-fill',
        href: '/all-content/analytics',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'workspace-portfolio',
    title: 'Portfolio',
    icon: 'uit:bag',
    href: '/portfolio',
    items: [
      {
        key: 'by client',
        title: 'Genre',
        icon: 'ph:dot-fill',
        href: '/by-client',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'analytics',
        title: 'Analytics',
        icon: 'ph:dot-fill',
        href: '/portfolio/analytics',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'workspace-production',
    title: 'Production',
    icon: 'radix-icons:camera',
    href: '/production',
    items: [
      {
        key: 'production-reporting',
        title: 'Reporting',
        icon: 'ph:dot-fill',
        href: '/production/reporting',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'workspace-production',
    title: 'Partner',
    icon: 'fluent:handshake-20-regular',
    href: '/partner',
    items: [
      {
        key: 'production-reporting',
        title: 'Reporting',
        icon: 'ph:dot-fill',
        href: '/production/reporting',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'workspace-production',
    title: 'Campaign',
    icon: 'material-symbols-light:campaign-outline',
    href: '/campaign',
    items: [
      {
        key: 'production-reporting',
        title: 'Reporting',
        icon: 'ph:dot-fill',
        href: '/production/reporting',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'workspace-production',
    title: 'Spaces',
    icon: 'fluent:desk-48-regular',
    href: '/spaces',
    items: [
      {
        key: 'production-reporting',
        title: 'Reporting',
        icon: 'ph:dot-fill',
        href: '/production/reporting',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
];

export const privateRoutesV3 = [
  {
    key: 'overview',
    title: 'Dashboard ',
    icon: 'heroicons:home-modern-solid',
    href: paths.private.overview,
    items: [
      {
        key: 'notifications',
        title: 'Notifications',
        icon: 'nimbus:marketing',
        href: '/notifications',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'favorites',
    title: 'Favorites',
    icon: 'ic:baseline-star',
    href: paths.private.favorites,
    items: [
      {
        key: 'bev',
        title: 'BEV ',
        icon: 'tabler:map',
        href: paths.private.favorites_bev,
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'chat',
    title: 'Chat',
    icon: 'jam:messages-f',
    href: paths.private.chat,
    allowedRoles: ['admin', 'user', 'super_admin'],
  },
  {
    key: 'workspaces',
    title: 'Workspaces',
    icon: 'heroicons:rocket-launch-20-solid',
    items: workspacesItems,
  },
  {
    key: 'records',
    title: 'Records',
    icon: 'material-symbols-light:table-outline-sharp',
    href: paths.private.record,
    allowedRoles: ['admin', 'user', 'super_admin'],
  },
  {
    key: 'analytics',
    title: 'Analytics',
    icon: 'streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow',
    href: paths.private.analytics,
    items: [
      {
        key: 'by-platform',
        title: 'By Platform',
        href: paths.private.analytics_by_platform,
        icon: 'tabler:device-analytics',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-partner',
        title: 'By Partner',
        href: paths.private.analytics_by_partner,
        icon: 'ph:handshake-thin',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'users',
    title: 'Users',
    icon: 'mynaui:users',
    href: paths.private.users,
    allowedRoles: ['admin', 'super_admin'],
  },
  {
    key: 'newsletter',
    title: 'Newsletters',
    icon: 'cil:envelope-letter',
    href: paths.private.newsletters,
    allowedRoles: ['admin', 'super_admin'],
  },
];
