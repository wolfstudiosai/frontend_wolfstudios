import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';
import { DynamicLogo } from '/src/components/core/logo';
import { Box, Stack, Typography } from '@mui/material';
import { default as Link, default as RouterLink } from 'next/link';

import { paths } from '/src/paths';
import { config } from '/src/config';

import { LoginForm } from '../_components/LoginForm';
import SocialLogin from '/src/components/common/social-login';
import Divider from '@mui/material/Divider';
import { Iconify } from '/src/components/iconify/iconify';

export const metadata = { title: `Sign in | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
        <Stack spacing={1}>
          <Typography variant="h5">Sign in</Typography>
          <Typography color="text.secondary" variant="body2">
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} href={paths.auth.default.sign_up} variant="subtitle2">
              Sign up
            </Link>
          </Typography>
        </Stack>
        <LoginForm onLoginSuccess={null} redirectToHome={true} />
        <Link component={RouterLink} href={paths.auth.default.forgotPassword} variant="subtitle2">
          Forgot password?
        </Link>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Stack spacing={2} direction='column' alignItems='center'>
          <SocialLogin provider="facebook" type="LOGIN|FACEBOOK">
            <Iconify icon="logos:facebook" />
            Sign In with Facebook
          </SocialLogin>
          <SocialLogin provider="google" type="LOGIN|GOOGLE">
            <Iconify icon="devicon:google" />
            Sign In with Google
          </SocialLogin>
        </Stack>

      </SplitLayout>
    </GuestGuard>
  );
}
