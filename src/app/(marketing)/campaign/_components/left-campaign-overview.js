import { Avatar, Box, Button, Card, CardContent, CardMedia, IconButton, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Iconify } from '/src/components/iconify/iconify';

export const LeftCampaignOverview = () => {
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
        {'Campaign Title'}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {'Description'}
      </Typography>
      <Box mt={3}>
        <TypographyWithBg title="Date" value={'2023-01-01'} />
        <TypographyWithBg title="Category" value={'Category'} />
        <TypographyWithBg title="Reading Time" value={'5 min read'} />
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
          src={''}
          alt={'alt-image'}
          sx={{ width: 56, height: 56, mr: 2, borderRadius: '4px' }}
        />
        <Box>
          <Typography variant="subtitle2" color="text.primaryX">
            {'Author Name'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {'Author Bio'}
          </Typography>
        </Box>
      </Box>
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
      <Typography
        variant="h6"
        color="text.primary"
        gutterBottom
        sx={{ fontSize: '35px', fontWeight: '400', fontFamily: 'Vidaloka' }}
      >
        Recent Used Tags
      </Typography>
      <Grid
        container
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}
      >
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '25px',
              backgroundColor: 'transparent',
              color: '#585858',
              border: 'solid 1px #585858',
              width: '100%',
              paddingX: '50px',
              '&:hover': {
                backgroundColor: '#D8D8D8',
                border: 'solid 1px #D8D8D8',
                color: 'white',
              },
            }}
          >
            Work from Home
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '25px',
              backgroundColor: '#D8D8D8',
              color: 'black',
              border: 'solid 1px #D8D8D8',
              width: '100%',
              paddingX: '50px',
              flex: 'end',
              '&:hover': {
                backgroundColor: 'transparent',
                border: 'solid 1px #D8D8D8',
                color: 'black',
              },
            }}
          >
            Outdoor
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={2}>
        <Grid>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '25px',
              backgroundColor: 'transparent',
              color: '#585858',
              border: 'solid 1px #585858',
              '&:hover': {
                backgroundColor: '#D8D8D8',
                border: 'solid 1px #D8D8D8',
                color: 'white',
              },
            }}
          >
            See More
          </Button>
        </Grid>
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
        <Typography
          variant="subtitle1"
          color="text.primary"
          sx={{ fontFamily: 'Montserrat', fontSize: '20px', textTransform: 'uppercase' }}
        >
          TAG: {tag.tag}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ fontSize: '14px' }}>
          Profile: {tag.profile}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Product: {tag.product}
        </Typography>
      </CardContent>
    </Card>
  );
};
