import useSWR, { useSWRConfig } from 'swr';
import { getCampaignAsync } from '/src/app/(public)/campaign/_lib/campaign.actions';

export const useGetCampaignData = (id) => {
  const swrKey = id ? `campaign-${id}` : null;
  const { cache } = useSWRConfig();

  const hasCache = cache.get(swrKey);
  const { data, isLoading, mutate } = useSWR(swrKey, () => getCampaignAsync(id), {
    revalidateOnFocus: false,
    revalidateOnMount: !hasCache,
  });
  return { data, isLoading, mutate };
};
