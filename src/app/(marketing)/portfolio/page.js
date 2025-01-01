import { Box, Container } from '@mui/material';

import { config } from '@/config';
import { Hero } from '@/components/marketing/home/hero';

import { PortfolioView } from './portfolio-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page({ params }) {
  return (
    <Container maxWidth="xl">
      <PortfolioView />
    </Container>
  );
}
