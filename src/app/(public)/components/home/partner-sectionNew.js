"use client";

import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FadeIn } from '/src/components/animation/fade-in';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Iconify } from '/src/components/iconify/iconify';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ManagePartnerRightPanel } from '../../partner/_components/manage-partner-right-panel';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';

const cards = [
  {
    video: 'https://player.vimeo.com/progressive_redirect/playback/1008919226/rendition/1080p/file.mp4?loc=external&signature=bf4233dc5593395173302057f4757f83ccb3c307dd4c49f373ecf1e8f5d31ffb',
    name: 'Partner 0',
    designation: 'Partner',
    title:'Hello these is Approach data',
    subtext:'Sub-text-1',
    subtext2:'Sub-text2',
    id: 0,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/67170dd5c7259b4b76267d1f_DSC00747.jpg',
    name: 'Partner 1',
    designation: 'Partner',
    title:'Hello these is Approach data',
    subtext:'Sub-text-1',
    subtext2:'Sub-text2',
    id: 1,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a166f1260d41c15c305c7_670f57d45ad541aa5f58e9a3_67040092fc0406aea44cf646_DSC08662-p-800.jpeg',
    name: 'Partner 2',
    designation: 'Partner',
    title:'Hello these is Approach data',
    subtext:'Sub-text-1',
    subtext2:'Sub-text2',
    id: 2,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a2d4f4cbbc6d3e7c13aa5_DSC02474s.jpg',
    name: 'Partner 3',
    designation: 'Brand',
    title:'Hello these is Approach data',
    subtext:'Sub-text-1',
    subtext2:'Sub-text2',
    id: 3,
  },
  {
    video: 'https://player.vimeo.com/progressive_redirect/playback/1008947433/rendition/1080p/file.mp4?loc=external&signature=395c363decf2b9c5efa59010005a9ccc97b2524fab8fcba75bd44be7e72e16f7',
    name: 'Partner 4',
    designation: 'Brand',
    title:'Hello these is Approach data',
    subtext:'Sub-text-1',
    subtext2:'Sub-text2',
    id: 4,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fceb82b74027628836d005_66f6664e6c10316b602127e7_DSC09046-2.jpeg',
    name: 'Partner 5',
    designation: 'Brand',
    title:'Hello these is Approach data',
    subtext:'Sub-text-1',
    subtext2:'Sub-text2',
    id: 5,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57c9c01ea91918071feb_6703d1ed7f9d241965a153a0_DSC01595.jpeg',
    name: 'Partner 6',
    designation: 'REVO',
    title:'Hello these is Approach data',
    subtext:'Sub-text-1',
    subtext2:'Sub-text2',
    id: 6,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57c56327d6ab7a4dda60_66f299235cc7eab712895f06_lionne-clothing-1-3.jpeg',
    name: 'Partner 7',
    designation: 'REVO',
    title:'Hello these is Approach data',
    subtext:'Sub-text-1',
    subtext2:'Sub-text2',
    id: 7,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57c86d0ccf9681860f77_6703d3b1fe77e516449280d0_DSC04763.jpeg',
    name: 'Partner 8',
    designation: 'Partner',
    title:'Hello these is Approach data',
    subtext:'Sub-text-1',
    subtext2:'Sub-text2',
    id: 8,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f583f44ad14ad0578c0ab_6703bd5e85f0e12fe49449bd_46703916_2133951916920088_8689628144514105344_n.jpeg',
    name: 'Partner 9',
    designation: 'Partner',
    title:'Hello these is Approach data',
    subtext:'Sub-text-1',
    subtext2:'Sub-text2',
    id: 9,
  },
  {
    url: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57c8854570b8ec5928e6_6703d621641412d73234724e_46451760_2128888390759774_5360902273910177792_n.jpeg',
    name: 'Partner 10',
    designation: 'Partner',
    title:'Hello these is Approach data',
    subtext:'Sub-text-1',
    subtext2:'Sub-text2',
    id: 10,
  },
];

export const PartnerSectionNew = ({ isSecondHorizontal }) => {
  const [partners, setPartners] = useState([]);
    
  const router = useRouter();

  const fetchPartners = async () => {
    try{
      const response = await getPartnerListAsync({
        page: 1,
        rowsPerPage: 20,
      });
      if (response?.success) {
        setPartners((prev) => [...prev, ...response.data]);
      }
    }catch(error){
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid xs={12}>
          <Stack direction="column" sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
              <FadeIn>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' }, 
                  alignItems: 'flex-start',
                  gap: { xs: 2, md: 4, lg: 8 },
                }}>
                    <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
                      <Stack direction="row">
                        <Typography 
                          variant="h4"
                          fontWeight="bold"
                          sx={{
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' },
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            color: 'text.primary',
                            flexGrow: 1
                          }}>
                          Partners
                        </Typography>
                          <Button
                              variant="text"
                              onClick={() => router.push('/partners')}
                              endIcon={<Iconify icon="material-symbols:arrow-right-alt-rounded" />}
                              sx={{ 
                                margin: 0, 
                                padding: 0,
                                display: { xs: 'none', sm: 'flex' } 
                              }}
                          ></Button>
                      </Stack>
                    </Stack>
                      <Typography 
                        fontWeight="semibold" 
                        sx={{ 
                          color: 'text.primary', 
                          lineHeight: 1,
                          fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem', lg: '40px' },
                          width: '100%',
                        }}>
                          By developing from the idea up, we
                      </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'flex-start', 
                  gap: 4, 
                  flexWrap: 'wrap' 
                }}>
                  <Typography 
                    fontWeight="semibold" 
                    sx={{ 
                      color: 'text.primary', 
                      lineHeight: 1,
                      fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem', lg: '40px' },
                      width: '100%' 
                    }}>
                      {"transform concepts into strong creative execution that's driven by both form and function."}
                  </Typography>
                </Box>
              </FadeIn>
          </Stack>
      </Grid>
      <Grid md={12} xs={12}>
        <StaticGridView partners={partners} isSecondHorizontal={isSecondHorizontal} />
      </Grid>
    </Grid>
  );
};

