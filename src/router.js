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

// dashboard routes
export const privateRoutesV2 = [
  {
    key: 'overview',
    title: 'Dashboard ',
    icon: 'material-symbols:space-dashboard-outline',
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
    icon: 'iconamoon:heart-light',
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
    icon: 'fluent:chat-16-regular',
    href: paths.private.chat,
    // items: [
    //   {
    //     key: 'bev',
    //     title: 'BEV ',
    //     icon: 'tabler:map',
    //     href: paths.private.favorites_bev,
    //     allowedRoles: ['admin', 'user', 'super_admin'],
    //   },
    // ],
  },
  {
    key: 'analytics',
    title: 'Analytics',
    icon: 'material-symbols-light:overview-outline-rounded',
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
    key: 'reporting',
    title: 'Reporting',
    icon: 'material-symbols:bar-chart-rounded',
    href: paths.private.reporting,
    items: [
      {
        key: 'by-partner',
        title: 'By Partner',
        href: paths.private.reporting_by_partner,
        icon: 'ph:handshake-thin',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-product',
        title: 'By Product',
        href: paths.private.reporting_by_product,
        icon: 'ph:package-light',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-campaign',
        title: 'By Campaign',
        href: paths.private.reporting_by_campaign,
        icon: 'lucide:megaphone',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-production',
        title: 'By Production',
        href: paths.private.reporting_by_production,
        icon: 'material-symbols:factory-outline-rounded',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'records',
    title: 'Records',
    icon: 'material-symbols-light:data-table-outline',
    href: paths.private.record,
    allowedRoles: ['admin', 'user', 'super_admin'],
  },
  {
    key: 'partner_hq',
    title: 'Partner HQ',
    icon: 'arcticons:partnerkaart',
    href: paths.public.partner,
    items: [
      {
        key: 'contracts',
        title: 'Contracts',
        href: paths.public.partner_contracts,
        icon: 'material-symbols:contract-outline',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'waiting_area',
        title: 'Waiting Area',
        href: paths.public.partner_waiting_area,
        icon: 'hugeicons:clock-04',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'production_hq',
    title: 'Production HQ',
    icon: 'iconoir:at-sign',
    href: paths.dashboardPublic.production,
    items: [
      {
        key: 'project-drop',
        title: 'Project Drop',
        href: paths.dashboardPublic.production_project_drop,
        icon: 'material-symbols:list-alt-outline',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'revisions',
        title: 'Revisions',
        href: paths.dashboardPublic.production_revisions,
        icon: 'material-symbols:edit-document-outline',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'creative-requests',
        title: 'Creative Requests',
        href: paths.dashboardPublic.production_creative_requests,
        icon: 'material-symbols:lightbulb-outline',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'content-hq',
    title: 'Content HQ',
    icon: 'fa6-solid:dollar-sign',
    href: paths.dashboardPublic.content,
    items: [
      {
        key: 'new-content',
        title: 'New Content',
        href: paths.dashboardPublic.content_new_content,
        icon: 'formkit:group',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'discovery',
        title: 'Discovery',
        href: paths.dashboardPublic.content_discovery,
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
        items: [
          {
            key: 'by-partner',
            title: 'By Partner',
            href: paths.dashboardPublic.content_discovery_by_partner,
            icon: 'ph:handshake-thin',
            allowedRoles: ['admin', 'user', 'super_admin'],
          },
          {
            key: 'by-product',
            title: 'By Product',
            href: paths.dashboardPublic.content_discovery_by_product,
            icon: 'ph:package-light',
            allowedRoles: ['admin', 'user', 'super_admin'],
          },
          {
            key: 'by-campaign',
            title: 'By Campaign',
            href: paths.dashboardPublic.content_discovery_by_campaign,
            icon: 'lucide:megaphone',
            allowedRoles: ['admin', 'user', 'super_admin'],
          },
          {
            key: 'by-production',
            title: 'By Production',
            href: paths.dashboardPublic.content_discovery_by_production,
            icon: 'material-symbols:factory-outline-rounded',
            allowedRoles: ['admin', 'user', 'super_admin'],
          },
        ],
      },
    ],
  },
  {
    key: 'campaign-hq',
    title: 'Campaign HQ',
    icon: 'nimbus:marketing',
    href: paths.dashboardPublic.campaign,
    items: [
      {
        key: 'by-client',
        title: 'By Client',
        href: paths.dashboardPublic.campaign_by_client,
        icon: 'material-symbols:group-outline',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-product',
        title: 'By Product',
        href: paths.dashboardPublic.campaign_by_product,
        icon: 'ph:package-light',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'portfolio',
    title: 'Portfolio',
    href: paths.public.portfolio,
    icon: 'fluent:approvals-app-20-regular',
    allowedRoles: ['admin', 'user', 'super_admin'],
  },
  {
    key: 'admin-panel',
    title: 'Admin Panel',
    href: paths.private.admin_panel,
    icon: 'material-symbols:admin-panel-settings-outline',
    items: [
      {
        key: 'users',
        title: 'User Management',
        href: paths.private.user,
        icon: 'hugeicons:user-multiple',
        allowedRoles: ['admin', 'user', 'super_admin'],
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
    icon: 'material-symbols:space-dashboard-outline',
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
    icon: 'iconamoon:heart-light',
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
    icon: 'fluent:chat-12-regular',
    href: paths.private.chat,
    allowedRoles: ['admin', 'user', 'super_admin'],
  },
  {
    key: 'workspaces',
    title: 'Workspaces',
    icon: 'carbon:workspace',
    items: workspacesItems,
  },
  {
    key: 'records',
    title: 'Records',
    icon: 'material-symbols-light:data-table-outline',
    href: paths.private.record,
    allowedRoles: ['admin', 'user', 'super_admin'],
  },
  {
    key: 'analytics',
    title: 'Analytics',
    icon: 'mdi:analytics',
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
];
