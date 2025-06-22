import { toast } from 'sonner';

import { api } from '/src/utils/api';
import { validateFilters, buildQueryParams, getSearchQuery } from '/src/utils/helper';
import { uploadFileAsync } from '/src/utils/upload-file';

export const getCampainStatusListAsync = async () => {
  try {
    const res = await api.get(`/campaign-HQ?groupBy=status`);
    return {
      success: true,
      data: res.data.data.data,
    };
  } catch (error) {
    toast.error(error.message);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred'
    };
  }
};

export const getCampaignGroupListAsync = async (queryParams = {}) => {
  try {
    let searchQuery = '';
    if (Object.keys(queryParams).length > 0) {
      searchQuery = getSearchQuery(queryParams);
    }

    const res = await api.get(`/campaign-HQ${searchQuery}`);

    return {
      success: true,
      data: res.data.data.data,
      totalRecords: res.data.data.count,
    };
  } catch (error) {
    if (error.response?.status !== 404) {
      toast.error(error.message);
    }

    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};

export const getCampaignListAsync = async (pagination, filters, gate) => {
  try {
    let apiUrl = `/campaign-HQ?page=${pagination.page}&size=${pagination.rowsPerPage}`;

    if (filters && filters.length > 0) {
      // check if all filters are valid
      const allFiltersValid = validateFilters(filters);
      if (!allFiltersValid.valid) {
        toast.error(allFiltersValid.message);
        return;
      }

      const queryParams = buildQueryParams(filters, gate);
      apiUrl += `&${queryParams}`;
    }

    const res = await api.get(apiUrl);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count, meta: res.data.data.meta };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getCampaignAsync = async (id) => {
  try {
    const res = await api.get(`/campaign-HQ/${id}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createCampaignAsync = async (data) => {
  const payload = {};
  try {
    const response = await api.post(`/campaign-HQ`, data);

    toast.success(response.data.message);
    return { success: true, data: response.data.data };
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

export const updateCampaignAsync = async (id, data) => {
  const { id: campaign_id, ...rest } = data;
  try {
    const res = await api.patch(`/campaign-HQ/${id}`, rest);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updateUCampaignAsync = async (file, data) => {
  try {
    const { id, slug, user_id, created_by, created_at, updated_at, ...rest } = data;
    let thumbnailPath = '';
    if (file) {
      const uploadResponse = await uploadFileAsync(file);
      thumbnailPath = uploadResponse[0].path;
    }
    const res = await api.patch(`/campaign/update/${id}`, {
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

export const updateCampaignGroupAsync = async (data) => {
  try {
    const res = await api.patch(`/campaign-group/update/${data.id}`, data);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
export const deleteCampaignAsync = async (id, password) => {
  try {
    const res = await api.delete(`/campaign-HQ/${id}`, {
      data: null,
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

export const deleteCampaignBulkAsync = async (ids, password) => {
  try {
    const res = await api.delete(`campaign-HQ/bulk`, {
      data: { IDs: ids },
      headers: {
        password,
      },
    });

    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
}

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


// Views
export const getCampaignViews = async () => {
  try {
    const res = await api.get(`/views?table=CAMPAIGN`)
    return { success: true, data: res.data.data }
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
}

export const createCampaignView = async (data) => {
  try {
    const res = await api.post(`/views`, data);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
}