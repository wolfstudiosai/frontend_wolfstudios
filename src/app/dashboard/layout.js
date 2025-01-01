"use client"

import { DynamicLayout } from '@/components/dashboard/layout/dynamic-layout';

export default function Layout({ children }) {

  return (
    // <AuthGuard>
    <DynamicLayout>{children}</DynamicLayout>
    // </AuthGuard> 
  );
}
