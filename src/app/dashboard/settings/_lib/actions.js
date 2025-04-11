import { api } from "/src/utils/api";
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

export const getProfileDataById = async (userID) => {
    try {
        const res = await api.get(`/users/${userID}`);
        return { success: true, data: res.data.data };
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};

export const updateProfileData = async (data, userID) => {
    const requestBody = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        profileImage: data.profileImage,
        contactNumber: data.contactNumber,
        status: data.status,
        role: data.role
    };

    try {
        const res = await api.patch(`/users/${userID}`, requestBody);
        toast.success(res.data.message);
        return { success: true, data: res.data.data };
    } catch (error) {
        console.error("Error updating profile data:", error);
        toast.error(error.response?.data?.message || "Update failed");
        return { 
            success: false, 
            error: error.response?.data || { 
                message: "An unknown error occurred" 
            } 
        };
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
