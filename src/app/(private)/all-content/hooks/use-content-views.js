import useSWR from 'swr';
import { getContentViews } from '../_lib/all-content.actions';
import { useSWRConfig } from 'swr';

export const useContentViews = () => {
    const swrKey = 'contentViews';
    const { cache } = useSWRConfig();
    const hasCache = cache.get(swrKey) ? true : false;

    const {
        data: viewsData,
        error: viewsError,
        isLoading: isViewsLoading,
    } = useSWR(swrKey, getContentViews, {
        revalidateOnFocus: false,
        // revalidateOnMount: true
        revalidateOnMount: !hasCache,
    });

    return {
        viewsData,
        viewsError,
        isViewsLoading,
    };
};
