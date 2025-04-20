import { Box, Drawer, Stack } from '@mui/material';

export const DrawerContainer = ({ children, open, handleDrawerClose, actionButtons, width = '70vw' }) => {
  const handleStopPropagation = (e) => {
    e.stopPropagation();
    handleDrawerClose();
  };
  return (
    <Drawer
      open={open}
      onClose={handleStopPropagation}
      anchor="right"
      BackdropProps={{ invisible: true }}
      sx={{
        '& .MuiDrawer-paper': {
          mt: 5.5,
          mb: 5,
          borderRadius: 1,
          height: '100%',
          maxHeight: 'calc(100vh - 76px)',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
        },
        '& .MuiBackdrop-root': {
          background: 'transparent',
        },
      }}
    >
      <Box
        sx={{
          width: { md: width, xs: '10vw' },
          height: '100%',
          p: 2,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'var(--mui-palette-background-default)',
        }}
      >
        {children}
        {actionButtons && (
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{
              position: 'sticky',
              bottom: 0,
              left: 0,
              backgroundColor: 'var(--mui-palette-background-paper)',
              py: 1,
              zIndex: 4,
            }}
          >
            {actionButtons}
          </Stack>
        )}
      </Box>
    </Drawer>
  );
};
