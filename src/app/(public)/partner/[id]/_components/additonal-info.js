import { Box, Card, CardContent, CardHeader, Chip, Grid2, Stack, Typography } from '@mui/material';
import { Iconify } from '/src/components/iconify/iconify';
import Link from 'next/link';

export default function AdditionalInfo({ partner }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%", borderRadius: 0, bgcolor: 'background.default', border: '1px solid var(--mui-palette-divider)', }}>
                <CardHeader title="Additional Information" />
                <CardContent>
                    <Stack spacing={0.5}>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Medium
                            </Typography>
                            {partner?.Medium ? (
                                <Link href={partner?.Medium} target="_blank" rel="noopener noreferrer">
                                    View
                                </Link>
                            ) : (
                                <Typography variant="body2">N/A</Typography>
                            )}
                        </Box>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Linktree
                            </Typography>
                            {partner?.Linktree ? (
                                <Link href={partner?.Linktree} target="_blank" rel="noopener noreferrer">
                                    View
                                </Link>
                            ) : (
                                <Typography variant="body2">N/A</Typography>
                            )}
                        </Box>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Snapchat
                            </Typography>
                            {partner?.Snapchat ? (
                                <Link href={partner?.Snapchat} target="_blank" rel="noopener noreferrer">
                                    View
                                </Link>
                            ) : (
                                <Typography variant="body2">N/A</Typography>
                            )}
                        </Box>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Google Drive Files
                            </Typography>
                            {partner?.GoogleDriveFiles ? (
                                <Link href={partner?.GoogleDriveFiles} target="_blank" rel="noopener noreferrer">
                                    View
                                </Link>
                            ) : (
                                <Typography variant="body2">N/A</Typography>
                            )}
                        </Box>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Booking Link
                            </Typography>
                            {partner?.BookingLink ? (
                                <Link href={partner?.BookingLink} target="_blank" rel="noopener noreferrer">
                                    View
                                </Link>
                            ) : (
                                <Typography variant="body2">N/A</Typography>
                            )}
                        </Box>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Notes
                            </Typography>
                            <Typography variant="body2">{partner?.Notes || "N/A"}</Typography>
                        </Box>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Stakeholders
                            </Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {partner?.Stakeholders?.length > 0 ? partner?.Stakeholders?.map((stakeholder, index) => (
                                    <Chip
                                        key={index}
                                        label={stakeholder?.Name}
                                        size="small"
                                        icon={<Person fontSize="small" />}
                                        variant="outlined"
                                    />
                                )) : <Typography variant="body2">N/A</Typography>}
                            </Box>
                        </Box>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Deliverables
                            </Typography>
                            <Typography variant="body2">{partner?.Deliverables || "N/A"}</Typography>
                        </Box>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Location
                            </Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {partner?.ByCityPartnerHQ?.map((city, i) => (
                                    <Chip
                                        key={i}
                                        label={city.ByCity.Name}
                                        size="small"
                                        icon={<Iconify icon="eva:location-outline" />}
                                        variant="outlined"
                                    />
                                ))}
                                {partner?.ByStatesPartnerHQ.map((state, i) => (
                                    <Chip key={i} label={state.ByStates.Name} size="small" variant="outlined" />
                                ))}
                                {partner?.ByCountryPartners.map((country, i) => (
                                    <Chip key={i} label={country.ByCountry.Name} size="small" variant="outlined" />
                                ))}
                            </Box>
                        </Box>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Mailing Address
                            </Typography>
                            <Typography variant="body2">{partner?.MailingAddress || "N/A"}</Typography>
                        </Box>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Journey Step
                            </Typography>
                            <Typography variant="body2">{partner?.JourneyStep || "N/A"}</Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    )
}

