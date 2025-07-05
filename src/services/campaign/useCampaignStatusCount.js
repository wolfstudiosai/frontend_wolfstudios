import React from 'react';
import useSWR from 'swr';

import { getCampaignStatusListAsync } from '../../app/(public)/campaign/_lib/campaign.actions';

export const useCampaignStatusCount = () => {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(
    'campaign-status-count',
    async () => {
      const apiResponse = await getCampaignStatusListAsync();
      if (!apiResponse.success) {
        throw new Error('Failed to fetch campaign status counts');
      }
      return apiResponse;
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      errorRetryCount: 2,
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
