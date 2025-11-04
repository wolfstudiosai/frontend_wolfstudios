import useSWR from 'swr';

import { getBlogs } from '/src/app/(private)/blogs/_lib/blog.actions';

export const useAllBlogs = (queryParams = {}) => {
  const swrKey = queryParams ? ['blogs', queryParams.page, queryParams.rowsPerPage, queryParams.search] : null;

  const fetcher = () => getBlogs(queryParams);

  const { data, error, isLoading, mutate } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  return {
    users: data?.data || [],
    totalRecords: data?.totalRecords || 0,
    isLoading,
    error: data?.success === false ? data.error : error,
    mutate,
  };
};
