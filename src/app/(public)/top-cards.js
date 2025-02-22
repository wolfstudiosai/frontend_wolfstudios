'use client';

import { pxToRem, textShortner } from '/src/utils/helper';
import { Box, Card, Typography } from '@mui/material';

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
    {
      id: 8,
      icon: 'pets',
      title: 'Animals',
      description: 'A part of nature.',
      image: 'https://picsum.photos/300/200?random=7',
      timestamp: '4 days ago',
    },
    {
      id: 9,
      icon: 'person',
      title: 'Humans',
      description: 'Depend on plants for survival.',
      image: 'https://picsum.photos/300/200?random=3',
      timestamp: '52 min ago',
    },
    {
      id: 10,
      icon: 'person',
      title: 'Humans',
      description: 'Depend on plants for survival.',
      image: 'https://picsum.photos/300/200?random=3',
      timestamp: '52 min ago',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        // p: 2,
        pt: { xs: pxToRem(2), lg: pxToRem(6) },
        mx: 1.5,
        position: 'sticky',
        top: 45,
        zIndex: 999,
        backgroundColor: 'var(--mui-palette-background-default)',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          height: '0px', //i remove the scrollbar. if you want to use the scrollbar, increase height
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'var(--mui-palette-background-level2)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
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
            minWidth: pxToRem(350),
            width: { xs: '100%', sm: pxToRem(200) },
            flex: '0 0 auto',
            paddingX: 1,
            paddingY: 1,
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
                  fontSize: pxToRem(15),
                  whiteSpace: 'normal',
                }}
              >
                {card.title}
              </Typography>

              {/* Timestamp */}
              <Typography
                sx={{
                  fontSize: pxToRem(12),
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
                fontSize: pxToRem(15),
                whiteSpace: 'normal',
              }}
            >
              {textShortner(card.description, 35)}
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
          ></Box>
        </Card>
      ))}
    </Box>
  );
}