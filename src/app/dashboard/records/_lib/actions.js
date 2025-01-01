import { getSearchQuery } from "@/helper/common";
import { api, publicApi } from "@/utils/api";
import { toast } from "sonner";

export const getRecordList = async (queryParams) => {

    try {
        const searchQuery = getSearchQuery(queryParams);
        const res = await api.get(`/record${searchQuery}`);
        return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
    } catch (error) {
        toast.error(error.message)
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};
export const getRecord = async (id) => {
    try {
        const res = await api.get(`/record?id=${id}`);
        if (!res.data.success) return
        return { success: true, data: res.data.data[0] };
    } catch (error) {
        toast.error(error.message)
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};

export const createRecordAsync = async (data) => {
    try {
        const { ...rest } = data
        let res = await api.post(`/record/add-record`, rest);

        if (!res.data.success) return
        toast.success(res.data.message);
        return { success: true, data: res.data.data };
    } catch (error) {
        toast.error(error.message)
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};

export const updateRecordAsync = async (data) => {
    try {
        const payload = { ...data }
        const res = await api.patch(`/record/update-record/${data.id}`, payload);
        toast.success(res.data.message);
        return { success: true, data: res.data.data };
    } catch (error) {
        toast.error(error.response.data.message);
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};