import { Box, CircularProgress, InputBase, styled, Typography } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Iconify } from '/src/components/iconify/iconify';
import { CustomTab } from '../core/custom-tab';
import { pxToRem } from '/src/utils/helper';
import { useDebounce } from '/src/hooks/use-debounce';
import { api } from '/src/utils/api';
import { CampaignRightPanel } from '/src/app/(public)/campaign/_components/campaign-right-panel';
import { PartnerRightPanel } from '/src/app/(public)/partner/_components/partner-right-panel';
import { ProductionRightPanel } from '/src/app/(public)/production/_components/production-right-panel';
import { useSettings } from '/src/hooks/use-settings';

export const NavSearch = ({ isMobile = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isInput, setIsInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const containerRef = React.useRef(null);
  const [searchData, setSearchData] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [tab, setTab] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [openPanel, setOpenPanel] = React.useState(false);
  const isSearchPage = pathname === '/search';

  // GLOBAL SEARCH
  const { setSearch } = useSettings();

  // Loading state
  const [loading, setLoading] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  // Fetch search data
  React.useEffect(() => {
    if (debouncedSearchValue) {
      const getSearchData = async () => {
        try {
          setLoading(true);
          const res = await api.get(`/search?search=${debouncedSearchValue}`);
          setSearchData(res.data.data);
          const filteredData = res.data.data.filter((item) => item.items.length > 0).map((item) => {
            return {
              label: `${item.label} (${item.items.length})`,
              value: item.label.toLowerCase(),
            }
          })
          setTabs(filteredData);
          setTab(filteredData[0]?.value);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      getSearchData();
    }
  }, [debouncedSearchValue]);

  // Close search on outside click
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsInput(false);
        setTabs([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsInput(false);
    router.push(`/search`);
  };

  // Handle item click
  const handleItemClick = (section, id) => {
    setSelectedItem({ section, id })
    setOpenPanel(true)
  }

  return (
    <>
      <SearchWrapper isMobile={isMobile} ref={containerRef}>
        <form onSubmit={handleSubmit}>
          <Search>
            <SearchIconWrapper>
              <Iconify icon="jam:search" color={'var(--mui-palette-neutral-400)'} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
                setSearch(e.target.value)
              }}
              inputProps={{ 'aria-label': 'search' }}
              onInput={() => setIsInput(true)}
            />
          </Search>
        </form>
        {/* Recent Searches Dropdown */}
        {isInput && !isSearchPage && (
          <DropdownContainer>
            {/* Search Results */}
            <Box>
              {loading ? (
                <Box sx={{ m: 0 }}>
                  <Box
                    sx={{ minHeight: "100px" }}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <CircularProgress size={20} />
                    <Typography sx={{ mt: 1, color: 'var(--mui-palette-text-secondary)' }} variant="body2">
                      Please wait a moment...
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ padding: (theme) => theme.spacing(1), pt: 0 }}>
                  <>
                    {tabs.length > 0 ? <Box sx={{ mb: 2, backgroundColor: 'var(--mui-palette-background-paper)', position: 'sticky', top: 0, zIndex: 1 }}>
                      <CustomTab
                        tabs={tabs.map((item) => ({
                          label: item.label,
                          value: item.value,
                        }))}
                        value={tab}
                        handleChange={(e, newValue) => setTab(newValue)}
                      />
                    </Box> : <Box height={50} width="100%" display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: pxToRem(12) }}>
                        No results found
                      </Typography>
                    </Box>}
                  </>
                  {tabs.length > 0 && searchData.filter((sections) => sections.label.toLowerCase() === tab).map((section, index) => (
                    <Section key={index} >
                      <ScrollableRow>
                        {section.items.map((item) => (
                          <ResultItem key={item.id} onClick={() => handleItemClick(section.label, item.id)}>
                            <ProfileImage src={item.img || '/assets/image-placeholder.jpg'} alt={item.label} />
                            <Box
                              sx={{
                                p: 0.5,
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              <ItemName>{item.label || 'N/A'}</ItemName>
                              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'start', fontSize: pxToRem(12) }}>
                                {item.occupation || 'N/A'}
                              </Typography>
                            </Box>
                          </ResultItem>
                        ))}
                      </ScrollableRow>
                    </Section>
                  ))}
                </Box>
              )}
            </Box>
          </DropdownContainer>
        )}
      </SearchWrapper>

      {selectedItem?.section === 'Campaign' && openPanel && (
        <CampaignRightPanel
          onClose={() => {
            setSelectedItem(null)
            setOpenPanel(false)
          }}
          id={selectedItem.id}
          open={openPanel}
        />
      )}
      {selectedItem?.section === 'Partner' && openPanel && (
        <PartnerRightPanel
          onClose={() => {
            setSelectedItem(null)
            setOpenPanel(false)
          }}
          id={selectedItem.id}
          open={openPanel}
        />
      )}

      {selectedItem?.section === 'Production' && openPanel && (
        <ProductionRightPanel
          onClose={() => {
            setSelectedItem(null)
            setOpenPanel(false)
          }}
          id={selectedItem.id}
          open={openPanel}
        />
      )}
    </>
  );
};

const SearchWrapper = styled('div')(({ theme, isMobile }) => ({
  position: 'relative',
  width: isMobile ? '100%' : '80%',
  transition: isMobile ? 'none' : 'width 0.1s ease',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'var(--mui-palette-background-paper)',
  transition: 'background-color 0.5s ease, width 0.4s ease',
  height: pxToRem(32),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'var(--mui-palette-neutral-400)',
  width: '100%',
  marginTop: pxToRem(2),
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create(['width', 'padding'], {
      duration: theme.transitions.duration.short,
    }),
    fontSize: pxToRem(14),
  },
}));

const DropdownContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 28,
  left: 0,
  right: 0,
  backgroundColor: 'var(--mui-palette-background-paper)',
  boxShadow: 'none',
  // marginTop: theme.spacing(0.5),
  zIndex: 9999,
  maxHeight: '60vh',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
}));

const Section = styled('div')(({ theme }) => ({
  // marginBottom: theme.spacing(1),
}));

const ScrollableRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: theme.spacing(.5),
  flexDirection: 'row',
  paddingBottom: theme.spacing(1),
  position: 'relative',
  '&::-webkit-scrollbar': {
    height: '6px',
  },
}));

const ResultItem = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(.5),
  paddingRight: theme.spacing(1),
  alignItems: 'start',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  border: '1px solid var(--mui-palette-divider)',
  cursor: 'pointer',
  '&:hover h3': {
    color: 'var(--mui-palette-primary-main)',
    textDecoration: 'underline',
  },
}));

const ProfileImage = styled('img')(({ theme }) => ({
  width: '40px',
  height: '47px',
  objectFit: 'cover',
  // marginBottom: theme.spacing(0.5),
}));

const ItemName = styled('h3')(({ theme }) => ({
  fontSize: pxToRem(12),
  fontWeight: 500,
  marginBottom: theme.spacing(0.25),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: 'var(--mui-palette-text-primary)',
}));
