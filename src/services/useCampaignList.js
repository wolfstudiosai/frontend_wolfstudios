import useSWRInfinite from 'swr/infinite';

import { getCampaignGroupListAsync } from '../app/(public)/campaign/_lib/campaign.actions';

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.data?.length) return null;
  return ['campaign-groups', pageIndex + 1, 20]; // 20 items per page
};

export const useCampaignList = () => {
  const {
    data: pages,
    error,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(getKey, ([, pageNo, limit]) => getCampaignGroupListAsync({ page: pageNo, rowsPerPage: limit }), {
    revalidateFirstPage: false,
    parallel: true,
  });

  const isLoadingInitial = !pages && !error;
  const isLoadingMore = isValidating && size > 0;
  const allRecords = pages?.flatMap((page) => page.data) || [];
  const totalRecords = pages?.[0]?.totalRecords || 0;
  const hasMore = allRecords.length < totalRecords;

  const loadMore = () => setSize(size + 1);
  const refresh = () => mutate();

  return {
    data: allRecords,
    totalRecords,
    error,
    isLoading: isLoadingInitial,
    isLoadingMore,
    hasMore,
    loadMore,
    refresh,
  };
};
