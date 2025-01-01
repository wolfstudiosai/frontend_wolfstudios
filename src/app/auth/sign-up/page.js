
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';
import { config } from '@/config';
import { SignupForm } from '../_components/SignupForm';

export const metadata = { title: `Sign up | Custom | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <SignupForm />
      </SplitLayout>
    </GuestGuard>
  );
}
