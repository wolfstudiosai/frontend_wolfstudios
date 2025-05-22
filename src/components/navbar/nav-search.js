import { Box, CircularProgress, InputBase, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Iconify } from '/src/components/iconify/iconify';
import { CustomTab } from '../core/custom-tab';
import { pxToRem } from '/src/utils/helper';
import { useDebounce } from '/src/hooks/use-debounce';
import { api } from '/src/utils/api';

export const NavSearch = ({ isMobile = false }) => {
  const router = useRouter();
  const [isInput, setIsInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [tab, setTab] = useState('partner');
  const containerRef = React.useRef(null);
  const [searchData, setSearchData] = useState([]);

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
    router.push(`/search?q=${searchValue}`);
  };

  return (
    <SearchWrapper isMobile={isMobile} ref={containerRef}>
      <form onSubmit={handleSubmit}>
        <Search>
          <SearchIconWrapper>
            <Iconify icon="jam:search" color={'var(--mui-palette-neutral-400)'} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
            onInput={() => setIsInput(true)}
          />
        </Search>
      </form>
      {/* Recent Searches Dropdown */}
      {isInput && (
        <DropdownContainer>
          <Box
            sx={{
              backgroundColor: 'var(--mui-palette-background-paper)',
              px: 2,
              // borderRadius: '4px',
              // boxShadow: 'var(--mui-shadows-16)',
            }}
          >
            <CustomTab
              tabs={[
                { label: 'Partner', value: 'partner', isWrapped: true },
                { label: 'Campaign', value: 'campaign', isWrapped: false },
                { label: 'Production', value: 'production', isWrapped: false },
              ]}
              value={tab}
              handleChange={(e, newValue) => setTab(newValue)}
            />
          </Box>

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
                  <Typography sx={{ mt: 1 }} variant="body2">
                    Please wait a moment...
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ padding: (theme) => theme.spacing(1) }}>
                {searchData.filter((item) => item.label.toLowerCase() === tab).map((section, index) => (
                  <Section key={index} >
                    <ScrollableRow>
                      {section.items.length > 0 ? section.items.map((item, itemIndex) => (
                        <Link
                          style={{ textDecoration: 'none' }}
                          href={`/${item.type}/${item.label}`}
                          key={itemIndex}
                        >
                          <ResultItem>
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
                        </Link>
                      )) : (
                        <Box height={50} width="100%" display="flex" alignItems="center" justifyContent="center">
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: pxToRem(12) }}>
                            No results found
                          </Typography>
                        </Box>
                      )}
                    </ScrollableRow>
                  </Section>
                ))}
              </Box>
            )}
          </Box>
        </DropdownContainer>
      )}
    </SearchWrapper>
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
  backgroundColor: 'var(--mui-palette-background-default)',
  boxShadow: 'none',
  marginTop: theme.spacing(0.5),
  zIndex: 9999,
  maxHeight: '60vh',
  overflowY: 'auto',
}));

const Section = styled('div')(({ theme }) => ({
  // marginBottom: theme.spacing(1),
}));

const SectionHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const TableName = styled('span')(({ theme }) => ({
  fontSize: pxToRem(14),
  fontWeight: 500,
  borderBottom: '2px solid var(--mui-palette-primary-main)',
  paddingBottom: theme.spacing(0.5),
  color: 'var(--mui-palette-text-primary)',
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

const ResultItem = styled('div')(({ theme, isMobile }) => ({
  display: 'flex',
  gap: theme.spacing(.5),
  paddingRight: theme.spacing(1),
  alignItems: 'start',
  textAlign: 'center',
  // width: { xs: '100px', sm: '150px', md: '200px' },
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
