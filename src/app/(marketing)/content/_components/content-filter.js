'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';

const TAGS = [
  'Music',
  'B&W',
  'Creators',
  'Beauty',
  'Publications',
  'Sport',
  'Products',
  'Swim',
  'Fashion',
  'Commercial',
  'Lifestyle',
  'Portraiture',
  'Film',
  'Events',
  'Mood',
  'Home',
];

const FILTERS = ['Image', 'Video', 'Platform', 'Likes', 'Comments', 'Views'];

const SORTING = [
  'A-Z',
  'Z-A',
  'Likes (Low to High)',
  'Likes (High to Low)',
  'Views (Low to High)',
  'Views (High to Low)',
  'Comments (Low to High)',
  'Comments (High to Low)',
];

export const ContentFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentSection, setCurrentSection] = useState('TAG');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');

  const pathname = usePathname();
  const router = useRouter();
  const { query } = router;

  const handleFilter = (value) => {
    const params = new URLSearchParams(query);

    if (currentSection === 'TAG') {
      const newCategories = selectedCategories.includes(value)
        ? selectedCategories.filter((item) => item !== value)
        : [...selectedCategories, value];
      setSelectedCategories(newCategories);
      if (newCategories.length > 0) {
        params.set('category', newCategories.join(','));
      } else {
        params.delete('category');
      }
    } else if (currentSection === 'FILTER') {
      const newFilters = selectedFilters.includes(value)
        ? selectedFilters.filter((item) => item !== value)
        : [...selectedFilters, value];
      setSelectedFilters(newFilters);
      if (newFilters.length > 0) {
        params.set('filter', newFilters.join(','));
      } else {
        params.delete('filter');
      }
    } else if (currentSection === 'SORTING') {
      setSelectedSort(value);
      params.set('sort', value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('category')) {
      setSelectedCategories(params.get('category').split(','));
    }
    if (params.has('filter')) {
      setSelectedFilters(params.get('filter').split(','));
    }
    if (params.has('sort')) {
      setSelectedSort(params.get('sort'));
    }
  }, [pathname, router]);

  return (
    <>
      <Box>
        <Stack direction="row" sx={{ gap: 2, mb: 1 }}>
          <Typography
            onClick={() => setCurrentSection('TAG')}
            sx={{
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              color: currentSection === 'TAG' ? '#1976d2' : 'text.primary', // Active color
              borderBottom: currentSection === 'TAG' ? '2px solid #1976d2' : 'none', // Underline for active section
              '&:hover': {
                color: currentSection === 'TAG' ? '#1565c0' : '#1976d2', // Hover color for active section
              },
            }}
          >
            TAG
          </Typography>
          <Typography
            onClick={() => setCurrentSection('FILTER')}
            sx={{
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              color: currentSection === 'FILTER' ? '#1976d2' : 'text.primary',
              borderBottom: currentSection === 'FILTER' ? '2px solid #1976d2' : 'none',
              '&:hover': {
                color: currentSection === 'FILTER' ? '#1565c0' : '#1976d2',
              },
            }}
          >
            FILTER
          </Typography>
          <Typography
            onClick={() => setCurrentSection('SORTING')}
            sx={{
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              color: currentSection === 'SORTING' ? '#1976d2' : 'text.primary',
              borderBottom: currentSection === 'SORTING' ? '2px solid #1976d2' : 'none',
              '&:hover': {
                color: currentSection === 'SORTING' ? '#1565c0' : '#1976d2',
              },
            }}
          >
            SORTING
          </Typography>
        </Stack>
      </Box>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mt: 1, mb: 2, width: '100%' }}>
        {currentSection === 'TAG' &&
          TAGS.map((item) => (
            <Button
              key={item}
              onClick={() => handleFilter(item)}
              variant={selectedCategories.includes(item) ? 'contained' : 'outlined'}
              sx={{ borderRadius: 4}}
              size="medium"
              color="secondary"
            >
              {item}
            </Button>
          ))}

        {currentSection === 'FILTER' &&
          FILTERS.map((item) => (
            <Button
              key={item}
              onClick={() => handleFilter(item)}
              variant={selectedFilters.includes(item) ? 'contained' : 'outlined'}
              sx={{ borderRadius: 4}}
              size="medium"
              color="secondary"
            >
              {item}
            </Button>
          ))}

        {currentSection === 'SORTING' &&
          SORTING.map((item) => (
            <Button
              key={item}
              onClick={() => handleFilter(item)}
              variant={selectedSort === item ? 'contained' : 'outlined'}
              sx={{ borderRadius: 4}}
              size="medium"
              color="secondary"
            >
              {item}
            </Button>
          ))}
      </Stack>
    </>
  );
};