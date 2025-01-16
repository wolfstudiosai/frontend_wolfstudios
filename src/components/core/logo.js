'use client';

import * as React from 'react';
import Link from 'next/link';
import { NoSsr } from '@/components/core/no-ssr';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import { paths } from '@/paths';

const HEIGHT = 25;
const WIDTH = '100%';

export function Logo({ color = 'dark', emblem, height = HEIGHT, width = WIDTH }) {
  let url;

  if (emblem) {
    url = color === 'light' ? '/assets/logo-emblem.svg' : '/assets/logo-emblem--dark.svg';
  } else {
    url = color === 'light' ? '/assets/logo.svg' : '/assets/wolf_studio_logo_dark.png';
  }

  return <Box alt="logo" component="img" src={url} height={HEIGHT} />;
}

export function DynamicLogo({
  colorDark = 'light',
  colorLight = 'dark',
  height = HEIGHT,
  width = WIDTH,
  isDashboard = false,
  ...props
}) {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <Link href={isDashboard ? paths.dashboard.overview : paths.home}>
      {/* <Logo color={color} height={height} width={width} {...props} /> */}
      <Typography variant="h5" sx={{ color: 'var(--mui-palette-common-white)' }}>
        The Wolf Studios LA
      </Typography>
    </Link>
  );
}
