import React from 'react';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { AllContentRightPanel } from './all-content-right-panel';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';
import { SwiperSlide } from 'swiper/react';
import { FadeIn } from '/src/components/animation/fade-in';

const AllContentFeaturedView = ({ data }) => {
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

                    <Typography variant="h5" sx={{ marginBottom: '16px' }}>
                        Featured Content
                    </Typography>
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
                <AllContentRightPanel
                    view="QUICK"
                    open={openRightPanel}
                    id={content?.id}
                    onClose={() => setOpenRightPanel(false)}
                />
            )}

        </>
    );
};

export default AllContentFeaturedView;