import { paths } from './paths';

// public routes
export const navData = [
  {
    key: 'public-navitems',
    items: [
      // { key: 'home', title: 'Home', href: paths.home },
      {
        key: 'HQs',
        title: 'HQs',
        items: [
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
            key: 'partner',
            title: 'Partner',
            href: paths.public.partner,
          },
        ],
      },
      {
        key: 'workshops',
        title: 'Workshops',
      },
      // {
      //   key: 'login',
      //   title: 'Login',
      //   href: paths.auth.default.sign_in,
      // },
    ],
  },
];

// dashboard public routes
export const footerNavData = [
  {
    key: 'public-navitems',
    items: [
      // { key: 'home', title: 'Home', href: paths.home },
      {
        key: 'HQs',
        title: 'HQs',
        items: [
          {
            key: 'portfolio',
            title: 'Portfolio',
            href: paths.dashboardPublic.portfolio,
          },
          {
            key: 'campaign',
            title: 'Campaign',
            href: paths.dashboardPublic.campaign,
          },
          {
            key: 'profile',
            title: 'Profile',
            href: paths.dashboardPublic.profile,
          },
          {
            key: 'content',
            title: 'Content',
            href: paths.dashboardPublic.content,
          },
          {
            key: 'partner',
            title: 'Partner',
            href: paths.dashboardPublic.partner,
          },
        ],
      },
      {
        key: 'workshops',
        title: 'Workshops',
      },
      // {
      //   key: 'login',
      //   title: 'Login',
      //   href: paths.auth.default.sign_in,
      // },
    ],
  },
];

// overview, campaign, portfolios, concepts, production, partners, spaces
export const dashboardPublicNavData = [
  {
    key: 'public-navitems',
    items: [
      // { key: 'home', title: 'Home', href: paths.home },

      {
        key: 'overview',
        title: 'Overview',
        href: paths.dashboardPublic.campaign,
      },
      {
        key: 'campaign',
        title: 'Campaign',
        href: paths.dashboardPublic.campaign,
      },
      {
        key: 'portfolio',
        title: 'Portfolio',
        href: paths.dashboardPublic.campaign,
      },
      {
        key: 'concept',
        title: 'Content',
        href: paths.dashboardPublic.campaign,
      },
      {
        key: 'production',
        title: 'Production',
        href: paths.dashboardPublic.campaign,
      },
      {
        key: 'partner',
        title: 'Partner',
        href: paths.dashboardPublic.campaign,
      },
      {
        key: 'spaces',
        title: 'Spaces',
        href: paths.dashboardPublic.campaign,
      },
    ],
  },
];

// dashboard routes
export const privateRoutes = [
  {
    key: 'general',
    title: 'General',
    items: [
      {
        key: 'overview',
        title: 'Overview',
        href: paths.private.overview,
        icon: 'material-symbols-light:overview-outline-rounded',
        allowedRoles: ['admin', 'user'],
      },
      {
        key: 'analytics',
        title: 'Analytics',
        href: paths.private.analytics,
        icon: 'hugeicons:analysis-text-link',
        allowedRoles: ['admin', 'user'],
      },
      {
        key: 'campaign',
        title: 'Campaign',
        href: paths.private.campaign,
        icon: 'material-symbols-light:ads-click',
        allowedRoles: ['admin', 'user'],
      },
    ],
  },
  {
    key: 'admin',
    title: 'Admin',
    items: [
      {
        key: 'records',
        title: 'Records',
        href: paths.private.records,
        icon: 'pepicons-pencil:file',
        allowedRoles: ['user'],
      },
      {
        key: 'partner',
        title: 'Partner HQ',
        href: paths.private.partner,
        icon: 'lsicon:user-crowd-outline',
        allowedRoles: ['admin'],
      },
      {
        key: 'partners_by_campaign',
        title: 'Partners by campaign',
        href: paths.private.partners_by_campaign,
        icon: 'ph:handshake-light',
        allowedRoles: ['admin'],
      },
      {
        key: 'needs_offer_approval',
        title: 'Needs offer/ approval',
        href: paths.private.needs_offer_approval,
        icon: 'material-symbols-light:order-approve-outline-rounded',
        allowedRoles: ['admin'],
      },
      {
        key: 'Portfolio',
        title: 'Portfolio',
        href: paths.private.portfolios,
        icon: 'fluent:document-copy-20-regular',
        allowedRoles: ['admin'],
      },
      {
        key: 'content',
        title: 'Content',
        icon: 'pepicons-pencil:file',
        allowedRoles: ['admin'],
        items: [
          {
            key: 'content',
            title: 'Content',
            href: paths.private.content,
            icon: 'lsicon:user-crowd-outline',
            allowedRoles: ['admin'],
          },
          {
            key: 'create_content',
            title: 'Add Content',
            href: paths.private.create_content,
            icon: 'fluent:document-copy-20-regular',
            allowedRoles: ['admin'],
          },
        ],
      },
      {
        key: 'usrs',
        title: 'Users',
        href: paths.private.users,
        icon: 'solar:user-linear',
        allowedRoles: ['admin'],
      },
      {
        key: 'chat',
        title: 'Chat',
        href: paths.private.chat,
        icon: 'fluent:chat-24-filled',
        allowedRoles: ['admin'],
      },
    ],
  },
];

// add all the dashboard routes that not in the dashboardItems
export const additionalRoutes = [
  {
    href: paths.dashboard.chat,
    allowedRoles: ['admin', 'user'],
  },
];
