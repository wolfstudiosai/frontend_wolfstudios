import * as React from 'react';

import { config } from '/src/config';
import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';
import { SignInForm } from '/src/components/auth/supabase/sign-in-form';

export const metadata = { title: `Sign in | Supabase | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <SignInForm />
      </SplitLayout>
    </GuestGuard>
  );
}
