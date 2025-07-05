// services/useCampaignList.js
import useSWRInfinite from 'swr/infinite';
import { getCampaignGroupListAsync } from '../app/(public)/campaign/_lib/campaign.actions';
// import { getCampaignGroupListAsync } from '../_lib/campaign.actions';

const getKey = (pageIndex, previousPageData, status) => {
  // Reached the end
  if (previousPageData && !previousPageData.data?.length) return null;
  
  return [
    'campaign-groups',
    pageIndex + 1,
    10, // page size
    status // filter by status
  ];
};

export const useCampaignList = (status = '') => {
  const {
    data: pages,
    error,
    size,
    setSize,
    isValidating,
    mutate
  } = useSWRInfinite(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, status),
    ([, pageNo, limit, statusFilter]) => {
      const filters = statusFilter ? [{
        key: 'campaignStatus',
        operator: 'contains',
        type: 'string',
        value: statusFilter
      }] : [];
      
      return getCampaignGroupListAsync(
        { page: pageNo, rowsPerPage: limit },
        filters,
        'and'
      );
    },
    {
      revalidateFirstPage: false,
      parallel: true
    }
  );

  const isLoadingInitial = !pages && !error;
  const isLoadingMore = isValidating && size > 0;
  const allRecords = pages?.flatMap(page => page.data) || [];
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
    refresh
  };
};