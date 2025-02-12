'use client';

import { Iconify } from '@/components/iconify/iconify';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { IconText } from '@/components/utils/icon-text';
import { capitalizeFirstLetter } from '@/utils/helper';
import { Box, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import { ManagePartnerRightPanel } from './manage-partner-right-panel';


export const PartnerGridView = ({ data, colums, fetchList, loading, handlePagination }) => {
    return (
        <Box>
            <PageLoader loading={loading} error={null}>
                <Grid container spacing={1} columns={{ xs: 24 }} sx={{ mt: 2 }}>
                    {data.map((partner, index) => (
                        <Grid item size={{ xs: 6, md: colums }} key={index}>
                            <PartnerCard item={partner} fetchList={fetchList} />
                        </Grid>
                    ))}
                </Grid>
            </PageLoader>
        </Box>
    );
};

const PartnerCard = ({ item, fetchList }) => {
    const [openPartnerRightPanel, setOpenPartnerRightPanel] = React.useState(null);

    return (
        <>
            <Stack direction='row' gap={1} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, cursor: 'pointer' }} onClick={() => setOpenPartnerRightPanel(item)}>
                <Box component='img' src={item?.profile_image} alt={item?.name} sx={{ width: '30%', height: '200px', objectFit: 'cover' }} />
                <Stack direction='column' sx={{ p: 2 }}>
                    <Box>
                        <Stack direction='row' alignItems='center' gap={2}>
                            <Typography variant='h5'>{item?.name}</Typography>
                            <Chip label='active' size='small' variant='soft' color='success' sx={{ borderRadius: 4, px: 1 }} />
                        </Stack>
                        <Stack direction='row' gap={1} alignItems='center' divider={<Iconify icon='pepicons-pop:line-y' sx={{ color: 'grey.300' }} />} sx={{ mt: 1 }}>
                            <Typography>{capitalizeFirstLetter(item?.profile_category)}</Typography>
                            <Typography>{item?.state}</Typography>
                        </Stack>
                    </Box>
                    <Stack direction='column' gap={0.5} sx={{ mt: 2 }}>
                        <IconText icon='proicons:call' text={item?.phone} sx={{ color: 'text.secondary' }} />
                        <IconText icon='clarity:email-line' text={item?.email} sx={{ color: 'text.secondary' }} />
                        <IconText icon='mynaui:globe' text={item?.website} sx={{ color: 'text.secondary' }} />
                    </Stack>
                </Stack>
            </Stack>
            <ManagePartnerRightPanel
                view='QUICK'
                fetchList={fetchList}
                width="70%"
                open={openPartnerRightPanel ? true : false}
                data={openPartnerRightPanel}
                onClose={() => setOpenPartnerRightPanel(false)}
            />
        </>
    );
};
