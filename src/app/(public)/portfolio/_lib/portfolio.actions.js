import { toast } from 'sonner';

import { buildQueryParams, getSearchQuery, validateFilters } from '../../../../utils/helper';
import { api } from '/src/utils/api';

export const getPortfolioListAsync = async (pagination, filters, gate) => {
  try {
    let apiUrl = `/portfolios?page=${pagination.page}&size=${pagination.rowsPerPage}`;

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
    toast.error(error.response.data.message);
    return { success: false, data: [], error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getPortfolioAsync = async (id) => {
  try {
    const res = await api.get(`/portfolios/${id}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createPortfolioAsync = async (data) => {
  try {
    const campaignResponse = await api.post(`/portfolios`, {
      ...data,
    });

    toast.success(campaignResponse.data.message);
    return { success: true, data: campaignResponse.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const updatePortfolioAsync = async (id, data) => {
  try {
    const res = await api.patch(`/portfolios/${id}`, {
      ...data,
    });
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const deleteSinglePortfolioAsync = async (id, password) => {
  try {
    const res = await api.delete(`/portfolios/${id}`, {
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
export const deletePortfolioAsync = async (ids, password) => {
  try {
    const res = await api.delete(`/portfolios/bulk`, {
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

export const getPortfolioCategoryListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/portfolio-categories${searchQuery}`;
    if (searchValue) {
      url += `&gate=and&fields[0][key]=name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`;
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    // toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getPortfolioViews = async () => {
  try {
    const res = await api.get(`/views?table=PORTFOLIO`);
    return { success: true, data: res.data.data };
  } catch (error) {
    // toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getSinglePortfolioView = async (id, pagination) => {
  try {
    const res = await api.get(`/views/${id}?page=${pagination.pageNo}&size=${pagination.limit}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    // toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createPortfolioView = async (data) => {
  try {
    const res = await api.post(`/views`, data);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updatePortfolioView = async (id, data) => {
  try {
    const res = await api.patch(`/views/${id}`, data);
    // toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    // toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const deletePortfolioView = async (id) => {
  try {
    const res = await api.delete(`/views/${id}`);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
