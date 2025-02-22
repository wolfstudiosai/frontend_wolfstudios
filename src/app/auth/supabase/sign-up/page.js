import * as React from 'react';

import { config } from '/src/config';
import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';
import { SignUpForm } from '/src/components/auth/supabase/sign-up-form';

export const metadata = { title: `Sign up | Supabase | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <SignUpForm />
      </SplitLayout>
    </GuestGuard>
  );
}
