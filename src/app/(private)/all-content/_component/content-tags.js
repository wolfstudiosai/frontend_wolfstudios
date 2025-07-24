
import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useContentTags } from '/src/services/content/useContentTags';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Skeleton } from '@mui/material';

const ContentTags = ({ selectedTag, setSelectedTag }) => {
    const { data, isLoading, error } = useContentTags();
    const theme = useTheme();

    return (
        <Box sx={{ width: '180px', overflowY: 'auto', overflowX: 'hidden', position: 'sticky', top: 0, zIndex: 1 }}>
            <Typography variant="h6">Tags</Typography>
            <Divider sx={{ my: 1 }} />
            {isLoading ? <ContentTagSkeleton /> : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {data?.map((tag) => (
                        <Typography
                            title={tag.name}
                            onClick={() => setSelectedTag(tag.id)}
                            sx={{
                                py: '2px',
                                flex: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textAlign: 'left',
                                color: 'text.primary',
                                fontWeight: 500,
                                cursor: 'pointer',
                                bgcolor: selectedTag === tag.id ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                '&:hover': {
                                    bgcolor: selectedTag === tag.id ? alpha(theme.palette.primary.main, 0.2) : 'action.hover',
                                },
                            }}>
                            # {tag.name}
                        </Typography>
                    ))}
                </Box>
            )}
        </Box>
    );
};


const ContentTagSkeleton = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant="text"
                    sx={{
                        py: '2px',
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                        color: 'text.primary',
                        fontWeight: 500,
                        cursor: 'pointer',
                        bgcolor: 'action.hover',
                    }}
                />
            ))}
        </Box>
    );
};

export default ContentTags;
