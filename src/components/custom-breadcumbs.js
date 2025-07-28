import Link from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const CustomBreadcrumbs = ({ items }) => {
  return (
    <Stack direction="column" sx={{ width: '100%', p: 2, display: { xs: 'none', sm: 'block' } }} spacing={2}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {items?.map((item, index) =>
          item.href ? (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={item.href}
              style={{ textDecoration: 'none', color: 'text.primary', fontSize: '14px' }}
            >
              {item.title}
            </Link>
          ) : (
            <Typography key={index} sx={{ color: 'text.primary', fontSize: '14px' }}>
              {item.title}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Stack>
  );
};
