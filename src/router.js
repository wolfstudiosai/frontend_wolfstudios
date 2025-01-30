import { paths } from './paths';

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
        key: 'concept',
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
        href: paths.dashboardPublic.partner,
      },
      {
        key: 'spaces',
        title: 'Spaces',
        href: paths.dashboardPublic.spaces,
      },
      {
        key: 'chat',
        title: 'Chat',
        href: paths.private.chat,
      },
    ],
  },
];

// dashboard routes
export const privateRoutes = [
  {
    key: 'admin',
    // title: 'Admin',
    items: [
      {
        key: 'admin',
        title: 'Admin',
        icon: 'eos-icons:admin-outlined',
        items: [
          {
            key: 'overview',
            title: 'Overview',
            href: paths.private.overview,
            icon: 'material-symbols-light:overview-outline-rounded',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'performance',
            title: 'Performance',
            href: paths.private.performance,
            icon: 'fluent:arrow-growth-20-regular',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'analytics',
            title: 'Analytics',
            href: paths.private.analytics,
            icon: 'material-symbols-light:analytics-outline-rounded',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'notifications',
            title: 'Notifications',
            href: paths.private.notification,
            icon: 'material-symbols-light:notifications-outline-rounded',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'records',
            title: 'Records',
            href: paths.private.record,
            icon: 'material-symbols-light:data-table-outline',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'expense',
            title: 'Expense',
            href: paths.private.expense,
            icon: 'stash:wallet-light',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'contracts',
            title: 'Contracts',
            href: paths.private.contract,
            icon: 'material-symbols-light:contract-edit-outline-sharp',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'calender',
            title: 'Calender',
            href: paths.private.calender,
            icon: 'uit:calender',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'user',
            title: 'User Management',
            href: paths.private.user,
            icon: 'hugeicons:user-multiple',
            allowedRoles: ['admin', 'user'],
          },
        ],
      },
    ],
  },
  {
    key: 'partner_hq',
    // icon: 'material-symbols-light:handshake-outline-rounded',
    items: [
      {
        key: 'partner_hq',
        title: 'Partner HQ',
        icon: 'material-symbols-light:handshake-outline-rounded',
        items: [
          {
            key: 'needs_approval',
            title: 'Needs Approval',
            href: paths.private.partner_needs_approval,
            icon: 'fluent:approvals-app-20-regular',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'waiting_area',
            title: 'Waiting Area',
            href: paths.private.waiting_area,
            icon: 'hugeicons:clock-04',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'talent',
            title: 'Talent',
            href: paths.private.talent,
            icon: 'solar:user-linear',
            allowedRoles: ['admin', 'user'],
          },
        ],
      },
    ],
  },
  {
    key: 'production_hq',
    // icon: 'material-symbols-light:handshake-outline-rounded',
    items: [
      {
        key: 'production_hq',
        title: 'Production HQ',
        icon: 'qlementine-icons:camera-16',
        items: [
          {
            key: 'studios',
            title: 'Studios',
            href: paths.private.studio,
            icon: 'fluent:approvals-app-20-regular',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'crew',
            title: 'Crew',
            href: paths.private.crew,
            icon: 'hugeicons:clock-04',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'onsite_location',
            title: 'Onsite Locatios',
            href: paths.private.onsite_location,
            icon: 'solar:user-linear',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'venues',
            title: 'Venues',
            href: paths.private.venue,
            icon: 'solar:user-linear',
            allowedRoles: ['admin', 'user'],
          },
        ],
      },
    ],
  },
  {
    key: 'content_hq',
    // icon: 'material-symbols-light:handshake-outline-rounded',
    items: [
      {
        key: 'content_hq',
        title: 'Content HQ',
        icon: 'fluent:content-view-20-regular',
        items: [
          {
            key: 'needs_approval',
            title: 'Needs Approval',
            href: paths.private.content_needs_approval,
            icon: 'fluent:approvals-app-20-regular',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'by_platform',
            title: 'By Platform',
            href: paths.private.by_platform,
            icon: 'hugeicons:clock-04',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'analytics',
            title: 'Analytics',
            href: paths.private.content_analytics,
            icon: 'solar:user-linear',
            allowedRoles: ['admin', 'user'],
          },
        ],
      },
    ],
  },
  {
    key: 'campaign_hq',
    // icon: 'material-symbols-light:handshake-outline-rounded',
    items: [
      {
        key: 'campaign_hq',
        title: 'Campaign HQ',
        icon: 'nimbus:marketing',
        items: [
          {
            key: 'revo',
            title: 'Revo',
            href: paths.private.revo,
            icon: 'fluent:approvals-app-20-regular',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'add_new',
            title: 'Add New',
            href: paths.private.campaign_add_new,
            icon: 'hugeicons:clock-04',
            allowedRoles: ['admin', 'user'],
          },
        ],
      },
    ],
  },
  {
    key: 'archive',
    // icon: 'material-symbols-light:handshake-outline-rounded',
    items: [
      {
        key: 'archive',
        title: 'Archive',
        icon: 'material-symbols-light:archive-outline',
        items: [
          {
            key: 'partner_by_campaing',
            title: 'Partner by campaing ',
            href: paths.private.partners_by_campaign,
            icon: 'tabler:point',
            allowedRoles: ['admin', 'user'],
          },
          {
            key: 'needs_offer_approval',
            title: 'Needs Offer Approval',
            href: paths.private.needs_offer_approval,
            icon: 'tabler:point',
            allowedRoles: ['admin', 'user'],
          },
        ],
      },
    ],
  },
];

// footer routes
export const footerRoutes = [
  { label: 'Learn', href: '/learn' },
  { label: 'Chat', href: '/chat' },
  { label: 'Spectate', href: '/spectate' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collaborate', href: '/collaborate' },
];
