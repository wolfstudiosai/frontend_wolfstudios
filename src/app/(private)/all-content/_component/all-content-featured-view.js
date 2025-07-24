import React from 'react';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { AllContentRightPanel } from './all-content-right-panel';

const AllContentFeaturedView = ({ data }) => {
    return (
        <>
            {data?.length > 0 && data[0] !== undefined && (
                <Box
                    sx={{
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        // py: 2,
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >

                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Featured Content
                    </Typography>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            width: 'auto',
                            minWidth: '100%',
                            alignItems: 'flex-start',
                            gap: { md: 0.5 },
                        }}
                    >
                        {data?.length > 0 && data?.map((content, index) => (
                            <Box
                                key={content.id}
                                sx={{
                                    display: 'inline-block',
                                    width: '180px',
                                    flexShrink: 0,
                                }}
                            >
                                <Stack spacing={0.5}>
                                    <ContentFeaturedCard content={content} />
                                </Stack>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </>
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
                    height: '250px',
                    width: '180px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    transition: 'transform 300ms ease',
                    border: '1px solid var(--mui-palette-divider)',
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