import { publicApi } from "@/utils/api";
import { toast } from "sonner";

export const forgotPasswordAsync = async (data, step) => {
    try {
        if (step === 1) {
            const res = await publicApi.post(`/auth/forgot-password`, { email: data.email });
            // if (!res.data.success) return;
            toast.success(res.data.message);
            return { success: true, data: res.data.data };
        } else if (step === 2) {
            const res = await publicApi.post(`/auth/forgot-password`, {
                email: data.email,
                otp: Number(data.otp),
                new_password: data.new_password
            });
            // if (!res.data.success) return;
            toast.success(res.data.message);
            return { success: true, data: res.data.data };
        }
    } catch (error) {
        console.error('API Error:', error);
        toast.error(error.response.data.message);
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};
