'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Popover } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';

import { paths } from '/src/paths';
import { isNavItemActive } from '/src/lib/is-nav-item-active';
import { SettingsContext } from '/src/contexts/settings';
import useAuth from '/src/hooks/useAuth';
import SocialLogin from '/src/components/common/social-login';
import { Dropdown } from '/src/components/core/dropdown/dropdown';
import { DropdownPopover } from '/src/components/core/dropdown/dropdown-popover';
import { DropdownTrigger } from '/src/components/core/dropdown/dropdown-trigger';
import { Logo } from '/src/components/core/logo';
import { Iconify } from '/src/components/iconify/iconify';
import { NavSearch } from '/src/components/navbar/nav-search';

import { ChatSidePanel } from '../dashboard/layout/_components/chat-side-panel';
import { NotificationPopover } from '../dashboard/layout/_components/notificaiton-popover';
import { SettingsGear } from '../dashboard/layout/_components/settings-gear';
import { UserInfoPopover } from '../dashboard/layout/_components/user-info-popover';
import { MobileSideNav } from './mobile-side-nav';
import { LoginForm } from '/src/app/auth/_components/LoginForm';
import { publicRoutes } from '/src/router';
import { pxToRem } from '/src/utils/helper';
import Link from 'next/link';

export const MainNavV2 = ({ onToggle, onFeatureCardVisible }) => {
  const {
    customSettings: { setOpenSubNav },
  } = React.useContext(SettingsContext);
  const [openNav, setOpenNav] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [routes, setRoutes] = React.useState(publicRoutes);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const router = useRouter();

  const { isLogin } = useAuth();
  const pathname = usePathname();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const handleRedirect = (path) => {
    router.push(paths.auth.default.sign_in);
    handleClose();
    handleCloseAuth();
  };

  //mobile nav
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const handleOpenAuth = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAuth = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const updatedRoutes = publicRoutes.map((group) => ({
      ...group,
      items: group.items
        .filter((item) => (isLogin && item.key !== 'portfolio') || (!isLogin && item.key !== 'content'))
        .map((item) => {
          const auth = localStorage.getItem('auth');
          if (auth) {
            const data = JSON.parse(auth);
            setIsAdmin(data.role === 'ADMIN' || data.role === 'SUPER_ADMIN');
          }
          const requiresAdmin = ['campaign', 'production', 'content'].includes(item.key);
          const disabled = requiresAdmin ? !isAdmin || !isLogin : false;
          return { ...item, disabled };
        }),
    }));
    setRoutes(updatedRoutes);
  }, [isLogin, isAdmin]);

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          color: 'var(--mui-palette-neutral-950)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--MainNav-zIndex)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container sx={{ paddingX: '10px !important' }} maxWidth="xxl">
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Menu icon */}
            <Box
              component="nav"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {isLogin && (
                <Stack direction="row" sx={{ alignItems: 'center' }}>
                  {/* Mobile */}
                  <Box
                    component="button"
                    onClick={toggleMobileNav}
                    sx={{
                      display: {
                        xs: 'inline-flex',
                        lg: 'none',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <Iconify icon="material-symbols:menu-rounded" color="text.primary" />
                  </Box>

                  {/* Desktop */}
                  <Box
                    component="button"
                    color="inherit"
                    aria-label="open mobile menu"
                    onClick={onToggle}
                    sx={{
                      display: {
                        xs: 'none',
                        lg: 'inline-flex',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <Iconify icon="material-symbols:menu-rounded" color="text.primary" />
                  </Box>
                  {/* feature card button */}
                  <Box
                    component="button"
                    onClick={() =>
                      onFeatureCardVisible((prev) => {
                        setOpenSubNav(!prev);
                        return !prev;
                      })
                    }
                    sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
                  >
                    <Iconify
                      icon="icon-park-outline:down"
                      width={20}
                      style={{ color: 'var(--mui-palette-neutral-400)' }}
                    />
                  </Box>
                </Stack>
              )}
              {/* logo */}
              <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
                <Logo height={40} width={120} />
              </Box>
              {/* nav items */}
              <Stack
                component="ul"
                direction="row"
                spacing={1}
                sx={{ display: { xs: 'none', md: 'flex' }, listStyle: 'none', m: 0, p: 0 }}
              >
                {routes.map((section) =>
                  section.items.map((item, index) => (
                    <NavItem
                      key={index}
                      href={item.href}
                      pathname={pathname}
                      item={item}
                      title={item.title}
                      icon={item.icon}
                      disabled={item.disabled}
                    />
                  ))
                )}
              </Stack>
            </Box>

            {/* Right Section: Search, Notifications, Sign In/UserButton, setting gear */}
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                flex: 1,
                justifyContent: 'flex-end',
                gap: 2,
              }}
            >
              {/* Search */}
              <Box
                sx={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  minWidth: pxToRem(150),
                  display: { xs: 'none', lg: 'inline-flex' },
                }}
              >
                <NavSearch />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  '@media (max-width: 376px)': {
                    display: 'none',
                  },
                }}
              >
                {/* Settings */}
                <SettingsGear />
                {/* Chat sidebar */}
                {isLogin && (
                  <ChatSidePanel open={chatOpen} onClose={() => setChatOpen(false)} onToggle={handleChatToggle} />
                )}
                {/* Notifications */}
                {isLogin ? (
                  <React.Fragment>
                    <NotificationPopover />
                  </React.Fragment>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ backgroundColor: 'var(--mui-palette-warning-700)', flexShrink: 0 }}
                    onClick={handleOpen}
                  >
                    Sign in
                  </Button>
                )}
              </Box>
              {/* user popover */}
              {isLogin && <UserInfoPopover />}
            </Stack>
          </Stack>
        </Container>
      </Box>
      {/* Mobile Navigation */}
      <MobileSideNav
        open={mobileNavOpen}
        onClose={toggleMobileNav}
        routes={routes}
        isLogin={isLogin}
        pathname={pathname}
        handleOpenAuth={handleOpenAuth}
      />
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        // onClose={handleClose}
        onClose={handleCloseAuth}
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
            backgroundColor: 'var(--mui-palette-background-default)',
          }}
        >
          <LoginForm onLoginSuccess={handleCloseAuth} />
          <Typography color="text.secondary" variant="body2" sx={{ my: 1 }}>
            Don&#39;t have an account?{' '}
            <Typography
              as={Link}
              href={paths.auth.default.sign_up}
              variant="body2"
              sx={{ cursor: 'pointer', color: 'var(--mui-palette-primary-main)' }}
            >
              Sign up
            </Typography>
          </Typography>

          <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
            <SocialLogin provider="facebook" type="LOGIN" style={{ paddingY: '10px' }}>
              <Iconify icon="logos:facebook" />
            </SocialLogin>
            <SocialLogin provider="google" type="LOGIN" style={{ paddingY: '10px' }}>
              <Iconify icon="devicon:google" />
            </SocialLogin>
          </Stack>
        </Box>
      </Popover>{' '}
    </React.Fragment>
  );
};

export function NavItem({ item, disabled, external, href, matcher, pathname, title }) {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const hasPopover = Boolean(item.items);

  const element = (
    <Box
      component="li"
      sx={{ userSelect: 'none', ...(active && { borderBottom: '2px solid var(--mui-palette-primary-main)' }) }}
    >
      <Box
        {...(hasPopover
          ? {
            onClick: (event) => {
              if (disabled) {
                event.preventDefault();
                return;
              }
            },
            role: 'button',
          }
          : {
            ...(href && !disabled
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
            color: 'var(--mui-palette-neutral-400)',
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
