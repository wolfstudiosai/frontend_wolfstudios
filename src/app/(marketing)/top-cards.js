'use client';

import * as React from 'react';
import { Box, Card, Icon, Typography } from '@mui/material';
import { pxToRem, textShortner } from '@/utils/utils';

export function FeatureCards() {
  const cardsdata = [
    {
      id: 1,
      icon: 'nature',
      title: 'Plants',
      description: 'Essential for all life.',
      image: 'https://picsum.photos/300/200?random=5',
      timestamp: '12:32 PM',
    },
    {
      id: 2,
      icon: 'pets',
      title: 'Animals',
      description: 'A part of nature.',
      image: 'https://picsum.photos/300/200?random=7',
      timestamp: '4 days ago',
    },
    {
      id: 3,
      icon: 'person',
      title: 'Humans',
      description: 'Depend on plants for survival.',
      image: 'https://picsum.photos/300/200?random=3',
      timestamp: '52 min ago',
    },
    {
      id: 4,
      icon: 'cloud',
      title: 'Weather',
      description: 'Affects all living organisms.',
      image: 'https://picsum.photos/300/200?random=9',
      timestamp: '2 hours ago',
    },
    {
      id: 5,
      icon: 'mountain',
      title: 'Mountains',
      description: 'Majestic and beautiful landforms.',
      image: 'https://picsum.photos/300/200?random=11',
      timestamp: '1 week ago',
    },
    {
      id: 6,
      icon: 'star',
      title: 'Stars',
      description: 'Born in space, provide energy.',
      image: 'https://picsum.photos/300/200?random=13',
      timestamp: '3 minutes ago',
    },
    {
      id: 7,
      icon: 'earth',
      title: 'Earth',
      description: 'Home to millions of species.',
      image: 'https://picsum.photos/300/200?random=15',
      timestamp: '1 month ago',
    },
  ];


  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        p: 2,
        mx: 2,
        position: 'sticky',
        top: 50,
        zIndex: 999,
        backgroundColor: 'var(--mui-palette-background-default)',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          height: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'var(--mui-palette-background-level2)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
        backgroundColor: 'var(--mui-palette-background-default)',
        // overflow: "hidden"
      }}
    >
      {cardsdata.map((card) => (
        <Card
          key={card.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: pxToRem(100),
            width: { xs: '100%', sm: pxToRem(200) },
            flex: '0 0 auto',
            paddingX: 1,
            paddingY: .5,
            boxShadow: 3,
            borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
            border: 'solid .1px var(--mui-palette-divider)',
            backgroundColor: 'var(--mui-palette-background-paper)',
            overflow: 'hidden',
          }}
        >
          {/* Image Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
            <img
              src={card.image}
              alt={card.title}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* Title and Description Section */}
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Title */}
              <Typography
                variant="h6"
                sx={{
                  fontSize: pxToRem(12),
                  whiteSpace: 'normal',
                }}
              >
                {card.title}
              </Typography>

              {/* Timestamp */}
              <Typography
                sx={{
                  fontSize: pxToRem(10),
                  color: 'text.secondary',
                }}
              >
                {card.timestamp}
              </Typography>
            </Box>

            {/* Description Section */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: pxToRem(10),
                whiteSpace: 'normal',
              }}
            >
              {textShortner(card.description, 20)}
            </Typography>
          </Box>

          {/* Image Section with Timestamp */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
          </Box>
        </Card>
      ))}
    </Box>
  );
}
