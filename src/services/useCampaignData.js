import useSWR from 'swr';

import { swrFetcher } from './swrFetcher';

export function useCampaignData(id) {
  const { data, error, isLoading } = useSWR(`/campaign-HQ/${id}`, swrFetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}
