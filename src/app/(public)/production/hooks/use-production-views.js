import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import { getProductionViewsAsync } from '../_lib/production.actions';

export const useProductionViews = () => {
    const swrKey = 'productionViews';
    const { cache } = useSWRConfig();
    const hasCache = cache.get(swrKey) ? true : false;

    const {
        data: viewsData,
        error: viewsError,
        isLoading: isViewsLoading,
    } = useSWR(swrKey, getProductionViewsAsync, {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });

    return {
        viewsData,
        viewsError,
        isViewsLoading,
    };
};
