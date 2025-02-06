'use client';

import { PageContainer } from '@/components/container/PageContainer';
import { PageHeader } from '@/components/core/page-header';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { Box, CircularProgress } from '@mui/material';
import React from 'react';

import { CampaignGridView } from './_components/campaign-grid-view';
import { CampaignTabView } from './_components/campaign-tab-view';
import { defaultCampaignData } from './_lib/campagin.data';
import { campaignFilters, campaignSorting, campaignTags } from './_lib/campaign.constants';

// todo: remove this after completing data poppulation
const CampaignData = [
  {
    title: 'Mary Ann',
    slug: 'mary-ann',
    thumbnail: 'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670d11d77dff7fcc24e16f1c_2_DSC03975.jpeg',
    description: 'Session with Mary Ann, shot by Combina in February 2018',
    model: 'Mary Ann',
    dp: 'Combina Key',
    projectLink: 'Link to project',
    category: 'Editorial',
    date: '2018-02-15',
    location: 'New York, USA',
    client: 'Vogue',
    tags: ['fashion', 'editorial', 'portraits'],
    videoLink: 'https://www.youtube.com/watch?v=example',
    gallery: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2'],
    photographerBio: 'https://combina-key-portfolio.com',
    team: {
      stylist: 'Jane Doe',
      makeupArtist: 'Emily Smith',
      creativeDirector: 'John Carter',
    },
    engagementStats: {
      views: 12000,
      likes: 3400,
      shares: 450,
    },
    callToAction: 'Book a similar shoot with us!',
    testimonial: 'Loved working on this shoot! - Mary Ann',
    image: 'https://picsum.photos/300/200?random=1',
  },
  {
    title: 'Prints: Abstract',
    slug: 'prints-abstract',
    thumbnail:
      'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6712275879e29b61d2c2dc79_DSC05709%20(1).jpg',
    description: 'On Session production for portraits, shot by Combina in November 2016.',
    dp: 'Combina Key',
    projectLink: 'Link to project',
    category: 'Portrait',
    date: '2016-11-10',
    location: 'Los Angeles, USA',
    client: 'Elle Magazine',
    tags: ['prints', 'abstract', 'portrait'],
    videoLink: 'https://www.youtube.com/watch?v=example2',
    gallery: ['https://picsum.photos/400/300?random=3', 'https://picsum.photos/400/300?random=4'],
    photographerBio: 'https://combina-key-portfolio.com',
    team: {
      stylist: 'Michael Taylor',
      makeupArtist: 'Sarah Lee',
      creativeDirector: 'Daniel Brown',
    },
    engagementStats: {
      views: 8900,
      likes: 2500,
      shares: 320,
    },
    callToAction: 'Contact us for editorial campaigns!',
    testimonial: 'A fantastic experience! - Elle Team',
    image: 'https://picsum.photos/300/200?random=2',
  },
  {
    title: 'Kansha: Love Bite',
    slug: 'kansha-love-bite',
    thumbnail:
      'https://player.vimeo.com/progressive_redirect/playback/1008919226/rendition/1080p/file.mp4?loc=external&signature=bf4233dc5593395173302057f4757f83ccb3c307dd4c49f373ecf1e8f5d31ffb',
    description: 'In Studio Production for Kansha Magazine, shot by Combina Key in August 2018.',
    publication: 'Kansha',
    dp: 'Combina Key',
    projectLink: 'Link to project',
    category: 'Magazine Feature',
    date: '2018-08-22',
    location: 'Tokyo, Japan',
    client: 'Kansha Magazine',
    tags: ['studio', 'fashion', 'love'],
    videoLink: null,
    gallery: ['https://picsum.photos/400/300?random=5', 'https://picsum.photos/400/300?random=6'],
    photographerBio: 'https://combina-key-portfolio.com',
    team: {
      stylist: 'Anna Martinez',
      makeupArtist: 'Kevin James',
      creativeDirector: 'Olivia Parker',
    },
    engagementStats: {
      views: 15000,
      likes: 4800,
      shares: 570,
    },
    callToAction: 'Explore more Kansha exclusives!',
    testimonial: 'This shoot was an absolute dream! - Kansha Team',
    image: 'https://picsum.photos/300/200?random=3',
  },
  {
    title: 'Pump Magazine: Sharee',
    slug: 'pump-magazine-sharee',
    thumbnail:
      'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/67023b95692662e57485fae7_1ACCCEF7-605C-4365-B7D4-5084FDC835C6_1_105_c.jpeg',
    description: 'In Studio Production with Sharee Michelle for Pump Magazine, shot by Combina Key in November 2018.',
    model: 'Sharee Michelle',
    publication: 'Pump Magazine',
    dp: 'Combina Key',
    projectLink: 'Link to project',
    category: 'Magazine Cover',
    date: '2018-11-05',
    location: 'Paris, France',
    client: 'Pump Magazine',
    tags: ['editorial', 'beauty', 'high-fashion'],
    videoLink: 'https://www.youtube.com/watch?v=example4',
    gallery: ['https://picsum.photos/400/300?random=7', 'https://picsum.photos/400/300?random=8'],
    photographerBio: 'https://combina-key-portfolio.com',
    team: {
      stylist: 'Sophia Green',
      makeupArtist: 'James Carter',
      creativeDirector: 'Emma White',
    },
    engagementStats: {
      views: 21000,
      likes: 6300,
      shares: 890,
    },
    callToAction: 'Discover the latest trends in Pump Magazine!',
    testimonial: 'Incredible team effort! - Sharee Michelle',
    image: 'https://picsum.photos/300/200?random=4',
  },
  {
    title: 'Elegant Magazine: Elena',
    slug: 'elegant-magazine-elena',
    thumbnail:
      'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6715276ce15620dc4dd4440f_12957620_1589024814746137_4884333050968345441_o.jpg',
    description: 'In Studio Production with Elena for Elegant Magazine, shot by Combina Key in May 2019.',
    model: 'Elena',
    publication: 'Elegant Magazine',
    dp: 'Combina Key',
    projectLink: 'Link to project',
    category: 'Fashion Editorial',
    date: '2019-05-18',
    location: 'Milan, Italy',
    client: 'Elegant Magazine',
    tags: ['elegance', 'fashion', 'studio'],
    videoLink: 'https://www.youtube.com/watch?v=example5',
    gallery: ['https://picsum.photos/400/300?random=9', 'https://picsum.photos/400/300?random=10'],
    photographerBio: 'https://combina-key-portfolio.com',
    team: {
      stylist: 'David Brown',
      makeupArtist: 'Sophia Turner',
      creativeDirector: 'Lucas Adams',
    },
    engagementStats: {
      views: 17500,
      likes: 5200,
      shares: 620,
    },
    callToAction: 'Explore more in Elegant Magazine!',
    testimonial: 'One of my favorite shoots! - Elena',
    image: 'https://picsum.photos/300/200?random=5',
  },
];

const mockGetCampaignListAsync = async ({ page, rowsPerPage }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * rowsPerPage;
      const paginatedData = CampaignData.slice(startIndex, startIndex + rowsPerPage);

      resolve({
        success: true,
        data: paginatedData,
        totalRecords: CampaignData.length,
      });
    }, 1000);
  });
};
export const CampaignView = () => {
  // const featuredData = data.filter((item) => item.featured === true);
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
        {filters.VIEW === 'list' ? (
          <CampaignTabView />
        ) : (
          <Box>
            <CampaignGridView
              data={data || [defaultCampaignData]}
              fetchList={fetchList}
              loading={loading}
              colums={filters.COL}
            />
            <div ref={observerRef} style={{ height: 10, textAlign: 'center' }}>
              {isFetching && <CircularProgress size="30px" />}
            </div>
          </Box>
        )}
      </PageLoader>
    </PageContainer>
  );
};
