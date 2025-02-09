import { Iconify } from "@/components/iconify/iconify";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { ManageCampaignRightPanel } from './manage-campaign-right-panel';

export const CampaignCard = ({ item }) => {
    const [openCampaignRightPanel, setOpenCampaignRightPanel] = React.useState(null);

    return (
        <>
            <Stack direction='row' sx={{ height: '260px', borderRadius: 2, border: '1px solid var(--mui-palette-divider)', boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.05)' }}>
                <Box component='img' src={item.image} alt={item.title} sx={{ width: '26%', height: '100%', objectFit: 'cover', borderRadius: '16px 0px 0px 16px' }} />
                <Stack direction='column' justifyContent='space-between' gap={1} sx={{ p: 2, width: '74%' }}>
                    <Box>
                        <Typography variant='caption' component='h4' sx={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'secondary.main' }}>{item.title}</Typography>
                        <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>{item.description}</Typography>
                        <Stack direction='row' gap={1} sx={{ my: 1.5 }}>
                            {
                                item.tags.map((i) => (
                                    <Chip key={i} variant='soft' size='small' label={i} sx={{ textTransform: 'capitalize' }} />
                                ))
                            }
                        </Stack>
                    </Box>
                    <Stack direction='row' justifyContent='space-between'>
                        <Stack direction='row' alignItems='center' gap={1} divider={<Iconify icon='pepicons-pencil:line-y' sx={{ color: 'grey.400' }} />}>
                            <Stack direction='row' alignItems='center' gap='4px'>
                                <Iconify icon='mdi:camera-outline' />
                                <Typography sx={{ textTransform: 'capitalize' }}>{item.dp}</Typography>
                            </Stack>
                            <Stack direction='row' alignItems='center' gap='4px'>
                                <Iconify icon='solar:calendar-outline' />
                                <Typography>{dayjs(item.date).format('DD MMM YYYY')}</Typography>
                            </Stack>
                            <Stack direction='row' alignItems='center' gap='4px'>
                                <Iconify icon='mingcute:location-line' />
                                <Typography>{item.location}</Typography>
                            </Stack>
                        </Stack>
                        <Button variant='outlined' size='small' color="inherit" onClick={() => setOpenCampaignRightPanel(item)}>View details</Button>
                    </Stack>
                </Stack>
            </Stack>
            <ManageCampaignRightPanel
                view={'QUICK'}
                width="70%"
                open={openCampaignRightPanel ? true : false}
                data={openCampaignRightPanel}
                onClose={() => setOpenCampaignRightPanel(false)}
            />
        </>
    )
}