const StaticGridView = ({ partners, isSecondHorizontal }) => {
  const reversedPartners = [...partners].reverse();
  return (
    <Box sx={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          px: 2,
          py: 2,
          '&::-webkit-scrollbar': { display: 'none' }
        }}>
          <Box sx={{ 
            display: 'inline-flex', 
            gap: { xs: 0.1, md: 0.2 },
            width: 'auto',
            minWidth: '100%',
            alignItems: 'flex-start'
          }}>
             {partners.map((partner, index) => (
              <Box 
                key={partner.id}
                sx={{ 
                  display: 'inline-block',
                  minWidth: { xs: '300px', sm: '280px', md: '260px' },
                  width: { xs: '300px', sm: '280px', md: '260px' },
                  flexShrink: 0,
                }}
              >
                <Stack spacing={0.7}>
                  <Card card={partner} fetchList={partners} />
                  {isSecondHorizontal && <Card card={reversedPartners[index]} fetchList={partners} />}
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
  );
};

const Card = ({ card, fetchList }) => {
  const [openPartnerRightPanel, setOpenPartnerRightPanel] = useState(null);
  return (
    <>
      <Box
        key={card.id}
        sx={{
          position: 'relative',
          height:'400px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          transition: 'transform 300ms ease',
        }}
        onClick={() => setOpenPartnerRightPanel(card)}
      >
        {/* Background Image or Video */}
        {card?.video ? (
          <Box
            component="video"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            autoPlay
            loop
            muted
          >
            <source src={card.video} type="video/mp4" />
            Your browser does not support the video tag.
          </Box>
        ) : (
          <Box
            className="image"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              backgroundImage: `url(${card?.ProfileImage?.[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 300ms ease',
            }}
          />
        )}

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
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontFamily: 'Crimson Text, serif',
                fontWeight: 500,
                textTransform: 'uppercase',
                marginBottom: '7px',
              }}
            >
              {card?.Name?.split(' ').length > 4
                ? card?.Name?.split(' ').slice(0, 4).join(' ') + '...' 
                : card?.Name}
            </Typography>

            {/* Thin Line */}
            <Box
            sx={{
              width: '100%',
              height: '0.8px',
              backgroundColor: '#ffff',
              marginBottom: '7px',
            }}
          />
            <Stack spacing={0.5} direction={'row'} justifyContent={'space-between'} alignItems={'center'} marginBottom={1.2}>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '0.675rem', md: '0.9rem' },
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: 1.2,
                  marginRight: 'auto'
                }}
              >
                {card.ByStatesPartnerHQ?.map((state) => state?.ByStates?.Name).join(', ')}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '0.675rem', md: '0.9rem' },
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: 1.2,
                  marginRight: '10px'
                }}
              >
                {card.subtext2}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '0.675rem', md: '0.9rem' },
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: 1.2,
                }}
              >
                {card.subtext2}
              </Typography>
            </Stack>

            <Stack spacing={0.5} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '0.675rem', md: '0.9rem' },
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: 1.2,
                  marginRight: 'auto'
                }}
              >
                {card.ByCityPartnerHQ?.map((country) => country?.ByCity?.Name).join(', ')}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '0.675rem', md: '0.9rem' },
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: 1.2,
                  marginRight: '10px'
                }}
              >
                {card.subtext2}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '0.675rem', md: '0.9rem' },
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: 1.2,
                }}
              >
                {card.subtext2}
              </Typography>
            </Stack>
          {/* Add new text elements here */}
        </Box>
      </Box>
      <ManagePartnerRightPanel
        view="QUICK"
        fetchList={fetchList}
        open={openPartnerRightPanel ? true : false}
        data={openPartnerRightPanel}
        onClose={() => setOpenPartnerRightPanel(false)}
      />
    </>
  );
};

const HorizontalScrollCarousel = ({ direction, fetchList }) => {
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
        height: '44px',
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
        <motion.div style={{ x, display: 'flex', gap: 1 }}>
          {cards.map((card) => (
            <Card card={card} key={card.id} fetchList={fetchList} />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};
