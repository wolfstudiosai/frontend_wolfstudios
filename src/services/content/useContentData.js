import useSWR, { useSWRConfig } from 'swr';
import { getContentAsync } from '/src/app/(private)/all-content/_lib/all-content.actions';

export const useGetContentData = (id) => {
    const swrKey = id ? `content-${id}` : null;
    const { cache } = useSWRConfig();

    const hasCache = cache.get(swrKey);
    const { data, isLoading, mutate } = useSWR(swrKey, () => getContentAsync(id), {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });
    return { data, isLoading, mutate };
};
