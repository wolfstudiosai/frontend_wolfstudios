import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

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
];

export const PartnerSection = () => {
  return (
    <Box sx={{ bgcolor: 'neutral.800' }}>
      <HorizontalScrollCarousel direction="left" />
      <HorizontalScrollCarousel direction="right" />
    </Box>
  );
};

const HorizontalScrollCarousel = ({ direction }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Set the scroll transformation based on the direction
  const x = useTransform(scrollYProgress, [0, 1], direction === 'left' ? ['1%', '-95%'] : ['-1%', '95%']);

  return (
    <Box ref={targetRef} sx={{ position: 'relative', height: '450px', bgcolor: 'neutral.900', border: '1px solid red' }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          display: 'flex',
        //   height: '100vh',
          alignItems: 'center',
          overflow: 'hidden',
          border: '1px solid red',
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
