'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { PartnerRightPanel } from '../../partner/_components/partner-right-panel';

export const PartnerSectionNew = () => {
  const [partners, setPartners] = useState([]);

  const router = useRouter();

  const fetchPartners = async () => {
    try {
      const filters = [{ key: "isFeatured", type: "boolean", operator: "is", value: true }];
      const response = await getPartnerListAsync({
        page: 1,
        rowsPerPage: 20,
      }, filters, 'and');

      if (response?.success) {
        setPartners(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <Grid container alignItems="center">
      <Grid xs={12}>
        <Stack direction="column">
          <FadeIn>
            <Box sx={{ py: { xs: 1, md: 2 } }}>
              <Stack direction="row">
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: 'text.primary', mb: { xs: 0, md: 1 } }}
                  textTransform="uppercase"
                  fontSize={{ xs: '1.5rem', sm: '2rem', md: '2.2rem' }}
                >
                  Partners
                </Typography>
                <Button
                  variant="text"
                  onClick={() => router.push('/portfolio')}
                  endIcon={<Iconify icon="material-symbols:arrow-right-alt-rounded" />}
                  sx={{
                    margin: 0,
                    padding: 0,
                    display: { xs: 'none', sm: 'flex' },
                  }}
                ></Button>
              </Stack>
              <Typography
                fontWeight="semibold"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1,
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                  width: '100%',
                }}
              >
                {
                  "By developing from the idea up, we transform concepts into strong creative execution that's driven by both form and function."
                }
              </Typography>
            </Box>
          </FadeIn>
        </Stack>
      </Grid>
      <Grid md={12} xs={12}>
        <StaticGridView partners={partners} />
      </Grid>
    </Grid>
  );
};

const StaticGridView = ({ partners }) => {
  return (
    <Box
      sx={{
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        // py: 2,
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          gap: '0px',
          width: 'auto',
          minWidth: '100%',
          alignItems: 'flex-start',
          gap: { md: 0.5 },
        }}
      >
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
            <Stack spacing={0.5}>
              <Card card={partner} fetchList={partners} />
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Card = ({ card, fetchList }) => {
  const [openPartnerRightPanel, setOpenPartnerRightPanel] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  return (
    <>
      <Box
        key={card.id}
        sx={{
          position: 'relative',
          height: '400px',
          width: { xs: '300px', sm: '280px', md: '260px' },
          overflow: 'hidden',
          transition: 'transform 300ms ease',
          border: '1px solid var(--mui-palette-divider)',
        }}
        onClick={() => {
          setSelectedItemId(card.id)
          setOpenPartnerRightPanel(true)
        }}
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
            {card?.Name?.split(' ').length > 4 ? card?.Name?.split(' ').slice(0, 4).join(' ') + '...' : card?.Name}
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
          <Stack
            spacing={0.5}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            marginBottom={1.2}
          >
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: { xs: '0.675rem', md: '0.9rem' },
                fontFamily: 'Crimson Text, serif',
                lineHeight: 1.2,
                marginRight: 'auto',
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
                marginRight: '10px',
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
                marginRight: 'auto',
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
                marginRight: '10px',
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
      {openPartnerRightPanel && (
        <PartnerRightPanel
          onClose={() => {
            setSelectedItemId(null)
            setOpenPartnerRightPanel(false)
          }}
          fetchList={fetchList}
          id={selectedItemId}
          open={openPartnerRightPanel}
        />
      )}
    </>
  );
};
