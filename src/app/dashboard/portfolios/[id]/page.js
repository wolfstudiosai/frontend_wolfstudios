'use client';

import { Typography } from '@mui/material';

export default function Page({ params: { id } }) {
  return <Typography>Hello, Portfolio {id}</Typography>;
}
