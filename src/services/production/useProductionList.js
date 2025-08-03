import useSWRInfinite from 'swr/infinite';

import { getProductionListAsync } from '../../app/(public)/production/_lib/production.actions';

const getKey = (pageIndex, previousPageData, status) => {
  if (previousPageData && !previousPageData.data?.length) return null;

  return [
    'production-groups',
    pageIndex + 1,
    18, // page size
    status, // filter by status
  ];
};

export const useProductionList = (status = '') => {
  const {
    data: pages,
    error,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, status),
    ([, pageNo, limit, statusFilter]) => {
      const filters = [];

      return getProductionListAsync({ page: pageNo, rowsPerPage: limit }, filters, 'and');
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
