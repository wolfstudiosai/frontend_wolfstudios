'use client';

import * as React from 'react';
import { Box, Card, Icon, Typography } from '@mui/material';

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
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        p: 2,
        position: 'sticky',
        top: '100px',
        zIndex: 999,
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
      }}
    >
      {cardsdata.map((card) => (
        <Card
          key={card.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: 350,
            width: { xs: '100%', sm: 300 },
            flex: '0 0 auto',
            padding: 1.5,
            boxShadow: 3,
            borderRadius: 2,
            border: 'solid 1px #e0e0e0',
            backgroundColor: 'var(--mui-palette-background-paper)',
            overflow: 'hidden',
          }}
        >
          {/* Icon Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
            <Icon color="primary" sx={{ fontSize: 40 }}>
              {card.icon}
            </Icon>
          </Box>

          {/* Title and Description Section */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                whiteSpace: 'normal',
              }}
            >
              {card.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '14px',
                marginTop: '4px',
                whiteSpace: 'normal',
              }}
            >
              {card.description}
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
            {/* Timestamp */}
            <Typography
              sx={{
                fontSize: '12px',
                color: 'text.secondary',
                marginBottom: '4px',
              }}
            >
              {card.timestamp}
            </Typography>
            {/* Image */}
            <img
              src={card.image}
              alt={card.title}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Card>
      ))}
    </Box>
  );
}
