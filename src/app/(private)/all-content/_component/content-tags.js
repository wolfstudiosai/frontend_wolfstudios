import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { useDebounce } from '/src/hooks/use-debounce';

import { Iconify } from '../../../../components/iconify/iconify';
import { useContentTags } from '/src/services/content/useContentTags';

const popular = [
  {
    id: 1,
    label: 'Athlon Sports',
    slug: 'athlon-sports',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgepdCajiv3j6sh6I4pW00kqIeiURrDu-1xg&s',
    icon: 'flowbite:badge-check-solid',
  },
  {
    id: 4,
    label: 'People',
    slug: 'people',
    image:
      'https://yt3.googleusercontent.com/bMHXmGrmT__If7T5MtiYTFMeYmhzKY-EbZnuLDHXtk3TbgjhtyvUN4ZUYtyC6VQSrapTQT7YE4c=s900-c-k-c0x00ffffff-no-rj',
    icon: 'flowbite:badge-check-solid',
  },
  {
    id: 2,
    label: 'Sports grid',
    slug: 'sports-grid',
    image:
      'https://yt3.googleusercontent.com/JZaFA_GfW0s7FPT4zwVWGNojJS3tKZ6U8WCVoT-WPO7uFK_WNa_1d6sspnXfQiY9zMs84bDGiX8=s160-c-k-c0x00ffffff-no-rj',
    icon: 'flowbite:badge-check-solid',
  },
  {
    id: 3,
    label: 'The spun',
    slug: 'the-spun',
    image: 'https://s1.dmcdn.net/u/C05YG1djCJqKqBMm9/240x240',
    icon: 'flowbite:badge-check-solid',
  },
];

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
  };

  const renderTags = () => {
    return (
      <Box
        sx={{
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
          },
        }}
      >
        <Stack direction="column" gap={1} sx={{ mb: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ '&:hover': { color: 'primary.main', cursor: 'pointer' } }}
          >
            <Iconify icon="fluent-mdl2:home" width={18} height={18} />
            <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>For you</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ '&:hover': { color: 'primary.main', cursor: 'pointer' } }}
          >
            <Iconify icon="material-symbols:explore-outline" width={18} height={18} />
            <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>Explore</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ '&:hover': { color: 'primary.main', cursor: 'pointer' } }}
          >
            <Iconify icon="mdi:tick-circle-outline" width={18} height={18} />
            <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>Following</Typography>
          </Stack>
        </Stack>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Popular
        </Typography>
        <Stack direction="column" gap={1} sx={{ mb: 2 }}>
          {popular.map((i, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ '&:hover': { color: 'primary.main', cursor: 'pointer' } }}
            >
              <Box
                component="img"
                src={i.image}
                sx={{ width: 24, height: 24, borderRadius: 0.5, overflow: 'hidden' }}
              />
              <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>{i.label}</Typography>
              <Iconify icon={i.icon} width={16} height={16} />
            </Stack>
          ))}
        </Stack>
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
                    <IconButton size="small" onClick={() => setSearch('')} edge="end">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {selectedTag.length > 0 && (
          <Stack my={2} direction="row" spacing={0.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
            {selectedTag.map((tag) => (
              <Chip key={tag.id} label={tag.name} color="primary" size="small" />
            ))}
            <Chip
              label="X Clear All"
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => setSelectedTag([])}
            />
          </Stack>
        )}

        {isLoading ? (
          <ContentTagSkeleton />
        ) : (
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
                  bgcolor: selectedTag.some((t) => t.id === tag.id)
                    ? alpha(theme.palette.primary.main, 0.15)
                    : 'transparent',
                  '&:hover': {
                    bgcolor: selectedTag.some((t) => t.id === tag.id)
                      ? alpha(theme.palette.primary.main, 0.2)
                      : 'action.hover',
                  },
                }}
              >
                # {tag.name}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <>
      {isLargeScreen ? (
        renderTags()
      ) : (
        <Drawer
          anchor="left"
          open={showTags}
          onClose={() => setShowTags(false)}
          sx={{
            '& .MuiDrawer-paper': { width: 220, height: '100svh', overflow: 'auto', pt: 1 },
          }}
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
