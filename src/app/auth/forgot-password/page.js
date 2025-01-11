
import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';
import { config } from '/src/config';
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
