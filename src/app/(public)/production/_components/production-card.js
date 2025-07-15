import React from 'react';
import { Box, Card, Stack, Typography } from '@mui/material';

import { ProductionRightPanel } from './production-right-panel';
import { isVideoContent } from '/src/utils/helper';

export const ProductionCard = ({ content }) => {
  const [openProductionPanel, setOpenProductionPanel] = React.useState(false);

  return (
    <>
      <Card
        sx={{
          width: '100%',
          aspectRatio: '9 / 16',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#333',
          borderRadius: '0',
          border: '.1px solid var(--mui-palette-divider)',
          display: 'flex',
          flexDirection: 'column',
          '&:hover .menu-icon': {
            opacity: 1,
          },
          '&:hover .image-container': {
            opacity: 0.8,
          },
        }}
        onClick={() => setOpenProductionPanel(true)}
      >
        <Box className="image-container" sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {isVideoContent(content.thumbnailImage || '') ? (
            <Box
              component="video"
              src={content.thumbnailImage}
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
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Box
                component="img"
                src={content?.thumbnailImage || '/assets/image-placeholder.jpg'}
                alt={content?.name}
                sx={{
                  width: '100%',
                  height: { lg: 350, md: 400, sm: 300, xs: 300 },
                  objectFit: 'cover',
                  borderRadius: 'calc(2* var(--mui-shape-borderRadius))',
                  padding: 1.5,
                }}
              />
            </Box>
          )}

          {/* Title Overlay */}
          <Stack
            direction="column"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 1.5,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
            }}
          >
            <Typography fontWeight={400} color="white" fontSize={{ xs: 12, md: 14 }} noWrap>
              {content.name || ''}
            </Typography>
            {/* Thin Line */}
            <Box
              sx={{
                width: '100%',
                height: '0.8px',
                margin: '4px 0',
                background: 'var(--mui-palette-divider)',
              }}
            />
          </Stack>
        </Box>

        {openProductionPanel && (
          <ProductionRightPanel onClose={() => setOpenProductionPanel(false)} open={openProductionPanel} id={content.id} view={'QUICK'} />
        )}
      </Card>
    </>
  );
};
