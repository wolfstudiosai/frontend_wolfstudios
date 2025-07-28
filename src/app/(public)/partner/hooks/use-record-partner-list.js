import useSWR, { useSWRConfig } from 'swr';
import { getPartnerListAsync } from '../_lib/partner.actions';

export const useRecordPartnerList = () => {
    const pagination = { page: 1, rowsPerPage: 1 };
    const swrKey = ['recordPartnerList', pagination];
    const { cache } = useSWRConfig();
    const hasCache = cache.get(JSON.stringify(swrKey)) ? true : false;

    const {
        data: partners,
        error: partnersError,
        isLoading: isPartnersLoading,
    } = useSWR(
        swrKey,
        ([, pagination]) => getPartnerListAsync(pagination),
        {
            revalidateOnFocus: false,
            revalidateOnMount: !hasCache,
        }
    );

    const columns = partners?.meta?.map((obj) => {
        const key = Object.keys(obj)[0];
        return {
            label: obj[key].label,
            columnName: key,
            type: obj[key].type,
            depth: obj[key].depth,
        };
    });

    return {
        partnerMeta: partners?.meta,
        columns,
        partnersError,
        isPartnersLoading,
    };
};
