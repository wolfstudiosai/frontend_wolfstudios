import React from 'react';
import { Box, Skeleton } from '@mui/material';

const FeaturedSkeleton = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '240px',
                width: '160px',
                overflow: 'hidden',
                borderRadius: '10px',
                transition: 'transform 300ms ease',
                border: '1px solid var(--mui-palette-divider)',
                cursor: 'pointer',
            }}
        >
            <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '10px',
                    height: '100%',
                }}
            />
        </Box>
    );
};

export default FeaturedSkeleton;
