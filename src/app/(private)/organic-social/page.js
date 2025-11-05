import React from 'react';
import { FacebookPerformance } from './_components/facebook-performance';
import { InstagramPerformance } from './_components/instagram-performance';
import { YoutubePerformance } from './_components/youtube-performance';
import { PinterestPerformance } from './_components/pinterest-performance';
import { TiktokPerformance } from './_components/tiktok-performance';
import { TwitterPerformance } from './_components/twitter-performance';
import { Box } from '@mui/material';

export default function OrganicSocialPage() {

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <FacebookPerformance />
      <InstagramPerformance />
      <YoutubePerformance />
      <PinterestPerformance />
      <TiktokPerformance />
      <TwitterPerformance />
    </Box>
  );
}