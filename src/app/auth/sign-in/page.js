
import { GuestGuard } from '@/components/auth/guest-guard';
import { config } from '@/config';
import { LoginForm } from '../_components/LoginForm';
import { SplitLayout } from '@/components/auth/split-layout';

export const metadata = { title: `Sign in | Custom | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <LoginForm />
      </SplitLayout>
    </GuestGuard>
  );
}
