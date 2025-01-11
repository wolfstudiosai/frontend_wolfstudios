import { Container } from '@mui/material';

import { config } from '/src/config';

import { ContentDetailsView } from './content-details-view';

export const metadata = { title: config.site.name, description: 'Content Description' };

export default function Page({ params: { slug } }) {
  const tempData = {};

  return (
    <Container maxWidth="xl">
      <ContentDetailsView data={tempData} />
    </Container>
  );
}
