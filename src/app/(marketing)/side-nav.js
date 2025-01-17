'use client';

import * as React from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemText } from '@mui/material';

export function PublicSideNav({ color, items }) {
  const drawerWidth = '280px';
  const bgColor = color || 'gray';

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: bgColor,
          //        bgcolor: 'var(--SideNav-background)',
          //        borderRight: 'var(--SideNav-border)',
          //        color: 'var(--SideNav-color)',
          zIndex: 'var(--SideNav-zIndex)',
          top: '74px',
          height: '89vh',
          overflowY: 'scroll',
        },
      }}
      variant="persistent"
      anchor="left"
      open={true} // For now, always open, can be controlled by state
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '16px',
        }}
      >
        {/* Sidebar Content */}
        <List>
          {items.map((item) => (
            <ListItem button key={item.href}>
              {' '}
              {/* Use a unique identifier like item.href */}
              <ListItemText
                primary={item.title}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Divider (optional) */}
        <Divider sx={{ backgroundColor: 'white' }} />
      </Box>
    </Drawer>
  );
}
// export function SideNav({ color = 'evident', items = [] }) {
//   const pathname = usePathname();
//   const { userInfo } = useAuth();

//   const { colorScheme = 'light' } = useColorScheme();

//   const logoColors = {
//     dark: { blend_in: 'light', discrete: 'light', evident: 'light' },
//     light: { blend_in: 'dark', discrete: 'dark', evident: 'light' },
//   };

//   const styles = navColorStyles[colorScheme][color];
//   const logoColor = logoColors[colorScheme][color];

//   return (
//     <>
//     {isNavOpen && (
//     <Box
//       sx={{
//         ...styles,
//         bgcolor: 'var(--SideNav-background)',
//         borderRight: 'var(--SideNav-border)',
//         color: 'var(--SideNav-color)',
//         display: { xs: 'none', lg: 'flex' },
//         flexDirection: 'column',
//         height: '100%',
//         left: 0,
//         position: 'fixed',
//         top: 0,
//         width: 'var(--SideNav-width)',
//         zIndex: 'var(--SideNav-zIndex)',
//       }}
//     >
//       <Stack spacing={2} sx={{ p: 2 }}>
//         <div>
//           <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
//             <DynamicLogo color={logoColor} height={32} width={122} isDashboard={true} />
//           </Box>
//         </div>
//         {/* <WorkspacesSwitch /> */}
//       </Stack>
//       <Box
//         component="nav"
//         sx={{
//           flex: '1 1 auto',
//           overflowY: 'auto',
//           p: 2,
//           scrollbarWidth: 'none',
//           '&::-webkit-scrollbar': { display: 'none' },
//         }}
//       >
//         {renderNavGroups({ items, pathname, userInfo })}
//       </Box>
//     </Box>
//     )}
//     </>
//   );
// }

// function renderNavGroups({ items, pathname, userInfo }) {
//     const role = userInfo.role.toLowerCase();
//     const filteredGroups = items
//       .map((section) => {
//         // Filter items within each section based on the user's role
//         const validItems = section.items.filter((item) => !item.allowedRoles || item.allowedRoles.includes(role));

//         // Return a new section object with only valid items
//         return validItems.length > 0 ? { ...section, items: validItems } : null;
//       })
//       .filter(Boolean);
//     const children = filteredGroups.reduce((acc, curr) => {
//       acc.push(
//         <Stack component="li" key={curr.key} spacing={1.5}>
//           {curr.title ? (
//             <div>
//               <Typography sx={{ color: 'var(--NavGroup-title-color)', fontSize: '0.875rem', fontWeight: 500 }}>
//                 {curr.title}
//               </Typography>
//             </div>
//           ) : null}
//           <div>{renderNavItems({ depth: 0, items: curr.items, pathname })}</div>
//         </Stack>
//       );

//       return acc;
//     }, []);

//     return (
//       <Stack component="ul" spacing={2} sx={{ listStyle: 'none', m: 0, p: 0 }}>
//         {children}
//       </Stack>
//     );
//   }

//   function renderNavItems({ depth = 0, items = [], pathname }) {
//     const children = items.reduce((acc, curr) => {
//       const { items: childItems, key, ...item } = curr;

//       const forceOpen = childItems
//         ? Boolean(childItems.find((childItem) => childItem.href && pathname.startsWith(childItem.href)))
//         : false;

