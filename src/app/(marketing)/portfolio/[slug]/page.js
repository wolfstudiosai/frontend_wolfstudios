import { Box, Container } from '@mui/material';

import { config } from '@/config';

import { PortfolioGalleryView } from './portfolio-gallery-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <Container maxWidth="xl">
      <PortfolioGalleryView />
    </Container>
  );
}
