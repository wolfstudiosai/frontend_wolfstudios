import useSWR, { useSWRConfig, unstable_serialize } from 'swr';
import { getCampaignListAsync } from '../_lib/campaign.actions';

export const useRecordCampaignList = () => {
    const pagination = { page: 1, rowsPerPage: 1 };
    const swrKey = ['recordCampaignList', JSON.stringify(pagination)];
    const { cache } = useSWRConfig();
    const serializedKey = unstable_serialize(swrKey);
    const hasCache = cache.get(serializedKey);

    const {
        data: campaigns,
        error: campaignsError,
        isLoading: isCampaignsLoading,
    } = useSWR(
        swrKey,
        ([, paginationStr]) => getCampaignListAsync(JSON.parse(paginationStr)),
        {
            revalidateOnFocus: false,
            revalidateOnMount: !hasCache,
        }
    );

    const columns = campaigns?.meta?.map((obj) => {
        const key = Object.keys(obj)[0];
        return {
            label: obj[key].label,
            columnName: key,
            type: obj[key].type,
            depth: obj[key].depth,
        };
    });

    return {
        campaignMeta: campaigns?.meta,
        columns,
        campaignsError,
        isCampaignsLoading,
    };
};
