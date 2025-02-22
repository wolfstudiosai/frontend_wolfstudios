import * as React from 'react';

import { config } from '/src/config';
import { NewPasswordRequiredForm } from '/src/components/auth/cognito/new-password-required-form';
import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';

export const metadata = { title: `New password required | Cognito | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <NewPasswordRequiredForm />
      </SplitLayout>
    </GuestGuard>
  );
}
