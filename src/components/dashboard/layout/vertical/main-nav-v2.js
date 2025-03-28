'use client';

import { Button, Popover } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import RouterLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { LoginForm } from '/src/app/auth/_components/LoginForm';
import { Dropdown } from '/src/components/core/dropdown/dropdown';
import { DropdownPopover } from '/src/components/core/dropdown/dropdown-popover';
import { DropdownTrigger } from '/src/components/core/dropdown/dropdown-trigger';
import { Logo } from '/src/components/core/logo';
import { Iconify } from '/src/components/iconify/iconify';
import { MobileNav } from '/src/components/navbar/mobile-nav';
import { NavSearchV2 } from '/src/components/navbar/nav-search-v2';
import { SettingsContext } from '/src/contexts/settings';
import { isNavItemActive } from '/src/lib/is-nav-item-active';
import { publicRoutes } from '/src/router';
import { pxToRem } from '/src/utils/helper';

import useAuth from '/src/hooks/useAuth';
import { paths } from '/src/paths';

import { NotificationPopover } from '../_components/notificaiton-popover';
import { SettingsGear } from '../_components/settings-gear';
import { UserInfoPopover } from '../_components/user-info-popover';
import { getAuthTokenFromLocalStore } from '/src/utils/axios-api.helpers';
import { ChatSidePanel } from '../_components/chat-side-panel';

export const MainNavV2 = ({ onToggle, onFeatureCardVisible }) => {
  const { customSettings: { setOpenSubNav } } = React.useContext(SettingsContext);
  const [openNav, setOpenNav] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [routes, setRoutes] = React.useState(publicRoutes);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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
  };

  React.useEffect(() => {
    
    const updatedRoutes = publicRoutes.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          (isLogin && item.key !== "portfolio") || 
          (!isLogin && item.key !== "content") 
      ),
  }));
  setRoutes(updatedRoutes);

  }, [isLogin]);

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
          // borderBottom: '1px solid var(--mui-palette-divider)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container maxWidth="xxl">
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--mui-palette-divider)'
            }}
          >
            {/* Left Section: Logo and Menu */}
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
                  <IconButton onClick={onToggle}>
                    <Iconify icon="material-symbols:menu-rounded" color={'var(--mui-palette-neutral-400)'} />
                  </IconButton>

                  <Box
                    component="button"
                    onClick={() => onFeatureCardVisible((prev) => {
                      setOpenSubNav(!prev)
                      return !prev
                    })}
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
              <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
                <Logo height={40} width={120} />
              </Box>
              <Stack component="ul" direction="row" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {routes.map((section) =>
                  section.items.map((item, index) => (
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
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  minWidth: pxToRem(150),
                }}
              >
                <NavSearchV2 />
              </Box>

              {/* <Iconify icon="ph:gear-light" width={20} style={{ color: 'var(--mui-palette-neutral-400)' }} /> */}
              <SettingsGear />
              {isLogin &&
                <ChatSidePanel 
                  open={chatOpen} 
                  onClose={() => setChatOpen(false)}
                  onToggle={handleChatToggle}
                />
              }
              {/* Notifications and User Actions */}
              {isLogin ? (
                <React.Fragment>
                  <NotificationPopover />
                  <UserInfoPopover />
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
            </Stack>
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
          <LoginForm onLoginSuccess={handleClose} />
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
    <Box component="li" sx={{ userSelect: 'none', ...(active && { borderBottom: '2px solid var(--mui-palette-primary-main)'}) }}>
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