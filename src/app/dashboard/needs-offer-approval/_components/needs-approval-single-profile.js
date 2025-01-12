'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';


import { ReadonlyStatus, ReadonlyStatusChip } from '@/components/formFields/readonly-status';
import { WrapedText } from '@/components/formFields/wraped-text';
import PageLoader from '@/components/PageLoader/PageLoader';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';


export function NeedsApprovalSingleProfile({ selectedItem }) {

    return (
        <PageLoader
            loading={false}
            error={null}
        >
            <Card sx={{ minHeight: { xs: '100%', md: '750px' } }}>
                <Image
                    src={selectedItem?.avatar || "/assets/default_avatar.png"}
                    alt="Uploaded Image"
                    width={200}
                    height={200}
                    style={{ objectFit: 'cover', borderRadius: "10px", border: "1px solid var(--mui-palette-divider)", margin: "1rem 0 0 1rem" }}
                />
                <CardHeader

                    title={selectedItem?.name}
                />

                <CardContent>


                    <Stack spacing={2}>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>Revo Status</InputLabel>
                                <ReadonlyStatusChip value={selectedItem?.revo_status} />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>Affiliate Platform</InputLabel>
                                <ReadonlyStatusChip value={selectedItem?.affiliate_platform} />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>Instagram</InputLabel>
                                <Typography color="text.secondary">
                                    <a href={selectedItem?.instagram || '#'} target="_blank" rel="noopener noreferrer">
                                        {selectedItem?.instagram || 'N/A'}
                                    </a>
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>Instagram Following</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.instagram_follwing || 'N/A'}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>TikTok</InputLabel>
                                <Typography color="text.secondary">
                                    <a href={selectedItem?.tiktok || '#'} target="_blank" rel="noopener noreferrer">
                                        {selectedItem?.tiktok || 'N/A'}
                                    </a>
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>TikTok Following</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.tiktok_follwing || 'N/A'}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>Partner Rate</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.partner_rate || 'N/A'}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>Partner TikTok Rate</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.partner_tt_rate || 'N/A'}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>Partner YouTube Rate</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.partner_yt_rate || 'N/A'}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>Partner Instagram Rate</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.partner_ig_rate || 'N/A'}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>Notes</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.notes || 'N/A'}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <InputLabel>Revo Offer</InputLabel>
                                <WrapedText value={selectedItem?.revo_offer || 'N/A'} />
                            </Grid>
                        </Grid>
                    </Stack>
                </CardContent>
            </Card>
        </PageLoader >
    );
}
