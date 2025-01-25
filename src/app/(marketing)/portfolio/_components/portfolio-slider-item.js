import Link from 'next/link';
import { Box, Button, Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';

const PortfolioSliderItem = ({ item, index, currentIndex }) => {
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 2,
        border:'unset',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        image={item.thumbnail}
        alt="Background Image"
        draggable={false}
        sx={{ height: '88%', width: '100%', objectFit: 'cover', filter: 'brightness(100%)', borderRadius:'24px'}}
        
      />
      <CardContent
        sx={{
          width: '100%',
          px: 2,
          display: currentIndex === index ? 'block' : 'none',
          border:'unset'
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: -2.5 }}>
          <Stack direction="column" alignItems="flex-start">
            <Typography variant="cardTitle">{item.project_title}</Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography variant="cardSubTitle">Model: {item.model}</Typography>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Typography variant="cardSubTitle">Publication: {item.publication}</Typography>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Typography variant="cardSubTitle">DP: {item.dp}</Typography>
            </Box>
          </Stack>
          <Link href={`/portfolio/${item.slug}`}>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              sx={{ zIndex: 10, cursor: 'pointer', backgroundColor:'#d3d3d3', padding:'.125rem .5rem' }}
            >
              View Portfolio
            </Button>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PortfolioSliderItem;