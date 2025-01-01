import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { AccountDetailsForm } from '../_components/AccountDetailsForm';

export const metadata = { title: `Account | Settings | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <Stack spacing={4}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Stack spacing={4}>
        <AccountDetailsForm />
        {/* <ThemeSwitch /> */}
        {/* <Privacy /> */}
        {/* <DeleteAccount /> */}
      </Stack>
    </Stack>
  );
}
