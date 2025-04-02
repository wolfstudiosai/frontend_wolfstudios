import { Container } from '@mui/material';
import { config } from '/src/config';
import { SpaceGalleryView } from './space-gallery-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <Container maxWidth="xl">
      <SpaceGalleryView />
    </Container>
  );
}
