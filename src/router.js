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
export const privateRoutes = [
  {
    key: 'general',
    title: 'General',
    icon: 'solar:hashtag-line-duotone',
    items: [
      {
        key: 'overview',
        title: 'Overview',
        href: paths.private.overview,
        icon: 'material-symbols-light:overview-outline-rounded',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'performance',
        title: 'Performance',
        href: paths.private.performance,
        icon: 'fluent:arrow-growth-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'analytics',
        title: 'Analytics',
        href: paths.private.analytics,
        icon: 'material-symbols-light:analytics-outline-rounded',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'notifications',
        title: 'Notifications',
        href: paths.private.notification,
        icon: 'material-symbols-light:notifications-outline-rounded',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'expense',
        title: 'Expense',
        href: paths.private.expense,
        icon: 'stash:wallet-light',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'contracts',
        title: 'Contracts',
        href: paths.private.contract,
        icon: 'material-symbols-light:contract-edit-outline-sharp',
        count: 8,
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'calender',
        title: 'Calender',
        href: paths.private.calender,
        icon: 'uit:calender',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'user',
        title: 'User Management',
        href: paths.private.user,
        icon: 'hugeicons:user-multiple',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'partner_hq',
    title: 'Partner HQ',
    icon: 'arcticons:partnerkaart',
    items: [
      {
        key: 'needs_approval',
        title: 'Needs Approval',
        href: paths.private.partner_needs_approval,
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'waiting_area',
        title: 'Waiting Area',
        href: paths.private.waiting_area,
        icon: 'hugeicons:clock-04',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'talent',
        title: 'Talent',
        href: paths.private.talent,
        icon: 'solar:user-linear',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'production_hq',
    title: 'Production HQ',
    icon: 'iconoir:at-sign',
    items: [
      {
        key: 'studios',
        title: 'Studios',
        href: paths.private.studio,
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'crew',
        title: 'Crew',
        href: paths.private.crew,
        icon: 'hugeicons:clock-04',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'onsite_location',
        title: 'Onsite Locatios',
        href: paths.private.onsite_location,
        icon: 'solar:user-linear',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'venues',
        title: 'Venues',
        href: paths.private.venue,
        icon: 'solar:user-linear',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'content_hq',
    title: 'Content HQ',
    icon: 'fa6-solid:dollar-sign',
    items: [
      {
        key: 'all_content',
        title: 'All Content',
        href: paths.private.all_content,
        icon: 'lsicon:list-outline',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'content_discovery',
        title: 'Discovery',
        href: paths.dashboardPublic.partner,
        icon: 'iconamoon:discover-light',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'needs_approval',
        title: 'Needs Approval',
        href: paths.private.content_needs_approval,
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by_platform',
        title: 'By Platform',
        href: paths.private.by_platform,
        icon: 'hugeicons:clock-04',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'analytics',
        title: 'Analytics',
        href: paths.private.content_analytics,
        icon: 'solar:user-linear',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'campaign_hq',
    title: 'Campaign HQ',
    icon: 'nimbus:marketing',
    items: [
      {
        key: 'campaign_group',
        title: 'Campaign Group',
        href: paths.private.campaign_group,
        icon: 'formkit:group',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'revo',
        title: 'Revo',
        href: paths.private.revo,
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'add_new',
        title: 'Add New',
        href: paths.private.campaign_add_new,
        icon: 'hugeicons:clock-04',
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
    key: 'archive',
    title: 'Archive',
    icon: 'ph:archive-light',
    items: [
      {
        key: 'partner_by_campaing',
        title: 'Partner by Campaign',
        href: paths.private.partners_by_campaign,
        icon: 'tabler:point',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'needs_offer_approval',
        title: 'Needs Offer Approval',
        href: paths.private.needs_offer_approval,
        icon: 'tabler:point',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'records',
        title: 'Records',
        icon: 'material-symbols-light:data-table-outline',
        href: paths.private.record,
        allowedRoles: ['admin', 'user', 'super_admin'],
        // Optional: add a count if needed, e.g. count: 5,
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
    key: 'content',
    title: 'Content',
    icon: 'material-symbols:space-dashboard-outline',
    href: '/content/1',
    items: [
      {
        key: 'by-client',
        title: 'By Client',
        icon: 'nimbus:marketing',
        href: '/content/2',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-product',
        title: 'By Product',
        icon: 'ph:package-light',
        href: '/content/3',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'campaign',
    title: 'Campaign',
    icon: 'nimbus:marketing',
    href: '/campaign',
    allowedRoles: ['admin', 'user', 'super_admin'],
    items: [
      {
        key: 'by-client',
        title: 'By Client',
        icon: 'nimbus:marketing',
        href: '/campaign/1',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-product',
        title: 'By Product',
        icon: 'ph:package-light',
        href: '/campaign/2',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'partner',
    title: 'Partner',
    icon: 'nimbus:marketing',
    href: '/partner',
    allowedRoles: ['admin', 'user', 'super_admin'],
    items: [
      {
        key: 'by-client',
        title: 'By Client',
        icon: 'nimbus:marketing',
        href: '/partner/1',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-product',
        title: 'By Product',
        icon: 'ph:package-light',
        href: '/partner/2',
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
];
