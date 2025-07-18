import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import { getPartnerListAsync } from '/src/app/(public)/partner/_lib/partner.actions';

export const useFeaturedPartnerList = () => {
    const swrKey = 'featured-partner';
    const { cache } = useSWRConfig();

    const hasCache = cache.get(swrKey);

    const filters = [{ key: 'isFeatured', type: 'boolean', operator: 'is', value: true }];
    const { data, isLoading, error, mutate } = useSWR(swrKey, () => getPartnerListAsync({ page: 1, rowsPerPage: 18 }, filters, 'and'), {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });
    return { data, isLoading, error, mutate };
};
