export const defaultContent = (data) => {
  const defaultData = {
    id: data?.id || null,
    name: data?.name || '',
    thumbnailImage: typeof data?.thumbnailImage === 'string' ? [data.thumbnailImage] : null,
    pinAccountsUsed: data?.pinAccountsUsed || '',

    googleDriveFiles: data?.googleDriveFiles || '',
    playbookLink: data?.playbookLink || '',
    uppromoteConversion: Number(data?.uppromoteConversion) || 0,
    assetStatus: data?.assetStatus || '',
    monthUploaded: data?.monthUploaded || '',
    revoInstagram: data?.revoInstagram || '',
    creatorStatus: Array.isArray(data?.creatorStatus) ? data.creatorStatus.join(', ') : data?.creatorStatus || '',

    igPost4: data?.igPost4 || '',
    igPost3: data?.igPost3 || '',
    igPost2: data?.igPost2 || '',
    platform: data?.platform || [],

    partnerIGLink: data?.partnerIGLink || '',
    partnerTikTokLink: data?.partnerTikTokLink || '',
    partnerTTShares: Number(data?.partnerTTShares) || 0,
    partnerTTSaves: Number(data?.partnerTTSaves) || 0,
    partnerTTViews: Number(data?.partnerTTViews) || 0,
    partnerTTLikes: Number(data?.partnerTTLikes) || 0,
    partnerTTComments: Number(data?.partnerTTComments) || 0,
    partnerYTLink: data?.partnerYTLink || '',

    igSocialSetsUsed: data?.igSocialSetsUsed || '',
    partnerIGTotalComments: Number(data?.partnerIGTotalComments) || 0,
    partnerIGTotalLikes: Number(data?.partnerIGTotalLikes) || 0,
    partnerIGTotalShares: Number(data?.partnerIGTotalShares) || 0,
    partnerIGTotalViews: Number(data?.partnerIGTotalViews) || 0,

    ytClubREVOTotalViews: Number(data?.ytClubREVOTotalViews) || 0,
    ytPartnerTotalSaves: Number(data?.ytPartnerTotalSaves) || 0,
    ytPartnerTotalViews: Number(data?.ytPartnerTotalViews) || 0,
    ytPartnerTotalComments: Number(data?.ytPartnerTotalComments) || 0,
    ytPartnerTotalLikes: Number(data?.ytPartnerTotalLikes) || 0,
    ytREVOMADICTotalShares: Number(data?.ytREVOMADICTotalShares) || 0,
    ytREVOMADICTotalViews: Number(data?.ytREVOMADICTotalViews) || 0,
    ytREVOMADICTotalLikes: Number(data?.ytREVOMADICTotalLikes) || 0,
    ytREVOMADICTotalComments: Number(data?.ytREVOMADICTotalComments) || 0,
    ytClubREVOTotalLikes: Number(data?.ytClubREVOTotalLikes) || 0,
    ytAccountsUsed: data?.ytAccountsUsed || '',

    pinterestTotalPinClicks: Number(data?.pinterestTotalPinClicks) || 0,
    pinterestTotalViews: Number(data?.pinterestTotalViews) || 0,

    revoPinterest: data?.revoPinterest || null,

    revoTwitter: data?.revoTwitter || '',
    revoTTViews: Number(data?.revoTTViews) || 0,
    revoTTLikes: Number(data?.revoTTLikes) || 0,
    revoTTComments: Number(data?.revoTTComments) || 0,
    revoTTSaves: Number(data?.revoTTSaves) || 0,
    revoTTShares: Number(data?.revoTTShares) || 0,

    revoIGTotalViews: Number(data?.revoIGTotalViews) || 0,
    revoIGTotalShares: Number(data?.revoIGTotalShares) || 0,
    revoIGTotalComments: Number(data?.revoIGTotalComments) || 0,
    revoIGTotalLikes: Number(data?.revoIGTotalLikes) || 0,

    audited: Boolean(data?.audited) || false,

    revoTikTok: data?.revoTikTok || '',
    revoYoutube: data?.revoYoutube || '',
    revoClubrevoYoutube: data?.revoClubrevoYoutube || '',

    clubREVOIGHandle: data?.clubREVOIGHandle || '',
    isFeatured: Boolean(data?.isFeatured) || false,

    tiktokAccountsUsed: data?.tiktokAccountsUsed || '',
    ttDummyAccountsUsed: Array.isArray(data?.ttDummyAccountsUsed)
      ? data.ttDummyAccountsUsed.join(', ')
      : data?.ttDummyAccountsUsed || '',
    postingStatus: Array.isArray(data?.postingStatus) ? data.postingStatus.join(', ') : data?.postingStatus || '',
    postingQuality: Array.isArray(data?.postingQuality) ? data.postingQuality.join(', ') : data?.postingQuality || '',
    totalContributedEngagement: Number(data?.totalContributedEngagement) || 0,

    campaigns: Array.isArray(data?.campaigns)
      ? data.campaigns.map((item) => ({
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
    products: Array.isArray(data?.products)
      ? data.products.map((item) => ({
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
    stakeholders: Array.isArray(data?.stakeholders)
      ? data.stakeholders.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    partners: Array.isArray(data?.partners)
      ? data.partners.map((item) => ({
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

    images: Array.isArray(data?.images) ? data.images : [],
    video: Array.isArray(data?.video) ? data.video : [],
  };

  return defaultData;
};
