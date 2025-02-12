import { api } from '@/utils/api';
import { getSearchQuery } from '@/utils/helper';
import { uploadFileAsync } from '@/utils/upload-file';
import { toast } from 'sonner';

export const getCampaignGroupListAsync = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/campaign-group${searchQuery}`);
    return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
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
    const { slug, id, created_by, user_id, updated_at, campaign_group_name, ...rest } = data;
    let campaign_image = '';
    if (file) {
      const uploadResponse = await uploadFileAsync(file);
      campaign_image = uploadResponse[0].path;
    }
    const campaignResponse = await api.post(`/campaign/add-campaign`, {
      ...rest,
      campaign_image,
    });

    toast.success(campaignResponse.data.message);
    return { success: true, data: campaignResponse.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};
export const createCampaignGroupAsync = async (data) => {
  try {
    const { created_at, updated_at, campaigns, ...rest } = data;
    const campaignResponse = await api.post(`/campaign-group/add`, rest);

    toast.success(campaignResponse.data.message);
    return { success: true, data: campaignResponse.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const updateCampaignAsync = async (file, data) => {
  try {
    const { id, slug, user_id, created_by, created_at, updated_at, campaign_group_name, campaign_group, ...rest } =
      data;
    let thumbnailPath = '';
    if (file) {
      const uploadResponse = await uploadFileAsync(file);
      thumbnailPath = uploadResponse[0].path;
    }
    const res = await api.patch(`/campaign/update/${id}`, {
      ...rest,
      campaign_image: thumbnailPath ? thumbnailPath : data.campaign_image,
    });
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

export const deleteFileAsync = async (paths) => {
  try {
    const res = await api.delete(`/file/delete-files`, {
      data: { paths },
    });
    // toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
