'use client';

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { SwiperSlide } from 'swiper/react';

import { FadeIn } from '/src/components/animation/fade-in';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { useCampaignList } from '../../../../services/campaign/useCampaignList';
import { CampaignCard } from '../../campaign/_components/campaign-card';
import Link from 'next/link';

export const CampaignSection = () => {
    const { data: campaignData, isLoading } = useCampaignList('', 'featured');

    if (isLoading) return;

    console.log(campaignData);

    return (
        <Box>
            <FadeIn>
                <Box sx={{ px: { xs: 0, md: 0 }, py: { xs: 1, md: 2 } }}>
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
                                    <CampaignCard content={campaign} />
                                </Box>
                            </FadeIn>
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
            </Stack>
        </Box>
    );
};