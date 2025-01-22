import Link from 'next/link';
import { footerRoutes } from '@/router';
// import { footerRoutes } from '@/router';
import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const Footer = () => {
  return (
    <Container maxWidth="xxl" sx={{ py: { xs: 4, md: 8 } }}>
      <Grid container spacing={4} justifyContent="space-between">
        {/* Column 1 */}
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{ bgcolor: 'var(--mui-palette-background-level2)', borderRadius: 1, padding: 4 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            WOLF STUDIOS
          </Typography>
          <Typography variant="body2" sx={{ marginTop: '20px', fontSize: '14px', color: 'text.secondary' }}>
            © 2024 WOLF STUDIOS
          </Typography>
        </Grid>

        {/* Column 2 */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Grid container sx={{ bgcolor: 'var(--mui-palette-background-level2)', borderRadius: 1, padding: 4 }}>
            <Grid size={{ xs: 9, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                QUICK LINKS
              </Typography>
              <Box sx={{ marginTop: '10px' }}>
                <FooterMenuItem title="Home" link="/home" />
                <FooterMenuItem title="Join" link="/join" />
                <FooterMenuItem title="Creators Portfolio" link="/creators-portfolio" />
                <FooterMenuItem title="Fashion Portfolio" link="/fashion-portfolio" />
              </Box>
            </Grid>

            {/* Column 3 */}
            <Grid size={{ xs: 9, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                SITE INFORMATION
              </Typography>
              <Box sx={{ marginTop: '10px' }}>
                <FooterMenuItem title="Contact Us" link="/contact" />
                <FooterMenuItem title="About Us" link="/about" />
                <FooterMenuItem title="Services" link="/services" />
              </Box>
            </Grid>

            {/* Column 4 */}
            <Grid size={{ xs: 9, md: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                SERVICES
              </Typography>
              <Box sx={{ marginTop: '10px' }}>
                <FooterMenuItem title="Blog" link="/blog" />
                <FooterMenuItem title="Help Docs" link="/help-docs" />
                <FooterMenuItem title="FAQ" link="/faq" />
              </Box>
            </Grid>
            {/* Column 5 */}
            <Grid size={{ xs: 9, md: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Important Links
              </Typography>
              <Box sx={{ marginTop: '10px' }}>
                {footerRoutes.map((route) => (
                  <FooterMenuItem key={route.id} title={route.label} link={route.href} />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const FooterMenuItem = ({ title, link }) => {
  return (
    <Link href={link} sx={{ textDecoration: 'none' }}>
      <Typography
        variant="body2"
        sx={{
          marginBottom: '5px',
          color: 'text.secondary',
          cursor: 'pointer',
        }}
      >
        {title}
      </Typography>
    </Link>
  );
};
