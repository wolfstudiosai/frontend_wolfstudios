import * as React from 'react';

import { config } from '/src/config';
import { SignInForm } from '/src/components/auth/cognito/sign-in-form';
import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';

export const metadata = { title: `Sign in | Cognito | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <SignInForm />
      </SplitLayout>
    </GuestGuard>
  );
}
