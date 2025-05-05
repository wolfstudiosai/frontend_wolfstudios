'use client';

import { pxToRem, textShortner } from '/src/utils/helper';
import { Box, Card, Typography, Stack, Avatar, Divider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IconButton from '@mui/material/IconButton';
import SnoozeIcon from '@mui/icons-material/Snooze';

export function NotificationCards() {
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
    <>
     <Box
      sx={{
        display: 'flex',
        gap: 1,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        pt: { xs: pxToRem(2), lg: pxToRem(6) },
        mx: 1.5,
        position: 'sticky',
        top: 45,
        zIndex: 999,
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          height: '0px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'var(--mui-palette-background-level2)',
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
            display: "flex",
            alignItems: "center",
            minWidth: pxToRem(350),
            width: { xs: "100%", sm: pxToRem(200) },
            flex: "0 0 auto",
            paddingX: 1,
            paddingY: 1,
            boxShadow: 3,
            borderRadius: "0",
            borderRight: "1px solid var(--mui-palette-divider)",
            overflow: "hidden",
            backgroundColor: "transparent", 
        }}
      >
      {/* Card Content - All elements in one horizontal line */}
      <Box
        sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 1.2,
        }}
        >
        {/* Image */}
        <Avatar
            src={card.image}
            alt={card.title}
            sx={{
            width: 30,
            height: 30,
            flexShrink: 0,
            marginTop:"-5px"
            }}
        />

        {/* Title and Timestamp */}
        <Box
            sx={{
            display: "flex",
            flexDirection: 'column',
            alignItems: "flex-start",
            flexGrow: 1,
            minWidth: 0,
            overflow: "hidden",
            }}
        >
            {/* Title and Timestamp */}
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                }}
            >
                {/* Title */}
                <Typography
                variant="subtitle1"
                sx={{
                    fontSize: pxToRem(15),
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textDecoration: 'underline',
                }}
                >
                {card.title}
                </Typography>

                {/* Timestamp */}
                <Typography
                sx={{
                    fontSize: pxToRem(12),
                    color: "text.secondary",
                    marginLeft: 1.5,
                    flexShrink: 0,
                }}
                >
                {card.timestamp}
                </Typography>
            </Box>

             {/* Description */}
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                fontSize: pxToRem(13),
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textDecoration: 'underline',
                }}
            >
                {textShortner(card.description, 35)}
            </Typography>
        </Box>

        {/* Action Icons */}
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0 }}>
            <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
            checkedIcon={<CheckBoxIcon />}
            />
            <IconButton color="inherit" aria-label="snooze" edge="end" size="small" sx={{ p: 0.5 }}>
            <SnoozeIcon fontSize="small" />
            </IconButton>
        </Stack>
      </Box>
    </Card>
      ))}
     </Box>
    <Divider sx={{ borderColor: 'var(--mui-palette-divider)', mt: 0.8, mx: 1.8 }} />
    </>
  );
}