//       acc.push(
//         <NavItem depth={depth} forceOpen={forceOpen} key={key} pathname={pathname} {...item}>
//           {childItems ? renderNavItems({ depth: depth + 1, pathname, items: childItems }) : null}
//         </NavItem>
//       );

//       return acc;
//     }, []);

//     return (
//       <Stack component="ul" data-depth={depth} spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
//         {children}
//       </Stack>
//     );
//   }

//   function NavItem({
//     children,
//     depth,
//     disabled,
//     external,
//     forceOpen = false,
//     href,
//     icon,
//     label,
//     matcher,
//     pathname,
//     title,
//   }) {
//     const [open, setOpen] = React.useState(forceOpen);
//     const active = isNavItemActive({ disabled, external, href, matcher, pathname });
//     const ExpandIcon = open ? CaretDownIcon : CaretRightIcon;
//     const isBranch = children && !href;
//     const showChildren = Boolean(children && open);

//     return (
//       <Box component="li" data-depth={depth} sx={{ userSelect: 'none' }}>
//         <Box
//           {...(isBranch
//             ? {
//                 onClick: () => {
//                   setOpen(!open);
//                 },
//                 onKeyUp: (event) => {
//                   if (event.key === 'Enter' || event.key === ' ') {
//                     setOpen(!open);
//                   }
//                 },
//                 role: 'button',
//               }
//             : {
//                 ...(href
//                   ? {
//                       component: external ? 'a' : RouterLink,
//                       href,
//                       target: external ? '_blank' : undefined,
//                       rel: external ? 'noreferrer' : undefined,
//                     }
//                   : { role: 'button' }),
//               })}
//           sx={{
//             alignItems: 'center',
//             borderRadius: 1,
//             color: 'var(--NavItem-color)',
//             cursor: 'pointer',
//             display: 'flex',
//             flex: '0 0 auto',
//             gap: 1,
//             p: '6px 16px',
//             position: 'relative',
//             textDecoration: 'none',
//             whiteSpace: 'nowrap',
//             ...(disabled && {
//               bgcolor: 'var(--NavItem-disabled-background)',
//               color: 'var(--NavItem-disabled-color)',
//               cursor: 'not-allowed',
//             }),
//             ...(active && {
//               bgcolor: 'var(--NavItem-active-background)',
//               color: 'var(--NavItem-active-color)',
//               ...(depth > 0 && {
//                 '&::before': {
//                   bgcolor: 'var(--NavItem-children-indicator)',
//                   borderRadius: '2px',
//                   content: '" "',
//                   height: '20px',
//                   left: '-14px',
//                   position: 'absolute',
//                   width: '3px',
//                 },
//               }),
//             }),
//             ...(open && { color: 'var(--NavItem-open-color)' }),
//             '&:hover': {
//               ...(!disabled &&
//                 !active && { bgcolor: 'var(--NavItem-hover-background)', color: 'var(--NavItem-hover-color)' }),
//             },
//           }}
//           tabIndex={0}
//         >
//           <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
//             {icon ? (
//               <Iconify
//                 icon={icon}
//                 color={active ? 'var(--NavItem-hover-color)' : 'var(--NavItem-icon-color)'}
//                 sx={{ fontSize: 'var(--icon-fontSize-sm)' }}
//               />
//             ) : null}
//           </Box>
//           <Box sx={{ flex: '1 1 auto' }}>
//             <Typography
//               component="span"
//               sx={{
//                 color: 'inherit',
//                 fontSize: '0.875rem',
//                 fontWeight: 500,
//                 lineHeight: '28px',
//               }}
//             >
//               {title}
//             </Typography>
//           </Box>
//           {label ? <Chip color="primary" label={label} size="small" /> : null}
//           {external ? (
//             <Box sx={{ alignItems: 'center', display: 'flex', flex: '0 0 auto' }}>
//               <ArrowSquareOutIcon color="var(--NavItem-icon-color)" fontSize="var(--icon-fontSize-sm)" />
//             </Box>
//           ) : null}
//           {isBranch ? (
//             <Box sx={{ alignItems: 'center', display: 'flex', flex: '0 0 auto' }}>
//               <ExpandIcon color="var(--NavItem-expand-color)" fontSize="var(--icon-fontSize-sm)" />
//             </Box>
//           ) : null}
//         </Box>
//         {showChildren ? (
//           <Box sx={{ pl: '24px' }}>
//             <Box sx={{ borderLeft: '1px solid var(--NavItem-children-border)', pl: '12px' }}>{children}</Box>
//           </Box>
//         ) : null}
//       </Box>
//     );
//   }
