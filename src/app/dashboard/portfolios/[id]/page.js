'use client';

import { Typography } from '@mui/material';

export default function Page({ id }) {
  console.log(id, 'idd');
  return <Typography>Hello, Portfolio {id}</Typography>;
}
