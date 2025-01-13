
import { GuestGuard } from '@/components/auth/guest-guard';
import { config } from '/src/config';
import { LoginForm } from '../_components/LoginForm';
import { SplitLayout } from '@/components/auth/split-layout';

export const metadata = { title: `Sign in | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <LoginForm />
      </SplitLayout>
    </GuestGuard>
  );
}
