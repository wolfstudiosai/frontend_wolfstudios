import { toast } from 'sonner';

import { cleanPayload } from '../../../../utils/cleanPayload';
import { api } from '/src/utils/api';
import { getDirtyFields } from '/src/utils/get-dirty-fields';
import { buildQueryParams, getSearchQuery, validateFilters } from '/src/utils/helper';

export const getSpaceListAsync = async (queryParams, filters, gate) => {
  try {
    let apiUrl = `/spaces?page=${queryParams.page}&size=${queryParams.rowsPerPage}`;
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
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getSpaceAsync = async (id) => {
  try {
    const res = await api.get(`/spaces/${id}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createSpaceAsync = async (data) => {
  try {
    const cleanedData = cleanPayload(data);
    const res = await api.post('/spaces', data);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updateSpaceAsync = async (oldData, newData) => {
  try {
    const modifiedDataOnly = getDirtyFields(oldData, newData);
    const { id, ...rest } = modifiedDataOnly;
    const res = await api.patch(`/spaces/${id}`, rest);
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

export const deleteSingleSpaceAsync = async (id, password) => {
  try {
    const res = await api.delete(`/spaces/${id}`, {
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
