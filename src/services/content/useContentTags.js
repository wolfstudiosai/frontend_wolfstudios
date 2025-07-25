import useSWR, { useSWRConfig } from "swr"
import { getTagListAsync } from "/src/lib/common.actions"

export const useContentTags = () => {
    const { cache } = useSWRConfig();
    const hasCache = cache.get("content-tags");

    const { data, isLoading, error, mutate } = useSWR(["content-tags"], () => getTagListAsync({ page: 1, rowsPerPage: 100 }), {
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