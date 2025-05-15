import { useState } from 'react';
import { Box, Button, InputBase, styled, Typography } from '@mui/material';
import { Iconify } from '/src/components/iconify/iconify';

import { pxToRem } from '/src/utils/helper';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const searchResult = [
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

export const NavSearch = ({ isMobile = false }) => {
  const router = useRouter();
  const [isInput, setIsInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${searchValue}`);
  };

  return (
    <SearchWrapper isMobile={isMobile}>
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
            onBlur={() => setTimeout(() => setIsInput(false), 300)}
          />
        </Search>
      </form>
      {/* Recent Searches Dropdown */}
      {isInput && (
        <DropdownContainer>
          {/* Search Results */}
          {searchResult.map((section, index) => (
            <Section key={index}>
              <SectionHeader>
                <TableName>{section.label} </TableName>
                <Button onClick={() => router.push(`/${section.label.toLowerCase()}`)} variant="text" sx={{ fontSize: '12px' }}>{section.items.length > 3 ? <span style={{ color: 'var(--mui-palette-primary-main)' }}>See More ({section.items.length - 3}+)</span> : ''}</Button>
              </SectionHeader>

              <ScrollableRow>
                {section.items.slice(0, 3).map((item, itemIndex) => (
                  <Link style={{ textDecoration: 'none' }} href={`/${section.label.toLowerCase()}/${item.name}`} key={itemIndex}>
                    <ResultItem>
                      <ProfileImage src={item.img} alt={item.name} />
                      <Box sx={{ p: 0.5, display: 'flex', flexDirection: 'column', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <ItemName>{item.name}</ItemName>
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
        </DropdownContainer>
      )}
    </SearchWrapper>
  );
};

const SearchWrapper = styled('div')(({ theme, isMobile }) => ({
  position: 'relative',
  width: isMobile ? '100%' : pxToRem(420),
  transition: isMobile ? 'none' : 'width 0.1s ease',
  //   display: { xs: 'none', lg: 'block' },
  '&:focus-within': {
    width: isMobile ? '100%' : '100%',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 'calc(1 * var(--mui-shape-borderRadius))',
  backgroundColor: 'var(--mui-palette-background-level2)',
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
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: 'var(--mui-palette-background-paper)',
  borderRadius: '4px',
  boxShadow: 'none',
  marginTop: theme.spacing(0.5),
  zIndex: 9999,
  maxHeight: '60vh',
  overflowY: 'auto',
  padding: theme.spacing(1),
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
  columnGap: theme.spacing(1),
  flexDirection: 'row',
  paddingBottom: theme.spacing(1),
  position: 'relative',
  '&::-webkit-scrollbar': {
    height: '6px',
  },
}));

const ResultItem = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  alignItems: 'start',
  textAlign: 'center',
  width: '220px',
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