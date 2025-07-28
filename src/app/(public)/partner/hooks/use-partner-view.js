import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import { getSinglePartnerView } from '../_lib/partner.actions';

export const usePartnerView = (id, pagination) => {
    const swrKey = id ? ['partnerView', id, pagination] : null;
    const { cache, mutate: globalMutate } = useSWRConfig();
    const hasCache = cache.get(swrKey) ? true : false;

    const {
        data: singleView,
        error: singleViewError,
        isLoading: isSingleViewLoading,
        mutate: localMutate,
    } = useSWR(
        swrKey,
        ([, id, pagination]) => getSinglePartnerView(id, pagination),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnMount: !hasCache,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );

    const refreshViewData = () => localMutate();

    const refreshAllPartnerView = () => {
        return globalMutate(
            key => Array.isArray(key) && key[0] === 'partnerView',
            undefined,
            { revalidate: true }
        );
    };

    return {
        singleView,
        singleViewError,
        isSingleViewLoading,
        refreshViewData,
        refreshAllPartnerView,
    };
};