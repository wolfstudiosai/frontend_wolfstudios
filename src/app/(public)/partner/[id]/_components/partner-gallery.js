import React from 'react';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';
import { SwiperSlide } from 'swiper/react';
import { FadeIn } from '/src/components/animation/fade-in';

export const PartnerGallery = ({ partnerGallery }) => {
    return (
        <Box>
            {partnerGallery?.length > 0 && (
                <Box
                    sx={{
                        mb: 2,
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >

                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Partner Gallery
                    </Typography>
                    <Stack spacing={2}>
                        <SliderWrapper
                            loop={false}
                            breakpoints={{
                                0: {
                                    slidesPerView: 2,
                                    spaceBetween: 12,
                                },
                                // when window width is >= 320px
                                450: {
                                    slidesPerView: 2,
                                    spaceBetween: 12,
                                },
                                // when window width is >= 480px
                                620: {
                                    slidesPerView: 3,
                                    spaceBetween: 12,
                                },
                                // when window width is >= 640px
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 12,
                                },
                                1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 12,
                                },
                            }}
                            sx={{
                                '& .swiper-wrapper': {
                                    gap: '10px',
                                },
                                '& .swiper-slide': {
                                    width: '200px !important',
                                    marginRight: '0 !important',
                                    height: 'auto',
                                },
                            }}
                        >
                            {partnerGallery?.length > 0 && partnerGallery?.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <FadeIn>
                                        <ContentFeaturedCard image={image} />
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


const ContentFeaturedCard = ({ image }) => {
    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    height: '240px',
                    width: '100%',
                    // width: '200px',
                    overflow: 'hidden',
                    // borderRadius: '8px',
                    transition: 'transform 300ms ease',
                    border: '1px solid var(--mui-palette-divider)',
                    cursor: 'pointer',
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
                        // borderRadius: '8px',
                        backgroundImage: `url("${encodeURI(image)}")`,
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
            </Box>
        </>
    );
};