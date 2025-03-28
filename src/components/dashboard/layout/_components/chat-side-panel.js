import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Iconify } from '/src/components/iconify/iconify';
import { ChatDrawer } from './chat-drawer';

export const ChatSidePanel = ({ open, onClose, onToggle }) => {
  
    return (
      <React.Fragment>
        <Tooltip title="Chat">
          <Iconify
            onClick={onToggle}
            icon="material-symbols:chat-outline"
            width={20}
            style={{ 
              color: 'var(--mui-palette-neutral-400)', 
              cursor: 'pointer',
              ...(open && {
                color: 'var(--mui-palette-primary-main)',
                transform: 'scale(1.1)'
              })
            }}
          />
        </Tooltip>
        <ChatDrawer
          onClose={onClose}
          open={open}
        />
      </React.Fragment>
    );
  };