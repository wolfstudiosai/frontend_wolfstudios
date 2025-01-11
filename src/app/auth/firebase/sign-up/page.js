import * as React from 'react';

import { config } from '/src/config';
import { SignUpForm } from '/src/components/auth/firebase/sign-up-form';
import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';

export const metadata = { title: `Sign up | Firebase | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <SignUpForm />
      </SplitLayout>
    </GuestGuard>
  );
}
