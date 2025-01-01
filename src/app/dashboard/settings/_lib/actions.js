import { api } from "@/utils/api";
import { toast } from "sonner";

export const getProfileData = async () => {
    try {
        const res = await api.get(`/user/profile`);
        return { success: true, data: res.data.data };
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};

export const updateProfileData = async (data) => {
    let formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("profile_pic", data.profile_pic);
    formData.append("contact_number", data.contact_number);
    formData.append("status", data.status);
    formData.append("role", data.role);

    try {
        const res = await api.patch(`/user/update-profile`, formData);
        toast.success(res.data.message);
        return { success: true, data: res.data.data };
    } catch (error) {
        console.error("Error updating profile data:", error);
        toast.error(error.response.data.message);
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};

export const resetPasswordAsync = async (data) => {
    try {
        const { confirmPassword, ...rest } = data
        const res = await api.post(`/auth/reset-password`, rest);
        if (!res.data.success) return
        toast.success(res.data.message);
        return { success: true, data: res.data.data };
    } catch (error) {
        toast.error(error.response.data.message);
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};
