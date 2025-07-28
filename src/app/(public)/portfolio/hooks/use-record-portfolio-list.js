import useSWR, { useSWRConfig } from 'swr';
import { getPortfolioListAsync } from '../_lib/portfolio.actions';

export const useRecordPortfolioList = () => {
    const pagination = { page: 1, rowsPerPage: 1 };
    const swrKey = ['recordPortfolioList', pagination];
    const { cache } = useSWRConfig();
    const hasCache = cache.get(JSON.stringify(swrKey)) ? true : false;

    const {
        data: portfolios,
        error: portfoliosError,
        isLoading: isPortfoliosLoading,
    } = useSWR(
        swrKey,
        ([, pagination]) => getPortfolioListAsync(pagination),
        {
            revalidateOnFocus: false,
            revalidateOnMount: !hasCache,
        }
    );

    const columns = portfolios?.meta?.map((obj) => {
        const key = Object.keys(obj)[0];
        return {
            label: obj[key].label,
            columnName: key,
            type: obj[key].type,
            depth: obj[key].depth,
        };
    });

    return {
        portfolioMeta: portfolios?.meta,
        columns,
        portfoliosError,
        isPortfoliosLoading,
    };
};
