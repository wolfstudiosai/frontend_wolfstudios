import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';

import { SignupForm } from '../_components/SignupForm';

export const metadata = { title: `Sign up | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <SignupForm />
      </SplitLayout>
    </GuestGuard>
  );
}
