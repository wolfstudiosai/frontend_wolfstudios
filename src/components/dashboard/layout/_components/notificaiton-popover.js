import React from 'react';
import {
  Badge,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';

import { Iconify } from '/src/components/iconify/iconify';
import { pxToRem } from '/src/utils/helper';
import PageLoader from '/src/components/loaders/PageLoader';
import { api } from '/src/utils/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const NotificationPopover = () => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [notificationsCount, setNotificationsCount] = React.useState(0);

  React.useEffect(() => {
    let isMounted = true;

    const getNotificationsCount = async () => {
      try {
        const response = await api.get('/notifications?type=POLL');
        if (isMounted) {
          setNotificationsCount(response.data.data.count);
        }
      } catch (error) {
        // console.error('Error fetching notifications:', error);
      }
    };

    getNotificationsCount();

    const interval = setInterval(getNotificationsCount, 60000); // 1 minute

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);


  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setNotificationsCount(0);
  };

  return (
    <>
      <Box
        component="button"
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
      >
        <Tooltip title="Notifications">
          <Badge color="primary" badgeContent={notificationsCount}>
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
        <Notifications handleMenuClose={handleMenuClose} setOpen={setOpen} />
      </Popover>

      {open && <NotificationSidebar open={open} onClose={() => setOpen(false)} />}
    </>
  );
};


// Notification
const NotificationItem = ({ notification }) => {
  return (
    <ListItem
      sx={{
        mb: 0.5,
        px: 1,
        py: 0.5,
        alignItems: 'flex-start',
        cursor: 'pointer',
        '&:hover': { backgroundColor: 'action.hover', transition: 'background-color 0.1s ease-in-out' },
        border: (theme) => `.5px solid ${theme.palette.divider}`,
      }}
    >
      <ListItemText
        primaryTypographyProps={{
          style: { fontSize: pxToRem(14), whiteSpace: 'normal', fontWeight: 500, lineHeight: '1.2' },
        }}

        primary={notification.message}
        secondary={
          <Typography component="span" color="text.secondary" variant="caption" sx={{ fontSize: pxToRem(11), lineHeight: '1.2' }}>
            {dayjs(notification.createdAt).fromNow()}
          </Typography>
        }
      />
    </ListItem>
  )
}


// Notifications Component
const Notifications = ({ handleMenuClose, setOpen }) => {
  const [loading, setLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState([]);

  const getNotifications = async () => {
    try {
      const response = await api.get('/notifications?type=FETCH&page=1&size=5');
      setNotifications(response.data.data.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAllNotifications = () => {
    setOpen(true);
    handleMenuClose();
  };

  React.useEffect(() => {
    getNotifications();
  }, []);

  return (
    <>
      <PageLoader loading={loading}>
        <Box sx={{ p: 1.5 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Notifications
          </Typography>
          {notifications?.length === 0 ? (
            <Typography color="text.secondary" variant="body2">
              No new notifications
            </Typography>
          ) : (
            <List sx={{ p: 0 }}>
              {notifications?.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </List>
          )}
        </Box>
        {notifications?.length > 0 && (
          <><Divider />
            <Box sx={{ p: 1 }}>
              <MenuItem component="div" onClick={handleAllNotifications} sx={{ justifyContent: 'center' }}>
                All notifications
              </MenuItem>
            </Box></>
        )}
      </PageLoader>
    </>
  )
}


// Notification Sidebar
const NotificationSidebar = ({ open, onClose }) => {
  const observerRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [isFetching, setIsFetching] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });

  const getNotifications = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const response = await api.get(`/notifications?type=FETCH&page=${pagination.pageNo}&size=${pagination.limit}`);
      setNotifications((prev) => [...prev, ...response.data.data.data]);
      setTotalRecords(response.data.data.count);

      // Check if all notifications are loaded
      if (notifications.length + response.data.data.data.length < response.data.data.count) {
        setPagination((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && notifications.length < totalRecords) {
        getNotifications();
      }
    }, { rootMargin: '100px' });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isFetching]);

  React.useEffect(() => {
    getNotifications();
  }, []);

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
      >
        <Box ref={observerRef} role='presentation' sx={{ width: '300px' }}>
          <PageLoader loading={loading}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Notifications
              </Typography>
              <Divider />
              <List sx={{ p: 0 }}>
                {notifications?.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}

                {isFetching && (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <CircularProgress size={15} />
                  </Box>
                )}
              </List>
            </Box>
          </PageLoader>
        </Box>
      </Drawer>
    </React.Fragment>
  )
}