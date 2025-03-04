import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

const cards = [
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/67170dd5c7259b4b76267d1f_DSC00747.jpg',
    title: 'Partner 1',
    designation: 'Partner',
    id: 1,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a166f1260d41c15c305c7_670f57d45ad541aa5f58e9a3_67040092fc0406aea44cf646_DSC08662-p-800.jpeg',
    title: 'Partner 2',
    designation: 'Partner',
    id: 2,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a2d4f4cbbc6d3e7c13aa5_DSC02474s.jpg',
    title: 'Partner 3',
    designation: 'Brand',
    id: 3,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57c92ae60d5a7d7f7f91_6703d31eea9f1ebbd0d8894d_DSC01618.jpeg',
    title: 'Partner 4',
    designation: 'Brand',
    id: 4,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fceb82b74027628836d005_66f6664e6c10316b602127e7_DSC09046-2.jpeg',
    title: 'Partner 5',
    designation: 'Brand',
    id: 5,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57c9c01ea91918071feb_6703d1ed7f9d241965a153a0_DSC01595.jpeg',
    title: 'Partner 6',
    designation: 'REVO',
    id: 6,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57c56327d6ab7a4dda60_66f299235cc7eab712895f06_lionne-clothing-1-3.jpeg',
    title: 'Partner 7',
    designation: 'REVO',
    id: 7,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57c86d0ccf9681860f77_6703d3b1fe77e516449280d0_DSC04763.jpeg',
    title: 'Partner 8',
    designation: 'Partner',
    id: 8,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f583f44ad14ad0578c0ab_6703bd5e85f0e12fe49449bd_46703916_2133951916920088_8689628144514105344_n.jpeg',
    title: 'Partner 9',
    designation: 'Partner',
    id: 9,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57c8854570b8ec5928e6_6703d621641412d73234724e_46451760_2128888390759774_5360902273910177792_n.jpeg',
    title: 'Partner 10',
    designation: 'Partner',
    id: 10,
  },
];

export const PartnerSection = () => {
  return (
    <Stack spacing={0.6} p={4}>
      <HorizontalScrollCarousel direction="left" />
      <HorizontalScrollCarousel direction="right" />
    </Stack>
  );
};

const HorizontalScrollCarousel = ({ direction }) => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const totalWidth = React.useMemo(() => cards.length * 350, []);
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
        height: '350px',
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
        <motion.div style={{ x, display: 'flex', gap: 5 }}>
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
        height: 350,
        width: 350,
        overflow: 'hidden',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        transition: 'transform 300ms ease',
      }}
    >
      {/* Background Image */}
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
          transition: 'transform 300ms ease',
        }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: '40%',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
          zIndex: 5,
        }}
      />

      {/* Title & Description */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          zIndex: 10,
          width: '100%',
          padding: 2,
        }}
      >
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: 'white',
              letterSpacing: '1px',
              fontSize: '1.25rem',
            }}
          >
            {card.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
            }}
          >
             {card.designation}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
