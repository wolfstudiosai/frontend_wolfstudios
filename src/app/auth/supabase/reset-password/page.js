import * as React from 'react';

import { config } from '/src/config';
import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';
import { ResetPasswordForm } from '/src/components/auth/supabase/reset-password-form';

export const metadata = { title: `Reset password | Supabase | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <ResetPasswordForm />
      </SplitLayout>
    </GuestGuard>
  );
}
