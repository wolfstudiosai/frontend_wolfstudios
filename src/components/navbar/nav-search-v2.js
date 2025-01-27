import { Iconify } from '@/components/iconify/iconify';
import { pxToRem } from '@/utils/utils';
import { InputBase, styled } from '@mui/material';

export const NavSearchV2 = ({ isMobile = false }) => {
  return (
    <Search sx={{ display: isMobile ? 'block' : { xs: 'none', md: 'block' } }}>
      <SearchIconWrapper>
        <Iconify icon="jam:search"  color={'var(--mui-palette-neutral-400)'} />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
    </Search>
  );
};

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
  height: pxToRem(32), 
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
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
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    // padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: pxToRem(100),
      '&:focus': {
          width: "100%",
      },
    },
  },
}));
