import { Iconify } from '/src/components/iconify/iconify';
import { pxToRem } from '/src/utils/helper';
import { InputBase, styled } from '@mui/material';

export const NavSearchV2 = ({ isMobile = false }) => {
  return (
    <SearchWrapper sx={{ display: isMobile ? 'block' : { xs: 'none', md: 'block' } }}>
      <Search>
        <SearchIconWrapper>
          <Iconify icon="jam:search" color={'var(--mui-palette-neutral-400)'} />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Search>
    </SearchWrapper>
  );
};

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: pxToRem(120),
  transition: 'width 0.1s ease',
  //   transformOrigin: 'left',
  '&:focus-within': {
    width: '100%',
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
