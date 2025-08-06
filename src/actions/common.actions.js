import { toast } from 'sonner';

import { api } from '../utils/api';
import { getSearchQuery } from '../utils/helper';

export const getCityListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/cities${searchQuery}`;
    if (searchValue) {
      url += `&gate=and&fields[0][key]=name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`;
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getProductListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/products${searchQuery}`;
    if (searchValue) {
      url += `&gate=and&fields[0][key]=name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`;
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getTagListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/tags${searchQuery}`;
    if (searchValue) {
      url += `&gate=and&fields[0][key]=name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`;
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getStakeHolderListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/stakeholders${searchQuery}`;
    if (searchValue) {
      url += `&gate=and&fields[0][key]=name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`;
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getCountryListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/countries${searchQuery}`;
    if (searchValue) {
      url += `&gate=and&fields[0][key]=name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`;
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    // toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getStateListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/states${searchQuery}`;
    if (searchValue) {
      url += `&gate=and&fields[0][key]=name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`;
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    // toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getRetailPartnerListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/retail-partners${searchQuery}`;
    if (searchValue) {
      url += `&gate=and&fields[0][key]=name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`;
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getCaseStudyListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/case-studies${searchQuery}`;
    if (searchValue) {
      url += `&gate=and&fields[0][key]=Name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`;
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    // toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getDestinationListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/destinations${searchQuery}`;
    if (searchValue) {
      url += `&gate=and&fields[0][key]=name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`;
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    // toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getHomepageContentAsync = async () => {
  try {
    const res = await api.get(`/homepage-contents`);

    return { success: true, data: res.data.data?.data, count: res.data.data.count };
  } catch (error) {
    // toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createHomepageContentAsync = async (payload) => {
  try {
    const res = await api.post(`/homepage-contents`, payload);

    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updateHomepageContentAsync = async (order, payload) => {
  try {
    const res = await api.patch(`/homepage-contents/${order}`, payload);

    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

// homepage newsletter signup
export const createNewsletterSignup = async (email) => {
  try {
    const res = await api.post(`/newsletters`, { email });

    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getAllNewsletterSignupAsync = async (queryParams) => {
  try {
    const query = new URLSearchParams();
    if (queryParams.page) {
      query.append('page', queryParams.page);
    }
    if (queryParams.rowsPerPage) {
      query.append('size', queryParams.rowsPerPage);
    }
    if (queryParams.search) {
      query.append('search', queryParams.search);
    }
    const res = await api.get(`/newsletters?${query.toString()}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, data: [], error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const deleteNewsletterAsync = async (id, password) => {
  try {
    const res = await api.delete(`/newsletters/${id}`, {
      headers: {
        password: password,
      },
    });
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
