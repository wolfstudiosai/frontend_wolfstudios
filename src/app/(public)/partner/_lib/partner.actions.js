import { toast } from 'sonner';

import { api } from '/src/utils/api';
import { getDirtyFields } from '/src/utils/get-dirty-fields';
import { buildQueryParams, validateFilters } from '/src/utils/helper';

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
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count, meta: res.data.data.meta };
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
    const partnerResponse = await api.post('/partner-HQ', data);
    toast.success(partnerResponse.data.message);
    return { success: true, data: partnerResponse.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const updatePartnerAsync = async (oldData, newData) => {
  try {
    const modifiedDataOnly = getDirtyFields(oldData, newData);
    const { id, ...rest } = modifiedDataOnly;
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
    profileStatus: rest.profileStatus?.map((i) => i.value) || [],
    currentStatus: rest.currentStatus?.map((i) => i.value) || [],
    platformDeliverables: rest.platformDeliverables?.map((i) => i.value) || [],
    platforms: rest.platforms?.map((i) => i.value) || [],
    ageBracket: rest.ageBracket?.map((i) => i.value) || [],
    affiliatePlatform: rest.affiliatePlatform?.map((i) => i.value) || [],
    sourcedFrom: rest.sourcedFrom?.map((i) => i.value) || [],
    stakeholders: rest.stakeholders?.map((i) => i.value) || [],
    contentHQ: rest.contentHQ?.map((i) => i.value) || [],
    profileCategory: rest.profileCategory?.map((i) => i.value) || [],
    portfolios: rest.portfolios?.map((i) => i.value) || [],
    state: rest.state?.map((i) => i.value) || [],
    city: rest.city?.map((i) => i.value) || [],
    services: rest.services?.map((i) => i.value) || [],
    caseStudies: rest.caseStudies?.map((i) => i.value) || [],
    productionHQ: rest.productionHQ?.map((i) => i.value) || [],
    products: rest.products?.map((i) => i.value) || [],
    contributedCampaigns: rest.contributedCampaigns?.map((i) => i.value) || [],
    country: rest.country?.map((i) => i.value) || [],
    tags: rest.tags?.map((i) => i.value) || [],
    retailPartners: rest.retailPartners?.map((i) => i.value) || [],
    destinations: rest.destinations?.map((i) => i.value) || [],
    proposedCampaigns: rest.proposedCampaigns?.map((i) => i.value) || [],
    productionHQ2: rest.productionHQ2?.map((i) => i.value) || [],
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

export const getSinglePartnerView = async (id, pagination) => {
  try {
    const res = await api.get(`/views/${id}?page=${pagination.pageNo}&size=${pagination.limit}`);
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
