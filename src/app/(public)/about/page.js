import { Container } from '@mui/material';

import { config } from '/src/config';

import { AboutView } from './about-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <Container maxWidth="xl">
      <AboutView />
    </Container>
  );
}
