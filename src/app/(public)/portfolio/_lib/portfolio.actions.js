import { toast } from 'sonner';

import { api } from '/src/utils/api';
import { getSearchQuery, isFilterValid } from '/src/utils/helper';

export const getPortfolioListAsync = async (pagination, filters) => {
  try {
    console.log(pagination, filters);
    let apiUrl = `/portfolios?page=${pagination.page}&size=${pagination.rowsPerPage}`;

    if (filters && filters.length > 0) {
      // check if all filters are valid
      const allFiltersValid = filters.every(isFilterValid);
      if (!allFiltersValid) {
        toast.error('Please fill all the fields');
        return;
      }

      const gate = 'and';
      const queryParts = [`gate=${gate}`];
      filters.forEach((filter, index) => {
        for (const key in filter) {
          if (key !== 'gate') {
            queryParts.push(`fields[${index}][${key}]=${encodeURIComponent(filter[key])}`);
          }
        }
      });
      const queryString = queryParts.join('&');
      apiUrl += `&${queryString}`;
    }

    const res = await api.get(apiUrl);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count, meta: res.data.data.meta };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
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

export const getPortfolioCategoryListAsync = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/portfolio-categories${searchQuery}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
