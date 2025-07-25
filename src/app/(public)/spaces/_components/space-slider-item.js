import React from 'react';
import Image from 'next/image';
import { getFancyColor, getRandomColor } from '/src/utils/helper';
import { Avatar, AvatarGroup, Box, Card, Chip, Stack, Typography } from '@mui/material';
import { ManageSpaceRightPanel } from './space-right-panel';

export const SpaceSliderItem = ({ item, index, fetchList }) => {
  const [openSpaceRightPanel, setOpenSpaceRightPanel] = React.useState(null);

  const isVideoContent = (url) => {
    const videoKeywords = ['vimeo', 'playback', 'video'];
    return videoKeywords.some((keyword) => url.includes(keyword));
  };

  return (
    <Card
      sx={{
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
        border: 'solid .1px var(--mui-palette-divider)',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => setOpenSpaceRightPanel(item)}
    >
      {isVideoContent(item.thumbnail) ? (
        <Box
          component="video"
          src={item.thumbnail}
          muted
          autoPlay
          loop
          draggable={false}
          playsInline
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />
      ) : (
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item.thumbnail}`}
          alt={item.title}
          draggable={false}
          style={{
            objectFit: 'cover',
            filter: 'blur(20px)',
            transition: 'filter 0.2s ease-out',
          }}
          loading="lazy"
          sizes="100vw"
          fill={true}
          onLoad={(e) => {
            e.target.style.filter = 'blur(0px)';
          }}
        />
      )}
      <Stack
        direction="column"
        spacing={1}
        px={2}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          width: '100%',
          pb: 2,
          pt: 3,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
        }}
      >
        <Typography variant="h5" fontWeight={700} color="var(--mui-palette-common-white)">
          {item.project_title}
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="body" color="var(--mui-palette-common-white)">
            {item.state}
          </Typography>
          {item.category.split(',').map((category, index) => (
            <Chip key={index} label={category.trim()} size="small" sx={{ backgroundColor: getFancyColor(index) }} />
          ))}
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent={'flex-end'}
        sx={{ position: 'absolute', top: 20, right: 10, width: '100%' }}
      >
        <AvatarGroup
          spacing={'small'}
          total={42}
          sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 12, mb: 0.5 } }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </AvatarGroup>
      </Stack>
      <ManageSpaceRightPanel
        view={'QUICK'}
        fetchList={fetchList}
        width="70%"
        open={openSpaceRightPanel ? true : false}
        data={openSpaceRightPanel}
        onClose={() => setOpenSpaceRightPanel(false)}
      />
    </Card>
  );
}