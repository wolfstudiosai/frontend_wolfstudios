
import { config } from '@/config';
import { Container } from '@mui/material';
import { MainView } from './main-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <Container maxWidth="xl">
      <MainView />
    </Container>
  );
}
