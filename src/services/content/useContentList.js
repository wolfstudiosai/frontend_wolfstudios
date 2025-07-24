import useSWRInfinite from 'swr/infinite';

import { getContentListAsync } from '/src/app/(private)/all-content/_lib/all-content.actions';

const getKey = (pageIndex, previousPageData, featured, tag) => {
  if (previousPageData && !previousPageData.data?.length) return null;

  return [
    'content-groups',
    pageIndex + 1,
    18, // page size
    featured, // filter by featured
    tag, // filter by tag
  ];
};

export const useContentList = (featured = '', tag = '') => {
  const {
    data: pages,
    error,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, featured, tag),
    ([, pageNo, limit, featuredFilter, tagFilter]) => {
      const filters = [];

      if (featuredFilter) filters.push({ key: 'isFeatured', type: 'boolean', operator: 'is', value: true });
      if (tagFilter) filters.push({
        key: "tags",
        type: "relation",
        operator: "has any of",
        value: [tag],
        depth: "ContentHQByTags.secondId"
      });

      return getContentListAsync({ page: pageNo, rowsPerPage: limit }, filters, 'and');
    },
    {
      revalidateFirstPage: false,
      parallel: true,
    }
  );

  const isLoadingInitial = !pages && !error;
  const isLoadingMore = isValidating && size > 0;
  const allRecords = pages?.flatMap((page) => page?.data) || [];
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
