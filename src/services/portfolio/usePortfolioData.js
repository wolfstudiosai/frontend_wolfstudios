import useSWR, { useSWRConfig } from 'swr';
import { getPortfolioAsync } from '/src/app/(public)/portfolio/_lib/portfolio.actions';

export const useGetPortfolioData = (id) => {
    const swrKey = id ? `portfolio-${id}` : null;
    const { cache } = useSWRConfig();

    const hasCache = cache.get(swrKey);
    const { data, isLoading, mutate } = useSWR(swrKey, () => getPortfolioAsync(id), {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });
    return { data, isLoading, mutate };
};
