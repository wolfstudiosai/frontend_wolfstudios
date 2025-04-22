import { Button, Drawer, Stack, useTheme } from "@mui/material";
import { NavItem } from "./main-nav-v2";

export const MobileSideNav = ({ open, onClose, routes, isLogin, pathname, handleOpenAuth }) => {
    // const theme = useTheme();
    // const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          // display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            p: 2,
            bgcolor: 'var(--mui-palette-background-default)',
            borderLeft: '1px solid var(--mui-palette-divider)',
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