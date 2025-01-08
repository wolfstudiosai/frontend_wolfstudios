export const paths = {
  home: '/',
  checkout: '/checkout',
  contact: '/contact',
  pricing: '/pricing',

  dashboard: {
    overview: '/dashboard',
    records: '/dashboard/records',
    needs_offer_approval: '/dashboard/needs-offer-approval',
    partners_by_campaign: '/dashboard/partners-by-campaign',

    // settings
    profile: '/dashboard/settings/account',
    security: '/dashboard/settings/security',

    // admin
    users: '/dashboard/users',
    campaign: '/dashboard/campaign',
    createCampaign: '/dashboard/campaign/create',
    updateCampaign: (id) => `/dashboard/campaign/${id}/edit`,

    // can be removed later on
    settings: {
      account: '/dashboard/settings/account',
      billing: '/dashboard/settings/billing',
      integrations: '/dashboard/settings/integrations',
      notifications: '/dashboard/settings/notifications',
      team: '/dashboard/settings/team',
    },
    academy: { browse: '/dashboard/academy', details: (courseId) => `/dashboard/academy/courses/${courseId}` },
    analytics: '/dashboard/analytics',
    blank: '/dashboard/blank',
    blog: {
      list: '/dashboard/blog',
      details: (postId) => `/dashboard/blog/${postId}`,
      create: '/dashboard/blog/create',
    },
    calendar: '/dashboard/calendar',
    chat: {
      base: '/dashboard/chat',
      compose: '/dashboard/chat/compose',
      thread: (threadType, threadId) => `/dashboard/chat/${threadType}/${threadId}`,
    },
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
    portfolio: '/portfolio',
    campaign: '/campaign',
    profile: '/profile',
    content: '/content',
  },

  // will be removed
  auth: {
    default: {
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
      resetPassword: '/auth/reset-password',
      forgotPassword: '/auth/forgot-password',
    },
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
