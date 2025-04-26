import { useContext, useRef, useState } from 'react';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ChatContext } from '/src/contexts/chat';
import useAuth from '/src/hooks/useAuth';
import { AvatarWithActiveStatus } from '/src/components/core/avatar-with-active-status';
import { Iconify } from '/src/components/iconify/iconify';

import { AddMemberToWorkspace } from './add-member-to-workspace';
import { CreateChannelDialog } from './create-channel-dialog';
import { CountChip, MemberInfo, MemberItem, MemberName, MemberRole, ScrollableContent } from './custom-component';
import { UserListPopover } from './user-list-popover';

// Update the SidebarHeader to be sticky
const SidebarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  justifyContent: 'space-between',
  position: 'sticky',
  top: 0,
  zIndex: 10,
}));

// Update the SectionHeader to be sticky
const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  position: 'sticky',
  top: 0,
  zIndex: 5,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  fontWeight: 500,
  color: '#666',
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  borderRadius: 4,
  margin: '2px 8px',
  padding: '4px 8px',
  backgroundColor: active ? '#e9e9e9' : 'transparent',
  '&.Mui-selected': {
    backgroundColor: active ? '#e9e9e9' : 'transparent',
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 36,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  margin: 0,
  '& .MuiTypography-root': {
    fontSize: 14,
  },
}));

const TagChip = styled(Chip)(({ theme }) => ({
  height: 18,
  fontSize: 10,
  backgroundColor: '#e0c3fc',
  color: '#8e44ad',
  marginLeft: theme.spacing(1),
}));

