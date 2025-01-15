'use client';

import {
  Box,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import PortfolioSliderItem from './portfolio-slider-item';
import { textShortner } from '@/utils/utils';
import Link from 'next/link';

const slider_data = [
  {
    id: 1,
    title: 'Elegent Magazine',
    slug: 'elegent-magazine',
    model: 'Elina',
    publication: 'Vogue',
    dp: 'Combina Key',
    image: 'https://picsum.photos/300/200?random=2',
  },
  {
    id: 2,
    title: 'Fashion Trends',
    slug: 'fashion-trends',
    model: 'Alexis',
    publication: 'Elle',
    dp: 'Style Studio',
    image: 'https://picsum.photos/300/200?random=3',
  },
  {
    id: 3,
    title: 'Luxury Lifestyle',
    slug: 'luxury-lifestyle',
    model: 'Jordan',
    publication: 'GQ',
    dp: 'Chic Agency',
    image: 'https://picsum.photos/300/200?random=4',
  },
  {
    id: 4,
    title: 'Street Style',
    slug: 'street-style',
    model: 'Samantha',
    publication: 'Hypebae',
    dp: 'Urban Icons',
    image: 'https://picsum.photos/300/200?random=5',
  },
  {
    id: 5,
    title: 'Wedding Couture',
    slug: 'wedding-couture',
    model: 'Olivia',
    publication: 'Bridal Magazine',
    dp: 'Romance Creations',
    image: 'https://picsum.photos/300/200?random=6',
  },
  {
    id: 6,
    title: 'Travel Diaries',
    slug: 'travel-diaries',
    model: 'Noah',
    publication: 'National Geographic',
    dp: 'Adventure Lens',
    image: 'https://picsum.photos/300/200?random=7',
  },
  {
    id: 7,
    title: 'Tech Innovations',
    slug: 'tech-innovations',
    model: 'Sophia',
    publication: 'TechCrunch',
    dp: 'InnoHub',
    image: 'https://picsum.photos/300/200?random=8',
  },
  {
    id: 8,
    title: 'Fitness Journey',
    slug: 'fitness-journey',
    model: 'Ethan',
    publication: "Men's Health",
    dp: 'FitLife Studio',
    image: 'https://picsum.photos/300/200?random=9',
  },
  {
    id: 9,
    title: 'Foodie Tales',
    slug: 'foodie-tales',
    model: 'Isabella',
    publication: 'Bon Appétit',
    dp: 'Flavor Fusion',
    image: 'https://picsum.photos/300/200?random=10',
  },
  {
    id: 10,
    title: 'Artistic Expressions',
    slug: 'artistic-expressions',
    model: 'Liam',
    publication: 'Art Now',
    dp: 'Creative Space',
    image: 'https://picsum.photos/300/200?random=11',
  },
];

export default function PortfolioSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoSlideActive, setAutoSlideActive] = useState(true);

  const slides = slider_data.map((item, index) => ({
    id: item.id,
    content: <PortfolioSliderItem key={item.id} item={item} index={index} currentIndex={currentIndex} />,
  }));

  const slideVariants = {
    hidden: (_direction) => ({
      x: _direction > 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    exit: (_direction) => ({
      x: _direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    }),
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      handlePrev();
    } else if (info.offset.x < -100) {
      handleNext();
    }
  };

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (autoSlideActive) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [autoSlideActive, handleNext]);

  return (
    // <Box
    //   sx={{
    //     position: 'relative',
    //     width: '100%',
    //     mx: 'auto',
    //     overflow: 'hidden',
    //     mb: 6,
    //   }}
    //   onMouseEnter={() => setAutoSlideActive(false)}
    //   onMouseLeave={() => setAutoSlideActive(true)}
    // >
    //   <Box sx={{ position: 'relative', height: { xs: '300px', md: '400px' } }}>
    //     <AnimatePresence initial={false} custom={direction}>
    //       <motion.div
    //         key={currentIndex}
    //         custom={direction}
    //         variants={slideVariants}
    //         initial="hidden"
    //         animate="visible"
    //         exit="exit"
    //         drag="x"
    //         dragConstraints={{ left: 0, right: 0 }}
    //         dragElastic={1}
    //         onDragEnd={(event, info) => handleDragEnd(event, info)}
    //         style={{
    //           position: 'absolute',
    //           inset: 0,
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           cursor: 'grab',
    //         }}
    //       >
    //         <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
    //           {/* Previous slide (partial) */}
    //           <Box
    //             sx={{
    //               position: 'absolute',
    //               left: 0,
    //               top: 0,
    //               width: '16%',
    //               height: '100%',
    //               opacity: 0.7,
    //               display: 'flex',
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //               borderRadius: '20px',
    //             }}
    //           >
    //             {currentIndex > 0 ? slides[currentIndex - 1].content : slides[slides.length - 1].content}
    //           </Box>

    //           {/* Current slide */}
    //           <Box
    //             sx={{
    //               borderRadius: '20px',
    //               position: 'absolute',
    //               left: '16%',
    //               top: 0,
    //               width: '68%',
    //               height: '100%',
    //               px: '16px',
    //               display: 'flex',
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //             }}
    //           >
    //             {slides[currentIndex].content}
    //           </Box>

    //           {/* Next slide (partial) */}
    //           <Box
    //             sx={{
    //               borderRadius: '20px',
    //               position: 'absolute',
    //               right: 0,
    //               top: 0,
    //               width: '16%',
    //               height: '100%',
    //               opacity: 0.7,
    //               display: 'flex',
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //             }}
    //           >
    //             {slides[(currentIndex + 1) % slides.length].content}
    //           </Box>
    //         </Box>
    //       </motion.div>
    //     </AnimatePresence>
    //   </Box>

    //   <IconButton
    //     sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}
    //     onClick={handlePrev}
    //     disabled={currentIndex === 0}
    //   >
    //     <ChevronLeft />
    //   </IconButton>
    //   <IconButton
    //     sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
    //     onClick={handleNext}
    //     disabled={currentIndex === slides.length - 1}
    //   >
    //     <ChevronRight />
    //   </IconButton>
    // </Box>
    <UpdatedPortfolioSlider/>
  );
}

