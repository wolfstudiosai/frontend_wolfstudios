import { ArrowForwardIos } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const jobSections = [
  { id: '01', title: 'PRODUCT DESIGN', image: 'https://picsum.photos/300/200?random=1' },
  { id: '02', title: 'BRAND IDENTITY', image: 'https://picsum.photos/300/200?random=2' },
  { id: '03', title: 'BRAND IDENTITY', image: 'https://picsum.photos/300/200?random=3' },
  { id: '04', title: 'BRAND IDENTITY', image: 'https://picsum.photos/300/200?random=4' },
];

export const JobSection = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {jobSections.map((job, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: index === 0 ? 'none' : '1px solid #4A4A4A',
            paddingY: 4.5,
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ color: 'text.primary' }}>{job.id} /</Typography>
              <Typography sx={{ color: 'text.primary', fontSize: '1.25rem' }}>{job.title}</Typography>
            </Box>
            <Typography fontSize={21} sx={{color: 'text.secondary', mt: 1}}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {job.image && (
              <Box component="img" src={job.image} alt={job.title} sx={{ height: '140px', width: 'auto' }} />
            )}
            <ArrowForwardIos sx={{ color: 'text.secondary', fontSize: '0.875rem' }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
