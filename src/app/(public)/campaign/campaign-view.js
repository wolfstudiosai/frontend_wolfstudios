'use client';

import React from 'react';
import { PageContainer } from '@/components/container/PageContainer';
import { PageHeader } from '@/components/core/page-header';
import { Iconify } from '@/components/iconify/iconify';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CampaignGridView } from './_components/campaign-grid-view';
import { CampaignTabView } from './_components/campaign-tab-view';
import { defaultCampaignData } from './_lib/campagin.data';
import { campaignFilters, campaignSorting, campaignTags } from './_lib/campaign.constants';

// todo: remove this after completing data poppulation
const CampaignData = [
  {
    name: 'REVO',
    description: 'Session with Mary Ann, shot by Combina in February 2018',
    campaigns: Array.from({ length: 10 }, (_, i) => ({
      title: `REVO Campaign ${i + 1}`,
      slug: `revo-campaign-${i + 1}`,
      thumbnail: `https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671541de64121943821caa00_DSC01725-p-500.jpg`,
      description: `Description for REVO Campaign ${i + 1}`,
      model: `Model ${i + 1}`,
      dp: 'Combina Key',
      projectLink: 'Link to project',
      category: 'Editorial',
      date: `202${i % 5}-0${(i % 9) + 1}-15`,
      location: 'New York, USA',
      client: `Client ${i + 1}`,
      tags: ['fashion', 'editorial', 'portraits'],
      videoLink: `https://www.youtube.com/watch?v=example${i + 1}`,
      gallery: [`https://picsum.photos/400/300?random=${i + 11}`, `https://picsum.photos/400/300?random=${i + 12}`],
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
      image: `https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671541de64121943821caa00_DSC01725-p-500.jpg`,
    })),
  },
  {
    name: 'BOGOMORE',
    description: 'Session with Sharee Michelle, shot by Combina in November 2018',
    campaigns: Array.from({ length: 10 }, (_, i) => ({
      title: `BOGOMORE Campaign ${i + 1}`,
      slug: `bogomore-campaign-${i + 1}`,
      thumbnail: `https://cdn.prod.website-files.com/66836d311a49ad62d048361e/67174bb0d168aa30e7fca8ef_DSC01881-p-500.jpg`,
      description: `Description for BOGOMORE Campaign ${i + 1}`,
      model: `Model ${i + 11}`,
      dp: 'Combina Key',
      projectLink: 'Link to project',
      category: 'Fashion Editorial',
      date: `202${i % 5}-0${(i % 9) + 1}-22`,
      location: 'Paris, France',
      client: `Client ${i + 11}`,
      tags: ['fashion', 'beauty', 'editorial'],
      videoLink: `https://www.youtube.com/watch?v=example${i + 11}`,
      gallery: [`https://picsum.photos/400/300?random=${i + 31}`, `https://picsum.photos/400/300?random=${i + 32}`],
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


const INITIAL_VISIBLE_COUNT = 5;

export const CampaignView = () => {
  const observerRef = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 40 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [filters, setFilters] = React.useState({
    COL: 4,
    TAG: [],
    FILTER: [],
    SORTING: [],
    VIEW: 'grid',
  });
  const [expandedGroups, setExpandedGroups] = React.useState([]);

  const toggleGroupView = (groupName) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  async function fetchList() {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await mockGetCampaignListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      });

      if (response.success) {
        setData((prev) => [...prev, ...response.data]);
        setTotalRecords(response.totalRecords);
        setPagination((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  }

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && data.length < totalRecords) {
          fetchList();
        }
      },
      { rootMargin: '100px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [data, isFetching, totalRecords]);

  React.useEffect(() => {
    fetchList();
  }, []);

  return (
    <PageContainer>
      <PageLoader loading={loading}>
        <PageHeader
          title="Campaign"
          values={filters}
          tags={campaignTags}
          filters={campaignFilters}
          sorting={campaignSorting}
          onFilterChange={handleFilterChange}
          showFilters={false}
          showColSlider={false}
        />
        {CampaignData.map((campaignGroup, index) => {
          const isExpanded = expandedGroups[campaignGroup.name];
          const visibleCampaigns = isExpanded
            ? campaignGroup.campaigns
            : campaignGroup.campaigns.slice(0, INITIAL_VISIBLE_COUNT);
          return (
            <Grid key={campaignGroup.name} container sx={{ border: '1px solid #333', mb: 2 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  AMPLIFY YOUR IMPACT
                </Typography>
                <Typography variant="body1" color="grey.400">
                  Welcome to the space where potential meets possibility. Our agency prides itself on establishing
                  authentic, meaningful partnerships that put our creators first.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                {visibleCampaigns.map((item, index) => (
                  <Grid container key={item.number} mb={4}>
                    <Grid item size={{ xs: 2 }} position="relative">
                      <Card>
                        <CardMedia component="img" height="200" image={item.image} alt={item.title} />
                      </Card>
                      <Box position="absolute" bottom={-16} left={16}>
                        <Typography number={item.number} />
                      </Box>
                    </Grid>
                    <Grid item size={{ xs: 10 }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                          {item.description}
                        </Typography>
                        <Button variant="text" color="primary">
                          View Details
                        </Button>
                      </CardContent>
                    </Grid>
                  </Grid>
                ))}
                <Iconify icon="solar:square-arrow-down-broken" onClick={() => toggleGroupView(campaignGroup.name)} />
              </Grid>
            </Grid>
          );
        })}
      </PageLoader>
    </PageContainer>
  );
};
