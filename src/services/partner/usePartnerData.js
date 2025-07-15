import useSWR, { useSWRConfig } from 'swr';
import { getPartnerAsync } from '/src/app/(public)/partner/_lib/partner.actions';

export const useGetPartnerData = (id) => {
    const swrKey = id ? `partner-${id}` : null;
    const { cache } = useSWRConfig();

    const hasCache = cache.get(swrKey);
    const { data, isLoading, mutate } = useSWR(swrKey, () => getPartnerAsync(id), {
        revalidateOnFocus: false,
        revalidateOnMount: !hasCache,
    });
    return { data, isLoading, mutate };
};
