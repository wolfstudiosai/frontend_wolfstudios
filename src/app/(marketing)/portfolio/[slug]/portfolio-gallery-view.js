'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Box, Button, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const portfolioItems = [
  'https://picsum.photos/300/200?random=1',
  'https://picsum.photos/300/200?random=2',
  'https://picsum.photos/300/200?random=3',
  'https://picsum.photos/300/200?random=4',
  'https://picsum.photos/300/200?random=5',
];

export const PortfolioGalleryView = () => {
  const [selectedItemSrc, setSelectedItemSrc] = useState(portfolioItems[0]);

  const theme = useTheme();

  return (
    <Box sx={{ mx: 'auto', px: 2, py: 4, maxWidth: 1200 }}>
      <Box sx={{ mb: 4 }}>
        <Paper elevation={4} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Image
            src={selectedItemSrc}
            alt="alt-image"
            width={1200}
            height={800}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </Paper>
      </Box>

      <Grid container spacing={2}>
        {portfolioItems.map((item) => (
          <Grid key={item} item xs={12} sm={6} md={2.4}>
            <Button
              onClick={() => setSelectedItemSrc(item)}
              sx={{
                p: 0,
                borderRadius: 2,
                outline: selectedItemSrc === item ? `2px solid ${theme.palette.primary.main}` : 'none',
                '&:hover': { opacity: 0.8 },
              }}
            >
              <Paper>
                <Image
                  src={item}
                  alt="alt-image"
                  width={240}
                  height={160}
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }}
                />
              </Paper>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
