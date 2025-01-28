import Link from 'next/link';
import { pxToRem } from '@/utils/utils';
import { Box, Button, Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';

export const PortfolioSliderItem = ({ item, index }) => {
  const isVideoContent = (url) => {
    // Check for common video-hosting platforms or specific keywords in the URL
    const videoKeywords = ['vimeo', 'playback', 'video'];
    return videoKeywords.some((keyword) => url.includes(keyword));
  };

  return (
    <Card
      sx={{
        width: '100%',
        height: pxToRem(700),
        borderRadius: 2,
        border: 'unset',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {isVideoContent(item.url) ? (
        <Box
          component="video"
          src={item.url}
          controls
          muted
          autoPlay
          loop
          draggable={false}
          sx={{
            height: '88%',
            width: '100%',
            objectFit: 'cover',
            borderRadius: '24px',
          }}
        />
      ) : (
        <Box
          component="img"
          src={item.url}
          alt={item.title}
          draggable={false}
          sx={{
            height: '88%',
            width: '100%',
            objectFit: 'cover',
            filter: 'brightness(100%)',
            borderRadius: '24px',
          }}
        />
      )}
      <Stack direction="row" justifyContent="space-between" alignItems="center" px={2}>
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
            sx={{
              zIndex: 10,
              cursor: 'pointer',
              backgroundColor: 'var(--mui-palette-background-level2)',
              // padding: por125rem .5rem',
            }}
          >
            View Portfolio
          </Button>
        </Link>
      </Stack>
    </Card>
  );
};
