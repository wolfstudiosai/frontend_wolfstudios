import { toast } from 'sonner';
import { api } from '/src/utils/api';
import { getSearchQuery } from '/src/utils/helper';

export const getCountryListAsync = async (queryParams) => {
    try {
        const searchQuery = getSearchQuery(queryParams);
        const res = await api.get(`/countries${searchQuery}`);
        return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
    } catch (error) {
        toast.error(error.message);
        return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
    }
};

export const getStateListAsync = async (queryParams) => {
    try {
        const searchQuery = getSearchQuery(queryParams);
        const res = await api.get(`/states${searchQuery}`);
        return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
    } catch (error) {
        toast.error(error.message);
        return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
    }
};

export const getStakeholderListAsync = async (queryParams) => {
    try {
        const searchQuery = getSearchQuery(queryParams);
        const res = await api.get(`/stakeholders${searchQuery}`);
        return { success: true, data: res.data.data.data, totalRecords: res.data.data.count };
    } catch (error) {
        toast.error(error.message);
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