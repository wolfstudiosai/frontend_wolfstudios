import useSWR from "swr"
import { getTagListAsync } from "/src/lib/common.actions"
import { useSWRConfig } from "swr"

export const useContentTags = (search = '') => {
    const swrKey = `content-tags-${search}`;
    const { cache } = useSWRConfig();

    const hasCache = cache.get(swrKey);

    const { data, isLoading, error, mutate } = useSWR(swrKey, () => getTagListAsync({ page: 1, rowsPerPage: 15 }, search), {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
        shouldRetryOnError: true,
        errorRetryCount: 3,
    })

    return {
        data: data?.data,
        isLoading,
        error,
        mutate
    }
}