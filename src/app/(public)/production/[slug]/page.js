import { Container } from '@mui/material';
import { config } from '/src/config';
import { ProductionGalleryView } from './production-gallery-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <Container maxWidth="xl">
      <ProductionGalleryView />
    </Container>
  );
}
