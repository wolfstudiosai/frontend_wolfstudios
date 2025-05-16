import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, InputBase, styled, Typography } from '@mui/material';
import { isModifier } from 'typescript';

import { Iconify } from '/src/components/iconify/iconify';

import { CustomTab } from '../core/custom-tab';
import { pxToRem } from '/src/utils/helper';

const searchResult = [
  {
    label: 'Campaign',
    items: [
      { label: 'REVO Partner Program', img: 'https://picsum.photos/300/200?random=3', occupation: 'Designer' },
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

export const NavSearch = ({ isMobile = false }) => {
  const router = useRouter();
  const [isInput, setIsInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [tab, setTab] = useState('partner');
  const [filteredValue, setFilteredData] = useState([]);
  const containerRef = React.useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
            onChange={(e) => {
              const value = e.target.value;
              setSearchValue(value);

              if (!value.trim()) {
                setFilteredData(searchResult);
                return;
              }

              const filtered = searchResult
                .map((section) => {
                  const filteredItems = section.items.filter((item) =>
                    item.label.toLowerCase().includes(value.toLowerCase())
                  );
                  if (filteredItems.length > 0) {
                    return { ...section, items: filteredItems };
                  }
                  return null;
                })
                .filter(Boolean); // remove nulls

              setFilteredData(filtered);
            }}
            inputProps={{ 'aria-label': 'search' }}
            onInput={() => setIsInput(true)}
            // onBlur={() => setTimeout(() => setIsInput(false), 300)}
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
                { label: 'Messages', value: 'messages', isWrapped: false },
                { label: 'Products', value: 'products', isWrapped: false },
                { label: 'Spaces', value: 'spaces', isWrapped: false },
                { label: 'Portfolio', value: 'portfolio', isWrapped: false },
              ]}
              value={tab}
              handleChange={(e, newValue) => setTab(newValue)}
            />
          </Box>

          {/* Search Results */}
          <Box sx={{ padding: (theme) => theme.spacing(1) }}>
            {filteredValue
              .filter((section) => section.label.toLocaleLowerCase() === tab)
              .map((section, index) => (
                <Section key={index} >
                  <ScrollableRow>
                    {section.items.map((item, itemIndex) => (
                      <Link
                        style={{ textDecoration: 'none' }}
                        href={`/${section.label.toLowerCase()}/${item.label}`}
                        key={itemIndex}
                      >
                        <ResultItem>
                          <ProfileImage src={item.img} alt={item.label} />
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
                            <ItemName>{item.label}</ItemName>
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'start' }}>
                              {item.occupation}
                            </Typography>
                          </Box>
                        </ResultItem>
                      </Link>
                    ))}
                  </ScrollableRow>
                </Section>
              ))}
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
  padding: `${theme.spacing(0)} ${theme.spacing(1)}`,
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
  width: '50px',
  height: '50px',
  objectFit: 'cover',
  marginBottom: theme.spacing(0.5),
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
