import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import { getSinglePortfolioView } from '../_lib/portfolio.actions';

export const usePortfolioView = (id, pagination) => {
    const swrKey = id ? ['portfolioView', id, pagination] : null;
    const { cache, mutate: globalMutate } = useSWRConfig();
    const hasCache = cache.get(swrKey) ? true : false;

    const {
        data: singleView,
        error: singleViewError,
        isLoading: isSingleViewLoading,
        mutate: localMutate,
    } = useSWR(
        swrKey,
        ([, id, pagination]) => getSinglePortfolioView(id, pagination),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnMount: !hasCache,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );

    const refreshViewData = () => localMutate();

    const refreshAllPortfolioView = () => {
        return globalMutate(
            key => Array.isArray(key) && key[0] === 'portfolioView',
            undefined,
            { revalidate: true }
        );
    };

    return {
        singleView,
        singleViewError,
        isSingleViewLoading,
        refreshViewData,
        refreshAllPortfolioView,
    };
};