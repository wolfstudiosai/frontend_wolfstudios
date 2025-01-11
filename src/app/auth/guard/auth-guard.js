'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';

import { paths } from '@/paths';
import useAuth from '@/hooks/useAuth';
import { dashboardItems } from '@/router';

export function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLogin, loading, userInfo } = useAuth();
  const [isChecking, setIsChecking] = React.useState(true);
  console.log(isLogin, 'isLogin');

  const createQueryString = React.useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(key, value);
      return params.toString();
    },
    [searchParams]
  );

  const checkPermissions = async () => {
    if (loading) {
      return;
    }
    // redirect to login if the user is not logged in
    if (!isLogin) {
      const signInPath = paths.auth.default.sign_in;
      const href = `${signInPath}?redirect=${createQueryString('returnTo', pathname)}`;
      router.replace(href);
      return;
    }
    console.log(
      isUserAuthorizedToAccessThisRoute(userInfo.role, pathname),
      'isUserAuthorizedToAccessThisRoute(userInfo.role, pathname)'
    );
    // redirect to not-authorized if the user is logged in but not authorized
    if (userInfo?.role && !isUserAuthorizedToAccessThisRoute(userInfo.role, pathname)) {
      const href = paths.auth.default.not_authorized;
      router.replace(href);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, loading, pathname]);

  if (isChecking) {
    return <Box>Checking authentication and authorization...</Box>;
  }

  return <>{children}</>;
}

const isUserAuthorizedToAccessThisRoute = (role, pathname) => {
  return dashboardItems.some((section) => {
    return section.items.some((item) => {
      if (item.href === pathname) {
        return item.allowedRoles.includes(role.toLowerCase());
      }
      return false;
    });
  });
};
