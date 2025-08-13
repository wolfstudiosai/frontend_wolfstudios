import useSWR from 'swr';

import { getHomepageContentAsync } from '../../actions/common.actions';

export const useHomepageContent = () => {
  const { data, error, isLoading, mutate } = useSWR(
    'homepage-contents',
    async () => {
      const apiResponse = await getHomepageContentAsync();
      if (!apiResponse.success) {
        throw new Error('Failed to fetch campaign status counts');
      }
      return apiResponse;
    },

    {
      revalidateOnFocus: false,
      // shouldRetryOnError: true,
      // errorRetryCount: 2,
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
