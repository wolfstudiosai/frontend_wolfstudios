import { Box, Drawer } from '@mui/material';

export const DrawerContainer = ({ children, open, handleDrawerClose }) => {
    const handleStopPropagation = (e) => {
        e.stopPropagation(); 
        handleDrawerClose(); 
      };
  return (
    <Drawer
      open={open}
      onClose={handleStopPropagation}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          mt: 4,
          mb: 4,
          borderRadius: 1,
          height: '100%',
          maxHeight: 'calc(100vh - 64px)',
        },
        '& .MuiBackdrop-root': {
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0))',
          boxShadow: '0px 0px 60px 25px rgba(255, 255, 255, 0.5)',
        },
      }}
    >
      <Box
        sx={{
          width: '75vw',
          height: '100%',
          p: 1
        }}
      >
        {children}
      </Box>
    </Drawer>
  );
};
