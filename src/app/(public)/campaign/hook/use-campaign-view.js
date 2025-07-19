import useSWR from 'swr';
import { getSingleCampaignView } from '../_lib/campaign.actions';
import { useSWRConfig } from 'swr';

// export const useCampaignView = (id, pagination) => {
//     const swrKey = id ? ['campaignView', id, pagination] : null;
//     const { cache } = useSWRConfig();

//     const hasCache = swrKey ? cache.get(JSON.stringify(swrKey)) : false

//     const {
//         data: singleView,
//         error: singleViewError,
//         isLoading: isSingleViewLoading,
//     } = useSWR(
//         swrKey,
//         ([, id, pagination]) => getSingleCampaignView(id, pagination),
//         {
//             revalidateOnFocus: false,
//             revalidateOnMount: !hasCache,
//         }
//     );

//     return {
//         singleView,
//         singleViewError,
//         isSingleViewLoading,
//     };
// };



export const useCampaignView = (id, pagination) => {
    const swrKey = id ? ['campaignView', id, JSON.stringify(pagination)] : null;
    const { cache, mutate: globalMutate } = useSWRConfig();
    const hasCache = cache.get(JSON.stringify(swrKey));

    const {
        data: singleView,
        error: singleViewError,
        isLoading: isSingleViewLoading,
        mutate: localMutate,
    } = useSWR(
        swrKey,
        ([, id, paginationStr]) => getSingleCampaignView(id, JSON.parse(paginationStr)),
        // {
        //     revalidateOnFocus: false,
        //     revalidateIfStale: true,     // Recheck if data is stale
        //     revalidateOnMount: true,    // Force fetch on mount (reload)
        //     shouldRetryOnError: false,
        // }

        {
            revalidateOnFocus: false,       // No revalidation on tab focus
            revalidateIfStale: false,       // No background revalidation
            revalidateOnMount: hasCache,      // No revalidation on component mount
            revalidateOnReconnect: false,   // No revalidation on network reconnect
            shouldRetryOnError: false,      // No retries on error
        }
    );

    // Manually trigger revalidation when needed (e.g., after an update)
    const refreshViewData = () => localMutate();

    const refreshAllCampaignView = async () => {
        // Get all cache keys
        const allKeys = Array.from(cache.keys());

        // Filter and parse keys matching the campaignView pattern
        const campaignViewKeys = allKeys.filter(key => {
            // Check if key matches the pattern @"campaignView",...
            if (!key.startsWith('@"campaignView"')) return false;

            try {
                // Convert to valid JSON format by:
                // 1. Removing the leading @
                // 2. Replacing \" with "
                const validJson = key.slice(1).replace(/\\"/g, '"');
                const parsed = JSON.parse(validJson);
                return Array.isArray(parsed) && parsed[0] === 'campaignView';
            } catch {
                return false;
            }
        });

        console.log('Found campaign view keys:', campaignViewKeys);

        // Revalidate all matching keys
        await Promise.all(campaignViewKeys.map(key => {
            // Convert key back to original format for mutate
            return globalMutate(key);
        }));
    };

    return {
        singleView,
        singleViewError,
        isSingleViewLoading,
        refreshViewData,
        refreshAllCampaignView,
    };
};