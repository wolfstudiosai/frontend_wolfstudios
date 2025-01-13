'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { LockKey as LockKeyIcon } from '@phosphor-icons/react/dist/ssr/LockKey';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { UserCircle as UserCircleIcon } from '@phosphor-icons/react/dist/ssr/UserCircle';
import { UsersThree as UsersThreeIcon } from '@phosphor-icons/react/dist/ssr/UsersThree';

import { paths } from '/src/paths';
import { isNavItemActive } from '/src/lib/is-nav-item-active';
import useAuth from '/src/hooks/useAuth';

// NOTE: First level elements are groups.

const navItems = [
  {
    key: 'personal',
    title: 'Personal',
    items: [
      { key: 'account', title: 'Account', href: paths.dashboard.settings.account, icon: 'user-circle' },
      { key: 'security', title: 'Security', href: paths.dashboard.security, icon: 'lock-key' },
      // { key: 'notifications', title: 'Notifications', href: paths.dashboard.settings.notifications, icon: 'bell' },
    ],
  },
  {
    key: 'organization',
    title: 'Organization',
    items: [
      { key: 'billing', title: 'Billing & plans', href: paths.dashboard.settings.billing, icon: 'credit-card' },
      { key: 'team', title: 'Team', href: paths.dashboard.settings.team, icon: 'users-three' },
      {
        key: 'integrations',
        title: 'Integrations',
        href: paths.dashboard.settings.integrations,
        icon: 'plugs-connected',
      },
    ],
  },
];

const icons = {
  'credit-card': CreditCardIcon,
  'lock-key': LockKeyIcon,
  'plugs-connected': PlugsConnectedIcon,
  'user-circle': UserCircleIcon,
  'users-three': UsersThreeIcon,
  bell: BellIcon,
};

export function   SideNav() {
  const pathname = usePathname();
  const { userInfo } = useAuth();

  return (
    <div>
      <Stack
        spacing={3}
        sx={{
          flex: '0 0 auto',
          flexDirection: { xs: 'column-reverse', md: 'column' },
          position: { md: 'sticky' },
          top: '64px',
          width: { xs: '100%', md: '240px' },
        }}
      >
        <Stack component="ul" spacing={3} sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {navItems.map((group) => (
            <Stack component="li" key={group.key} spacing={2}>
              {group.title ? (
                <div>
                  <Typography color="text.secondary" variant="caption">
                    {group.title}
                  </Typography>
                </div>
              ) : null}
              <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {group.items.map((item) => (
                  <NavItem {...item} key={item.key} pathname={pathname} />
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
        
      </Stack>
    </div>
  );
}

function NavItem({ disabled, external, href, icon, pathname, title }) {
  const active = isNavItemActive({ disabled, external, href, pathname });
  const Icon = icon ? icons[icon] : null;

  return (
    <Box component="li" sx={{ userSelect: 'none' }}>
      <Box
        {...(href
          ? {
            component: external ? 'a' : RouterLink,
            href,
            target: external ? '_blank' : undefined,
            rel: external ? 'noreferrer' : undefined,
          }
          : { role: 'button' })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--mui-palette-text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && { color: 'var(--mui-palette-text-disabled)', cursor: 'not-allowed' }),
          ...(active && { bgcolor: 'var(--mui-palette-action-selected)', color: 'var(--mui-palette-text-primary)' }),
          '&:hover': {
            ...(!active &&
              !disabled && { bgcolor: 'var(--mui-palette-action-hover)', color: 'var(---mui-palette-text-primary)' }),
          },
        }}
        tabIndex={0}
      >
        {Icon ? (
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
            <Icon
              fill={active ? 'var(--mui-palette-text-primary)' : 'var(--mui-palette-text-secondary)'}
              fontSize="var(--icon-fontSize-md)"
              weight={active ? 'fill' : undefined}
            />
          </Box>
        ) : null}
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
