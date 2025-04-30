export const defaultContent = (data) => {
  const defaultData = {
    id: data?.id || null,
    name: data?.Name || '',
    revoPinterest: data?.REVOPinterest || '',
    pinAccountsUsed: data?.PINAccountsUsed || '',
    postQuality: data?.PostingQuality?.join(', ') || '',
    googleDriveFiles: data?.GoogleDriveFiles || '',
    playbookLink: data?.PlaybookLink || '',
    upPromoteConversion: data?.UpPromoteConversion || 0,
    assetStatus: data?.AssetStatus || '',
    monthUploaded: data?.MonthUploaded ? new Date(data?.MonthUploaded) : null,
    revoInstagram: data?.REVOInstagram || '',
    creatorStatus: data?.CreatorStatus || '',

    partner_IGLink: data?.PartnerIGLink || '',
    partner_TikTokLink: data?.PartnerTikTokLink || '',
    partner_TTShares: data?.PartnerTTShares || 0,
    partner_TTSaves: data?.PartnerTTSaves || 0,
    partner_TTViews: data?.PartnerTTViews || 0,
    partner_TTLikes: data?.PartnerTTLikes || 0,
    partner_TTComments: data?.PartnerTTComments || 0,
    partner_YTLink: data?.PartnerYTLink || '',

    ig_SocialSetsUsed: data?.IGSocialSetsUsed || '',
    ig_TotalComments: data?.IGTotalComments || 0,
    ig_TotalLikes: data?.IGTotalLikes || 0,
    ig_TotalShares: data?.IGTotalShares || 0,
    ig_TotalViews: data?.IGTotalViews || 0,

    yt_ClubREVOTotalViews: data?.YTClubREVOTotalViews || 0,
    yt_PartnerTotalSaves: data?.YTPartnerTotalSaves || 0,
    yt_PartnerTotalViews: data?.YTPartnerTotalViews || 0,
    yt_PartnerTotalComments: data?.YTPartnerTotalcomments || 0,
    yt_PartnerTotalLikes: data?.YTPartnerTotallikes || 0,
    yt_REVOMADICTotalShares: data?.YTREVOMADICTotalShares || 0,
    yt_REVOMADICTotalViews: data?.YTREVOMADICTotalViews || 0,
    yt_REVOMADICTotalLikes: data?.YTREVOMADICTotalLikes || 0,
    yt_REVOMADICTotalComments: data?.YTREVOMADICTotalComments || 0,
    yt_ClubREVOTotalLikes: data?.YTClubREVOTotalLikes || 0,
    yt_AccountsUsed: data?.YTAccountsUsed || '',

    pinterest_TotalPinClicks: data?.PinterestTotalPinClicks || 0,
    pinterest_TotalViews: data?.PinterestTotalViews || 0,

    revo_Twitter: data?.REVOTwitter || '',
    revo_TTViews: data?.REVOTTViews || 0,
    revo_TikTok: data?.REVOTikTok || '',
    revo_Youtube: data?.REVOYoutube || '',
    revo_ClubRevoYoutube: data?.REVOClubrevoYoutube || '',

    tikTokAccountsused: data?.TikTokAccountsused || '',
    TTDummyAccountsUsed: data?.TTDummyAccountsUsed?.join(', ') || '',

    postingStatus: data?.PostingStatus || '',
    totalContributedEngagement: data?.TotalContributedEngagement || '',

    campaigns:
      data?.ByCampaignsContentHQ?.map((item) => ({
        value: item?.ContentHQ?.id,
        label: item?.ContentHQ?.Name,
      })) || [],
    cities:
      data?.ByCityContent?.map((item) => ({
        value: item?.ByCity?.id,
        label: item?.ByCity?.Name,
      })) || [],
    products:
      data?.ByProductContentHQ?.map((item) => ({
        value: item?.ContentHQ?.id,
        label: item?.ContentHQ?.Name,
      })) || [],
    tags:
      data?.ByTagsContent?.map((item) => ({
        value: item?.ByTags?.id,
        label: item?.ByTags?.Name,
      })) || [],
    stakeholders:
      data?.ContentHQStakeholder?.map((item) => ({
        value: item?.Stakeholder?.id,
        label: item?.Stakeholder?.Name,
      })) || [],
    partners:
      data?.ContentHQPartnerHQ?.map((item) => ({
        value: item?.PartnerHQ?.id,
        label: item?.PartnerHQ?.Name,
      })) || [],
    retailPartners:
      data?.ContentHQFacilitiesContributedContent?.map((item) => ({
        value: item?.FacilitiesContributedContent?.id,
        label: item?.FacilitiesContributedContent?.Name,
      })) || [],

      image: data?.Image || [],
      video: data?.Video || [],
  };

  return defaultData;
};
