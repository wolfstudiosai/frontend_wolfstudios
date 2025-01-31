import { pxToRem } from '@/utils/utils';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';

export const PortfolioQuickView = ({ data }) => {
  const theme = useTheme();

  return (
    <Stack direction="column" justifyContent="start" alignItems="start">
      {/* Header Image with Overlay */}
      <Box
        position="relative"
        sx={{
          height: pxToRem(600),
          width: pxToRem(800),
          maxWidth: '100%',
          borderRadius: 2,
          overflow: 'hidden',
        //   boxShadow: `0px 1px 5px ${theme.palette.grey[900]}`,
        border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          component="img"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${data.thumbnail}`}
          alt={data?.project_title}
          draggable={false}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '40%',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
          }}
        />

        {/* Image Text Overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            color: '#fff',
            zIndex: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {data.project_title || 'No Title'}
          </Typography>
          <Typography variant="body2">{data.category || 'Uncategorized'}</Typography>
        </Box>
      </Box>

      {/* Project Details */}
      <Box mt={3} width="100%">
        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2}>
          <Typography variant="subtitle1" color="text.secondary">
            Category: {data.category || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            State: {data.state || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Partner HQ: {data.partner_hq || 'N/A'}
          </Typography>
        </Stack>

        {/* Gallery Images */}
        {data.vertical_gallery_images.length > 0 && (
          <>
            <Typography variant="subtitle1" fontWeight="bold" mt={3}>
              Vertical Gallery
            </Typography>
            <Box display="flex" gap={1} overflow="auto" sx={{ mt: 1, pb: 1, whiteSpace: 'nowrap' }}>
              {data.vertical_gallery_images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Vertical ${idx}`}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '5px',
                    boxShadow: `0px 4px 8px ${theme.palette.grey[400]}`,
                  }}
                />
              ))}
            </Box>
          </>
        )}

        {data.horizontal_gallery_images.length > 0 && (
          <>
            <Typography variant="subtitle1" fontWeight="bold" mt={3}>
              Horizontal Gallery
            </Typography>
            <Box display="flex" gap={1} overflow="auto" sx={{ mt: 1, pb: 1, whiteSpace: 'nowrap' }}>
              {data.horizontal_gallery_images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Horizontal ${idx}`}
                  style={{
                    width: '100px',
                    height: '60px',
                    borderRadius: '5px',
                    boxShadow: `0px 4px 8px ${theme.palette.grey[400]}`,
                  }}
                />
              ))}
            </Box>
          </>
        )}

        <Divider sx={{ my: 2 }} />
        <Typography variant="body1">{data.full_description || 'No description available.'}</Typography>
      </Box>
    </Stack>
  );
};
