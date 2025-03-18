"use client";

import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ManagePortfolioRightPanel } from '../../portfolio/_components/manage-portfolio-right-panel';
import { getPortfolioListAsync } from '../../portfolio/_lib/portfolio.actions';
import { useEffect, useMemo, useRef, useState } from 'react';

export const PortfolioSectionNew = () => {
  const [portfolios, setPortfolios] = useState([]);

  const router = useRouter();

  const fetchPortfolios = async () => {
    const response = await getPortfolioListAsync({
      page: 1,
      rowsPerPage: 20,
    });
    if (response?.success) {
        setPortfolios((prev) => [...prev, ...response.data]);
    }
  }

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <Box
    sx={{
      pt: 1,
      px: { xs: 2, md: 4 },
      mb: '10px'
    }}
  >
      <Grid container spacing={2} alignItems="center">
        <Grid
          item
          size={{
            md: 4,
            xs: 12,
          }}
          >
            <FadeIn>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        fontSize: '2.2rem',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        color: 'text.primary',
                      }}
                    >
                      Portfolio
                    </Typography>
                    <Typography fontSize={18} sx={{ mt: 1, mb: 4 }}>
                      Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
                      visuals that captivate audiences, evoke emotion, and leave a lasting impact.
                    </Typography>
            </FadeIn>
            <Stack direction="row">
                <Button
                  variant="text"
                  onClick={() => router.push('/portfolio')}
                  endIcon={<Iconify icon="material-symbols:arrow-right-alt-rounded" />}
                  sx={{ margin: 0, padding: 0 }}
                  >
                   See all portfolios
                </Button>
            </Stack>
        </Grid>
        <Grid
         size={{
              md: 8,
              xs: 12,
            }}
        >
          <Stack spacing={0.2} sx={{ px: 4, pt: 1 }}>
            <HorizontalScrollCarousel direction="right" fetchList={portfolios} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const HorizontalScrollCarousel = ({ direction, fetchList }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const totalWidth = useMemo(() => 12 * 350, []);
  
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
          {fetchList.map((card) => (
            <Card card={card} key={card.id} fetchList={fetchList} />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};

const Card = ({ card, fetchList }) => {
  const [openPortfolioRightPanel, setOpenPortfolioRightPanel] = useState(null);
  return (
    <>
      <Box
        key={card.id}
        sx={{
          position: 'relative',
          height: 450,
          width: 300,
          overflow: 'hidden',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          transition: 'transform 300ms ease',
        }}
        onClick={() => setOpenPortfolioRightPanel(card)}
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
            backgroundImage: `url(${card.ThumbnailImage[0]})`,
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
          {/* Add new text elements here */}
                    <Typography
                        sx={{
                          color: 'white',
                          fontSize: '1rem',
                          fontFamily: 'Crimson Text, serif',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          marginBottom: '7px',
                        }}
                      >
                        {card.ProjectTitle.split(' ').length > 4
                          ? card.ProjectTitle.split(' ').slice(0, 4).join(' ') + '...' 
                          : card.ProjectTitle}
                    </Typography>
                      
                      <Stack spacing={0.5} direction={'row'} justifyContent={'space-between'} alignItems={'center'} marginBottom={1.2}>
                        <Typography
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.9rem',
                            fontFamily: 'Crimson Text, serif',
                            lineHeight: 1.2,
                            marginRight: 'auto'
                          }}
                        >
                          Lorem Ipsum
                        </Typography>
                        <Typography
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.9rem',
                            fontFamily: 'Crimson Text, serif',
                            lineHeight: 1.2,
                            marginRight: '10px'
                          }}
                        >
                          {card.designation}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.9rem',
                            fontFamily: 'Crimson Text, serif',
                            lineHeight: 1.2,
                          }}
                        >
                          {card.designation}
                        </Typography>
                      </Stack>
          
                      <Stack spacing={0.5} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.9rem',
                            fontFamily: 'Crimson Text, serif',
                            lineHeight: 1.2,
                            marginRight: 'auto'
                          }}
                        >
                          Lorem Ipsum
                        </Typography>
                        <Typography
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.9rem',
                            fontFamily: 'Crimson Text, serif',
                            lineHeight: 1.2,
                            marginRight: '10px'
                          }}
                        >
                          {card.designation}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.9rem',
                            fontFamily: 'Crimson Text, serif',
                            lineHeight: 1.2,
                          }}
                        >
                          {card.designation}
                        </Typography>
                      </Stack>    
          {/* Add new text elements here */}
        </Box>
      </Box>
      <ManagePortfolioRightPanel
          view={'QUICK'}
          fetchList={fetchList}
          width="70%"
          open={openPortfolioRightPanel ? true : false}
          data={openPortfolioRightPanel}
          onClose={() => setOpenPortfolioRightPanel(false)}
        />
    </>
  );
};

