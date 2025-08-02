import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import { getSingleProductionViewAsync } from '../_lib/production.action';

export const useProductionView = (id, pagination) => {
    // const swrKey = id ? ['campaignView', id, JSON.stringify(pagination)] : null;
    const swrKey = id ? ['productionView', id, pagination] : null;
    const { cache, mutate: globalMutate } = useSWRConfig();
    const hasCache = swrKey ? cache.get(JSON.stringify(swrKey)) : false;

    const {
        data: singleView,
        error: singleViewError,
        isLoading: isSingleViewLoading,
        mutate: localMutate,
    } = useSWR(
        swrKey,
        ([, id, pagination]) => getSingleProductionViewAsync(id, pagination),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnMount: !hasCache,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );

    const refreshViewData = () => localMutate();

    const refreshAllProductionView = () => {
        return globalMutate(
            key => Array.isArray(key) && key[0] === 'productionView',
            undefined,
            { revalidate: true }
        );
    };

    return {
        singleView,
        singleViewError,
        isSingleViewLoading,
        refreshViewData,
        refreshAllProductionView,
    };
};