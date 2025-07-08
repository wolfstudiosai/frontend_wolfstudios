export const defaultContent = (data) => {
  const defaultData = {
    id: data?.id || null,
    name: data?.Name || '',
    thumbnailImage: data?.ThumbnailImage || '',
    pinAccountsUsed: data?.pinAccountsUsed || '',

    googleDriveFiles: data?.googleDriveFiles || '',
    playbookLink: data?.playbookLink || '',
    uppromoteConversion: data?.uppromoteConversion || 0,
    assetStatus: data?.assetStatus || '',
    monthUploaded: data?.monthUploaded ? data.monthUploaded : '',
    revoInstagram: data?.revoInstagram || '',
    creatorStatus: data?.creatorStatus?.join(', ') || '',

    igPost4: data?.igPost4 || '',
    igPost3: data?.igPost3 || '',
    igPost2: data?.igPost2 || '',
    platform: data?.platform?.join(', ') || '',

    partnerIGLink: data?.partnerIGLink || '',
    partnerTikTokLink: data?.partnerTikTokLink || '',
    partnerTTShares: data?.partnerTTShares || 0,
    partnerTTSaves: data?.partnerTTSaves || 0,
    partnerTTViews: data?.partnerTTViews || 0,
    partnerTTLikes: data?.partnerTTLikes || 0,
    partnerTTComments: data?.partnerTTComments || 0,
    partnerYTLink: data?.partnerYTLink || '',

    igSocialSetsUsed: data?.igSocialSetsUsed || '',
    partnerIGTotalComments: data?.partnerIGTotalComments || 0,
    partnerIGTotalLikes: data?.partnerIGTotalLikes || 0,
    partnerIGTotalShares: data?.partnerIGTotalShares || 0,
    partnerIGTotalViews: data?.partnerIGTotalViews || 0,

    ytClubREVOTotalViews: data?.ytClubREVOTotalViews || 0,
    ytPartnerTotalSaves: data?.ytPartnerTotalSaves || 0,
    ytPartnerTotalViews: data?.ytPartnerTotalViews || 0,
    ytPartnerTotalComments: data?.ytPartnerTotalComments || 0,
    ytPartnerTotalLikes: data?.ytPartnerTotalLikes || 0,
    ytREVOMADICTotalShares: data?.ytREVOMADICTotalShares || 0,
    ytREVOMADICTotalViews: data?.ytREVOMADICTotalViews || 0,
    ytREVOMADICTotalLikes: data?.ytREVOMADICTotalLikes || 0,
    ytREVOMADICTotalComments: data?.ytREVOMADICTotalComments || 0,
    ytClubREVOTotalLikes: data?.ytClubREVOTotalLikes || 0,
    ytAccountsUsed: data?.ytAccountsUsed || '',

    pinterestTotalPinClicks: data?.pinterestTotalPinClicks || 0,
    pinterestTotalViews: data?.pinterestTotalViews || 0,

    revoPinterest: data?.revoPinterest || '',

    revoTwitter: data?.revoTwitter || '',
    revoTTViews: data?.revoTTViews || 0,
    revoTTLikes: data?.revoTTLikes || 0,
    revoTTComments: data?.revoTTComments || 0,
    revoTTSaves: data?.revoTTSaves || 0,
    revoTTShares: data?.revoTTShares || 0,

    revoIGTotalViews: data?.revoIGTotalViews || 0,
    revoIGTotalShares: data?.revoIGTotalShares || 0,
    revoIGTotalComments: data?.revoIGTotalComments || 0,
    revoIGTotalLikes: data?.revoIGTotalLikes || 0,

    audited: data?.audited || false,

    revoTikTok: data?.revoTikTok || '',
    revoYoutube: data?.revoYoutube || '',
    revoClubrevoYoutube: data?.revoClubrevoYoutube || '',

    clubREVOIGHandle: data?.clubREVOIGHandle || '',
    isFeatured: data?.isFeatured || false,

    tiktokAccountsUsed: data?.tiktokAccountsUsed || '',
    ttDummyAccountsUsed: data?.ttDummyAccountsUsed?.join(', ') || [],

    postingStatus: data?.postingStatus || '',
    postingQuality: data?.postingQuality?.join(', ') || '',
    totalContributedEngagement: data?.totalContributedEngagement || '',

    campaigns:
      data?.campaigns?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    cities:
      data?.cities?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    products:
      data?.products?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    tags:
      data?.tags?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    stakeholders:
      data?.stakeholders?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    partners:
      data?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    retailPartners:
      data?.retailPartners?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],

    images: data?.images || [],
    video: data?.video || [],
  };

  return defaultData;
};
