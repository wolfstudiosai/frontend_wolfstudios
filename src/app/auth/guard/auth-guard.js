'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';

import { isValidToken } from '@/contexts/auth/AuthContext';
import { SplashScreen } from '@/components/splash-screen/splash-screen';

import useAuth from '/src/hooks/useAuth';
import { paths } from '/src/paths';
import { dashboardItems } from '/src/router';

export function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLogin, loading, userInfo, logout } = useAuth();
  const [isChecking, setIsChecking] = React.useState(true);
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
    //if the token is not valid call logout
    if (!isValidToken(userInfo?.token)) {
      logout();
      return;
    }
    // redirect to login if the user is not logged in
    if (!isLogin) {
      const signInPath = paths.auth.default.sign_in;
      const href = `${signInPath}?redirect=${createQueryString('returnTo', pathname)}`;
      router.replace(href);
      return;
    }
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
    return <SplashScreen />;
  }

  return <>{children}</>;
}

const isUserAuthorizedToAccessThisRoute = (role, pathname) => {
  return dashboardItems.some((section) => {
    return section.items.some((item) => {
      if (item.href === pathname || pathname.startsWith(item.href)) {
        return item.allowedRoles.includes(role.toLowerCase());
      }
      return false;
    });
  });
};
