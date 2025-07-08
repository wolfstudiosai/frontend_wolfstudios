import useSWRInfinite from 'swr/infinite';

import { getContentListAsync } from '/src/app/(private)/all-content/_lib/all-content.actions';

const getKey = (pageIndex, previousPageData, status) => {
  if (previousPageData && !previousPageData.data?.length) return null;

  return [
    'content-groups',
    pageIndex + 1,
    10, // page size
    status, // filter by status
  ];
};

export const useContentList = (status = '') => {
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

      return getContentListAsync({ page: pageNo, rowsPerPage: limit }, filters, 'and');
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
