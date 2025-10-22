'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

// Optional: Customize NProgress style
NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export default function RouteLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    // Simulate route change finish after a small delay (next/navigation doesn’t have events)
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
