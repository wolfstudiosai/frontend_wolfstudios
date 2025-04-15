'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

import { Iconify } from '/src/components/iconify/iconify';
import { PageLoader } from '/src/components/loaders/PageLoader';
import { SettingsContext } from '/src/contexts/settings';

import { CampaignCard } from './campaign-card';

export const CampaignGridView = ({ data, fetchList, loading }) => {
    const INITIAL_VISIBLE_COUNT = 10;
    const {
        customSettings: { openSubNav },
    } = React.useContext(SettingsContext);
    const [expandedGroups, setExpandedGroups] = React.useState([]);

    const toggleGroupView = (groupName) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [groupName]: !prev[groupName],
        }));
    };

    //group by client field
    const groupCampaigns = Object.groupBy(data, (campaign) => campaign.Client);

    return (
        <PageLoader loading={loading} error={null}>
            <>
                {Object.keys(groupCampaigns).map((client, index) => {
                    const isExpanded = expandedGroups[client];
                    const visibleCampaigns = isExpanded
                        ? groupCampaigns[client]
                        : groupCampaigns[client].slice(0, INITIAL_VISIBLE_COUNT);
                    return (
                        <Grid key={index} container sx={{ mb: 2, position: 'relative' }} spacing={2}>
                            {visibleCampaigns.map((item, index) => (
                                <Grid key={index} size={{ xs: 12, md: 6 }}>
                                    <CampaignCard item={item} fetchList={fetchList} />
                                </Grid>
                            ))}

                            <Grid size={{ xs: 12 }}>
                                {groupCampaigns[client] && groupCampaigns[client].length > 5 && (
                                    <Stack direction="row" justifyContent="center" sx={{ my: 1 }}>
                                        <Button
                                            variant="text"
                                            color="inherit"
                                            onClick={() => toggleGroupView(client)}
                                            endIcon={
                                                <Iconify
                                                    icon={isExpanded ? 'solar:square-arrow-up-broken' : 'solar:square-arrow-down-broken'}
                                                />
                                            }
                                        >
                                            {isExpanded ? 'Show Less' : 'Show More'}
                                        </Button>
                                    </Stack>
                                )}
                            </Grid>
                        </Grid>
                    );
                })}
            </>
        </PageLoader>
    );
};

const ShowMoreTextBox = ({ text, length }) => {
    const [expanded, setExpanded] = React.useState(false);
    return (
        <Typography
            variant="body1"
            sx={{
                fontSize: '1.1rem',
                color: 'text.primary',
                display: 'inline',
            }}
        >
            {text.length > length && !expanded ? (
                <>
                    {text.slice(0, length)}...
                    <Box
                        component="span"
                        onClick={() => setExpanded(true)}
                        sx={{
                            color: 'text.primary',
                            cursor: 'pointer',
                            // fontWeight: 'bold',
                            marginLeft: 0.5,
                            textDecoration: 'underline',
                        }}
                    >
                        read more
                    </Box>
                </>
            ) : (
                <>
                    {text}
                    {text.length > length && (
                        <Box
                            component="span"
                            onClick={() => setExpanded(false)}
                            sx={{
                                color: 'text.primary',
                                cursor: 'pointer',
                                // fontWeight: 'bold',
                                marginLeft: 0.5,
                                textDecoration: 'underline',
                            }}
                        >
                            show less
                        </Box>
                    )}
                </>
            )}
        </Typography>
    );
};
