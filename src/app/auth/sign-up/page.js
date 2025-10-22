import RouterLink from 'next/link';
import Link from 'next/link';
import { Divider, Stack, Typography } from '@mui/material';

import { config } from '/src/config';
import { paths } from '/src/paths';
import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';
import SocialLogin from '/src/components/common/social-login';
import { Iconify } from '/src/components/iconify/iconify';

import { SignupForm } from '../_components/SignupForm';

export const metadata = { title: `Sign up | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="h5">Sign up</Typography>
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} alignItems="center" sx={{ mt: 2 }}>
              <SocialLogin provider="facebook" type="SIGNUP|FACEBOOK">
                <Iconify icon="logos:facebook" />
                Sign up with Facebook
              </SocialLogin>
              <SocialLogin provider="google" type="SIGNUP|GOOGLE">
                <Iconify icon="devicon:google" />
                Sign up with Google
              </SocialLogin>
            </Stack>

            <Divider sx={{ mt: 2 }}>OR</Divider>
          </Stack>
          <SignupForm />

          <Typography color="text.secondary" variant="body2">
            Already have an account?{' '}
            <Link component={RouterLink} href={paths.auth.default.sign_in} variant="subtitle2">
              Sign in
            </Link>
          </Typography>
        </Stack>
      </SplitLayout>
    </GuestGuard>
  );
}
