import { Box, Drawer, Stack } from '@mui/material';

export const DrawerContainer = ({ children, open, handleDrawerClose, actionButtons }) => {
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
          mt: 5.5,
          mb: 5,
          borderRadius: 1,
          height: '100%',
          maxHeight: 'calc(100vh - 75px)',
        },
        '& .MuiBackdrop-root': {
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0))',
          boxShadow: '0px 0px 60px 25px rgba(255, 255, 255, 0.5)',
        },
       
      }}
    >
      <Box
        sx={{
          width: '70vw',
          height: '100%',
          p: 1,
           position: "relative"
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
            backgroundColor: 'var(--mui-palette-background-default)',
            py: 1,
          }}
        >
          {actionButtons}
        </Stack>
      )}
      </Box>
      
    </Drawer>
  );
};
