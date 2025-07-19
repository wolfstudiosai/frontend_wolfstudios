import useSWR from 'swr';
import { getCampaignViews } from '../_lib/campaign.actions';
import { useSWRConfig } from 'swr';

export const useCampaignViews = () => {
    const swrKey = 'campaignViews';
    const { cache } = useSWRConfig();
    const hasCache = cache.has(swrKey);

    const {
        data: viewsData,
        error: viewsError,
        isLoading: isViewsLoading,
    } = useSWR(swrKey, getCampaignViews, {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });

    return {
        viewsData,
        viewsError,
        isViewsLoading,
    };
};
