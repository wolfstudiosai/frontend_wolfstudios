import useSWR from 'swr';

import { getUsers } from '/src/app/(private)/users/_lib/user.actions';

export const useAllUser = (queryParams = {}) => {
  const swrKey = queryParams ? ['users', queryParams.page, queryParams.rowsPerPage, queryParams.search] : null;

  const fetcher = () => getUsers(queryParams);

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
