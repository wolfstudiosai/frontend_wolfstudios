import { paths } from './paths';

// public header routes
export const publicRoutes = [
  {
    key: 'public-navitems',
    items: [
      // { key: 'home', title: 'Home', href: paths.home },
      {
        key: 'hq',
        title: 'HQ',
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
            key: 'partner',
            title: 'Partner',
            href: paths.dashboardPublic.partner,
          },
        ],
      },
      // {
      //   key: 'campaign',
      //   title: 'Campaign',
      //   href: paths.dashboardPublic.campaign,
      // },
      // {
      //   key: 'portfolio',
      //   title: 'Portfolio',
      //   href: paths.dashboardPublic.portfolio,
      // },
      // {
      //   key: 'concept',
      //   title: 'Content',
      //   href: paths.dashboardPublic.content,
      // },
      {
        key: 'production',
        title: 'Production',
        href: paths.dashboardPublic.production,
      },
      // {
      //   key: 'partner',
      //   title: 'Partner',
      //   href: paths.dashboardPublic.partner,
      // },
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
      {
        key: 'chat',
        title: 'Chat',
        href: paths.private.chat,
        icon: 'fluent:chat-24-filled',
        allowedRoles: ['admin', 'user'],
      }
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
        allowedRoles: ['admin'],
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
      {
        key: 'archive',
        title: 'Archive',
        href: paths.private.archive,
        icon: 'fluent:archive-24-filled',
        allowedRoles: ['admin'],
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

// footer New routes
export const NewfooterRoutes = [
  { label: 'Blog', href: '/blog' },
  { label: 'Learn', href: '/learn' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Help Docs', href: '/help' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Join', href: '/join' },

];