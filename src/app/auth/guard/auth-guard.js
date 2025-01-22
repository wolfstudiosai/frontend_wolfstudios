'use client';

import React from 'react';
import { notFound, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SplashScreen } from '@/components/splash-screen/splash-screen';
import { additionalRoutes, dashboardItems, privateRoutes } from '@/router';

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
  console.log(isChecking, 'isChecking');
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

    const isUserAllowed = isUserAuthorizedToAccessThisRoute(role, pathname);

    if (!isUserAllowed) {
      router.push(paths.auth.default.not_authorized);
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

  // notFound();
  return <>{children}</>;
}

const isUserAuthorizedToAccessThisRoute = (role, pathname) => {
  //check if current path is in private routes
  const isPathInPrivateRoutes = privateRoutes.some((section) =>
    section.items.some((item) => {
      if (item.items) {
        return item.items.some((subItem) => subItem.href === pathname);
      }
      return item.href === pathname;
    })
  );

  if (!isPathInPrivateRoutes) {
    return true;
  }

  // check if user has permission
  const checkIfUserHasPermission = privateRoutes.some((section) =>
    section.items.some((item) => {
      if (item.items) {
        return item.items.some(
          (subItem) =>
            Array.isArray(subItem.allowedRoles) && subItem.allowedRoles.includes(role) && subItem.href === pathname
        );
      }
      return Array.isArray(item.allowedRoles) && item.allowedRoles.includes(role) && item.href === pathname;
    })
  );

  return checkIfUserHasPermission;
};
