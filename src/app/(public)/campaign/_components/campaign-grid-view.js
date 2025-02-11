'use client';

import React from 'react';
import { Iconify } from '@/components/iconify/iconify';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { getRandomGradientColor, pxToRem } from '@/utils/helper';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { SettingsContext } from '@/contexts/settings';

import { CampaignCard } from './campaign-card';

// todo: remove this after completing data poppulation
const CampaignData = [
  {
    name: 'REVO',
    description:
      'Our campaign aims to bring resources, education, and support to local communities, empowering individuals to create lasting change. By focusing on collaboration and growth, we encourage small businesses, nonprofits, and local organizations to join forces and make a real difference. Through workshops, networking events, and financial support.',
    campaigns: Array.from({ length: 10 }, (_, i) => ({
      name: `REVO Campaign ${i + 1}`,
      slug: `revo-campaign-${i + 1}`,
      guideline: 'guidelines',
      campaign_image: `https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671541de64121943821caa00_DSC01725-p-500.jpg`,
      content_engagement: `It is a long established fact that a reader`,
      content_hq: `Model ${i + 1}`,
      note: 'Combina Key',
      stakeholder: 'Link to project',
      campaign_status: 'UPCOMING',
      retail_partners: `202${i % 5}-0${(i % 9) + 1}-15`,
      proposed_partners: 'New York, USA',
      live_partners: `Client ${i + 1}`,
      contributed_partners: 'contributed_partners',
      image_gallery: 'image_gallery',
      video_gallery: 'video_gallery',
      budget: 12,
      total_expense: 12,
      campaign_ROI: 'campaign_ROI',
      start_date: 'start_date',
      end_date: 'end_date',
      description:
        'Our campaign aims to bring resources, education, and support to local communities, empowering individuals to create lasting change. By focusing on collaboration and growth, we encourage small businesses, nonprofits',
      spaces: 'spaces',
      product_expense: 12,
    })),
  },
  {
    name: 'BOGOMORE',
    description:
      'The Environmental Sustainability Campaign is dedicated to combating climate change and promoting eco-friendly practices. By focusing on reducing waste, conserving resources, and encouraging green initiatives, we aim to raise awareness and drive real action. From reducing carbon footprints to supporting renewable energy, our campaign brings individuals, businesses, and governments together to protect the planet. ',
    campaigns: Array.from({ length: 10 }, (_, i) => ({
      name: `REVO Campaign ${i + 1}`,
      slug: `revo-campaign-${i + 1}`,
      guideline: 'guidelines',
      campaign_image: `https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671541de64121943821caa00_DSC01725-p-500.jpg`,
      content_engagement: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors  ${i + 1}`,
      content_hq: `Model ${i + 1}`,
      note: 'Combina Key',
      stakeholder: 'Link to project',
      campaign_status: 'UPCOMING',
      retail_partners: `202${i % 5}-0${(i % 9) + 1}-15`,
      proposed_partners: 'New York, USA',
      live_partners: `Client ${i + 1}`,
      contributed_partners: 'contributed_partners',
      image_gallery: 'image_gallery',
      video_gallery: 'video_gallery',
      budget: 12,
      total_expense: 12,
      campaign_ROI: 'campaign_ROI',
      start_date: 'start_date',
      end_date: 'end_date',
      description: 'description',
      spaces: 'spaces',
      product_expense: 12,
    })),
  },
];

export const CampaignGridView = ({ data }) => {
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
        {data.map((campaignGroup, index) => {
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
                    {campaignGroup.description || '--'}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 8 }} >
                <Stack direction="column" gap={2}>
                  {visibleCampaigns.map((item) => (
                    <CampaignCard key={item.slug} item={item} />
                  ))}
                </Stack>
                {data.campaigns && data.campaigns.length > 5 && (
                  <Stack direction="row" justifyContent="center" sx={{ my: 1 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => toggleGroupView(campaignGroup.name)}
                      endIcon={
                        <Iconify
                          icon={isExpanded ? 'solar:square-arrow-up-broken' : 'solar:square-arrow-down-broken'}
                        />
                      }
                    >
                      {isExpanded ? 'Show Less' : 'Show More'}
                    </Button>
                  </Stack>
                )}
              </Grid>
            </Grid>
          );
        })}
      </>
    </PageLoader>
  );
};
