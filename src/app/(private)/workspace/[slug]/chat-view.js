import { useContext, useEffect, useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Fab, Menu, MenuItem, Stack, useMediaQuery } from '@mui/material';

import { ChatContext } from '/src/contexts/chat';

import { CustomBreadcrumbs } from '../../../../components/custom-breadcumbs';
import { paths } from '../../../../paths';
import { Content } from './components/content';
import { LeftSidebar } from './components/left-sidebar';
import { RepliesSection } from './components/replies-section';
import { RightSidebar } from './components/right-sidebar';
import { ContentSkeleton } from './components/skeleton';

export const ChatView = ({ slug }) => {
  const { getWorkspace, activeTab, activeChannelThread, activeDirectThread, setActiveTab } = useContext(ChatContext);
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [mobilePanel, setMobilePanel] = useState('content'); // 'sidebar', 'content', 'right'
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const showReplies = activeChannelThread !== null || activeDirectThread !== null;

  useEffect(() => {
    if (slug) {
      getWorkspace(slug);
    }
    return () => {
      setActiveTab(null);
    };
  }, [slug]);

  // Reset to content when switching threads or tabs
  useEffect(() => {
    if (!isMobile) return;
    setMobilePanel('content');
  }, [activeTab, activeChannelThread, activeDirectThread, isMobile]);

  // Handlers for FAB menu
  const handleFabClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleMenuSelect = (panel) => {
    setMobilePanel(panel);
    setMenuAnchorEl(null);
  };

  if (isMobile) {
    return (
      <Box sx={{ position: 'relative', width: '100vw', height: '100vh', minHeight: '100vh', paddingTop: 40 }}>
        {mobilePanel === 'sidebar' && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 20,
            }}
          >
            <LeftSidebar isMobile={isMobile} />
            <Fab
              color="secondary"
              size="small"
              sx={{ position: 'fixed', top: 42, right: 16, zIndex: 30 }}
              onClick={() => setMobilePanel('content')}
              aria-label="Close sidebar"
            >
              <CloseIcon fontSize="small" />
            </Fab>
          </Box>
        )}
        {mobilePanel === 'content' && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 10,
            }}
          >
            {activeTab ? <Content isMobile={isMobile} /> : <ContentSkeleton isMobile={isMobile} />}
            <Fab
              color="secondary"
              size="small"
              sx={{ position: 'fixed', top: 45, right: 16, zIndex: 30 }}
              onClick={handleFabClick}
              aria-label="Open menu"
            >
              <MenuIcon fontSize="small" />
            </Fab>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  width: '60vw', // Responsive width for mobile
                  maxWidth: 280, // Prevents it from being too wide
                  mt: 1, // Margin top for spacing from the FAB
                  borderRadius: 2, // Rounded corners
                  boxShadow: 3, // Subtle shadow for elevation
                },
              }}
            >
              <MenuItem onClick={() => handleMenuSelect('sidebar')}>
                <ChatBubbleOutlineIcon sx={{ mr: 1, fontSize: 20 }} />
                Chat
              </MenuItem>
              <MenuItem onClick={() => handleMenuSelect('right')}>
                <InfoOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
                Info
              </MenuItem>
            </Menu>
          </Box>
        )}
        {mobilePanel === 'right' && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 20,
            }}
          >
            {showReplies ? <RepliesSection isMobile={isMobile} /> : <RightSidebar isMobile={isMobile} />}
            <Fab
              color="secondary"
              size="small"
              sx={{ position: 'fixed', top: 42, right: 16, zIndex: 30 }}
              onClick={() => setMobilePanel('content')}
              aria-label="Close right sidebar"
            >
              <CloseIcon fontSize="small" />
            </Fab>
          </Box>
        )}
      </Box>
    );
  }

  // Desktop layout
  return (
    <>
      <CustomBreadcrumbs
        items={[
          { title: 'Dashboard', href: paths.private.overview },
          { title: 'Chat', href: '' },
        ]}
      />
      <Stack direction="row" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, width: '100%', mt: 1 }}>
        <LeftSidebar isMobile={isMobile} />
        {activeTab ? <Content isMobile={isMobile} /> : <ContentSkeleton isMobile={isMobile} />}
        {showReplies ? <RepliesSection isMobile={isMobile} /> : <RightSidebar isMobile={isMobile} />}
      </Stack>
    </>
  );
};
