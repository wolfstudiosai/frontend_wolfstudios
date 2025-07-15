import React from 'react';
import useSWR from 'swr';
import { useSWRConfig } from 'swr';

import { getCampaignStatusListAsync } from '../../app/(public)/campaign/_lib/campaign.actions';

export const useCampaignStatusCount = () => {
  const swrKey = 'campaign-status-count';
  const { cache } = useSWRConfig();

  const hasCache = cache.get(swrKey);

  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(
    swrKey,
    async () => {
      const apiResponse = await getCampaignStatusListAsync();
      if (!apiResponse.success) {
        throw new Error('Failed to fetch campaign status counts');
      }
      return apiResponse;
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: !hasCache,
    }
  );

  const statusTabs = React.useMemo(() => {
    if (!response?.data) return [];

    return response.data.flatMap((obj) =>
      Object.entries(obj).map(([key, count]) => ({
        label: key ? `${key.replace(/_/g, ' ')} (${count})` : `Other (${count})`,
        value: key,
        count,
      }))
    );
  }, [response]);

  return {
    statusTabs,
    isLoading,
    error,
    mutate,
    response,
  };
};
