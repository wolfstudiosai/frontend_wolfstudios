import * as React from 'react';

import { config } from '/src/config';
import { ResetPasswordForm } from '/src/components/auth/cognito/reset-password-form';
import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';

export const metadata = { title: `Reset password | Cognito | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <ResetPasswordForm />
      </SplitLayout>
    </GuestGuard>
  );
}
