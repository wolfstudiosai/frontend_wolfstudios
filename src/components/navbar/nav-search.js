import { Iconify } from '@/components/iconify/iconify';
import { pxToRem } from '@/utils/helper';
import { alpha, InputBase, styled } from '@mui/material';

export const NavSearch = ({ isMobile = false }) => {
  return (
    <Search sx={{ display: isMobile ? 'block' : { xs: 'none', md: 'block' } }}>
      <SearchIconWrapper>
        <Iconify icon="jam:search" width={20} color={'var(--mui-palette-neutral-400)'} />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
    </Search>
  );
};

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: pxToRem(230),
      // '&:focus': {
      //     width: pxToRem(250),
      // },
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
  backgroundColor: 'var(--mui-palette-background-level2)',
  transition: 'background-color 0.5s ease',
  // '&:hover': {
  //     backgroundColor: 'var(--mui-palette-background-level1)',
  // },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
