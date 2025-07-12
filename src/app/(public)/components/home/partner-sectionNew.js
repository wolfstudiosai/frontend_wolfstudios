'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';

import { ManagePartnerRightPanel } from '../../partner/_components/manage-partner-right-panel';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';

export const PartnerSectionNew = () => {
  const [partners, setPartners] = useState([]);

  const router = useRouter();

  const fetchPartners = async () => {
    try {
      const filters = [{ key: 'isFeatured', type: 'boolean', operator: 'is', value: true }];
      const response = await getPartnerListAsync(
        {
          page: 1,
          rowsPerPage: 20,
        },
        filters,
        'and'
      );

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
        <StaticGridView partners={partners} fetchList={fetchPartners} />
      </Grid>
    </Grid>
  );
};

const StaticGridView = ({ partners, fetchList }) => {
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
              <Card card={partner} fetchList={fetchList} />
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
        onClick={() => setOpenPartnerRightPanel(card)}
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
            backgroundImage: `url("${encodeURI(card?.thumbnailImage)}")`,
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
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontFamily: 'Crimson Text, serif',
              fontWeight: 500,
              textTransform: 'uppercase',
              marginBottom: '7px',
            }}
          >
            {card?.name?.split(' ').length > 4 ? card?.name?.split(' ').slice(0, 4).join(' ') + '...' : card?.name}
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
              {card.states?.map((state) => state?.name).join(', ')}
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
              {card.countries?.map((country) => country?.name).join(', ')}
            </Typography>
          </Stack>
          {/* Add new text elements here */}
        </Box>
      </Box>
      {/* <ManagePartnerRightPanel
        view="QUICK"
        fetchList={fetchList}
        open={openPartnerRightPanel ? true : false}
        data={openPartnerRightPanel}
        onClose={() => setOpenPartnerRightPanel(false)}
      /> */}
    </>
  );
};
