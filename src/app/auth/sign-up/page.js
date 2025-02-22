import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';
import RouterLink from 'next/link';
import { config } from '/src/config';

import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { SignupForm } from '../_components/SignupForm';
import { paths } from '/src/paths';

export const metadata = { title: `Sign up | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h5">Sign up</Typography>
            <Typography color="text.secondary" variant="body2">
              Already have an account?{' '}
              <Link component={RouterLink} href={paths.auth.default.sign_in} variant="subtitle2">
                Sign in
              </Link>
            </Typography>
          </Stack>
          <SignupForm />
        </Stack>
      </SplitLayout>
    </GuestGuard>
  );
}
