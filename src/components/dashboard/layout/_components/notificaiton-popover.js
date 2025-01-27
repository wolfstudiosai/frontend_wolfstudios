import React from 'react';
import { Iconify } from '@/components/iconify/iconify';
import { pxToRem } from '@/utils/utils';
import {
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';

export const NotificationPopover = () => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const notifications = [
    { id: 1, message: 'You have a new message from John Doe', timestamp: '5 mins ago' },
    { id: 2, message: 'Your profile was viewed 10 times today', timestamp: '1 hour ago' },
    { id: 3, message: 'System update scheduled for 3:00 PM', timestamp: 'Yesterday' },
  ];

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <Box
        component="button"
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
      >
        <Tooltip title="Notifications">
          <Badge color="primary" variant="dot">
            <Iconify icon="clarity:notification-line" width={20} style={{ color: 'var(--mui-palette-neutral-400)' }} />
          </Badge>
        </Tooltip>
      </Box>
      <Popover
        anchorEl={menuAnchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={handleMenuClose}
        open={Boolean(menuAnchorEl)}
        slotProps={{ paper: { sx: { width: '280px' } } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Notifications
          </Typography>
          {notifications.length === 0 ? (
            <Typography color="text.secondary" variant="body2">
              No new notifications
            </Typography>
          ) : (
            <List sx={{ p: 0 }}>
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  sx={{ alignItems: 'flex-start', cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                  onClick={handleMenuClose}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      style: { fontSize: pxToRem(14), whiteSpace: 'normal', fontWeight: 500 },
                    }}
                    primary={notification.message}
                    secondary={
                      <Typography component="span" color="text.secondary" variant="caption">
                        {notification.timestamp}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <MenuItem component="div" onClick={handleMenuClose} sx={{ justifyContent: 'center' }}>
            All notifications
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};
