'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ForgotPasswordForm } from '@/app/auth/_components/FogotPasswordForm';
import { LoginForm } from '@/app/auth/_components/LoginForm';
import { SignupForm } from '@/app/auth/_components/SignupForm';
import { Dropdown } from '@/components/core/dropdown/dropdown';
import { DropdownPopover } from '@/components/core/dropdown/dropdown-popover';
import { DropdownTrigger } from '@/components/core/dropdown/dropdown-trigger';
import { Logo } from '@/components/core/logo';
import { Iconify } from '@/components/iconify/iconify';
// import { RightPanel } from '../rightPanel/right-panel';
// import { MobileNav } from './mobile-nav';
// import { NavSearch } from './nav-search';
import { MobileNav } from '@/components/navbar/mobile-nav';
import { NavSearch } from '@/components/navbar/nav-search';
import { RightPanel } from '@/components/rightPanel/right-panel';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { dashboardPublicNavData } from '@/router';
import { clearUserSessionFromLocalStore } from '@/utils/axios-api.helpers';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MenuIcon } from 'lucide-react';

import { paths } from '@/paths';

const LOGIN = 'Login';
const SIGNUP = 'Signup';
const FORGOT_PASSWORD = 'Forgot password';

export const DashboardTopNav = ({ onToggle }) => {
  const [openNav, setOpenNav] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(LOGIN);
  const [openRightPanel, setOpenRightPanel] = React.useState(false);
  const pathname = usePathname();

  const handleRedirectLogin = () => {
    setOpenForm(LOGIN);
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
          top: 10,
          zIndex: 'var(--MainNav-zIndex)',
          mx: 2,
          borderRadius: 4,
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
                <IconButton onClick={onToggle} color="#333">
                  <Iconify icon="material-symbols:menu-rounded" color="#333" />
                </IconButton>
                {dashboardPublicNavData.map((section, index) =>
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
                <Typography
                  component="span"
                  sx={{
                    color: 'var(--mui-palette-warning-700)',
                    '&:hover': { color: 'var(--mui-palette-common-dark)' },
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    lineHeight: '28px',
                    cursor: 'pointer',
                  }}
                  onClick={() => clearUserSessionFromLocalStore(true)}
                >
                  Logout
                </Typography>
              </Stack>
            </Box>
            <Box component={RouterLink} href={paths.public.portfolio} sx={{ display: 'inline-flex' }}>
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
      <RightPanel open={openRightPanel} onClose={() => setOpenRightPanel(false)} heading={openForm}>
        {openForm === LOGIN && (
          <>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
              Don&apos;t have an account?{' '}
              <Typography
                component="span"
                onClick={() => setOpenForm(SIGNUP)}
                sx={{ cursor: 'pointer', color: 'var(--mui-palette-primary-main)' }}
              >
                Sign up
              </Typography>
            </Typography>
            <LoginForm />
            <Box sx={{ mt: 1 }}>
              <Typography
                component="span"
                onClick={() => setOpenForm(FORGOT_PASSWORD)}
                sx={{ cursor: 'pointer', color: 'var(--mui-palette-primary-main)' }}
              >
                Forgot password?
              </Typography>
            </Box>
          </>
        )}
        {openForm === SIGNUP && (
          <>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
              Already have an account?{' '}
              <Typography
                component="span"
                onClick={() => setOpenForm(LOGIN)}
                sx={{ cursor: 'pointer', color: 'var(--mui-palette-primary-main)' }}
              >
                Sign in
              </Typography>
            </Typography>
            <SignupForm redirect={handleRedirectLogin} />
          </>
        )}
        {openForm === FORGOT_PASSWORD && (
          <>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
              Remember the passoword?{' '}
              <Typography
                component="span"
                onClick={() => setOpenForm(LOGIN)}
                sx={{ cursor: 'pointer', color: 'var(--mui-palette-primary-main)' }}
              >
                Sign in
              </Typography>
            </Typography>
            <ForgotPasswordForm redirect={handleRedirectLogin} />
          </>
        )}
      </RightPanel>
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
          {/* <Iconify width={14} icon={icon} /> */}
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
