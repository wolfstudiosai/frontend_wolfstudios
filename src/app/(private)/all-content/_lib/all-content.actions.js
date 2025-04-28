import dayjs from 'dayjs';
import { toast } from 'sonner';

import { api } from '/src/utils/api';
import { getSearchQuery } from '/src/utils/helper';

export const getContentList = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/content-HQ${searchQuery}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getContentAsync = async (id) => {
  try {
    const res = await api.get(`/content-HQ/${id}`);
    if (!res.data.success) return;
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createContentAsync = async (data) => {
  const payload = contentPayload(data);

  try {
    let res = await api.post(`/content-HQ`, payload);

    if (!res.data.success) return;
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updateContentAsync = async (data) => {
  try {
    const payload = contentPayload(data);
    const res = await api.patch(`/content-HQ/${data.id}`, payload);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const deleteContentAsync = async (ids) => {
  try {
    const res = await api.delete(`/record/delete-records`, { data: { ids: ids } });
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createCommentAsync = async (contentID, data) => {
  try {
    const payload = {
      comment: data.comment,
    };
    const res = await api.post(`/content-HQ/${contentID}/comments`, payload);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

const contentPayload = (data) => ({
  ...(data.id && { id: data.id }), 
  name: data.name || '',
  revoPinterest: data.revoPinterest || '',
  pinAccountsUsed: data.pinAccountsUsed || '',
  postQuality: data.postQuality ? data.postQuality.split(',').map((item) => item.trim()) : [],
  googleDriveFiles: data.googleDriveFiles || '',
  playbookLink: data.playbookLink || '',
  upPromoteConversion: Number(data.upPromoteConversion) || 0,
  assetStatus: data.assetStatus || '',
  monthUploaded: data.monthUploaded ? dayjs(data.monthUploaded).format('YYYY-MM-DD') : '',
  revoInstagram: data.revoInstagram || '',
  creatorStatus: data.creatorStatus || '',
  partner: {
    IGLink: data.partner_IGLink || '',
    TikTokLink: data.partner_TikTokLink || '',
    TTShares: Number(data.partner_TTShares) || 0,
    TTSaves: Number(data.partner_TTSaves) || 0,
    TTViews: Number(data.partner_TTViews) || 0,
    TTLikes: Number(data.partner_TTLikes) || 0,
    TTComments: Number(data.partner_TTComments) || 0,
    YTLink: data.partner_YTLink || '',
  },
  IG: {
    SocialSetsUsed: data.ig_SocialSetsUsed || '',
    TotalComments: Number(data.ig_TotalComments) || 0,
    TotalLikes: Number(data.ig_TotalLikes) || 0,
    TotalShares: Number(data.ig_TotalShares) || 0,
    TotalViews: Number(data.ig_TotalViews) || 0,
  },
  YT: {
    ClubREVOTotalViews: Number(data.yt_ClubREVOTotalViews) || 0,
    PartnerTotalSaves: Number(data.yt_PartnerTotalSaves) || 0,
    PartnerTotalViews: Number(data.yt_PartnerTotalViews) || 0,
    PartnerTotalComments: Number(data.yt_PartnerTotalComments) || 0,
    PartnerTotalLikes: Number(data.yt_PartnerTotalLikes) || 0,
    REVOMADICTotalShares: Number(data.yt_REVOMADICTotalShares) || 0,
    REVOMADICTotalViews: Number(data.yt_REVOMADICTotalViews) || 0,
    REVOMADICTotalLikes: Number(data.yt_REVOMADICTotalLikes) || 0,
    REVOMADICTotalComments: Number(data.yt_REVOMADICTotalComments) || 0,
    ClubREVOTotalLikes: Number(data.yt_ClubREVOTotalLikes) || 0,
    AccountsUsed: data.yt_AccountsUsed || '',
  },
  Pinterest: {
    TotalPinClicks: Number(data.pinterest_TotalPinClicks) || 0,
    TotalViews: Number(data.pinterest_TotalViews) || 0,
  },
  REVO: {
    Twitter: data.revo_Twitter || '',
    TTViews: Number(data.revo_TTViews) || 0,
    TikTok: data.revo_TikTok || '',
    Youtube: data.revo_Youtube || '',
    ClubRevoYoutube: data.revo_ClubRevoYoutube || '',
  },
  tikTokAccountsused: data.tikTokAccountsused || '',
  TTDummyAccountsUsed: data.TTDummyAccountsUsed?.length > 0 ? data.TTDummyAccountsUsed.split(', ').filter(Boolean) : [],
  postingStatus: data.postingStatus || '',
  totalContributedEngagement: data.totalContributedEngagement || '',
  // Relations: Extract IDs from arrays of { value, label }
  campaigns: data.campaigns ? data.campaigns.map((item) => item.value).filter(Boolean) : [],
  cities: data.cities ? data.cities.map((item) => item.value).filter(Boolean) : [],
  products: data.products ? data.products.map((item) => item.value).filter(Boolean) : [],
  tags: data.tags ? data.tags.map((item) => item.value).filter(Boolean) : [],
  stakeholders: data.stakeholders ? data.stakeholders.map((item) => item.value).filter(Boolean) : [],
  partners: data.partners ? data.partners.map((item) => item.value).filter(Boolean) : [],
  retailPartners: data.retailPartners ? data.retailPartners.map((item) => item.value).filter(Boolean) : [],
  images: data?.images,
  videos: data?.videos,
});
