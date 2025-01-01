
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';
import { config } from '@/config';
import { ForgotPasswordForm } from '../_components/FogotPasswordForm';

export const metadata = { title: `Forgot password | Custom | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <ForgotPasswordForm />
      </SplitLayout>
    </GuestGuard>
  );
}
