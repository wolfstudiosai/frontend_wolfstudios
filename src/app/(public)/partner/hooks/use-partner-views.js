import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import { getPartnerViews } from '../_lib/partner.actions';

export const usePartnerViews = () => {
    const swrKey = 'partnerViews';
    const { cache } = useSWRConfig();
    const hasCache = cache.get(swrKey) ? true : false;

    const {
        data: viewsData,
        error: viewsError,
        isLoading: isViewsLoading,
    } = useSWR(swrKey, getPartnerViews, {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });

    return {
        viewsData,
        viewsError,
        isViewsLoading,
    };
};
