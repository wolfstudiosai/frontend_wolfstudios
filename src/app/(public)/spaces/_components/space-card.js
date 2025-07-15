import React from 'react';
import { Box, Card } from '@mui/material';

import { SpaceRightPanel } from './space-right-panel';
import { isVideoContent } from '/src/utils/helper';

export const SpaceCard = ({ content }) => {
  const [openRightPanel, setOpenRightPanel] = React.useState(false);

  return (
    <>
      <Card
        sx={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#333',
          borderRadius: '0',
          display: 'flex',
          flexDirection: 'column',
          '&:hover .menu-icon': {
            opacity: 1,
          },
          '&:hover .image-container': {
            opacity: 0.8,
          },
        }}
        onClick={() => setOpenRightPanel(true)}
      >
        <Box className="image-container" sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {isVideoContent(content?.thumbnailImage || '') ? (
            <Box
              component="video"
              src={content?.thumbnailImage}
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
        </Box>

        {openRightPanel && (
          <SpaceRightPanel
            onClose={() => setOpenRightPanel(false)}
            open={openRightPanel}
            id={content?.id}
            view={'QUICK'}
          />
        )}
      </Card>
    </>
  );
};
