import Link from 'next/link';
import { Box, Card, CardContent, CardHeader, Chip, Grid2, Stack, Typography } from '@mui/material';

import { Iconify } from '/src/components/iconify/iconify';
import { Person } from '@mui/icons-material';

export const AdditionalInfo = ({ partner }) => {
  return (
    <Grid2 item size={{ xs: 12, md: 6 }}>
      <Card
        sx={{
          height: '100%',
          borderRadius: 0,
          bgcolor: 'background.default',
          border: '1px solid var(--mui-palette-divider)',
        }}
      >
        <CardHeader title="Additional Information" subheader="Partner's additional information" />
        <CardContent>
          <Stack spacing={0.5}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Medium
              </Typography>
              {partner?.medium ? (
                <Link href={partner?.medium} target="_blank" rel="noopener noreferrer">
                  View
                </Link>
              ) : (
                <Typography variant="body2">N/A</Typography>
              )}
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Linktree
              </Typography>
              {partner?.linktree ? (
                <Link href={partner?.linktree} target="_blank" rel="noopener noreferrer">
                  View
                </Link>
              ) : (
                <Typography variant="body2">N/A</Typography>
              )}
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Snapchat
              </Typography>
              {partner?.snapchat ? (
                <Link href={partner?.snapchat} target="_blank" rel="noopener noreferrer">
                  View
                </Link>
              ) : (
                <Typography variant="body2">N/A</Typography>
              )}
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Google Drive Files
              </Typography>
              {partner?.googleDriveFiles ? (
                <Link href={partner?.googleDriveFiles} target="_blank" rel="noopener noreferrer">
                  View
                </Link>
              ) : (
                <Typography variant="body2">N/A</Typography>
              )}
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Booking Link
              </Typography>
              {partner?.bookingLink ? (
                <Link href={partner?.bookingLink} target="_blank" rel="noopener noreferrer">
                  View
                </Link>
              ) : (
                <Typography variant="body2">N/A</Typography>
              )}
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Notes
              </Typography>
              <Typography variant="body2">{partner?.notes || 'N/A'}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Stakeholders
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {partner?.stakeholders?.length > 0 ? (
                  partner?.stakeholders?.map((stakeholder, index) => (
                    <Chip
                      key={index}
                      label={stakeholder?.name}
                      size="small"
                      icon={<Person fontSize="small" />}
                      variant="outlined"
                    />
                  ))
                ) : (
                  <Typography variant="body2">N/A</Typography>
                )}
              </Box>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Deliverables
              </Typography>
              <Typography variant="body2">{partner?.deliverables || 'N/A'}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Location
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {partner?.cities?.map((city, i) => (
                  <Chip
                    key={i}
                    label={city.name}
                    size="small"
                    icon={<Iconify icon="eva:location-outline" />}
                    variant="outlined"
                  />
                ))}
                {partner?.states?.map((state, i) => (
                  <Chip key={i} label={state.name} size="small" variant="outlined" />
                ))}
                {partner?.countries?.map((country, i) => (
                  <Chip key={i} label={country.name} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Mailing Address
              </Typography>
              <Typography variant="body2">{partner?.mailingAddress || 'N/A'}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Journey Step
              </Typography>
              <Typography variant="body2">{partner?.journeyStep || 'N/A'}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid2>
  );
};
