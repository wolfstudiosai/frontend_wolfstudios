import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import { getPortfolioViews } from '../_lib/portfolio.actions';

export const usePortfolioViews = () => {
    const swrKey = 'portfolioViews';
    const { cache } = useSWRConfig();
    const hasCache = cache.get(swrKey) ? true : false;

    const {
        data: viewsData,
        error: viewsError,
        isLoading: isViewsLoading,
    } = useSWR(swrKey, getPortfolioViews, {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });

    return {
        viewsData,
        viewsError,
        isViewsLoading,
    };
};
