import { toast } from "sonner";

export const getNeedsApprovalNavItemsAsync = async () => {

    try {
        const res = await fetch('/data/needsApprovalNav.json');
        const data = await res.json();
        return { success: true, data: data?.data };
    } catch (error) {
        toast.error(error.message)
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};