import { toast } from 'sonner';

import { api } from '/src/utils/api';
import { getSearchQuery } from '/src/utils/helper';
import { uploadFileAsync } from '/src/utils/upload-file';

export const getSpaceListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/spaces${searchQuery}`
    if (searchValue) {
      url += `&gate=and&fields[0][key]=Name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getSpaceAsync = async (slug) => {
  try {
    const res = await api.get(`/spaces/${slug}`);
    return { success: true, data: res.data.data[0], totalRecords: res.data.meta.total };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createSpaceAsync = async (file, data) => {
  try {
    const { slug, id, created_by, user_id, updated_at, video_url, hero_image, field_image, thumbnail, vertical_gallery_images, horizontal_gallery_images, ...rest } = data;
    let thumbnailImage = '';
    if (file) {
      const uploadResponse = await uploadFileAsync(file);
      thumbnailImage = uploadResponse[0].path;
    }

    const spaceResponse = await api.post(`/spaces`, {
      ...rest,
    });

    toast.success(spaceResponse.data.message);
    return { success: true, data: spaceResponse.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const updateSpaceAsync = async (file, data) => {
  try {
    const { id, slug, user_id, created_by, created_at, updated_at, ...rest } = data;
    let thumbnailPath = '';
    if (file) {
      const uploadResponse = await uploadFileAsync(file);
      thumbnailPath = uploadResponse[0].path;
    }
    const res = await api.patch(`/spaces/${id}`, {
      ...rest,
      thumbnail: thumbnailPath ? thumbnailPath : data.thumbnail,
    });
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const deleteSpaceAsync = async (ids) => {
  try {
    const res = await api.delete(`/spaces/bulk`, {
      data: { IDs: ids },
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

export const getSpaceCategoryListAsync = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/portfolio-categories${searchQuery}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
