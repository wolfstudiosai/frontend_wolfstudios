import Link from 'next/link';
import { textShortner } from '/src/utils/utils';
import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const RightContentOverview = () => {
  const ContentData = [
    {
      title: 'Mary Ann',
      slug: 'mary-ann',
      description: 'Session with Mary Ann, shot by Combina in February 2018',
      model: 'Mary Ann',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=1', // Placeholder image
      likes: 120,
      comments: 45,
      views: 2300,
    },
    {
      title: 'Prints: Abstract',
      slug: 'prints-abstract',
      description: 'On Session production for portraits, shot by Combina in November 2016.',
      model: 'Abstract',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=2', // Placeholder image
      likes: 120,
      comments: 45,
      views: 2300,
    },
    {
      title: 'Kansha: Love Bite',
      slug: 'kansha-love-bite',
      description: 'In Studio Production for Kansha Magazine, shot by Combina Key in August 2018.',
      model: 'Abstract',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=3', // Placeholder image
      likes: 120,
      comments: 45,
      views: 2300,
    },
    {
      title: 'Pump Magazine: Sharee',
      slug: 'pump-magazine-sharee',
      description: 'In Studio Production with Sharee Michelle for Pump Magazine, shot by Combina Key in November 2018.',
      model: 'Sharee Michelle',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=4', // Placeholder image
      likes: 120,
      comments: 45,
      views: 2300,
    },
    {
      title: 'Elegant Magazine: Elena',
      slug: 'elegant-magazine-elena',
      description: 'In Studio Production with Elena for Elegant Magazine, shot by Combina Key in May 2019.',
      model: 'Elena',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=5', // Placeholder image
      likes: 120,
      comments: 45,
      views: 2300,
    },
    {
      title: 'Imirage Mag',
      slug: 'imirage-mag',
      description: 'In Studio Production for Imirage Magazine, shot by Combina Key in February 2019.',
      model: 'Imirage Mag',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=6', // Placeholder image
      likes: 650,
      comments: 49,
      views: 2500,
    },
    {
      title: 'Tamara Rzaeva',
      slug: 'tamara-rzaeva',
      description: 'Session with Tamara Rzaeva, shot by Combina Key on April 2018.',
      model: 'Tamara Rzaeva',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=7', // Placeholder image
      likes: 470,
      comments: 78,
      views: 8100,
    },
    {
      title: 'Street Style: Karla Marie',
      slug: 'street-style-karla-marie',
      description: 'Street Style Session with Karla Marie, shot by Combina Key in December 2018.',
      model: 'Karla Marie',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=8', // Placeholder image
      likes: 820,
      comments: 47,
      views: 2400,
    },
    {
      title: 'Shuba Magazine: Jyaira Moore',
      slug: 'shuba-magazine-jyaira-moore',
      description: 'A session with Jyaira Moore, shot by Combina in July 2018.',
      model: 'Jyaira Moore',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=9', // Placeholder image
      likes: 210,
      comments: 43,
      views: 9700,
    },
    {
      title: 'Elena Tretyakova',
      slug: 'elena-tretyakova',
      description: 'Session with Elena Tretyakova, shot by Combina Key in March 2018.',
      model: 'Elena Tretyakova',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=10', // Placeholder image
      likes: 850,
      comments: 96,
      views: 6300,
    },
    {
      title: 'Lissa DeLorenzo',
      slug: 'lissa-delorenzo',
      description: 'Session with Lissa DeLorenzo, shot by Combina Key in July 2018.',
      model: 'Lissa DeLorenzo',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=11', // Placeholder image
      likes: 960,
      comments: 25,
      views: 2700,
    },
    {
      title: 'Lydia DTLA',
      slug: 'lydia-dtl',
      description: 'Session with Lydia, shot by Combina in DTLA in June 2024.',
      model: 'Lydia',
      dp: 'Combina Key',
      image: 'https://picsum.photos/300/200?random=12', // Placeholder image
      likes: 190,
      comments: 25,
      views: 4500,
    },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        {ContentData.map((item, index) => (
          <Grid item size={{ xs: 12, md: 3 }} key={index}>
            <SingleCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const SingleCard = ({ data }) => {
  return (
    <Box>
      <Paper elevation={1} variant="outlined">
        <Box
          component="img"
          src={data.image}
          sx={{ height: 200, width: '100%', objectFit: 'cover', border: 0, borderRadius: '5px 5px 0 0' }}
        />
        <Box p={2}>
          <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Content Name: {data.model}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {textShortner(data.description, 80)}
          </Typography> */}
          <Link
            href={`content/${data.slug}`}
            style={{
              fontSize: '0.9rem',
              color: 'var(--mui-palette-text-secondary)',
            }}
          >
            View Content
          </Link>
          {/* Engagement Icons (Likes, Comments, Views) */}
          <Box sx={{ display: 'flex', marginTop: 1 }}>
            <Box sx={{ marginRight: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ marginRight: 0.5 }}>
                ❤️ {data.likes}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginRight: 1 }}>
                💬 {data.comments}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                👁️ {data.views}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
