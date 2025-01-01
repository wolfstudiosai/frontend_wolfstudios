'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Stack } from '@mui/material';

const CATEGORIES = [
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

export const PortfolioFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const pathname = usePathname();
  const router = useRouter();
  const { query } = router;

  const handleFilter = (value) => {
    const params = new URLSearchParams(query);
    const newValues = selectedCategories.includes(value)
      ? selectedCategories.filter((item) => item !== value)
      : [...selectedCategories, value];
    setSelectedCategories(newValues);

    if (newValues.length > 0) {
      params.set('category', newValues.join(','));
    } else {
      params.delete('category');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('category')) {
      params.delete('category');
      router.replace(`${pathname}`);
    }
  }, [pathname, router]);

  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mt: 2, mb: 6 }}>
      {CATEGORIES.map((item) => (
        <Button
          key={item}
          onClick={() => handleFilter(item)}
          variant={selectedCategories.includes(item) ? 'contained' : 'outlined'}
          sx={{ borderRadius: 4 }}
          size="small"
          color="secondary"
        >
          {item}
        </Button>
      ))}
    </Stack>
  );
};
