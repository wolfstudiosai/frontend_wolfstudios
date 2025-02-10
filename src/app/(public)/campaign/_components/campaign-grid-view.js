'use client';

import { Iconify } from '@/components/iconify/iconify';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { getRandomGradientColor, pxToRem } from '@/utils/helper';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

import { SettingsContext } from '@/contexts/settings';

import { CampaignCard } from './campaign-card';

// todo: remove this after completing data poppulation
const CampaignData = [
  {
    name: 'REVO',
    description:
      'Our campaign aims to bring resources, education, and support to local communities, empowering individuals to create lasting change. By focusing on collaboration and growth, we encourage small businesses, nonprofits, and local organizations to join forces and make a real difference. Through workshops, networking events, and financial support.',
    campaigns: Array.from({ length: 10 }, (_, i) => ({
      title: `REVO Campaign ${i + 1}`,
      slug: `revo-campaign-${i + 1}`,
      thumbnail: `https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671541de64121943821caa00_DSC01725-p-500.jpg`,
      description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors  ${i + 1}`,
      model: `Model ${i + 1}`,
      dp: 'Combina Key',
      projectLink: 'Link to project',
      category: 'Editorial',
      date: `202${i % 5}-0${(i % 9) + 1}-15`,
      location: 'New York, USA',
      client: `Client ${i + 1}`,
      tags: ['fashion', 'editorial', 'portraits'],
      videoLink: `https://www.youtube.com/watch?v=example${i + 1}`,
      gallery: [
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671f73189e8433871403c301_6700ce647b1bae09a801a438_101F0090-2A4F-4A34-8EA5-5A160A35AC3A_1_105_c.jpeg',
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a2467ecc2b689879d3288_DSC01190-p-800.jpg',
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/672a68398a0546bb263ef24a_IMG_2156-p-800.jpg',
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fcecf5793a3e5d867d6d4b_F18F2EBD-DD3E-4D35-B35F-B16E1E6AEF5D_1_105_c.jpeg',
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a166f1260d41c15c305c7_670f57d45ad541aa5f58e9a3_67040092fc0406aea44cf646_DSC08662-p-800.jpeg',
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670be14aa60fa816cf457054_19055002_1812151462433470_492009593312992502_o-p-500.jpeg',
      ],
      photographerBio: 'https://combina-key-portfolio.com',
      team: {
        stylist: `Stylist ${i + 1}`,
        makeupArtist: `Makeup Artist ${i + 1}`,
        creativeDirector: `Creative Director ${i + 1}`,
      },
      engagementStats: {
        views: 10000 + i * 500,
        likes: 3000 + i * 200,
        shares: 400 + i * 50,
      },
      callToAction: `Book a similar shoot with us for REVO Campaign ${i + 1}!`,
      testimonial: `Amazing experience on REVO Campaign ${i + 1}!`,
      image: `https://5.imimg.com/data5/SELLER/Default/2024/10/458706621/RQ/UH/KF/10171600/female-modeling-photography-service.jpg`,
    })),
  },
  {
    name: 'BOGOMORE',
    description:
      'The Environmental Sustainability Campaign is dedicated to combating climate change and promoting eco-friendly practices. By focusing on reducing waste, conserving resources, and encouraging green initiatives, we aim to raise awareness and drive real action. From reducing carbon footprints to supporting renewable energy, our campaign brings individuals, businesses, and governments together to protect the planet. ',
    campaigns: Array.from({ length: 10 }, (_, i) => ({
      title: `BOGOMORE Campaign ${i + 1}`,
      slug: `bogomore-campaign-${i + 1}`,
      thumbnail: `https://cdn.prod.website-files.com/66836d311a49ad62d048361e/67174bb0d168aa30e7fca8ef_DSC01881-p-500.jpg`,
      description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors  ${i + 1}`,
      model: `Model ${i + 11}`,
      dp: 'Combina Key',
      projectLink: 'Link to project',
      category: 'Fashion Editorial',
      date: `202${i % 5}-0${(i % 9) + 1}-22`,
      location: 'Paris, France',
      client: `Client ${i + 11}`,
      tags: ['fashion', 'beauty', 'editorial'],
      videoLink: `https://www.youtube.com/watch?v=example${i + 11}`,
      gallery: [
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671f73189e8433871403c301_6700ce647b1bae09a801a438_101F0090-2A4F-4A34-8EA5-5A160A35AC3A_1_105_c.jpeg',
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a2467ecc2b689879d3288_DSC01190-p-800.jpg',
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/672a68398a0546bb263ef24a_IMG_2156-p-800.jpg',
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fcecf5793a3e5d867d6d4b_F18F2EBD-DD3E-4D35-B35F-B16E1E6AEF5D_1_105_c.jpeg',
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a166f1260d41c15c305c7_670f57d45ad541aa5f58e9a3_67040092fc0406aea44cf646_DSC08662-p-800.jpeg',
        'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670be14aa60fa816cf457054_19055002_1812151462433470_492009593312992502_o-p-500.jpeg',
      ],
      photographerBio: 'https://combina-key-portfolio.com',
      team: {
        stylist: `Stylist ${i + 11}`,
        makeupArtist: `Makeup Artist ${i + 11}`,
        creativeDirector: `Creative Director ${i + 11}`,
      },
      engagementStats: {
        views: 12000 + i * 600,
        likes: 3500 + i * 250,
        shares: 500 + i * 60,
      },
      callToAction: `Discover the latest trends with BOGOMORE Campaign ${i + 1}!`,
      testimonial: `Fantastic work on BOGOMORE Campaign ${i + 1}!`,
      image: `https://cdn.prod.website-files.com/66836d311a49ad62d048361e/67174bb0d168aa30e7fca8ef_DSC01881-p-500.jpg`,
    })),
  },
];

export const CampaignGridView = () => {
  const INITIAL_VISIBLE_COUNT = 5;
  const {
    customSettings: { openSubNav },
  } = React.useContext(SettingsContext);

  const [loading, setLoading] = React.useState(false);
  const [expandedGroups, setExpandedGroups] = React.useState([]);

  const toggleGroupView = (groupName) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  return (
    <PageLoader loading={loading} error={null}>
      <>
        {CampaignData.map((campaignGroup, index) => {
          const isExpanded = expandedGroups[campaignGroup.name];
          const visibleCampaigns = isExpanded
            ? campaignGroup.campaigns
            : campaignGroup.campaigns.slice(0, INITIAL_VISIBLE_COUNT);
          return (
            <Grid key={campaignGroup.name} container sx={{ mb: 2, position: 'relative' }} spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    // background: getRandomGradientColor(index),
                    backgroundColor: getRandomGradientColor(index),
                    borderRadius: 2,
                    padding: 4,
                    position: 'sticky',
                    top: pxToRem(openSubNav ? 152 : 106),
                    boxShadow: 3,
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      fontSize: '2.2rem',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      color: 'text.primary',
                    }}
                  >
                    {campaignGroup.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      color: 'text.primary',
                    }}
                  >
                    {campaignGroup.description}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 8 }}>
                <Stack direction="column" gap={2}>
                  {visibleCampaigns.map((item) => (
                    <CampaignCard key={item.slug} item={item} />
                  ))}
                </Stack>
                <Stack direction="row" justifyContent="center" sx={{ my: 1 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => toggleGroupView(campaignGroup.name)}
                    endIcon={
                      <Iconify icon={isExpanded ? 'solar:square-arrow-up-broken' : 'solar:square-arrow-down-broken'} />
                    }
                  >
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          );
        })}
      </>
    </PageLoader>
  );
};
