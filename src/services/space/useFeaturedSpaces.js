import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import { getSpaceListAsync } from '/src/app/(public)/spaces/_lib/space.actions';

export const useFeaturedSpacesList = () => {
    const swrKey = 'featured-spaces';
    const { cache } = useSWRConfig();

    const hasCache = cache.get(swrKey);

    const filters = [{ key: 'isFeatured', type: 'boolean', operator: 'is', value: true }];
    const { data, isLoading, error, mutate } = useSWR(swrKey, () => getSpaceListAsync({ page: 1, rowsPerPage: 18 }, filters, 'and'), {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });
    return { data, isLoading, error, mutate };
};
