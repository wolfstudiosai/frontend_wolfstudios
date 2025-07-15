import useSWR, { useSWRConfig } from 'swr';
import { getSpaceAsync } from '/src/app/(public)/spaces/_lib/space.actions';

export const useGetSpaceData = (id) => {
    const swrKey = id ? `space-${id}` : null;
    const { cache } = useSWRConfig();

    const hasCache = cache.get(swrKey);
    const { data, isLoading, mutate } = useSWR(swrKey, () => getSpaceAsync(id), {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });
    return { data, isLoading, mutate };
};
