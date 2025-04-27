import { toast } from 'sonner';

import { api } from '/src/utils/api';
import { getSearchQuery } from '/src/utils/helper';
import { uploadFileAsync } from '/src/utils/upload-file';

export const getPartnerListAsync = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/partner-HQ${searchQuery}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getPartnerAsync = async (slug) => {
  try {
    const res = await api.get(`/partner-HQ?slug=${slug}`);
    return { success: true, data: res.data.data[0], totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createPartnerAsync = async (data) => {
  try {
    const { id, created_by, user_id, updated_at, ...rest } = data;
    const partnerResponse = await api.post('/partner-HQ', {
      ...rest,
    });
    toast.success(partnerResponse.data.message);
    return { success: true, data: partnerResponse.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const updatePartnerAsyncOld = async (data) => {
  try {
    const { id, user_id, created_by, created_at, updated_at, ...rest } = data;
    const res = await api.patch(`/partner/update/${id}`, {
      ...rest,
    });
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updatePartnerAsync = async (data, file = null) => {
  debugger;
  try {
    const { id, user_id, created_by, created_at, updated_at, ...rest } = data;
    let profile_image = '';
    if (file) {
      const uploadResponse = await uploadFileAsync(file);
      profile_image = uploadResponse[0].path;
    }
    const res = await api.patch(`/partner-HQ/${id}`, {
      ...rest,
      profile_image: profile_image ? profile_image : data.thumbnail,
    });
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const deletePartnerAsync = async (ids) => {
  try {
    const res = await api.delete('/partner/delete', {
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
    const res = await api.delete('/file/delete-files', {
      data: { paths },
    });
    // toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
