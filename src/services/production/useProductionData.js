import useSWR, { useSWRConfig } from 'swr';
import { getProductionAsync } from '../../app/(public)/production/_lib/production.actions';

export const useGetProductionData = (id) => {
    const swrKey = id ? `production-${id}` : null;
    const { cache } = useSWRConfig();

    const hasCache = cache.get(swrKey);
    const { data, isLoading, mutate } = useSWR(swrKey, () => getProductionAsync(id), {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });
    return { data, isLoading, mutate };
};
