import { useState } from 'react';
import { InputBase, styled } from '@mui/material';

import { Iconify } from '/src/components/iconify/iconify';

import { pxToRem } from '/src/utils/helper';

export const NavSearch = ({ isMobile = false }) => {
  const [isInput, setIsInput] = useState(false);
  const [recentSearches] = useState(['All', 'Users', 'Projects', 'Campaigns', 'Documents']);
  const [suggestedSearches] = useState([
    {
      table: 'Users',
      items: Array(5).fill({ name: 'John Doe', status: 'Active', img: 'https://picsum.photos/300/200?random=3' }),
    },
    {
      table: 'Projects',
      items: Array(3).fill({ name: 'Project X', status: 'In Progress', img: 'https://picsum.photos/300/200?random=1' }),
    },
    {
      table: 'Campaigns',
      items: Array(4).fill({ name: 'Summer Sale', status: 'Completed', img: 'https://picsum.photos/300/200?random=2' }),
    },
  ]);

  return (
    <SearchWrapper isMobile={isMobile}>
      <Search>
        <SearchIconWrapper>
          <Iconify icon="jam:search" color={'var(--mui-palette-neutral-400)'} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onInput={() => setIsInput(true)}
          onBlur={() => setTimeout(() => setIsInput(false), 100)}
        />
      </Search>
      {/* Recent Searches Dropdown */}
      {isInput && (
        <DropdownContainer>
          {/* Filters Row */}
          <FiltersContainer>
            {recentSearches.map((filter) => (
              <FilterChip key={filter} onClick={() => console.log('Filter:', filter)}>
                {filter}
              </FilterChip>
            ))}
          </FiltersContainer>

          {/* Search Results */}
          {suggestedSearches.map((section, index) => (
            <Section key={index}>
              <SectionHeader>
                <TableName>{section.table}</TableName>
                <SeeMoreLink href="#">See More</SeeMoreLink>
              </SectionHeader>

              <ScrollableRow>
                {section.items.map((item, itemIndex) => (
                  <ResultItem key={itemIndex}>
                    <ProfileImage src={item.img} alt={item.name} />
                    <ItemName>{item.name}</ItemName>
                    <StatusBadge status={item.status.toLowerCase()}>{item.status}</StatusBadge>
                  </ResultItem>
                ))}
                <ScrollArrow>→</ScrollArrow>
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
  width: isMobile ? '100%' : pxToRem(120),
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
  backgroundColor: 'var(--mui-palette-background-default)',
  borderRadius: '4px',
  boxShadow: 'none', // Removed drop shadow as per previous requirement
  marginTop: theme.spacing(0.5),
  zIndex: 9999,
  maxHeight: '60vh',
  overflowY: 'auto',
  padding: theme.spacing(2),
}));

const FiltersContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const FilterChip = styled('button')(({ theme }) => ({
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '20px',
  border: '1px solid var(--mui-palette-divider)',
  background: 'transparent',
  cursor: 'pointer',
  fontSize: pxToRem(12),
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'var(--mui-palette-primary-light)',
    borderColor: 'var(--mui-palette-primary-main)',
  },
}));

const Section = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
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
}));

const ScrollableRow = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflowX: 'auto',
  paddingBottom: theme.spacing(1),
  position: 'relative',
  '&::-webkit-scrollbar': {
    height: '6px',
  },
}));

const ResultItem = styled('div')(({ theme }) => ({
  flex: '0 0 120px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const ProfileImage = styled('img')(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '10px',
  objectFit: 'cover',
  marginBottom: theme.spacing(0.5),
}));

const ItemName = styled('span')(({ theme }) => ({
  fontSize: pxToRem(12),
  fontWeight: 500,
  marginBottom: theme.spacing(0.25),
}));

const StatusBadge = styled('span')(({ theme, status }) => ({
  fontSize: pxToRem(10),
  padding: theme.spacing(0.25, 1),
  borderRadius: '12px',
  background:
    status === 'active'
      ? 'var(--mui-palette-success-light)'
      : status === 'completed'
        ? 'var(--mui-palette-success-main)'
        : 'var(--mui-palette-neutral-200)',
  color:
    status === 'active'
      ? 'var(--mui-palette-success-dark)'
      : status === 'completed'
        ? 'var(--mui-palette-common-white)'
        : 'var(--mui-palette-neutral-700)',
}));

const ScrollArrow = styled('button')(({ theme }) => ({
  position: 'sticky',
  right: 0,
  background: 'var(--mui-palette-background-paper)',
  border: 'none',
  cursor: 'pointer',
  padding: theme.spacing(0, 1),
  display: 'flex',
  alignItems: 'center',
}));

const SeeMoreLink = styled('a')(({ theme }) => ({
  fontSize: pxToRem(12),
  color: 'var(--mui-palette-primary-main)',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));
