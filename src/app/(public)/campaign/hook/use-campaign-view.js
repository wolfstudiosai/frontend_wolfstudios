import useSWR from 'swr';
import { getSingleCampaignView } from '../_lib/campaign.actions';
import { useSWRConfig } from 'swr';

export const useCampaignView = (id, pagination) => {
    const swrKey = id ? ['campaignView', id, JSON.stringify(pagination)] : null;
    const { cache, mutate: globalMutate } = useSWRConfig();
    const hasCache = cache.has(swrKey);

    const {
        data: singleView,
        error: singleViewError,
        isLoading: isSingleViewLoading,
        mutate: localMutate,
    } = useSWR(
        swrKey,
        ([, id, paginationStr]) => getSingleCampaignView(id, JSON.parse(paginationStr)),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnMount: !hasCache,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );

    const refreshViewData = () => localMutate();

    const refreshAllCampaignView = () => {
        return globalMutate(
            key => Array.isArray(key) && key[0] === 'campaignView',
            undefined,
            { revalidate: true }
        );
    };

    return {
        singleView,
        singleViewError,
        isSingleViewLoading,
        refreshViewData,
        refreshAllCampaignView,
    };
};