import useSWR from 'swr';

import { getUsers } from '/src/app/(private)/users/_lib/user.actions';
import { getAllNewsletterSignupAsync } from '/src/actions/common.actions';

export const useAllNewsletter = (queryParams = {}) => {
  const swrKey = queryParams ? ['newsletters', queryParams.page, queryParams.rowsPerPage, queryParams.search] : null;

  const fetcher = () => getAllNewsletterSignupAsync(queryParams);

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
