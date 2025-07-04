import { toast } from 'sonner';

import { api } from '/src/utils/api';
import { getSearchQuery, validateFilters, buildQueryParams } from '/src/utils/helper';
import { uploadFileAsync } from '/src/utils/upload-file';

export const getProductionListAsync = async (queryParams, filters, gate) => {
  try {
    let apiUrl = `/production-HQ?page=${queryParams.page}&size=${queryParams.rowsPerPage}`;

    if (filters && filters.length > 0) {
      // check if all filters are valid
      const allFiltersValid = validateFilters(filters);
      if (!allFiltersValid.valid) {
        // toast.error(allFiltersValid.message);
        return;
      }
      const queryParams = buildQueryParams(filters, gate);
      apiUrl += `&${queryParams}`;
    }
    const res = await api.get(apiUrl);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count, meta: res.data.data.meta };
  } catch (error) {
    toast.error(error.response?.data?.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getProductionAsync = async (id) => {
  try {
    const res = await api.get(`/production-HQ/${id}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createProductionAsync = async (file, data) => {
  try {
    // const { slug, id, created_by, user_id, updated_at, video_url, hero_image, field_image, thumbnail, vertical_gallery_images, horizontal_gallery_images, ...rest } = data;
    const { slug, id, created_by, user_id, updated_at, ...rest } = data;
    let thumbnailImage = '';
    if (file) {
      const uploadResponse = await uploadFileAsync(file);
      thumbnailImage = uploadResponse[0].path;
    }

    const productionResponse = await api.post(`/production-HQ`, {
      ...rest,
    });

    toast.success(productionResponse.data.message);
    return { success: true, data: productionResponse.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const updateProductionAsync = async (file, data) => {
  try {
    const { id, slug, user_id, created_by, created_at, updated_at, ...rest } = data;
    let thumbnailPath = '';
    if (file) {
      const uploadResponse = await uploadFileAsync(file);
      thumbnailPath = uploadResponse[0].path;
    }
    const res = await api.patch(`/production-HQ/${id}`, {
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

export const deleteProductionAsync = async (ids, password) => {
  try {
    const res = await api.delete(`/production-HQ/bulk`, {
      data: { IDs: ids },
      headers: {
        Password: password,
      },
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

export const getProductionCategoryListAsync = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/portfolio-categories${searchQuery}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};


export const getProductionViewsAsync = async () => {
  try {
    const res = await api.get(`/views?table=PRODUCTION`);
    return { success: true, data: res.data.data };
  } catch (error) {
    // toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getSingleProductionViewAsync = async (id) => {
  try {
    const res = await api.get(`/views/${id}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    // toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createProductionViewAsync = async (data) => {
  try {
    const res = await api.post(`/views`, data);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};


export const updateProductionViewAsync = async (id, data) => {
  try {
    const res = await api.patch(`/views/${id}`, data);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};


export const deleteProductionViewAsync = async (id) => {
  try {
    const res = await api.delete(`/views/${id}`);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
