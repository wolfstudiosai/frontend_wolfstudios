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
            borderTop: index === 0 ? 'none' : '1px solid var(--mui-palette-background-level3)',
            paddingY: 4.5,
            '&:hover': {
              '& .job-id': {
                opacity: 0,  // Fade the ID instead of removing it completely
                transition: 'opacity 0.4s ease-in-out', // Smooth opacity transition
              },
              '& .job-title': {
                marginLeft: 0, // Ensure title shifts left smoothly
                transition: 'margin-left 0.4s ease-in-out', // Transition margin-left
              },
              '& .arrow-icon': {
                transform: 'rotate(90deg)', // Smooth rotation for arrow
                transition: 'transform 0.4s ease-in-out',
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              className="job-id"
              sx={{
                color: 'text.primary',
                opacity: 1,  // Initially visible
                transition: 'opacity 0.4s ease-in-out', // Transition opacity
              }}
            >
              {job.id} /
            </Typography>
            <Typography
              variant="h6"
              className="job-title"
              sx={{
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '1.25rem',
                color: 'text.primary',
                marginLeft: '8px', // Add spacing initially
                transition: 'margin-left 0.4s ease-in-out', // Smooth transition for the title
              }}
            >
              {job.title}
            </Typography>
          </Box>
          <Typography fontSize={18} sx={{ color: 'text.secondary', mt: 1, width: { xs: '100%', md: '70%' } }}>
            Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
            visuals that captivate audiences, evoke emotion, and leave a lasting impact.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {job.image && (
              <Box component="img" src={job.image} alt={job.title} sx={{ height: '140px', width: 'auto' }} />
            )}
            <ArrowForwardIos
              className="arrow-icon"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
