import { getSearchQuery } from '@/helper/common';
import { api, publicApi } from '@/utils/api';
import { uploadFileAsync } from '@/utils/upload-file';
import { ConsoleLogger } from 'aws-amplify/utils';
import { toast } from 'sonner';

export const getCampaignListAsync = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/campaign${searchQuery}`);
    return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getCampaignAsync = async (slug) => {
  try {
    const res = await api.get(`/campaign?slug=${slug}`);
    return { success: true, data: res.data.data[0], totalRecords: res.data.meta.total };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createCampaignAsync = async (file, data) => {
  try {
    const { slug, ...rest } = data;
    let thumbnailPath = '';
    if (file) {
      const uploadResponse = await uploadFileAsync(file);
      thumbnailPath = uploadResponse[0].path;
    }
    const campaignResponse = await api.post(`/campaign/add-campaign`, {
      ...rest,
      thumbnail: thumbnailPath,
    });

    toast.success(campaignResponse.data.message);
    return { success: true, data: campaignResponse.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const updateUCampaignAsync = async (data) => {
  try {
    const { id, slug, user_id, created_at, updated_at, ...rest } = data;
    const res = await api.patch(`/campaign/update/${id}`, rest);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const deleteCampaignAsync = async (ids) => {
  try {
    const res = await api.delete(`/campaign/delete`, {
      data: { ids: ids },
    });
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
