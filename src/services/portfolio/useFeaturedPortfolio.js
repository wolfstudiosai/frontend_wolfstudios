import { getPortfolioListAsync } from '/src/app/(public)/portfolio/_lib/portfolio.actions';
import useSWR from 'swr';
import { useSWRConfig } from 'swr';

export const useFeaturedPortfolioList = () => {
    const swrKey = 'featured-portfolio';
    const { cache } = useSWRConfig();

    const hasCache = cache.get(swrKey);

    const filters = [{ key: 'isFeatured', type: 'boolean', operator: 'is', value: true }];
    const { data, isLoading, error, mutate } = useSWR(swrKey, () => getPortfolioListAsync({ page: 1, rowsPerPage: 18 }, filters, 'and'), {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });
    return { data, isLoading, error, mutate };
};
