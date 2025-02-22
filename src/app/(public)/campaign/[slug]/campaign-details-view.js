import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Iconify } from '/src/components/iconify/iconify';

import { CampaignDetailsRightPanel } from '../_components/campaign-details-right-panel';
import { CampaignDetailsSidebar } from '../_components/campaign-details-sidebar';
import { PageContainer } from '/src/components/container/PageContainer';

// import { CampaignDetailsRightPanel } from "../_components/campaign-details-right-panel";
// import { CampaignDetailsSidebar } from "../_components/campaign-details-sidebar";

export const CampaignDetailsView = ({ data }) => {
  return (
    <PageContainer>
      <Grid container spacing={4}>
        {/* Left Panel */}
        <Grid item size={{ xs: 12, md: 4 }}>
          <CampaignDetailsSidebar
            description={data.description}
            details={{
              date: data.start_date,
              compensation: data.partner_compensation,
              deliverables: data.partner_deliverables,
            }}
            author={data.created_by}
            campaign_title={data.name}
          />
        </Grid>

        {/* Right Content */}
        <Grid item size={{ xs: 12, md: 8 }}>
          <CampaignDetailsRightPanel
            thumbnail={data.thumbnail}
            title={data.name}
            article={{
              title: 'Why the Hook Matters More Than Ever',
              content:
                "In the saturated landscape of social media, where content is abundant and attention spans are dwindling, one element often goes overlooked yet holds immense power: The Hook. It's not merely a catchy intro; it's the linchpin of any successful social media strategy. The hook serves as the gateway to meaningful engagement and action, acting as the first impression that can either captivate or lose your audience in a split second. It's the bait that captures your audience's attention, the siren song that keeps them engaged, and the linchpin of any successful social media campaign. Yet, despite its importance, the hook remains one of the most undervalued players in the social media game.",
              button_text: 'Join',
              button_action: 'join_link',
            }}
            images={[
              'path/to/image1.jpg',
              'path/to/image2.jpg',
              'path/to/image3.jpg',
              'path/to/image4.jpg',
              'path/to/image5.jpg',
            ]}
            videos={[
              {
                title: 'Short Title',
                url: 'https://youtube.com/embed/videoId1',
                description:
                  'Lorem ipsum dolor sit amet consectetur. Nisl proin non tincidunt nisi. Nunc mi natoque fusce vitae ul sit sed amet bibendum. Accumsan dis leo mauris.',
              },
              {
                title: 'Short Title',
                url: 'https://youtube.com/embed/videoId2',
                description:
                  'Lorem ipsum dolor sit amet consectetur. Nisl proin non tincidunt nisi. Nunc mi natoque fusce vitae ul sit sed amet bibendum. Accumsan dis leo mauris.',
              },
              {
                title: 'Short Title',
                url: 'https://youtube.com/embed/videoId3',
                description:
                  'Lorem ipsum dolor sit amet consectetur. Nisl proin non tincidunt nisi. Nunc mi natoque fusce vitae ul sit sed amet bibendum. Accumsan dis leo mauris.',
              },
            ]}
            social_share={data.social_platforms}
          />
        </Grid>
      </Grid>

      {/* footer */}
      <Grid
        container
        sx={{
          bgcolor: 'var(--mui-palette-background-level2)',
          width: '100%',
          p: 4,
          borderRadius: 1,
          mt: { xs: 4, md: 4 },
        }}
      >
        <Grid item size={{ xs: 12, md: 10 }}>
          <Typography
            gutterBottom
            sx={{
              fontWeight: 300,
              fontSize: {
                xs: '1.5rem',
                md: '3.2rem',
              },
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            Start Creating
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ width: { xs: '70%', md: '40%' } }}>
            Lets create an unforgettable brand experience together. Start your journey now
          </Typography>
        </Grid>
        <Grid item size={{ xs: 12, md: 2 }}>
          <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" sx={{ width: '100%', height: '100%' }}>
            <Button
              variant="contained"
              color="text.secondary"
              sx={{
                mt: { xs: 2, md: 0 },
                backgroundColor: 'white',
                color: 'black',
              }}
              endIcon={<Iconify icon="material-symbols:arrow-outward-rounded" />}
            >
              JOIN NOW
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
