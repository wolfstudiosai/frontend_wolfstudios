'use client';

import React from 'react';
import { Iconify } from '@/components/iconify/iconify';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { getRandomGradientColor, pxToRem } from '@/utils/helper';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { SettingsContext } from '@/contexts/settings';

import { CampaignCard } from './campaign-card';

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
