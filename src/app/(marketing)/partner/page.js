import { config } from '@/config';
import { Container } from '@mui/material';

import { PartnerView } from './partner-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page({ params }) {
  return (
    <Container maxWidth="xl">
      <PartnerView />
    </Container>
  );
}
