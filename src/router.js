import { paths } from './paths';

// public routes
export const navData = [
  {
    key: 'public-navitems',
    items: [
      { key: 'home', title: 'Home', href: paths.home },
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
        key: 'knowledge',
        title: 'Knowledge',
        items: [
          {
            key: 'about',
            title: 'About us',
            href: paths.public.about,
          },
          {
            key: 'contact',
            title: 'Contact',
            href: paths.public.contact,
          },
          {
            key: 'blog',
            title: 'Blog',
            href: paths.public.blog,
          },
        ],
      },
      {
        key: 'login',
        title: 'Login',
        href: paths.auth.default.sign_in,
      },
    ],
  },
];

// dashboard routes
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
        allowedRoles: ['admin', 'user'],
      },
      {
        key: 'analytics',
        title: 'Analytics',
        href: paths.dashboard.analytics,
        icon: 'hugeicons:analysis-text-link',
        allowedRoles: ['admin', 'user'],
      },
      {
        key: 'Campaign',
        title: 'Campaign',
        href: paths.dashboard.campaign,
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
        href: paths.dashboard.records,
        icon: 'pepicons-pencil:file',
        allowedRoles: ['admin'],
      },
      {
        key: 'partner',
        title: 'Partner HQ',
        href: paths.dashboard.partner,
        icon: 'lsicon:user-crowd-outline',
        allowedRoles: ['admin'],
      },
      {
        key: 'partners_by_campaign',
        title: 'Partners by campaign',
        href: paths.dashboard.partners_by_campaign,
        icon: 'ph:handshake-light',
        allowedRoles: ['admin'],
      },

      {
        key: 'needs_offer_approval',
        title: 'Needs offer/ approval',
        href: paths.dashboard.needs_offer_approval,
        icon: 'material-symbols-light:order-approve-outline-rounded',
        allowedRoles: ['admin'],
      },
      {
        key: 'usrs',
        title: 'Users',
        href: paths.dashboard.users,
        icon: 'solar:user-linear',
        allowedRoles: ['admin'],
      },
    ],
  },
];

// add all the dashboard routes that not in the dashboardItems
export const additionalRoutes = [
  {
    href: paths.dashboard.chat,
    allowedRoles: ['admin','user'],
  },
  {
    href: paths.dashboard.chat_compose,
    allowedRoles: ['admin','user'],
  },
  {
    href: paths.dashboard.chat_thread,
    allowedRoles: ['admin','user'],
  },
];
