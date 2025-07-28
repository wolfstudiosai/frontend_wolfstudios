
import React from 'react';
import { Box, Typography, Divider, TextField, Chip, Stack, Drawer } from '@mui/material';
import { useContentTags } from '/src/services/content/useContentTags';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Skeleton } from '@mui/material';
import { useDebounce } from '/src/hooks/use-debounce';
import { useMediaQuery } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ContentTags = ({ showTags, setShowTags, selectedTag, setSelectedTag }) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);
    const { data, isLoading, error } = useContentTags(debouncedSearch);

    const handleSelectedTag = (tag) => {
        if (selectedTag.some((t) => t.id === tag.id)) {
            setSelectedTag(selectedTag.filter((t) => t.id !== tag.id));
        } else {
            setSelectedTag([...selectedTag, tag]);
        }
    }

    const renderTags = () => {
        return (
            <Box sx={{
                width: '220px',
                overflowY: 'auto',
                overflowX: 'hidden',
                position: 'sticky',
                px: 0.5,
                top: 0,
                zIndex: 1,
                scrollbarWidth: 'thin',
                display: {
                    xs: showTags ? 'block' : 'none',
                    lg: 'block',
                }
            }}>
                <Typography variant="h6">Tags</Typography>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ mb: 1, position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'background.default' }}>
                    <TextField
                        fullWidth
                        placeholder="Find tags..."
                        variant="outlined"
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        slotProps={{
                            input: {
                                endAdornment: search && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={() => setSearch('')}
                                            edge="end"
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </Box>

                {selectedTag.length > 0 && (
                    <Stack my={2} direction="row" spacing={0.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                        {selectedTag.map((tag) => <Chip key={tag.id} label={tag.name} color="primary" size="small" />)}
                        <Chip label="X Clear All" color="primary" variant="outlined" size="small" onClick={() => setSelectedTag([])} />
                    </Stack>
                )}

                {isLoading ? <ContentTagSkeleton /> : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {data?.map((tag) => (
                            <Typography
                                title={tag.name}
                                onClick={() => handleSelectedTag(tag)}
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
                                    bgcolor: selectedTag.some((t) => t.id === tag.id) ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                    '&:hover': {
                                        bgcolor: selectedTag.some((t) => t.id === tag.id) ? alpha(theme.palette.primary.main, 0.2) : 'action.hover',
                                    },
                                }}>
                                # {tag.name}
                            </Typography>
                        ))}
                    </Box>
                )}
            </Box>
        )
    }

    return (
        <>
            {isLargeScreen ? (
                renderTags()
            ) : (
                <Drawer
                    anchor="left"
                    open={showTags}
                    onClose={() => setShowTags(false)}
                    sx={{ '& .MuiDrawer-paper': { width: 220, height: '100svh', overflow: 'auto', pt: 1 } }}
                >
                    {renderTags()}
                </Drawer>
            )}
        </>
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
