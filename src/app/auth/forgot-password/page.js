
import { GuestGuard } from '/src/components/auth/guest-guard';
import { SplitLayout } from '/src/components/auth/split-layout';
import { DynamicLogo } from '/src/components/core/logo';
import { Box, Stack, Typography } from '@mui/material';
import RouterLink from 'next/link';
import { ForgotPasswordForm } from '../_components/FogotPasswordForm';
import { config } from '/src/config';
import { paths } from '/src/paths';

export const metadata = { title: `Forgot password | Custom | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <Stack spacing={4}>
          <div>
            <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
              <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
            </Box>
          </div>
          <Typography variant="h5">Reset password</Typography>
          <ForgotPasswordForm />
        </Stack>
      </SplitLayout>
    </GuestGuard>
  );
}
