import * as React from 'react';

import { config } from '/src/config';
import { AuthGuard } from '/src/components/auth/auth-guard';
import { SplitLayout } from '/src/components/auth/split-layout';
import { UpdatePasswordForm } from '/src/components/auth/supabase/update-password-form';

export const metadata = { title: `Update password | Supabase | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <AuthGuard>
      <SplitLayout>
        <UpdatePasswordForm />
      </SplitLayout>
    </AuthGuard>
  );
}
