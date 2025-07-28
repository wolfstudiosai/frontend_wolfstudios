import useSWR from "swr"
import { getTagListAsync } from "/src/lib/common.actions"

export const useContentTags = (search = '') => {
    const swrKey = `content-tags-${search}`;

    const { data, isLoading, error, mutate } = useSWR(swrKey, () => getTagListAsync({ page: 1, rowsPerPage: 15 }, search), {
        revalidateOnFocus: false,
        revalidateOnMount: true,
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