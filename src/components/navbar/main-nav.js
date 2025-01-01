'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Dropdown } from '@/components/core/dropdown/dropdown';
import { DropdownPopover } from '@/components/core/dropdown/dropdown-popover';
import { DropdownTrigger } from '@/components/core/dropdown/dropdown-trigger';
import { Logo } from '@/components/core/logo';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { paths } from '@/paths';

import { navData } from '@/router';
import { MobileNav } from './mobile-nav';
import { NavSearch } from './nav-search';

export function MainNav() {
  const [openNav, setOpenNav] = React.useState(false);
  const pathname = usePathname();

// // todo: this is a temporary solution to make the color light. 
//   React.useEffect(() => {
//     localStorage.setItem('mui-mode', "light");
//   }, []);

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          bgcolor: 'rgba(240, 240, 240, 0.8)',
          color: 'var( --mui-palette-neutral-950)',
          left: 0,
          position: 'sticky',
          right: 0,
          top: 10,
          zIndex: 'var(--MainNav-zIndex)',
          mx: 2,
          borderRadius: 4,
          backdropFilter: 'blur(10px)',
          padding: 0
        }}
      >
        <Container maxWidth="xl" sx={{ minHeight: 'var(--MainNav-height)', py: '8px', my: 2 }}>
          <Stack direction="row" spacing={2} sx={{ display: 'flex', flex: '1 1 auto', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box component="nav" sx={{ display: { xs: 'none', md: 'block' } }}>
              <Stack component="ul" direction="row" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {
                  navData.map((item, index) => (
                    <NavItem key={index} href={item.href} pathname={pathname} title={item.title} icon={item.icon} />
                  ))
                }
              </Stack>
            </Box>
            <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
              <Logo height={32} width={122} />
            </Box>
            <Box>
              <NavSearch />
              <IconButton
                onClick={() => {
                  setOpenNav(true);
                }}
                sx={{ color: 'var(--mui-palette-common-dark)', display: { xs: 'flex', md: 'none' } }}
              >
                <ListIcon />
              </IconButton>
            </Box>
          </Stack>
        </Container>
      </Box>
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />

    </React.Fragment>
  );
}

export function NavItem({ children, disabled, external, href, matcher, pathname, title }) {

  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const hasPopover = Boolean(children);

  const element = (
    <Box component="li" sx={{ userSelect: 'none' }}>
      <Box
        {...(hasPopover
          ? {
            onClick: (event) => {
              event.preventDefault();
            },
            role: 'button',
          }
          : {
            ...(href
              ? {
                component: external ? 'a' : RouterLink,
                href,
                target: external ? '_blank' : undefined,
                rel: external ? 'noreferrer' : undefined,
              }
              : { role: 'button' }),
          })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--mui-palette-neutral-300)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          textAlign: 'left',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--mui-palette-action-disabledBackground)',
            color: 'var(--mui-action-disabled)',
            cursor: 'not-allowed',
          }),
          ...(active && { color: 'var(--mui-palette-common-dark)' }),
          '&:hover': {
            ...(!disabled &&
              !active && { bgcolor: 'rgba(255, 255, 255, 0.04)', color: 'var(--mui-palette-common-dark)' }),
          },
        }}
        tabIndex={0}
      >
        <Box component="span" sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          {/* <Iconify width={14} icon={icon} /> */}
          <Typography
            component="span"
            sx={{ color: 'var( --Text-primary)', fontSize: '0.875rem', fontWeight: 400, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
        {hasPopover ? (
          <Box sx={{ alignItems: 'center', color: 'var( --mui-palette-neutral-950)', display: 'flex', flex: '0 0 auto' }}>
            <CaretDownIcon fontSize="var(--icon-fontSize-sm)" />
          </Box>
        ) : null}
      </Box>
    </Box>
  );

  if (hasPopover) {
    return (
      <Dropdown>
        <DropdownTrigger>{element}</DropdownTrigger>
        <DropdownPopover
          PaperProps={{ sx: { width: '800px', maxWidth: '100%' } }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          {children}
        </DropdownPopover>
      </Dropdown>
    );
  }

  return element;
}


