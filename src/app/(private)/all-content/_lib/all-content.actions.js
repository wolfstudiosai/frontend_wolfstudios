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

export const getContent = async (id) => {
  try {
    // const res = await api.get(`/record?id=${id}`);
    const res = await api.get(`/content-HQ/${id}`);
    if (!res.data.success) return;
    return { success: true, data: res.data.data[0] };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createContentAsync = async (file, data) => {
  try {
    const { ...rest } = data;
    // let res = await api.post(`/record/add-record`, rest);
    let res = await api.post(`/content-HQ`, rest);

    if (!res.data.success) return;
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updateContentAsync = async (data, file = null) => {
  try {
    debugger
    if (file) {
      const uploadResponse = await uploadFileAsync(file);
      profile_image = uploadResponse[0].path;
    }
    const payload = { ...data };
    // const res = await api.patch(`/record/update-record/${data.id}`, payload);
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
    // const res1 = await api.delete(`/content-HQ/${ids}`, {data: { ids: ids }}); //need to update from backend which can take multiple ids
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
      comment: data.comment
    };
    const res = await api.post(`/content-HQ/${contentID}/comments`, payload);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
