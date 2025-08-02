import useSWR, { useSWRConfig } from 'swr';
import { getProductionListAsync } from '../_lib/production.actions';

export const useRecordProductionList = () => {
    const pagination = { page: 1, rowsPerPage: 1 };
    const swrKey = ['recordProductionList', pagination];
    const { cache } = useSWRConfig();
    const hasCache = cache.get(JSON.stringify(swrKey)) ? true : false;

    const {
        data: productions,
        error: productionError,
        isLoading: isProductionLoading,
    } = useSWR(
        swrKey,
        ([, pagination]) => getProductionListAsync(pagination),
        {
            revalidateOnFocus: false,
            revalidateOnMount: !hasCache,
        }
    );

    const columns = productions?.meta?.map((obj) => {
        const key = Object.keys(obj)[0];
        return {
            label: obj[key].label,
            columnName: key,
            type: obj[key].type,
            depth: obj[key].depth,
        };
    });

    return {
        productionMeta: productions?.meta,
        columns,
        productionError,
        isProductionLoading,
    };
};
