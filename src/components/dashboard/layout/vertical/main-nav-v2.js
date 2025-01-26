'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
import { pxToRem } from '@/utils/utils';
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

export const MainNavV2 = ({ onToggle }) => {
  const [openNav, setOpenNav] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const { isLogin } = useAuth();
  const pathname = usePathname();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (path) => {
    router.push(paths.auth.default.sign_in);
    handleClose();
  };
  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          color: 'var( --mui-palette-neutral-950)',
          position: 'sticky',
          right: 0,
          top: 0,
          zIndex: 'var(--MainNav-zIndex)',
          mx: 0,
          borderRadius: 0,
          backdropFilter: 'blur(10px)',
          padding: 0,
          borderBottom: '1px solid var(--mui-palette-divider)',
        }}
      >
        <Container maxWidth="xxl" sx={{ minHeight: 'var(--MainNav-height)', py: pxToRem(8) }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
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
                  <IconButton onClick={onToggle}>
                    <Iconify icon="material-symbols:menu-rounded" color={'var(--mui-palette-neutral-400)'} />
                  </IconButton>
                )}
                <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
                  <Logo height={40} width={120} />
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
                <UserButton />
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: 'var(--mui-palette-warning-700)' }}
                  onClick={handleOpen}
                >
                  Sign in
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
          <Typography color="text.secondary" variant="body2" sx={{ my: 1 }}>
            Don&#39;t have an account?{' '}
            <Typography
              component={'span'}
              variant="body2"
              onClick={handleRedirect}
              sx={{ cursor: 'pointer', color: 'var(--mui-palette-primary-main)' }}
            >
              Sign up
            </Typography>
          </Typography>
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
          color: 'var(--mui-palette-neutral-400)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: pxToRem(8),
          textAlign: 'left',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--mui-palette-action-disabledBackground)',
            color: 'var(--mui-action-disabled)',
            cursor: 'not-allowed',
          }),
          ...(active && { color: 'text.primary' }),
          '&:hover': {
            ...(!disabled && !active && { bgcolor: 'none', color: 'text.primary' }),
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
