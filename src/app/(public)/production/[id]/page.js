import { Container } from '@mui/material';
import { config } from '/src/config';
import { ProductionAnalyticsView } from './production-analytics-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <Container maxWidth="xl">
      <ProductionAnalyticsView />
    </Container>
  );
}
