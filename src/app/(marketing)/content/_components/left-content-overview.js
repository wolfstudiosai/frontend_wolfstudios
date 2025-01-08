import { Avatar, Box, Button, Card, CardContent, CardMedia, IconButton, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Iconify } from '@/components/iconify/iconify';

export const LeftContentOverview = ({ description, details, author, campaign_title, tags }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography
        gutterBottom
        sx={{
          fontWeight: 300,
          fontSize: {
            xs: '1.5rem',
            md: '3.2rem',
          },
          lineHeight: 1,
        }}
      >
        {campaign_title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
      <Box mt={3}>
        <TypographyWithBg title="Date" value={details.date} />
        <TypographyWithBg title="Category" value={details.category} />
        <TypographyWithBg title="Reading Time" value={details.reading_time} />
      </Box>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 3, mb: 1 }}>
        SHARE
      </Typography>

      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <IconButton sx={{ bgcolor: 'var(--mui-palette-background-level2)', width: '100%', borderRadius: '4px' }}>
            <Iconify icon="tabler:message" width={28} height={28} />
          </IconButton>
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
          <IconButton sx={{ bgcolor: 'var(--mui-palette-background-level2)', width: '100%', borderRadius: '4px' }}>
            <Iconify icon="material-symbols:share" width={28} height={28} />
          </IconButton>
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
          <IconButton sx={{ bgcolor: 'var(--mui-palette-background-level2)', width: '100%', borderRadius: '4px' }}>
            <Iconify icon="ic:baseline-facebook" width={28} height={28} />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 3, mb: 1 }}>
        AUTHOR
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        sx={{ bgcolor: 'var(--mui-palette-background-level2)', p: 1.5, borderRadius: '4px' }}
      >
        <Avatar
          variant="square"
          src={author.profile_image}
          alt={author.name}
          sx={{ width: 56, height: 56, mr: 2, borderRadius: '4px' }}
        />
        <Box>
          <Typography variant="subtitle2" color="text.primaryX">
            {author.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {author.title}
          </Typography>
        </Box>
      </Box>
      {tags && <Tags data={tags} />}
    </Paper>
  );
};

const TypographyWithBg = ({ title, value }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent={'space-between'}
      sx={{
        bgcolor: 'var(--mui-palette-background-level2)',
        borderRadius: '4px',
        px: 2,
        py: 1,
        mt: 1,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        {value}
      </Typography>
    </Stack>
  );
};

const Tags = ({ data }) => {
  return (
    <Box mt={3}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Recent Used Tags
      </Typography>
      <Grid container direction="column" spacing={2}>
        {data.map((tag, index) => (
          <Grid item xs={12} key={index}>
            <TagCard tag={tag} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const TagCard = ({ tag }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1,
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <CardMedia
        component="img"
        image={tag.image}
        alt={tag.title}
        sx={{ width: 80, height: 80, borderRadius: '8px', mr: 2 }}
      />
      <CardContent sx={{ flex: 1, p: 0 }}>
        <Typography variant="subtitle1" color="text.primary">
          TAG: {tag.tag}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Profile: {tag.profile}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Product: {tag.product}
        </Typography>
      </CardContent>
    </Card>
  );
};
