import useSWR from 'swr';
import { getSingleContentView } from '../_lib/all-content.actions';
import { useSWRConfig } from 'swr';

export const useContentView = (id, pagination) => {
    // const swrKey = id ? ['campaignView', id, JSON.stringify(pagination)] : null;
    const swrKey = id ? ['contentView', id, pagination] : null;
    const { cache, mutate: globalMutate } = useSWRConfig();
    const hasCache = swrKey ? cache.get(JSON.stringify(swrKey)) : false;

    const {
        data: singleView,
        error: singleViewError,
        isLoading: isSingleViewLoading,
        mutate: localMutate,
    } = useSWR(
        swrKey,
        ([, id, pagination]) => getSingleContentView(id, pagination),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnMount: !hasCache,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );

    const refreshViewData = () => localMutate();

    const refreshAllContentView = () => {
        return globalMutate(
            key => Array.isArray(key) && key[0] === 'contentView',
            undefined,
            { revalidate: true }
        );
    };

    return {
        singleView,
        singleViewError,
        isSingleViewLoading,
        refreshViewData,
        refreshAllContentView,
    };
};