import { ArrowForwardIos } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import { FadeIn } from '/src/components/animation/fade-in';

const jobSections = [
  { id: '01', title: 'AFFILIATE MGMT', image: 'https://picsum.photos/300/200?random=1' },
  { id: '02', title: 'PRODUCTION MGMT', image: 'https://picsum.photos/300/200?random=2' },
  { id: '03', title: 'PRODUCT LAUNCH', image: 'https://picsum.photos/300/200?random=3' }
];

export const JobSection = () => {
  return (
    <Box sx={{ px: 4, pt: 1 }}>
      {jobSections.map((job, index) => (
        <Box key={index}>
          <FadeIn>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: index === 0 ? 'none' : '1px solid var(--mui-palette-background-level3)',
                paddingY: 4.5,
                '&:hover': {
                  '& .job-id': {
                    opacity: 0,
                    transition: 'opacity 0.4s ease-in-out',
                  },
                  '& .job-title': {
                    marginLeft: 0,
                    transition: 'margin-left 0.4s ease-in-out',
                  },
                  '& .arrow-icon': {
                    transform: 'rotate(90deg)',
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
                    opacity: 1,
                    transition: 'opacity 0.4s ease-in-out',
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
                    marginLeft: '8px',
                    transition: 'margin-left 0.4s ease-in-out',
                  }}
                >
                  {job.title}
                </Typography>
              </Box>
              <Typography fontSize={18} sx={{ color: 'text.main', mt: 1, width: { xs: '100%', md: '70%' } }}>
                Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft
                compelling visuals that captivate audiences, evoke emotion, and leave a lasting impact.
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
          </FadeIn>
        </Box>
      ))}
    </Box>
  );
};
