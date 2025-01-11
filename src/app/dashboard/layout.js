'use client';

import { VerticalLayout } from '@/components/dashboard/layout/vertical/vertical-layout';

import { AuthGuard } from '../auth/guard/auth-guard';

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <VerticalLayout>{children}</VerticalLayout>
    </AuthGuard>
  );
}
