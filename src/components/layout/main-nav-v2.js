'use client';

import { Button, Drawer, Popover, useMediaQuery, useTheme } from '@mui/material';
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

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { ChatSidePanel } from '../dashboard/layout/_components/chat-side-panel';
import { NotificationPopover } from '../dashboard/layout/_components/notificaiton-popover';
import { SettingsGear } from '../dashboard/layout/_components/settings-gear';
import { UserInfoPopover } from '../dashboard/layout/_components/user-info-popover';

export const MainNavV2 = ({ onToggle, onFeatureCardVisible }) => {
  const { customSettings: { setOpenSubNav } } = React.useContext(SettingsContext);
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
      items: group.items.filter(
        (item) =>
          (isLogin && item.key !== "portfolio") ||
          (!isLogin && item.key !== "content")
      ).map((item) => {
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
              alignItems: 'center'
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
              <Stack component="ul" direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' }, listStyle: 'none', m: 0, p: 0 }}>
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
              <Box
                sx={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  minWidth: pxToRem(150),
                  display: { xs: 'none', md: 'flex' }
                }}
              >
                <NavSearchV2 />
              </Box>

              {/* Mobile Nav Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open mobile menu"
                edge="end"
                onClick={toggleMobileNav}
                sx={{ display: { md: 'none' }, color: 'var(--mui-palette-neutral-400)' }}
              >
                {mobileNavOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Box sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                '@media (max-width: 376px)': {
                  display: 'none'
                }
              }}>
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
              {isLogin && (
              <UserInfoPopover />
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
      {/* Mobile Navigation */}
      <MobileNavV2
        open={mobileNavOpen}
        onClose={toggleMobileNav}
        routes={routes}
        isLogin={isLogin}
        pathname={pathname}
        handleOpenAuth={handleOpenAuth}
      />

      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
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
    <Box component="li" sx={{ userSelect: 'none', ...(active && { borderBottom: '2px solid var(--mui-palette-primary-main)' }) }}>
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

// Mobile Navigation Component
const MobileNavV2 = ({ open, onClose, routes, isLogin, pathname, handleOpenAuth }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          p: 2,
          bgcolor: 'var(--mui-palette-background-default)',
          borderLeft: '1px solid var(--mui-palette-divider)'
        },
      }}
    >
      <Stack gap={2}>
        {/* Navigation Items */}
        {routes.map((section) =>
          section.items.map((item, index) => (
            <NavItem
              key={index}
              href={item.href}
              pathname={pathname}
              item={item}
              title={item.title}
              icon={item.icon}
              mobile
            />
          ))
        )}

        {/* Sign In Option */}
        {!isLogin && (
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: 'var(--mui-palette-warning-700)' }}
            onClick={handleOpenAuth}
          >
            Sign in
          </Button>
        )}
      </Stack>
    </Drawer>
  );
};