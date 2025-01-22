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
  return true;
};
