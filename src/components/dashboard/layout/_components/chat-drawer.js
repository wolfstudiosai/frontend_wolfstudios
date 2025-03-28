import React from 'react';
import { UserList } from '/src/app/(private)/dms/_components/user-list';
import { Box, Typography } from '@mui/material';
import { DrawerContainer } from '/src/components/drawer/drawer';

export function ChatDrawer({ open, onClose }) {


    const actionButtons = (
      <>
        {/* <Button variant="contained" onClick={onUpdate}>Save</Button>
        <Button variant="outlined" onClick={onReset}>Reset</Button> */}
      </>
    );
  
    return (
      <DrawerContainer 
        open={open} 
        handleDrawerClose={onClose} 
        actionButtons={actionButtons}
        width='20vw'
        anchor="right"  // Open from right side
      >
        <Box>
          <Typography variant="h6">Chat Conversations</Typography>
            <UserList sx={{ width: '100%',border:'none' }}/>
        </Box>
      </DrawerContainer>
    );
  }
