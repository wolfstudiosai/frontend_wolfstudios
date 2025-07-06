
export const defaultPartner = (data) => {
  const formattedValue = {
    id: data?.id || null,
    isFeatured: data?.isFeatured || false,
    name: data?.name || '',
    totalROI: data?.totalROI || 0,
    totalExpense: data?.totalExpense || 0,
    shippingFBAFeeGiftedPartners: data?.shippingFBAFeeGiftedPartners || 0,
    paypalFee: data?.paypalFee || 0,
    amazonReferralFee: data?.amazonReferralFee || 0,
    instagram: data?.instagram || '',
    instagramFollowing: data?.instagramFollowing || 0,
    profileStatus: data?.profileStatus?.map((item) => ({
      value: item,
      label: item,
    })) || [],
    linkedin: data?.linkedin || '',
    linkedinConnections: data?.linkedinConnections || 0,
    youtube: data?.youtube || '',
    youtubeFollowing: data?.youtubeFollowing || 0,
    snapchat: data?.snapchat || '',
    snapchatFollowing: data?.snapchatFollowing || 0,
    x: data?.x || '',
    xFollowing: data?.xFollowing || 0,
    pinterest: data?.pinterest || '',
    pinterestFollowing: data?.pinterestFollowing || 0,
    tiktok: data?.tiktok || '',
    tiktokFollowing: data?.tiktokFollowing || 0,
    facebook: data?.facebook || '',
    facebookFollowing: data?.facebookFollowing || 0,
    website: data?.website || '',
    medium: data?.medium || '',
    soundcloud: data?.soundcloud || '',
    spotify: data?.spotify || '',
    openToGifting: data?.openToGifting || true,
    mailingAddress: data?.mailingAddress || '',
    previousCollabExpense: data?.previousCollabExpense || 0,
    totalProductCOGExpense: data?.totalProductCOGExpense || 0,
    shippingExpense: data?.shippingExpense || 0,
    oneOffExpense: data?.oneOffExpense || 0,
    currentStatus: data?.currentStatus?.map((item) => ({
      value: item,
      label: item,
    })) || [],
    occupation: data?.occupation || '',
    paymentLink: data?.paymentLink || '',
    client: data?.client || '',
    notes: data?.notes || '',
    phone: data?.phone || '',
    podcast: data?.podcast || '',
    partner360Rate: data?.partner360Rate || 0,
    refusalReason: data?.refusalReason || '',
    twitch: data?.twitch || '',
    revoAmazonOrderConfirmationNumber: data?.revoAmazonOrderConfirmationNumber || '',
    amazonReviewLink: data?.amazonReviewLink || '',
    amazonReviewCupper: data?.amazonReviewCupper || '',
    amazonReviewThePill: data?.amazonReviewThePill || '',
    amazonStorefront: data?.amazonStorefront || '',
    campaignMonth: data?.campaignMonth || [],
    deliverables: data?.deliverables || '',
    googleDriveFiles: data?.googleDriveFiles || '',
    revoIGPost: data?.revoIGPost || '',
    journeyStep: data?.journeyStep || '',
    partnerIGRate: data?.partnerIGRate || 0,
    partnerTTRate: data?.partnerTTRate || 0,
    partnerYTRate: data?.partnerYTRate || 0,
    amountPaid: data?.amountPaid || 0,
    totalContributedEngagementByContent: data?.totalContributedEngagementByContent || 0,
    totalAudience: data?.totalAudience || 0,
    platformDeliverables: data?.platformDeliverables?.map((item) => ({
      value: item,
      label: item,
    })) || [],
    platforms: data?.platforms?.map((item) => ({
      value: item,
      label: item,
    })) || [],
    revosOffer: data?.revosOffer || '',
    remainingCredits: data?.remainingCredits || 0,
    ttPost: data?.ttPost || '',
    ugcPaymentStatus: data?.ugcPaymentStatus || '',
    email: data?.email || '',
    ugcRetainerAmount: data?.ugcRetainerAmount || 0,
    ugcTikTokLink: data?.ugcTikTokLink || '',
    revoUGCArmyTTUsernameAndPW: data?.revoUGCArmyTTUsernameAndPW || '',
    whatsapp: data?.whatsapp || '',
    ytPost: data?.ytPost || '',
    partnerPostViews: data?.partnerPostViews || 0,
    sourcedFrom: data?.sourcedFrom?.map((item) => ({
      value: item,
      label: item,
    })) || [],
    estimatedTaxes: data?.estimatedTaxes || 0,
    amazonTax: data?.amazonTax || 0,
    amazonKickback: data?.amazonKickback || 0,
    monthSourced: data?.monthSourced || "",
    clientStatus: data?.clientStatus || '',
    affiliatePlatform: data?.affiliatePlatform?.map((item) => ({
      value: item,
      label: item,
    })) || [],
    bookingLink: data?.bookingLink || '',
    ageBracket: data?.ageBracket?.map((item) => ({
      value: item,
      label: item,
    })) || [],
    hourlyRate: data?.hourlyRate || 0,
    linktree: data?.linktree || '',
    partnerUGCRate: data?.partnerUGCRate || 0,
    auditedJan2025: data?.auditedJan2025 || true,
    auditedJune2025: data?.auditedJune2025 || false,
    revosCounteroffer: data?.revosCounteroffer || '',
    amazonReviewWalkingPadPro: data?.amazonReviewWalkingPadPro || '',
    amazonReviewWalkingPadStandard: data?.amazonReviewWalkingPadStandard || '',
    amazonReviewOil: data?.amazonReviewOil || '',
    amazonReviewSoothingCream: data?.amazonReviewSoothingCream || '',
    amazonReviewBeautyWand: data?.amazonReviewBeautyWand || '',
    openToWhitelisting: data?.openToWhitelisting || true,
    levantaID: data?.levantaID || 0,
    impactID: data?.impactID || 0,
    shareasaleID: data?.shareasaleID || 0,
    fbaXLevanta: data?.fbaXLevanta || 0,
    amazonOrderTotal: data?.amazonOrderTotal || 0,
    SecondPaymentDate: data?.SecondPaymentDate || "", // this is uppercase in the database
    lastEditedTime: data?.lastEditedTime || "2024-03-15T10:30:00.000Z", // why i have to send lastEditedTime

    // Image Arrays
    receipts: data?.receipts || [],
    mediaKit: data?.mediaKit || [],
    contracts: data?.contracts || [],
    partnerGallery: data?.partnerGallery || [],
    profileImage: data?.profileImage || [],


    //relations
    stakeholders: data?.stakeholders?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
    contentHQ: data?.contentHQ?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
    profileCategory: data?.profileCategory?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
    portfolios: data?.portfolios?.map((item) => ({
      value: item?.id,
      label: item?.projectTitle,
    })) || [],
    state: data?.state?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [], // Came as states
    city: data?.city?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [], // Came as cities
    services: data?.services?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
    caseStudies: data?.caseStudies?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
    productionHQ: data?.productionHQ?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
    products: data?.products?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
    contributedCampaigns: data?.contributedCampaigns?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [], // do not come in the response
    country: data?.country?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [], // Came as countries
    tags: data?.tags?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [], // do not come in the response
    retailPartners: data?.retailPartners?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [], // do not come in the response
    destinations: data?.destinations?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [], // do not come in the response
    proposedCampaigns: data?.proposedCampaigns?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
    productionHQ2: data?.productionHQ2?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
  };

  return formattedValue;
};
