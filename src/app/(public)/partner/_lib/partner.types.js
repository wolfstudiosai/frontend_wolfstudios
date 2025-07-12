export const defaultPartner = (data) => {
  const formattedValue = {
    id: data?.id || null,
    name: data?.name || '',
    totalROI: Number(data?.totalROI) || 0,
    totalExpense: Number(data?.totalExpense) || 0,
    shippingFBAFeeGiftedPartners: Number(data?.shippingFBAFeeGiftedPartners) || 0,
    paypalFee: Number(data?.paypalFee) || 0,
    amazonReferralFee: Number(data?.amazonReferralFee) || 0,
    instagram: data?.instagram || '',
    profileStatus: Array.isArray(data?.profileStatus) ? data.profileStatus : [],
    linkedinConnections: Number(data?.linkedinConnections) || 0,
    youtubeFollowing: Number(data?.youtubeFollowing) || 0,
    snapchatFollowing: Number(data?.snapchatFollowing) || 0,
    xFollowing: Number(data?.xFollowing) || 0,
    pinterestFollowing: Number(data?.pinterestFollowing) || 0,
    tiktokFollowing: Number(data?.tiktokFollowing) || 0,
    facebookFollowing: Number(data?.facebookFollowing) || 0,
    instagramFollowing: Number(data?.instagramFollowing) || 0,
    website: data?.website || '',
    medium: data?.medium || '',
    soundcloud: data?.soundcloud || '',
    spotify: data?.spotify || '',
    openToGifting: Boolean(data?.openToGifting) || false,
    mailingAddress: data?.mailingAddress || '',
    previousCollabExpense: Number(data?.previousCollabExpense) || 0,
    totalProductCOGExpense: Number(data?.totalProductCOGExpense) || 0,
    shippingExpense: Number(data?.shippingExpense) || 0,
    oneOffExpense: Number(data?.oneOffExpense) || 0,
    currentStatus: Array.isArray(data?.currentStatus) ? data.currentStatus : [],
    occupation: data?.occupation || '',
    paymentLink: data?.paymentLink || '',
    client: data?.client || '',
    notes: data?.notes || '',
    facebook: data?.facebook || '',
    linkedin: data?.linkedin || '',
    phone: data?.phone || '',
    pinterest: data?.pinterest || '',
    podcast: data?.podcast || '',
    partner360Rate: Number(data?.partner360Rate) || 0,
    refusalReason: data?.refusalReason || '',
    snapchat: data?.snapchat || '',
    twitch: data?.twitch || '',
    x: data?.x || '',
    tiktok: data?.tiktok || '',
    youtube: data?.youtube || '',
    revoAmazonOrderConfirmationNumber: data?.revoAmazonOrderConfirmationNumber || '',
    amazonReviewLink: data?.amazonReviewLink || '',
    amazonReviewCupper: data?.amazonReviewCupper || '',
    amazonReviewThePill: data?.amazonReviewThePill || '',
    amazonStorefront: data?.amazonStorefront || '',
    campaignMonth: Array.isArray(data?.campaignMonth) ? data.campaignMonth : [],
    deliverables: data?.deliverables || '',
    googleDriveFiles: data?.googleDriveFiles || '',
    revoIGPost: data?.revoIGPost || '',
    journeyStep: data?.journeyStep || '',
    partnerIGRate: Number(data?.partnerIGRate) || 0,
    partnerTTRate: Number(data?.partnerTTRate) || 0,
    partnerYTRate: Number(data?.partnerYTRate) || 0,
    amountPaid: Number(data?.amountPaid) || 0,
    totalContributedEngagementByContent: Number(data?.totalContributedEngagementByContent) || 0,
    totalAudience: Number(data?.totalAudience) || 0,
    platformDeliverables: Array.isArray(data?.platformDeliverables) ? data.platformDeliverables : [],
    platforms: Array.isArray(data?.platforms) ? data.platforms : [],
    revosOffer: data?.revosOffer || '',
    remainingCredits: Number(data?.remainingCredits) || 0,
    ttPost: data?.ttPost || '',
    ugcPaymentStatus: data?.ugcPaymentStatus || '',
    email: data?.email || '',
    ugcRetainerAmount: Number(data?.ugcRetainerAmount) || 0,
    ugcTikTokLink: data?.ugcTikTokLink || '',
    revoUGCArmyTTUsernameAndPW: data?.revoUGCArmyTTUsernameAndPW || '',
    whatsapp: data?.whatsapp || '',
    ytPost: data?.ytPost || '',
    partnerPostViews: Number(data?.partnerPostViews) || 0,
    sourcedFrom: Array.isArray(data?.sourcedFrom) ? data.sourcedFrom : [],
    estimatedTaxes: Number(data?.estimatedTaxes) || 0,
    fbaXLevanta: Number(data?.fbaXLevanta) || 0,
    amazonOrderTotal: Number(data?.amazonOrderTotal) || 0,
    amazonTax: Number(data?.amazonTax) || 0,
    amazonKickback: Number(data?.amazonKickback) || 0,
    monthSourced: data?.monthSourced || '',
    secondPaymentDate: data?.secondPaymentDate || '',
    clientStatus: data?.clientStatus || '',
    affiliatePlatform: Array.isArray(data?.affiliatePlatform) ? data.affiliatePlatform : [],
    bookingLink: data?.bookingLink || '',
    ageBracket: Array.isArray(data?.ageBracket) ? data.ageBracket : [],
    hourlyRate: Number(data?.hourlyRate) || 0,
    linktree: data?.linktree || '',
    partnerUGCRate: Number(data?.partnerUGCRate) || 0,
    auditedJan2025: Boolean(data?.auditedJan2025) || false,
    revosCounteroffer: data?.revosCounteroffer || '',
    amazonReviewWalkingPadPro: data?.amazonReviewWalkingPadPro || '',
    amazonReviewWalkingPadStandard: data?.amazonReviewWalkingPadStandard || '',
    amazonReviewOil: data?.amazonReviewOil || '',
    amazonReviewSoothingCream: data?.amazonReviewSoothingCream || '',
    amazonReviewBeautyWand: data?.amazonReviewBeautyWand || '',
    openToWhitelisting: Boolean(data?.openToWhitelisting) || false,
    levantaID: Number(data?.levantaID) || 0,
    impactID: Number(data?.impactID) || 0,
    shareasaleID: Number(data?.shareasaleID) || 0,
    auditedJune2025: Boolean(data?.auditedJune2025) || false,
    isFeatured: Boolean(data?.isFeatured) || false,
    mediaKit: Array.isArray(data?.mediaKit) ? data.mediaKit : [],
    partnerGallery: Array.isArray(data?.partnerGallery) ? data.partnerGallery : [],
    receipts: Array.isArray(data?.receipts) ? data.receipts : [],
    contracts: Array.isArray(data?.contracts) ? data.contracts : [],
    thumbnailImage: typeof data?.thumbnailImage === 'string' ? [data.thumbnailImage] : null,

    stakeholders: Array.isArray(data?.stakeholders)
      ? data.stakeholders.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    contentHQ: Array.isArray(data?.contentHQ)
      ? data.contentHQ.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    profileCategory: Array.isArray(data?.profileCategory)
      ? data.profileCategory.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    portfolios: Array.isArray(data?.portfolios)
      ? data.portfolios.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    states: Array.isArray(data?.states)
      ? data.states.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    cities: Array.isArray(data?.cities)
      ? data.cities.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    services: Array.isArray(data?.services)
      ? data.services.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    caseStudies: Array.isArray(data?.caseStudies)
      ? data.caseStudies.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    productionHQ: Array.isArray(data?.productionHQ)
      ? data.productionHQ.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    products: Array.isArray(data?.products)
      ? data.products.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    contributedCampaigns: Array.isArray(data?.contributedCampaigns)
      ? data.contributedCampaigns.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    countries: Array.isArray(data?.countries)
      ? data.countries.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    tags: Array.isArray(data?.tags)
      ? data.tags.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    retailPartners: Array.isArray(data?.retailPartners)
      ? data.retailPartners.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    destinations: Array.isArray(data?.destinations)
      ? data.destinations.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    proposedCampaigns: Array.isArray(data?.proposedCampaigns)
      ? data.proposedCampaigns.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    productionHQ2: Array.isArray(data?.productionHQ2)
      ? data.productionHQ2.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
  };
  return formattedValue;
};
