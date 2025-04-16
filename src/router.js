import { paths } from './paths';

const user = JSON.parse(localStorage.getItem('auth'));
const workspaces = user?.workspaces || [];

// public header routes
export const publicRoutes = [
  {
    key: 'public-navitems',
    items: [
      // { key: 'home', title: 'Home', href: paths.home },
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
      // {
      //   key: 'chat',
      //   title: 'Chat',
      //   href: paths.private.chat,
      // },
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
    key: 'analytics',
    title: 'Analytics',
    icon: 'solar:hashtag-line-duotone',
    items: [
      {
        key: 'by-platform',
        title: 'By Platform',
        href: '/analytics/by-platform',
        icon: 'material-symbols-light:analytics-outline-rounded',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-partner',
        title: 'By Partner',
        href: '/analytics/by-partner',
        icon: 'fluent:arrow-growth-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'reporting',
    title: 'Reporting',
    icon: 'arcticons:partnerkaart',
    items: [
      {
        key: 'by-partner',
        title: 'By Partner',
        href: '/reporting/by-partner',
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-product',
        title: 'By Product',
        href: '/reporting/by-product',
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-campaign',
        title: 'By Campaign',
        href: '/reporting/by-campaign',
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-production',
        title: 'By Production',
        href: '/reporting/by-production',
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'partner_hq',
    title: 'Partner HQ',
    icon: 'iconoir:at-sign',
    items: [
      {
        key: 'contracts',
        title: 'Contracts',
        href: '/partner-hq/contracts',
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'waiting_area',
        title: 'Waiting Area',
        href: '/partner-hq/waiting-area',
        icon: 'hugeicons:clock-04',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'production_hq',
    title: 'Production HQ',
    icon: 'fa6-solid:dollar-sign',
    items: [
      {
        key: 'project-drop',
        title: 'Project Drop',
        href: 'production_hq/project-drop',
        icon: 'lsicon:list-outline',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'revisions',
        title: 'Revisions',
        href: '/project-drop/revisions',
        icon: 'iconamoon:discover-light',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'creative-requests',
        title: 'Creative Requests',
        href: '/project-drop/creative-requests',
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
      }
    ],
  },
  {
    key: 'content-hQ',
    title: 'Content HQ',
    icon: 'nimbus:marketing',
    items: [
      {
        key: 'new-content',
        title: 'New Content',
        href: '/content-hQ/new-content',
        icon: 'formkit:group',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'discovery',
        title: 'Discovery',
        href: '/content-hq/discovery',
        icon: 'fluent:approvals-app-20-regular',
        allowedRoles: ['admin', 'user', 'super_admin'],
        items: [
          {
            key: 'by-partner',
            title: 'By Partner',
            href: '/content-hQ/discovery/by-partner',
            icon: 'formkit:group',
            allowedRoles: ['admin', 'user', 'super_admin'],
          },
          {
            key: 'by-product',
            title: 'By Product',
            href: '/content-hQ/discovery/by-product',
            icon: 'formkit:group',
            allowedRoles: ['admin', 'user', 'super_admin'],
          },
          {
            key: 'by-campaign',
            title: 'By Campaign',
            href: '/content-hQ/discovery/by-campaign',
            icon: 'formkit:group',
            allowedRoles: ['admin', 'user', 'super_admin'],
          },
          {
            key: 'by-production',
            title: 'By Production',
            href: '/content-hQ/discovery/by-production',
            icon: 'formkit:group',
            allowedRoles: ['admin', 'user', 'super_admin'],
          },
        ]
      },
    ],
  },
  {
    key: 'campaign-hq',
    title: 'Campaign HQ',
    icon: 'ph:archive-light',
    items: [
      {
        key: 'by-client',
        title: 'By Client',
        href: 'campaign-hq/by-client',
        icon: 'tabler:point',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
      {
        key: 'by-product',
        title: 'By Product',
        href: 'campaign-hq/by-product',
        icon: 'tabler:point',
        allowedRoles: ['admin', 'user', 'super_admin'],
      }
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
    icon: 'ph:archive-light',
    items: [
      {
        key: 'users',
        title: 'User Management',
        href: paths.private.user,
        icon: 'tabler:point',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
];

// dashboard fav items
export const dashboardFavItemsV2 = [
  {
    key: 'overview',
    title: 'Dashboard ',
    icon: 'material-symbols-light:chat-outline-rounded',
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
    items: [
      {
        key: 'bev',
        title: 'BEV ',
        icon: 'nimbus:marketing',
        href: '/favorites/bev',
        allowedRoles: ['admin', 'user', 'super_admin'],
      },
    ],
  },
  {
    key: 'chat',
    title: 'Inbox',
    icon: 'fluent:chat-12-regular',
    href: '/chat2',
  },
];

// dashboard fav items
export const dashboardFavItems = [
  {
    key: 'workspaces',
    title: 'Workspaces',
    icon: 'material-symbols-light:chat-outline-rounded',
    items: [
      ...workspaces.map((workspace) => ({
        key: workspace.slug,
        title: workspace.name,
        icon: 'fluent:chat-12-regular',
        href: `/workspace/${workspace.slug}`,
        allowedRoles: ['admin', 'user', 'super_admin'],
      })),
      // {
      //   key: 'chat2',
      //   title: 'Workspace 1',
      //   icon: 'fluent:chat-12-regular',
      //   href: 'chat2',
      //   allowedRoles: ['admin', 'user', 'super_admin'],
      // },
      // {
      //   key: 'dms',
      //   title: 'DMs',
      //   icon: 'eva:message-circle-outline',
      //   href: paths.private.dms,
      //   allowedRoles: ['admin', 'user', 'super_admin'],
      // },
      // {
      //   key: 'activity',
      //   title: 'Activity',
      //   icon: 'mdi:bell-notification-outline',
      //   href: paths.private.activity,
      //   allowedRoles: ['admin', 'user', 'super_admin'],
      // },

      // {
      //   key: 'channel',
      //   title: 'Channel',
      //   icon: 'uil:channel',
      //   href: paths.private.channel,
      //   allowedRoles: ['admin', 'user', 'super_admin'],
      // },
    ],
  },
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
