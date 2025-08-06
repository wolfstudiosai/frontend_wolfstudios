import useSWR from 'swr';
import { getUsers } from '/src/app/(private)/users/_lib/user.actions';

export const useAllUser = (queryParams = {}) => {
  // Create a stable key based on query parameters
  const swrKey = queryParams 
    ? ['users', queryParams.page, queryParams.rowsPerPage, queryParams.search] 
    : null;

  // SWR fetcher function
  const fetcher = () => getUsers(queryParams);

  const { data, error, isLoading, mutate } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true, // Useful for pagination
  });

  return {
    users: data?.data || [],
    totalRecords: data?.totalRecords || 0,
    isLoading,
    error: data?.success === false ? data.error : error,
    mutate,
  };
};