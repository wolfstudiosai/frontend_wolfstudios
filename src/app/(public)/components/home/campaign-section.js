'use client';

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { SwiperSlide } from 'swiper/react';

import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { useCampaignList } from '../../../../services/campaign/useCampaignList';
import Link from 'next/link';
import { CampaignRightPanel } from '../../campaign/_components/campaign-right-panel';

export const CampaignSection = () => {
    const { data: campaignData, isLoading } = useCampaignList('', 'featured');

    if (isLoading) return;

    return (
        <Box sx={{ px: { xs: 0, md: 0 }, py: { xs: 1, md: 2 } }}>
            <FadeIn>
                <Box sx={{ py: { xs: 1, md: 2 } }}>
                    <Stack direction="row" alignItems="center">
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ color: 'text.primary', mb: { xs: 0, md: 1 } }}
                            textTransform="uppercase"
                            fontSize={{ xs: '1.5rem', sm: '2rem', md: '2.2rem' }}
                        >
                            Campaigns
                        </Typography>
                        <Button
                            variant="text"
                            as={Link}
                            href="/campaign"
                            endIcon={<Iconify icon="material-symbols:arrow-right-alt-rounded" />}
                            sx={{
                                margin: 0,
                                padding: 0,
                                display: { xs: 'none', sm: 'flex' },
                            }}
                        ></Button>
                    </Stack>
                    <Typography fontSize={18}>
                        Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft
                        compelling visuals that captivate audiences, evoke emotion, and leave a lasting impact.
                    </Typography>
                </Box>
            </FadeIn>


            <Stack spacing={2}>
                <SliderWrapper
                    loop={false}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1440: {
                            slidesPerView: 4,
                            spaceBetween: 28,
                        },
                    }}
                    sx={{
                        '& .swiper-wrapper': {
                            gap: '5px',
                        },
                        '& .swiper-slide': {
                            width: 'auto !important',
                            marginRight: '0 !important',
                            height: 'auto',
                        },
                    }}
                >
                    {campaignData?.length > 0 && campaignData[0] !== undefined && campaignData?.map((campaign) => (
                        <SwiperSlide key={campaign.id}>
                            <FadeIn>
                                <Box sx={{ height: '400px', width: '300px' }}>
                                    <CampaignCard campaign={campaign} />
                                </Box>
                            </FadeIn>
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
            </Stack>
        </Box>
    );
};

const CampaignCard = ({ campaign }) => {
    const [openCampaignRightPanel, setOpenCampaignRightPanel] = React.useState(false);

    return (
        <>
            <Box
                key={campaign.id}
                sx={{
                    position: 'relative',
                    height: '400px',
                    width: { xs: '300px', sm: '280px', md: '260px' },
                    overflow: 'hidden',
                    transition: 'transform 300ms ease',
                    border: '1px solid var(--mui-palette-divider)',
                    cursor: 'pointer',
                }}
                onClick={() => setOpenCampaignRightPanel(true)}
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
                        backgroundImage: `url("${encodeURI(campaign?.thumbnailImage)}")`,
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
                        {campaign?.name?.split(' ').length > 4 ? campaign?.name?.split(' ').slice(0, 4).join(' ') + '...' : campaign?.name}
                    </Typography>
                </Box>
            </Box>

            {openCampaignRightPanel && (
                <CampaignRightPanel
                    view="QUICK"
                    open={openCampaignRightPanel}
                    id={campaign?.id}
                    onClose={() => setOpenCampaignRightPanel(false)}
                />
            )}

        </>
    );
};