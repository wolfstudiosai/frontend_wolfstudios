import { Box, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

const cards = [
  {
    url: 'https://picsum.photos/300/200?random=1',
    title: 'Title 1',
    id: 1,
  },
  {
    url: 'https://picsum.photos/300/200?random=2',
    title: 'Title 2',
    id: 2,
  },
  {
    url: 'https://picsum.photos/300/200?random=3',
    title: 'Title 3',
    id: 3,
  },
  {
    url: 'https://picsum.photos/300/200?random=4',
    title: 'Title 4',
    id: 4,
  },
  {
    url: 'https://picsum.photos/300/200?random=5',
    title: 'Title 5',
    id: 5,
  },
  {
    url: 'https://picsum.photos/300/200?random=6',
    title: 'Title 6',
    id: 6,
  },
  {
    url: 'https://picsum.photos/300/200?random=7',
    title: 'Title 7',
    id: 7,
  },
  {
    url: 'https://picsum.photos/300/200?random=7',
    title: 'Title 8',
    id: 8,
  },
  {
    url: 'https://picsum.photos/300/200?random=7',
    title: 'Title 9',
    id: 9,
  },
  {
    url: 'https://picsum.photos/300/200?random=7',
    title: 'Title 10',
    id: 10,
  },
];

export const PartnerSection = () => {
  return (
    <Box sx={{ py: 4 }}>
      <HorizontalScrollCarousel direction="left" />
      <HorizontalScrollCarousel direction="right" />
    </Box>
  );
};

const HorizontalScrollCarousel = ({ direction }) => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const totalWidth = React.useMemo(() => cards.length * 450, []);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? [0, -totalWidth + window.innerWidth] : [-totalWidth + window.innerWidth, 0]
  );

  return (
    <Box
      ref={targetRef}
      sx={{
        position: 'relative',
        height: '450px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <motion.div style={{ x, display: 'flex', gap: 2 }}>
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};

const Card = ({ card }) => {
  return (
    <Box
      key={card.id}
      sx={{
        position: 'relative',
        height: 450,
        width: 450,
        overflow: 'hidden',
        bgcolor: 'neutral.200',
        '&:hover .image': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Box
        className="image"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backgroundImage: `url(${card.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 300ms',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          display: 'grid',
          placeContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
            padding: 2,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'white',
            backdropFilter: 'blur(10px)',
            fontSize: '2.5rem',
          }}
        >
          {card.title}
        </Typography>
      </Box>
    </Box>
  );
};
