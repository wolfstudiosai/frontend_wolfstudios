import useSWRInfinite from 'swr/infinite';

import { getCampaignGroupListAsync } from '../../app/(public)/campaign/_lib/campaign.actions';

const getKey = (pageIndex, previousPageData, status, featured) => {
  if (previousPageData && !previousPageData.data?.length) return null;

  return [
    'campaign-groups',
    pageIndex + 1,
    18, // page size
    status, // filter by status
    featured, // filter by featured
  ];
};

export const useCampaignList = (status = '', featured = '') => {
  const {
    data: pages,
    error,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, status, featured),
    ([, pageNo, limit, statusFilter, featuredFilter]) => {
      const filters = [];
      if (featuredFilter) {
        filters.push({
          key: 'isFeatured',
          type: 'boolean',
          operator: 'is',
          value: true,
        });
      }

      if (statusFilter) {
        filters.push({
          key: 'campaignStatus',
          operator: 'contains',
          type: 'string',
          value: statusFilter,
        });
      }
      return getCampaignGroupListAsync({ page: pageNo, rowsPerPage: limit }, filters, 'and');
    },
    {
      revalidateFirstPage: false,
      parallel: true,
    }
  );

  const isLoadingInitial = !pages && !error;
  const isLoadingMore = isValidating && size > 0;
  const allRecords = pages?.flatMap((page) => page.data) || [];
  const totalRecords = pages?.[0]?.totalRecords || 0;
  const hasMore = allRecords.length < totalRecords;

  const loadMore = () => setSize(size + 1);

  return {
    data: allRecords,
    totalRecords,
    error,
    isLoading: isLoadingInitial,
    isLoadingMore,
    hasMore,
    loadMore,
    mutate,
  };
};
