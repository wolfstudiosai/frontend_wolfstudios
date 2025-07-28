import useSWR, { useSWRConfig } from 'swr';
import { getContentListAsync } from '../_lib/all-content.actions';

export const useRecordContentList = () => {
    const pagination = { page: 1, rowsPerPage: 1 };
    const swrKey = ['recordContentList', pagination];
    const { cache } = useSWRConfig();
    const hasCache = cache.get(JSON.stringify(swrKey)) ? true : false;

    const {
        data: contents,
        error: contentsError,
        isLoading: isContentsLoading,
    } = useSWR(
        swrKey,
        ([, pagination]) => getContentListAsync(pagination),
        {
            revalidateOnFocus: false,
            revalidateOnMount: !hasCache,
        }
    );

    const columns = contents?.meta?.map((obj) => {
        const key = Object.keys(obj)[0];
        return {
            label: obj[key].label,
            columnName: key,
            type: obj[key].type,
            depth: obj[key].depth,
        };
    });

    return {
        contentMeta: contents?.meta,
        columns,
        contentsError,
        isContentsLoading,
    };
};
