'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';
import { SwiperSlide } from 'swiper/react';
import { FadeIn } from '/src/components/animation/fade-in';
import { CampaignRightPanel } from '../../_components/campaign-right-panel';
import { alpha } from '@mui/material/styles';
import { Iconify } from '/src/components/iconify/iconify';

export const FeaturedCampaign = ({ data }) => {
    return (
        <Box>
            {data?.length > 0 && data[0] !== undefined && (
                <Box
                    sx={{
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        mb={2}
                    >
                        <Box sx={{
                            height: 36,
                            width: 36,
                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                        }}>
                            <Iconify
                                height={24}
                                width={24}
                                color="primary.main"
                                icon="carbon:badge" />
                        </Box>

                        <Typography variant="h5">
                            Featured Campaigns
                        </Typography>
                    </Box>
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
                            {data?.length > 0 && data[0] !== undefined && data?.map((content) => (
                                <SwiperSlide key={content.id}>
                                    <FadeIn>
                                        <ContentFeaturedCard content={content} />
                                    </FadeIn>
                                </SwiperSlide>
                            ))}
                        </SliderWrapper>
                    </Stack>
                </Box>
            )}
        </Box>
    );
};


const ContentFeaturedCard = ({ content }) => {
    const [openRightPanel, setOpenRightPanel] = useState(false);

    return (
        <>
            <Box
                key={content.id}
                sx={{
                    position: 'relative',
                    height: '240px',
                    width: '160px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    transition: 'transform 300ms ease',
                    border: '1px solid var(--mui-palette-divider)',
                    cursor: 'pointer',
                }}
                onClick={() => setOpenRightPanel(true)}
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
                        borderRadius: '8px',
                        backgroundImage: `url("${encodeURI(content?.thumbnailImage)}")`,
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
                        height: '30%',
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
                        padding: 1,
                    }}
                >
                    {/* Add new text elements here */}
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: { xs: '0.875rem' },
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            marginBottom: '7px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {content?.name}
                    </Typography>
                </Box>
            </Box>

            {openRightPanel && (
                <CampaignRightPanel
                    view="QUICK"
                    open={openRightPanel}
                    id={content?.id}
                    onClose={() => setOpenRightPanel(false)}
                />
            )}

        </>
    );
};