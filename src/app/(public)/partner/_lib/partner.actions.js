import { toast } from 'sonner';

import { api } from '/src/utils/api';
import { validateFilters, buildQueryParams } from '/src/utils/helper';

export const getPartnerListAsync = async (queryParams, filters, gate) => {
  try {
    let apiUrl = `/partner-HQ?page=${queryParams.page}&size=${queryParams.rowsPerPage}`;

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
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count, metaData: res.data.data.meta };
  } catch (error) {
    toast.error(error.response?.data?.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getPartnerAsync = async (id) => {
  try {
    const res = await api.get(`/partner-HQ/${id}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createPartnerAsync = async (data) => {
  try {
    const { id, ...rest } = partnerPayload(data);
    const partnerResponse = await api.post('/partner-HQ', rest);
    toast.success(partnerResponse.data.message);
    return { success: true, data: partnerResponse.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const updatePartnerAsync = async (data) => {
  try {
    const { id, ...rest } = partnerPayload(data);
    const res = await api.patch(`/partner-HQ/${id}`, rest);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const deletePartnerAsync = async (id, password) => {
  try {
    const res = await api.delete(`/partner-HQ/${id}`, {
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

const partnerPayload = (data) => {
  const { created_by, user_id, updated_at, ...rest } = data;
  return {
    ...rest,
    platformDeliverables: rest.platformDeliverables.map((i) => i.value),
    affiliatePlatform: rest.affiliatePlatform.map((i) => i.value),
    ageBracket: rest.ageBracket.map((i) => i.value),
    contracts: rest.contracts.map((i) => i.value),
    currentStatus: rest.currentStatus.map((i) => i.value),
    platforms: rest.platforms.url,
    profileStatus: rest.profileStatus.url,
    sourcedFrom: rest.sourcedFrom.url,
  };
};

// Views
export const getPartnerViews = async () => {
  try {
    const res = await api.get('/views?table=PARTNER');
    return { success: true, data: res.data.data };
  } catch (error) {
    // toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getSinglePartnerView = async (id) => {
  try {
    const res = await api.get(`/views/${id}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createPartnerView = async (data) => {
  try {
    const res = await api.post(`/views`, data);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updatePartnerView = async (id, data) => {
  try {
    const res = await api.patch(`/views/${id}`, data);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};


export const deletePartnerView = async (id) => {
  try {
    const res = await api.delete(`/views/${id}`);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
