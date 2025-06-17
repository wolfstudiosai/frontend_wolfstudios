import { getSearchQuery } from "../utils/helper";
import { api } from "../utils/api";
import { toast } from "sonner";

export const getCityListAsync = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/cities${searchQuery}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getProductListAsync = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/products${searchQuery}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getTagListAsync = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/tags${searchQuery}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getStakeHolderListAsync = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/stakeholders${searchQuery}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getCountryListAsync = async (queryParams, searchValue) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    let url = `/countries${searchQuery}`
    if (searchValue) {
      url += `&gate=and&fields[0][key]=Name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`
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
    let url = `/states${searchQuery}`
    if (searchValue) {
      url += `&gate=and&fields[0][key]=Name&fields[0][operator]=contains&fields[0][type]=string&fields[0][value]=${searchValue}`
    }
    const res = await api.get(url);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    // toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getRetailPartnerListAsync = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/retail-partners${searchQuery}`);
    return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};