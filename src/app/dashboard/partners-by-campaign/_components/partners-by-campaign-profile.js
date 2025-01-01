'use client';

import { MultiReadonlyStatusChip, ReadonlyStatusChip } from '@/components/formFields/readonly-status';
import { WrapedText } from '@/components/formFields/wraped-text';
import PageLoader from '@/components/PageLoader/PageLoader';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { ContributingPartners } from './contributing-partners';
import { ContentHG } from './content-hg';


export function PartnersByCampaignProfile({ selectedItem }) {
    return (
        <PageLoader
            loading={false}
            error={null}
        >
            <Card sx={{ minHeight: { xs: '100%', md: '750px' } }}>
                <CardHeader

                    title={selectedItem?.name}
                />
                <CardContent>
                    <Stack spacing={2}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputLabel>Campaign Status</InputLabel>
                                <ReadonlyStatusChip value={selectedItem?.campaign_status} />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputLabel>Stakeholders</InputLabel>
                                <MultiReadonlyStatusChip value={selectedItem?.stakeholders} />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputLabel>Start Date</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.start_date}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputLabel>End Date</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.end_date || '-'}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputLabel>Total Content Engagement</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.total_content_engagement || '-'}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputLabel>Total Expense</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.total_expense}</Typography>
                            </Grid>

                            {/* image ref */}

                            <Grid size={{ xs: 12 }}>
                                <InputLabel>Image Guidelines</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.partner_rate || "-"}</Typography>
                            </Grid>

                            {/* video ref */}

                            <Grid size={{ xs: 12 }}>
                                <InputLabel>Video Guidelines</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.partner_tt_rate || "-"}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputLabel>Guidelines</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.guidelines || "-"}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputLabel>Budget</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.budget || "-"}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <InputLabel>Full Description</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.full_description || '-'}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputLabel>Contributing Partners</InputLabel>
                                {selectedItem?.contributing_partners?.map((partner, index) => (
                                    <ContributingPartners key={index} data={partner} />
                                ))}
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputLabel>Content HQ</InputLabel>
                                {selectedItem?.content_hq?.map((content, index) => (
                                    <ContentHG key={index} data={content} />
                                ))}
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <InputLabel>Retail Partners</InputLabel>
                                <Typography color="text.secondary">{selectedItem?.retail_partners || '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                </CardContent>
            </Card>
        </PageLoader >
    );
}
