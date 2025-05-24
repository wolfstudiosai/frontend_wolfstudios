'use client';

import React, { useState } from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { PageContainer } from '/src/components/container/PageContainer';
import { api } from '/src/utils/api';
import PageLoader from '/src/components/loaders/PageLoader';
import { CustomTab } from '../../../components/core/custom-tab';
import { ProductionRightPanel } from '../production/_components/production-right-panel';
import { PartnerRightPanel } from '../partner/_components/partner-right-panel';
import { CampaignRightPanel } from '../campaign/_components/campaign-right-panel';
import { useSettings } from '/src/hooks/use-settings';

const SearchView = () => {
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [tab, setTab] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [openPanel, setOpenPanel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { debouncedSearch } = useSettings();

  const getSearchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/search?search=${debouncedSearch}`);
      const filteredData = res?.data?.data?.filter((item) => item.items.length > 0).map((item) => {
        return {
          label: `${item.label} (${item.items.length})`,
          value: item.label.toLowerCase(),
        }
      })

      if (filteredData.length > 0) {
        setTabs([{
          label: 'All',
          value: 'all',
        }, ...filteredData]);
        setTab('all');
      } else {
        setTabs([]);
        setTab('');
      }
      setSearchData(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (debouncedSearch) {
      getSearchData();
    }
  }, [debouncedSearch]);

  // Handle item click
  const handleItemClick = (section, id) => {
    setSelectedItem({ section, id })
    setOpenPanel(true)
  }

  return (
    <PageContainer>
      <PageLoader loading={loading}>
        {tabs.length > 0 ? (
          <>
            <CustomTab
              tabs={tabs}
              value={tab}
              handleChange={(e, newValue) => setTab(newValue)}
            />
            <Box sx={{ mt: 2 }}>
              {searchData
                .filter((section) => tab === 'all' || section.label.toLowerCase() === tab)
                .map((section, index) => (
                  <Box key={index}>
                    {section.items.length > 0 && <> <Typography variant="h6" fontWeight="bold">{section.label}</Typography>
                      <Grid container spacing={0.5} sx={{ mt: 1, mb: 4 }}>
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
                              onClick={() => handleItemClick(section.label, item.id)}
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
                                <Typography variant="body1" fontWeight="medium" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {item.label || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {item.occupation || 'N/A'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid></>}
                  </Box>
                ))}
            </Box>

            {selectedItem?.section === 'Campaign' && openPanel && (
              <CampaignRightPanel
                onClose={() => {
                  setSelectedItem(null)
                  setOpenPanel(false)
                }}
                fetchList={getSearchData}
                id={selectedItem?.id}
                open={openPanel}
              />
            )}

            {selectedItem?.section === 'Partner' && openPanel && (
              <PartnerRightPanel
                onClose={() => {
                  setSelectedItem(null)
                  setOpenPanel(false)
                }}
                fetchList={getSearchData}
                id={selectedItem?.id}
                open={openPanel}
              />
            )}

            {selectedItem?.section === 'Production' && openPanel && (
              <ProductionRightPanel
                onClose={() => {
                  setSelectedItem(null)
                  setOpenPanel(false)
                }}
                fetchList={getSearchData}
                id={selectedItem?.id}
                open={openPanel}
              />
            )}
          </>
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
            <Typography variant="body1" color="text.secondary">
              No results found
            </Typography>
          </Box>
        )}
      </PageLoader>
    </PageContainer>
  );
};

export default SearchView;
