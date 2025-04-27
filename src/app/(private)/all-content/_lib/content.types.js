export const defaultContent = (data) => {
  const defaultData = {
    name: data?.name || '',
    revoPinterest: data?.revoPinterest || '',
    pinAccountsUsed: data?.pinAccountsUsed || '',
    postQuality: data?.postQuality?.join(', ') || [],
    googleDriveFiles: data?.googleDriveFiles || '',
    playbookLink: data?.playbookLink || '',
    upPromoteConversion: data?.upPromoteConversion || 0,
    assetStatus: data?.assetStatus || '',
    monthUploaded: data?.monthUploaded ? new Date(data?.monthUploaded) : null,
    revoInstagram: data?.revoInstagram || '',
    creatorStatus: data?.creatorStatus || '',
    partner_IGLink: data?.partner?.IGLink || '',
    partner_TikTokLink: data?.partner?.TikTokLink || '',
    partner_TTShares: data?.partner?.TTShares || 0,
    partner_TTSaves: data?.partner?.TTSaves || 0,
    partner_TTViews: data?.partner?.TTViews || 0,
    partner_TTLikes: data?.partner?.TTLikes || 0,
    partner_TTComments: data?.partner?.TTComments || 0,
    partner_YTLink: data?.partner?.YTLink || '',

    ig_SocialSetsUsed: data?.IG?.SocialSetsUsed || '',
    ig_TotalComments: data?.IG?.TotalComments || 0,
    ig_TotalLikes: data?.IG?.TotalLikes || 0,
    ig_TotalShares: data?.IG?.TotalShares || 0,
    ig_TotalViews: data?.IG?.TotalViews || 0,

    yt_ClubREVOTotalViews: data?.YT?.ClubREVOTotalViews || 0,
    yt_PartnerTotalSaves: data?.YT?.PartnerTotalSaves || 0,
    yt_PartnerTotalViews: data?.YT?.PartnerTotalViews || 0,
    yt_PartnerTotalComments: data?.YT?.PartnerTotalComments || 0,
    yt_PartnerTotalLikes: data?.YT?.PartnerTotalLikes || 0,
    yt_REVOMADICTotalShares: data?.YT?.REVOMADICTotalShares || 0,
    yt_REVOMADICTotalViews: data?.YT?.REVOMADICTotalViews || 0,
    yt_REVOMADICTotalLikes: data?.YT?.REVOMADICTotalLikes || 0,
    yt_REVOMADICTotalComments: data?.YT?.REVOMADICTotalComments || 0,
    yt_ClubREVOTotalLikes: data?.YT?.ClubREVOTotalLikes || 0,
    yt_AccountsUsed: data?.YT?.AccountsUsed || '',

    pinterest_TotalPinClicks: data?.Pinterest?.TotalPinClicks || 0,
    pinterest_TotalViews: data?.Pinterest?.TotalViews || 0,

    revo_Twitter: data?.REVO?.Twitter || '',
    revo_TTViews: data?.REVO?.TTViews || 0,
    revo_TikTok: data?.REVO?.TikTok || '',
    revo_Youtube: data?.REVO?.Youtube || '',
    revo_ClubRevoYoutube: data?.REVO?.ClubRevoYoutube || '',

    tikTokAccountsused: data?.tikTokAccountsused || '',
    TTDummyAccountsUsed: data?.TTDummyAccountsUsed?.join(', ') || '',

    postingStatus: data?.postingStatus || '',
    totalContributedEngagement: data?.totalContributedEngagement || '',

    campaigns:
      data?.campaigns?.map((item) => ({
        value: item?.Spaces?.id,
        label: item?.Spaces?.Name,
      })) || [],
    cities:
      data?.campaigns?.map((item) => ({
        value: item?.Spaces?.id,
        label: item?.Spaces?.Name,
      })) || [],
    products:
      data?.campaigns?.map((item) => ({
        value: item?.Spaces?.id,
        label: item?.Spaces?.Name,
      })) || [],
    tags:
      data?.campaigns?.map((item) => ({
        value: item?.Spaces?.id,
        label: item?.Spaces?.Name,
      })) || [],
    stakeholders:
      data?.campaigns?.map((item) => ({
        value: item?.Spaces?.id,
        label: item?.Spaces?.Name,
      })) || [],
    partners:
      data?.campaigns?.map((item) => ({
        value: item?.Spaces?.id,
        label: item?.Spaces?.Name,
      })) || [],
    retailPartners:
      data?.campaigns?.map((item) => ({
        value: item?.Spaces?.id,
        label: item?.Spaces?.Name,
      })) || [],
  };

  return defaultData;
};