const UpdatedPortfolioSlider = () =>{
  const slider_data = [
    {
      id: 1,
      title: 'Elegent Magazine',
      slug: 'elegent-magazine',
      model: 'Elina',
      publication: 'Vogue',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=2',
    },
    {
      id: 2,
      title: 'Fashion Trends',
      slug: 'fashion-trends',
      model: 'Alexis',
      publication: 'Elle',
      dp: 'Style Studio',
      image: 'https://picsum.photos/300/200?random=3',
    },
    {
      id: 3,
      title: 'Luxury Lifestyle',
      slug: 'luxury-lifestyle',
      model: 'Jordan',
      publication: 'GQ',
      dp: 'Chic Agency',
      image: 'https://picsum.photos/300/200?random=4',
    },
    {
      id: 4,
      title: 'Street Style',
      slug: 'street-style',
      model: 'Samantha',
      publication: 'Hypebae',
      dp: 'Urban Icons',
      image: 'https://picsum.photos/300/200?random=5',
    },
    {
      id: 5,
      title: 'Wedding Couture',
      slug: 'wedding-couture',
      model: 'Olivia',
      publication: 'Bridal Magazine',
      dp: 'Romance Creations',
      image: 'https://picsum.photos/300/200?random=6',
    },
    {
      id: 6,
      title: 'Travel Diaries',
      slug: 'travel-diaries',
      model: 'Noah',
      publication: 'National Geographic',
      dp: 'Adventure Lens',
      image: 'https://picsum.photos/300/200?random=7',
    },
    {
      id: 7,
      title: 'Tech Innovations',
      slug: 'tech-innovations',
      model: 'Sophia',
      publication: 'TechCrunch',
      dp: 'InnoHub',
      image: 'https://picsum.photos/300/200?random=8',
    },
    {
      id: 8,
      title: 'Fitness Journey',
      slug: 'fitness-journey',
      model: 'Ethan',
      publication: "Men's Health",
      dp: 'FitLife Studio',
      image: 'https://picsum.photos/300/200?random=9',
    },
    {
      id: 9,
      title: 'Foodie Tales',
      slug: 'foodie-tales',
      model: 'Isabella',
      publication: 'Bon Appétit',
      dp: 'Flavor Fusion',
      image: 'https://picsum.photos/300/200?random=10',
    },
    {
      id: 10,
      title: 'Artistic Expressions',
      slug: 'artistic-expressions',
      model: 'Liam',
      publication: 'Art Now',
      dp: 'Creative Space',
      image: 'https://picsum.photos/300/200?random=11',
    },
  ];

  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <Grid
          container
          spacing={2}
          sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', marginBottom: '15px' }}
        >
          {slider_data.map((portfolio, index) => (
            <Grid item size={{ xs: 12, md: 3 }} key={index} sx={{ flex: '0 0 auto' }}>
              <PortfolioCard portfolio={portfolio} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

const PortfolioCard = ({ portfolio }) => {
  return (
    <Box>
      <Paper elevation={1} variant="outlined">
        <Box
          component="img"
          src={portfolio.image}
          sx={{ height: 200, width: '100%', objectFit: 'cover', border: 0, borderRadius: '5px 5px 0 0' }}
        />
        <Box p={2}>
          <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
            {portfolio.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            Model: {portfolio.model || '-'}
          </Typography>
          <Link
            href={`portfolio/${portfolio.slug}`}
            style={{
              fontSize: '0.9rem',
              color: 'var(--mui-palette-text-secondary)',
            }}
          >
            View Portfolio
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};
