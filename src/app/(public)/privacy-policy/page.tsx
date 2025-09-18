import { Box, Container, Paper } from '@mui/material';

import { privacyPolicyHtml } from '../../../mock_data/privacy-polidy-data';

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: 'background.paper',
          color: 'text.primary',
          lineHeight: 1.75,
          '& h1, & h2, & h3': {
            fontWeight: 600,
            mt: 4,
            mb: 2,
            color: 'text.primary',
          },
          '& p': { mb: 2, fontSize: '1rem' },
          '& ul': {
            pl: 4,
            mb: 2,
            listStyleType: 'disc',
          },
          '& li': {
            mb: 1,
          },
          '& a': {
            color: 'primary.main',
            textDecoration: 'none',
          },
          '& a:hover': {
            textDecoration: 'underline',
          },
        }}
        dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }}
      />
    </Container>
  );
}
