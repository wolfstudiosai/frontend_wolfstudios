export const paths = {
  home: '/',
  checkout: '/checkout',
  contact: '/contact',
  pricing: '/pricing',

  dashboard: {
    root: '/dashboard',
    analytics: '/dashboard/analytics',

    // campaign
    campaign: '/dashboard/campaign',
    create_campaign: '/dashboard/campaign/create',
    campaign_view: '/dashboard/campaign/public-view',

    // records
    records: '/dashboard/records',

    // partner
    partner: '/dashboard/partner',
    create_partner: '/dashboard/partner/create',
    partner_view: '/dashboard/partner/view',

    portfolios: '/dashboard/portfolios',
    create_portfolio: '/dashboard/portfolios/add-portfolio',
    partners_by_campaign: '/dashboard/partners-by-campaign',
    needs_offer_approval: '/dashboard/needs-offer-approval',
    users: '/dashboard/users',

    // chat
    chat: '/dashboard/chat',
    chat_compose: '/dashboard/chat/compose',

    // settings
    profile: '/user-profile',
    security: '/dashboard/settings/security',

    // content
    content: '/dashboard/content',
    create_content: '/dashboard/add-content',

    // can be removed later on
    settings: {
      account: '/dashboard/settings/account',
      billing: '/dashboard/settings/billing',
      integrations: '/dashboard/settings/integrations',
      notifications: '/dashboard/settings/notifications',
      team: '/dashboard/settings/team',
    },
    academy: { browse: '/dashboard/academy', details: (courseId) => `/dashboard/academy/courses/${courseId}` },
    blank: '/dashboard/blank',
    blog: {
      list: '/dashboard/blog',
      details: (postId) => `/dashboard/blog/${postId}`,
      create: '/dashboard/blog/create',
    },
    calendar: '/dashboard/calendar',

    crypto: '/dashboard/crypto',
    customers: {
      list: '/dashboard/customers',
      create: '/dashboard/customers/create',
      details: (customerId) => `/dashboard/customers/${customerId}`,
    },
    eCommerce: '/dashboard/e-commerce',
    fileStorage: '/dashboard/file-storage',
    i18n: '/dashboard/i18n',
    invoices: {
      list: '/dashboard/invoices',
      create: '/dashboard/invoices/create',
      details: (invoiceId) => `/dashboard/invoices/${invoiceId}`,
    },
    jobs: {
      browse: '/dashboard/jobs',
      create: '/dashboard/jobs/create',
      companies: {
        overview: (companyId) => `/dashboard/jobs/companies/${companyId}`,
        reviews: (companyId) => `/dashboard/jobs/companies/${companyId}/reviews`,
        activity: (companyId) => `/dashboard/jobs/companies/${companyId}/activity`,
        team: (companyId) => `/dashboard/jobs/companies/${companyId}/team`,
        assets: (companyId) => `/dashboard/jobs/companies/${companyId}/assets`,
      },
    },
    logistics: { metrics: '/dashboard/logistics', fleet: '/dashboard/logistics/fleet' },
    mail: {
      list: (label) => `/dashboard/mail/${label}`,
      details: (label, emailId) => `/dashboard/mail/${label}/${emailId}`,
    },
    orders: {
      list: '/dashboard/orders',
      create: '/dashboard/orders/create',
      preview: (orderId) => `/dashboard/orders?previewId=${orderId}`,
      details: (orderId) => `/dashboard/orders/${orderId}`,
    },
    products: {
      list: '/dashboard/products',
      create: '/dashboard/products/create',
      preview: (productId) => `/dashboard/products?previewId=${productId}`,
      details: (productId) => `/dashboard/products/${productId}`,
    },
    social: {
      profile: { timeline: '/dashboard/social/profile', connections: '/dashboard/social/profile/connections' },
      feed: '/dashboard/social/feed',
    },
    tasks: '/dashboard/tasks',
  },

  public: {
    // HQs
    portfolio: '/portfolio',
    campaign: '/campaign',
    campaign_analytics: '/campaign-analytics',
    profile: '/profile',
    content: '/content',
    partner: '/partner',
    partner_contracts: '/partner/contracts',
    partner_waiting_area: '/partner/waiting-area',

    // knowledge base
    about: '/about',
    contact: '/contact',
    blog: '/blog',
  },

  private: {
    // admin
    overview: '/overview',
    favorites: '/favorites',
    favorites_bev: '/favorites/bev',
    performance: '/performance',
    admin_panel: '/admin-panel',
    analytics: '/analytics',
    analytics_by_platform: '/analytics/by-platform',
    analytics_by_partner: '/analytics/by-partner',
    reporting: '/reporting',
    reporting_by_partner: '/reporting/by-partner',
    reporting_by_product: '/reporting/by-product',
    reporting_by_campaign: '/reporting/by-campaign',
    reporting_by_production: '/reporting/by-production',

    notification: '/notification',
    record: '/records',
    users: '/users',
    blogs: '/blogs',
    newsletters: '/newsletters',
    archive_analytics: '/archive/analytics',
    expense: '/expense',
    contract: '/contract',
    calender: '/calender',
    user: '/users',

    // partner HQ
    partner_needs_approval: '/partner-needs-approval',
    waiting_area: '/waiting-area',
    talent: '/talent',

    // production hq
    studio: '/studio',
    crew: '/crew',
    onsite_location: '/onsite-location',
    venue: '/venue',

    // content HQ
    all_content: '/all-content',
    content_needs_approval: '/content-needs-approval',
    by_platform: '/by-platform',
    content_analytics: '/content-analytics',

    // campaign HQ
    campaign_group: '/campaign-group',
    revo: '/revo',
    campaign_add_new: '/campaign-add-new',

    //archive
    partners_by_campaign: '/partners-by-campaign',
    needs_offer_approval: '/needs-offer-approval',
    partner_private: '/partner-private',
    chat: '/workspace/chat',

    // contact
    dms: '/dms',
    activity: '/activity',
    channel: 'channel',

    // archive
    archive: '/archive',
    archive_records: '/records',
  },
  dashboardPublic: {
    // HQs
    portfolio: '/portfolio',
    campaign: '/campaign',
    campaign_by_client: '/campaign/by-client',
    campaign_by_product: '/campaign/by-product',
    profile: '/profile',
    content: '/all-content',
    content_new_content: '/all-content/new-content',
    content_discovery: '/all-content/discovery',
    content_discovery_by_partner: '/all-content/discovery/by-partner',
    content_discovery_by_product: '/all-content/discovery/by-product',
    content_discovery_by_campaign: '/all-content/discovery/by-campaign',
    content_discovery_by_production: '/all-content/discovery/by-production',
    partner: '/partner',
    production: '/production',
    production_project_drop: '/production/project-drop',
    production_revisions: '/production/revisions',
    production_creative_requests: '/production/creative-requests',
    spaces: '/spaces',
    services: '/services',

    // knowledge base
    about: '/about',
    contact: '/contact',
    blog: '/blog',
  },

  auth: {
    default: {
      sign_in: '/auth/sign-in',
      sign_up: '/auth/sign-up',
      not_authorized: '/auth/not-authorized',
      resetPassword: '/auth/reset-password',
      forgotPassword: '/auth/forgot-password',
    },
    // will be removed
    auth0: {
      callback: '/auth/auth0/callback',
      signIn: '/auth/auth0/sign-in',
      signUp: '/auth/auth0/sign-up',
      signOut: '/auth/auth0/sign-out',
      profile: '/auth/auth0/profile',
    },
    cognito: {
      signIn: '/auth/cognito/sign-in',
      signUp: '/auth/cognito/sign-up',
      signUpConfirm: '/auth/cognito/sign-up-confirm',
      newPasswordRequired: '/auth/cognito/new-password-required',
      resetPassword: '/auth/cognito/reset-password',
      updatePassword: '/auth/cognito/update-password',
    },
    firebase: {
      signIn: '/auth/firebase/sign-in',
      signUp: '/auth/firebase/sign-up',
      resetPassword: '/auth/firebase/reset-password',
      recoveryLinkSent: '/auth/firebase/recovery-link-sent',
      updatePassword: '/auth/firebase/update-password',
    },
    supabase: {
      callback: { implicit: '/auth/supabase/callback/implicit', pkce: '/auth/supabase/callback/pkce' },
      signIn: '/auth/supabase/sign-in',
      signUp: '/auth/supabase/sign-up',
      signUpConfirm: '/auth/supabase/sign-up-confirm',
      resetPassword: '/auth/supabase/reset-password',
      recoveryLinkSent: '/auth/supabase/recovery-link-sent',
      updatePassword: '/auth/supabase/update-password',
    },
    samples: {
      signIn: { centered: '/auth/samples/sign-in/centered', split: '/auth/samples/sign-in/split' },
      signUp: { centered: '/auth/samples/sign-up/centered', split: '/auth/samples/sign-up/split' },
      updatePassword: {
        centered: '/auth/samples/update-password/centered',
        split: '/auth/samples/update-password/split',
      },
      resetPassword: { centered: '/auth/samples/reset-password/centered', split: '/auth/samples/reset-password/split' },
      verifyCode: { centered: '/auth/samples/verify-code/centered', split: '/auth/samples/verify-code/split' },
    },
  },

  pdf: { invoice: (invoiceId) => `/pdf/invoices/${invoiceId}` },
  components: {
    index: '/components',
    buttons: '/components/buttons',
    charts: '/components/charts',
    colors: '/components/colors',
    detailLists: '/components/detail-lists',
    forms: '/components/forms',
    gridLists: '/components/grid-lists',
    groupedLists: '/components/grouped-lists',
    inputs: '/components/inputs',
    modals: '/components/modals',
    quickStats: '/components/quick-stats',
    tables: '/components/tables',
    typography: '/components/typography',
  },
  notAuthorized: '/errors/not-authorized',
  notFound: '/errors/not-found',
  internalServerError: '/errors/internal-server-error',
  docs: 'https://material-kit-pro-react-docs.devias.io',
  purchase: 'https://mui.com/store/items/devias-kit-pro',
};
