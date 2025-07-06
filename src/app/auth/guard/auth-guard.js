'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { SplashScreen } from '/src/components/splash-screen/splash-screen';
import useAuth from '/src/hooks/useAuth';
import { paths } from '/src/paths';


export function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLogin, loading, userInfo, logout } = useAuth();
  const role = userInfo?.role.toLowerCase();
  const [isChecking, setIsChecking] = React.useState(true);

  const checkPermissions = async () => {
    if (loading) {
      return;
    }

    // const isUserAllowed = isUserAuthorizedToAccessThisRoute(role, pathname);
    const isUserAllowed = true;

    if (!isUserAllowed) {
      router.push(paths.auth.default.not_authorized);
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, loading, pathname]);

  // React.useEffect(() => {
  //   if (mode === 'system') {
  //     setMode('light');
  //   }
  // }, []);

  if (isChecking) {
    return <SplashScreen />;
  }

  // notFound();
  return <>{children}</>;
}

// const isUserAuthorizedToAccessThisRoute = (role, pathname) => {
//   //check if current path is in private routes
//   const isPathInPrivateRoutes = privateRoutes.some((section) =>
//     section.items?.some((item) => {
//       if (item.items) {
//         return item.items.some((subItem) => subItem.href === pathname);
//       }
//       return item.href === pathname;
//     })
//   );

//   if (!isPathInPrivateRoutes) {
//     return true;
//   }

//   // check if user has permission
//   const checkIfUserHasPermission = privateRoutes.some((section) =>
//     section.items.some((item) => {
//       if (item.items) {
//         return item.items.some(
//           (subItem) =>
//             Array.isArray(subItem.allowedRoles) && subItem.allowedRoles.includes(role) && subItem.href === pathname
//         );
//       }
//       return Array.isArray(item.allowedRoles) && item.allowedRoles.includes(role) && item.href === pathname;
//     })
//   );

//   return checkIfUserHasPermission;
// };
