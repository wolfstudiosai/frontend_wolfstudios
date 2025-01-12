'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SplashScreen } from '@/components/splash-screen/splash-screen';
import { additionalRoutes, dashboardItems } from '@/router';

import { paths } from '@/paths';
import { isValidToken } from '@/contexts/auth/AuthContext';
import useAuth from '@/hooks/useAuth';

export function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLogin, loading, userInfo, logout } = useAuth();
  const role = userInfo?.role.toLowerCase();
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
    if (role && !isUserAuthorizedToAccessThisRoute(role, pathname)) {
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
  // Check the dashboardItems collection
  const isAuthorizedInDashboardItems = dashboardItems.some((section) => {
    return section.items.some((item) => {
      // Handle static route match
      if (item.href === pathname) {
        return item.allowedRoles.includes(role);
      }

      // Handle dynamic route match (create/edit)
      const baseHref = pathname.split('/').slice(0, 3).join('/');
      if (item.href.startsWith(baseHref)) {
        return item.allowedRoles.includes(role);
      }

      return false;
    });
  });

  // Check the additionalRoutes collection
  const isAuthorizedInAdditionalRoutes = additionalRoutes.some((route) => {
    // Handle static route match
    if (route.href === pathname) {
      return route.allowedRoles.includes(role);
    }

    // Handle dynamic route match (create/edit)
    const baseHref = pathname.split('/').slice(0, 3).join('/');
    if (route.href.startsWith(baseHref)) {
      return route.allowedRoles.includes(role);
    }

    return false;
  });

  return isAuthorizedInDashboardItems || isAuthorizedInAdditionalRoutes;
};
