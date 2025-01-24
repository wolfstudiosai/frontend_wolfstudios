'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import { LoginForm } from '@/app/auth/_components/LoginForm';
import { Dropdown } from '@/components/core/dropdown/dropdown';
import { DropdownPopover } from '@/components/core/dropdown/dropdown-popover';
import { DropdownTrigger } from '@/components/core/dropdown/dropdown-trigger';
import { Logo } from '@/components/core/logo';
import { Iconify } from '@/components/iconify/iconify';
import { MobileNav } from '@/components/navbar/mobile-nav';
import { NavSearch } from '@/components/navbar/nav-search';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { publicRoutes } from '@/router';
import { clearUserSessionFromLocalStore } from '@/utils/axios-api.helpers';
import { Avatar, Badge, Button, Popover, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';

import { paths } from '@/paths';
import useAuth from '@/hooks/useAuth';

import { UserPopover } from '../user-popover/user-popover';
import { usePopover } from '/src/hooks/use-popover';

export const NewMainNav = ({ onToggle }) => {
  const [openNav, setOpenNav] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { isLogin } = useAuth();
  const pathname = usePathname();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          top: 0,
          zIndex: 'var(--MainNav-zIndex)',
          mx: 0,
          borderRadius: 0,
          backdropFilter: 'blur(10px)',
          padding: 0,
        }}
      >
        <Container maxWidth="xxl" sx={{ minHeight: 'var(--MainNav-height)', py: '8px' }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: 'flex', flex: '1 1 auto', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Box component="nav" sx={{ display: { xs: 'none', md: 'block' } }}>
              <Stack
                component="ul"
                direction="row"
                spacing={1}
                sx={{ listStyle: 'none', m: 0, p: 0 }}
                alignItems={'center'}
              >
                {isLogin && (
                  <IconButton onClick={onToggle} color="#333">
                    <Iconify icon="material-symbols:menu-rounded" color="#333" />
                  </IconButton>
                )}
                <Box component={RouterLink} href={paths.public.portfolio} sx={{ display: 'inline-flex' }}>
                  <Logo height={32} width={122} />
                </Box>
                {publicRoutes.map((section, index) =>
                  section.items.map((item) => (
                    <NavItem
                      key={index}
                      href={item.href}
                      pathname={pathname}
                      item={item}
                      title={item.title}
                      icon={item.icon}
                    />
                  ))
                )}
                <NavSearch />
              </Stack>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              {isLogin ? (
                <Typography
                  component="span"
                  sx={{
                    color: 'var(--mui-palette-warning-700)',
                    '&:hover': { color: 'var(--mui-palette-common-dark)' },
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    lineHeight: '28px',
                    cursor: 'pointer',
                    mr: 3,
                  }}
                  onClick={() => clearUserSessionFromLocalStore(true)}
                >
                  Logout
                </Typography>
              ) : (
                <Typography
                  component="span"
                  sx={{
                    color: 'var( --Text-primahandleOpenry)',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    lineHeight: '28px',
                    cursor: 'pointer',
                    mr: 3,
                  }}
                  onClick={handleOpen}
                >
                  Login
                </Typography>
              )}
              {isLogin && <UserButton />}
              {!isLogin && (
                <Button variant="contained" size="small">
                  Sign Up
                </Button>
              )}
            </Box>

            <Box>
              {/* <NavSearch /> */}
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
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box
          sx={{
            p: 2,
          }}
        >
          <LoginForm closeDialog={handleClose} />
        </Box>
      </Popover>{' '}
    </React.Fragment>
  );
};

export function NavItem({ item, disabled, external, href, matcher, pathname, title }) {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const hasPopover = Boolean(item.items);

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
          color: 'var(--mui-palette-neutral-600)',
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
        <Box
          component="span"
          sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
        >
          <Typography
            component="span"
            sx={{ color: 'var( --Text-primary)', fontSize: '0.875rem', fontWeight: 400, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
        {hasPopover ? (
          <Box
            sx={{ alignItems: 'center', color: 'var( --mui-palette-neutral-950)', display: 'flex', flex: '0 0 auto' }}
          >
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
          PaperProps={{
            sx: {
              p: 2,
              bgcolor: 'background.paper',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
              minWidth: 200,
            },
          }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Stack spacing={1}>
            {item.items.map((subItem) => (
              <Box
                key={subItem.title}
                sx={{
                  p: 1,
                  borderRadius: 1,
                  cursor: 'pointer',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  textDecoration: 'none',
                }}
                component={RouterLink}
                href={subItem.href}
              >
                <Typography variant="body2" fontWeight={400}>
                  {subItem.title}
                </Typography>
              </Box>
            ))}
          </Stack>
        </DropdownPopover>
      </Dropdown>
    );
  }

  return element;
}

export function UserButton() {
  const popover = usePopover();
  const { userInfo } = useAuth();

  return (
    <React.Fragment>
      <Box
        component="button"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
      >
        <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="success"
          sx={{
            '& .MuiBadge-dot': {
              border: '2px solid var(--MainNav-background)',
              borderRadius: '50%',
              bottom: '6px',
              height: '12px',
              right: '6px',
              width: '12px',
            },
          }}
          variant="dot"
        >
          <Avatar src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${userInfo.profile_pic}`} />
        </Badge>
      </Box>
      <UserPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}

