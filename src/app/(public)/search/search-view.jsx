'use client'

import { useState } from 'react';
import { PageContainer } from '/src/components/container/PageContainer';
import PageLoader from '/src/components/loaders/PageLoader';
import { Box, Typography, Avatar, Card, CardContent } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid2';

const data = [
    {
        label: 'Campaign',
        items: Array(5).fill({ name: 'John Doe', img: 'https://picsum.photos/300/200?random=3', occupation: 'Designer' }),
    },
    {
        label: 'Production',
        items: Array(3).fill({ name: 'Project X', img: 'https://picsum.photos/300/200?random=1', occupation: 'Designer' }),
    },
    {
        label: 'Partner',
        items: Array(4).fill({ name: 'Summer Sale', img: 'https://picsum.photos/300/200?random=2', occupation: 'Designer' }),
    },
]

const SearchView = ({ search }) => {
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('All');

    // Reset pagination and data when tab changes
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <PageContainer>
            <PageLoader loading={loading}>
                <TabContext value={selectedTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                            <Tab label="All" value="All" />
                            {data.map((item, index) => (
                                <Tab key={index} label={item.label} value={item.label} />
                            ))}
                        </TabList>
                    </Box>
                    <TabPanel value="All" sx={{ p: 0 }}>
                        <Box>
                            {data.map((section, index) => (
                                <Box key={index} sx={{ my: 2 }}>
                                    <Typography variant="h6">{section.label}</Typography>
                                    <Grid container spacing={0.5} sx={{ mt: 1 }}>
                                        {section.items.map((item, index) => (
                                            <Grid key={index} size={{ xs: 12, sm: 4, md: 4, lg: 2, xl: 2 }}>
                                                <Card elevation={0} sx={{
                                                    border: '1px solid var(--mui-palette-divider)',
                                                    boxShadow: 2,
                                                    borderRadius: 0,
                                                    bgcolor: 'background.paper',
                                                }}>
                                                    <Avatar
                                                        src={item.img || '/src/assets/images/placeholder.png'}
                                                        variant="square"
                                                        p={0}
                                                        sx={{
                                                            width: '100%',
                                                            height: 200,
                                                            p: 0,
                                                            borderRadius: 0,
                                                        }}
                                                    />
                                                    <CardContent sx={{ p: '10px !important' }}>
                                                        <Typography variant="body1" fontWeight="medium">{item.name}</Typography>
                                                        <Typography variant="body2" color="text.secondary">{item.occupation}</Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            ))}
                        </Box>
                    </TabPanel>
                    <TabPanel value="Campaign">

                    </TabPanel>
                    <TabPanel value="Production">

                    </TabPanel>
                </TabContext>
            </PageLoader>
        </PageContainer>
    );
}

export default SearchView;