export const LeftSidebar = () => {
  const { notifications, workspaceInfo, channels, directChannels, setActiveTab, activeTab } = useContext(ChatContext);
  const { userInfo } = useAuth();
  const [openCreateChannelDialog, setOpenCreateChannelDialog] = useState(false);
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);
  const [openUserList, setOpenUserList] = useState(false);

  const anchorRef = useRef(null);

  const [openSections, setOpenSections] = useState({
    favorites: true,
    channels: true,
    directMessages: true,
  });

  const handleToggle = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  return (
    <>
      <Stack
        direction="column"
        gap={1}
        sx={{ width: '25%', height: '100%', px: 1, py: 2, borderRight: '1px solid', borderColor: 'divider' }}
      >
        <Stack direction="column" sx={{ height: 'calc(100vh - 126px)', overfolow: 'hidden' }}>
          <SidebarHeader>
            <Typography variant="h6" fontWeight={600}>
              {workspaceInfo.name}
            </Typography>
            <IconButton size="small" title="Add member" onClick={() => setOpenAddMemberDialog(true)}>
              <Iconify icon="mdi:plus" />
            </IconButton>
          </SidebarHeader>
          <ScrollableContent>
            <List dense disablePadding>
              {[
                {
                  label: 'AI Assistant',
                  icon: 'mingcute:ai-line',
                  count: 0,
                  tag: 'COMING SOON',
                },
              ].map((item, index) => (
                <ListItem key={index} disablePadding>
                  <StyledListItemButton>
                    <StyledListItemIcon>
                      <Iconify icon={item.icon} />
                    </StyledListItemIcon>
                    <StyledListItemText primary={item.label} />
                    {item.tag && <TagChip label={item.tag} size="small" />}
                    {item.count > 0 && <CountChip label={item.count} size="small" />}
                  </StyledListItemButton>
                </ListItem>
              ))}
            </List>

            {/* <SectionHeader>
              <SectionTitle>Favorites</SectionTitle>
              <IconButton size="small" onClick={() => handleToggle('favorites')}>
                {openSections.favorites ? <Iconify icon="mdi:chevron-up" /> : <Iconify icon="mdi:chevron-down" />}
              </IconButton>
            </SectionHeader> */}

            {/* <Collapse in={openSections.favorites} timeout="auto" unmountOnExit>
              <List dense disablePadding>
                {[
                  {
                    label: 'Sophia Wilson',
                    icon: 'mdi:account',
                    count: 2,
                    tag: null,
                  },
                  {
                    label: 'Front-end',
                    icon: 'mdi:pound',
                    count: 4,
                    tag: null,
                  },
                ].map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <StyledListItemButton>
                      <StyledListItemIcon>
                        <Iconify icon={item.icon} />
                      </StyledListItemIcon>
                      <StyledListItemText primary={item.label} />
                      {item.tag && <TagChip label={item.tag} size="small" />}
                      {item.count > 0 && <CountChip label={item.count} size="small" />}
                    </StyledListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse> */}

            <SectionHeader>
              <SectionTitle>Channels</SectionTitle>
              <Box display="flex">
                <IconButton size="small" onClick={() => setOpenCreateChannelDialog(true)}>
                  <Iconify icon="mdi:plus" />
                </IconButton>
                <IconButton size="small" onClick={() => handleToggle('channels')}>
                  {openSections.channels ? <Iconify icon="mdi:chevron-up" /> : <Iconify icon="mdi:chevron-down" />}
                </IconButton>
              </Box>
            </SectionHeader>

            <Collapse in={openSections.channels} timeout="auto" unmountOnExit>
              <List dense disablePadding>
                {[
                  ...channels.map((channel) => ({
                    id: channel.id,
                    label: channel.name,
                    icon: channel.type === 'PUBLIC' ? 'mdi:pound' : 'mdi:lock-outline',
                    count: notifications?.[channel.id] || 0,
                    tag: null,
                  })),
                ].map((item, index) => (
                  <ListItem key={index} disablePadding onClick={() => setActiveTab({ type: 'channel', id: item.id })}>
                    <StyledListItemButton active={item.id === activeTab?.id}>
                      <StyledListItemIcon>
                        <Iconify icon={item.icon} />
                      </StyledListItemIcon>
                      <StyledListItemText primary={item.label} />
                      {item.tag && <TagChip label={item.tag} size="small" />}
                      {item.count > 0 && <CountChip label={item.count} size="small" />}
                    </StyledListItemButton>
                  </ListItem>
                ))}

                {/* <ListItem disablePadding>
                  <StyledListItemButton>
                    <StyledListItemIcon>
                      <Iconify icon="mdi:pound" />
                    </StyledListItemIcon>
                    <StyledListItemText primary="v2.0 - actual version" />
                  </StyledListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <StyledListItemButton>
                    <StyledListItemIcon>
                      <Iconify icon="mdi:lightbulb-outline" />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Strategy" />
                  </StyledListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <StyledListItemButton>
                    <StyledListItemIcon>
                      <Iconify icon="mdi:calendar" color="#f44336" />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Events" />
                  </StyledListItemButton>
                </ListItem> */}
              </List>
            </Collapse>

            <SectionHeader>
              <SectionTitle>Direct Messages</SectionTitle>
              <Box display="flex">
                <IconButton size="small" ref={anchorRef} onClick={() => setOpenUserList(true)}>
                  <Iconify icon="mdi:plus" />
                </IconButton>
                <IconButton size="small" onClick={() => handleToggle('directMessages')}>
                  {openSections.directMessages ? (
                    <Iconify icon="mdi:chevron-up" />
                  ) : (
                    <Iconify icon="mdi:chevron-down" />
                  )}
                </IconButton>
              </Box>
            </SectionHeader>

            <Collapse in={openSections.directMessages} timeout="auto" unmountOnExit>
              <List disablePadding sx={{ pl: 1.8 }}>
                {directChannels?.map((channel, index) => {
                  const user = channel?.Sender?.id === userInfo?.id ? channel?.Receiver : channel?.Sender;
                  const lastMessage = channel?.DirectMessages?.at(-1);
                  return (
                    <MemberItem
                      key={index}
                      onClick={() => setActiveTab({ type: 'direct', id: channel?.id })}
                      active={channel?.id === activeTab?.id}
                    >
                      {/* Set actual user status */}
                      <AvatarWithActiveStatus
                        src={user?.profileImage}
                        alt={user?.firstName}
                        status={user?.chatStatus === 'ONLINE'}
                        sx={{ width: 36, height: 36 }}
                      />

                      <MemberInfo>
                        <MemberName>
                          {user?.firstName} {user?.lastName}
                        </MemberName>
                        <MemberRole>
                          {lastMessage?.senderId === userInfo?.id ? 'You: ' : ''}
                          {lastMessage?.content}
                        </MemberRole>
                      </MemberInfo>
                      {notifications?.[channel.id] ? (
                        <CountChip label={notifications?.[channel.id]} size="small" />
                      ) : (
                        <></>
                      )}
                    </MemberItem>
                  );
                })}
              </List>
            </Collapse>
          </ScrollableContent>
        </Stack>
      </Stack>
      {openCreateChannelDialog && (
        <CreateChannelDialog open={openCreateChannelDialog} onClose={() => setOpenCreateChannelDialog(false)} />
      )}
      {openAddMemberDialog && (
        <AddMemberToWorkspace open={openAddMemberDialog} onClose={() => setOpenAddMemberDialog(false)} />
      )}
      <UserListPopover
        open={openUserList}
        onClose={() => setOpenUserList(false)}
        anchorRef={anchorRef}
        title="Direct Messages"
      />
    </>
  );
};
