'use client';

import React from 'react';
import { notFound, usePathname, useRouter, useSearchParams } from 'next/navigation';
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

  // notFound();
  return <>{children}</>;
}

// const isUserAuthorizedToAccessThisRoute = (role, pathname) => {
//   const isAuthorizedInDashboardItems = dashboardItems.some((section) => {
//     return section.items.some((item) => {
//       // check only those items that have allowedRoles
//       if (!item.allowedRoles) {
//         return true;
//       }
//       // check if it has nested items
//       if (item.items) {
//         return item.items.some((nestedItem) => {
//           // check only those nested items that have allowedRoles
//           if (!nestedItem.allowedRoles) {
//             return true;
//           }
//           if (nestedItem.href === pathname) {
//             return nestedItem.allowedRoles.includes(role);
//           }
//           const baseHref = pathname.split('/').slice(0, 3).join('/');
//           if (nestedItem.href.startsWith(baseHref)) {
//             return nestedItem.allowedRoles.includes(role);
//           }
//           return false;
//         });
//       }

//       // Handle static route match
//       if (item.href === pathname) {
//         return item.allowedRoles.includes(role);
//       }

//       // Handle dynamic route match (create/edit)
//       const baseHref = pathname.split('/').slice(0, 3).join('/');
//       if (item.href.startsWith(baseHref)) {
//         return item.allowedRoles.includes(role);
//       }

//       return false;
//     });
//   });

//   return isAuthorizedInDashboardItems;
// };


const isUserAuthorizedToAccessThisRoute = (role , pathname) => {
  // // Check if the pathname exists in nav item
  // const isPathDefinedInNavData = dashboardItems.some((section) =>
  //   section.items.some((item) => {
  //     if (item.path === pathname) {
  //       return true;
  //     }

  //     const baseHref = pathname.split('/').slice(0, 3).join('/');
  //     if (item.path.startsWith(baseHref)) {
  //       return true;
  //     }

  //     if (item.children) {
  //       return item.children.some((nestedItem) => {
  //         if (nestedItem.path === pathname) {
  //           return true;
  //         }
  //         if (nestedItem.path.startsWith(baseHref)) {
  //           return true;
  //         }
  //         return false;
  //       });
  //     }

  //     return false;
  //   })
  // );

  // // If the path is not found in the nav items, allow access
  // if (!isPathDefinedInNavData) {
  //   return true;
  // }

  // // if path is defined then check allowed roles
  // return dashboardNavData.some((section) =>
  //   section.items.some((item) => {
  //     if (
  //       item.path === pathname ||
  //       item.path.startsWith(pathname.split('/').slice(0, 3).join('/'))
  //     ) {
  //       return item.allowedRoles.includes(role);
  //     }
  //     if (item.children) {
  //       return item.children.some((nestedItem) => {
  //         if (
  //           nestedItem.path === pathname ||
  //           nestedItem.path.startsWith(pathname.split('/').slice(0, 3).join('/'))
  //         ) {
  //           return nestedItem.allowedRoles.includes(role);
  //         }
  //         return false;
  //       });
  //     }

  //     return false;
  //   })
  // );

  return true
};