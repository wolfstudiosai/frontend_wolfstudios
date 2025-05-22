'use client';

import React, { useState } from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { PageContainer } from '/src/components/container/PageContainer';
import { api } from '/src/utils/api';

import { CustomTab } from '../../../components/core/custom-tab';

const searchResult = [
  {
    label: 'Campaign',
    items: [
      { label: 'REVO Partner Program', img: 'https://picsum.photos/300/200?random=3', occupation: 'Designer' }, //this is dummy data. you can return actual object.
      { label: 'REVO Cupper (Cellulite)', img: 'https://picsum.photos/300/200?random=3', occupation: 'Designer' },
      { label: 'REVO Valentines Day', img: 'https://picsum.photos/300/200?random=3', occupation: 'Designer' },
    ],
  },
  {
    label: 'Production',
    items: [
      { label: 'Production 1', img: 'https://picsum.photos/300/200?random=1', occupation: 'Designer' },
      { label: 'Production 2', img: 'https://picsum.photos/300/200?random=1', occupation: 'Designer' },
      { label: 'Production 3', img: 'https://picsum.photos/300/200?random=1', occupation: 'Designer' },
    ],
  },
  {
    label: 'Partner',
    items: [
      { label: 'Amie luxury boutique', img: 'https://picsum.photos/300/200?random=2', occupation: 'Designer' },
      { label: 'its.all.about.gigi', img: 'https://picsum.photos/300/200?random=2', occupation: 'Designer' },
      { label: 'Mile High Run Club', img: 'https://picsum.photos/300/200?random=2', occupation: 'Designer' },
    ],
  },
];

const SearchView = ({ search }) => {
  // console.log(search, 'search value....');
  const [loading, setLoading] = useState(false);
  //   const [selectedTab, setSelectedTab] = useState('All');
  const [tab, setTab] = useState('');
  const [filteredValue, setFilteredData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  // Reset pagination and data when tab changes
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  React.useEffect(() => {
    const getSearchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/search?search=${search}`);
        setSearchData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSearchData();
  }, [search]);

  return (
    <PageContainer>
      <CustomTab
        tabs={[
          { label: 'All', value: '', isWrapped: true },
          { label: 'Partner', value: 'partner', isWrapped: true },
          { label: 'Campaign', value: 'campaign', isWrapped: false },
          { label: 'Production', value: 'production', isWrapped: false },
          // { label: 'Messages', value: 'messages', isWrapped: false },
          // { label: 'Products', value: 'products', isWrapped: false },
          // { label: 'Spaces', value: 'spaces', isWrapped: false },
          // { label: 'Portfolio', value: 'portfolio', isWrapped: false },
        ]}
        value={tab}
        handleChange={(e, newValue) => setTab(newValue)}
      />
      <Box sx={{ padding: (theme) => theme.spacing(1) }}>
        {filteredValue
          .filter((section) => tab === '' || section.label.toLowerCase() === tab)
          .map((section, index) => (
            <Box key={index} sx={{ my: 2 }}>
              <Typography variant="h6">{section.label}</Typography>
              <Grid container spacing={0.5} sx={{ mt: 1 }}>
                {section.items.map((item, index) => (
                  <Grid key={index} size={{ xs: 12, sm: 4, md: 4, lg: 2, xl: 2 }}>
                    <Card
                      elevation={0}
                      sx={{
                        border: '1px solid var(--mui-palette-divider)',
                        boxShadow: 2,
                        borderRadius: 0,
                        bgcolor: 'background.paper',
                      }}
                    >
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
                        <Typography variant="body1" fontWeight="medium">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.occupation}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
      </Box>
    </PageContainer>
  );
};

export default SearchView;
