'use client';

import { useContext, useState } from 'react';
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

import { ChatContext } from '/src/contexts/chat';
import useAuth from '/src/hooks/useAuth';
import { AvatarWithActiveStatus } from '/src/components/core/avatar-with-active-status';
import { Iconify } from '/src/components/iconify/iconify';

import { AddMemberToChannel } from './add-member-to-channel';
import { MemberInfo, MemberItem, MemberName, ScrollableContent } from './custom-component';
import PinMessage from './pin-message';

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '16px',
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const InfoItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
  '& .MuiListItemIcon-root': {
    minWidth: '36px',
  },
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  marginLeft: 'auto',
  color: '#666',
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#e6f4e6',
  color: '#4a9d4a',
  marginLeft: 'auto',
  fontSize: '12px',
  height: '24px',
}));

const ThreadItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
  '& .MuiListItemIcon-root': {
    minWidth: '36px',
  },
}));

const ActivityContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '2px',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ActivityDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
  width: '8px',
  height: '8px',
  borderRadius: 2,
  backgroundColor: active ? '#4a9d4a' : '#e9e9e9',
}));

const RoleChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'role',
})(({ role }) => {
  const colors = {
    Design: { bg: '#e9f0e9', color: '#4a9d4a' },
    Management: { bg: '#f0e9e9', color: '#9d4a4a' },
    Development: { bg: '#e9e9f0', color: '#4a4a9d' },
  };

  return {
    backgroundColor: colors[role]?.bg || '#e9e9e9',
    color: colors[role]?.color || '#666',
    marginLeft: 'auto',
    fontSize: '12px',
    height: '24px',
  };
});

export const RightSidebar = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);

  const { activeTabInfo, activeTab } = useContext(ChatContext);
  const { userInfo } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Activity data - true for active, false for inactive
  // const activityData = [
  //   false,
  //   true,
  //   true,
  //   false,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  // ];

  return (
    <>
      <Stack direction="column" sx={{ width: '25%', height: 'calc(100vh - 102px)', overfolow: 'hidden', px: 2, py: 1 }}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              minHeight: '40px',
              borderBottom: '1px solid',
              borderColor: 'divider',
              '& .MuiTab-root': {
                minHeight: '40px',
                padding: '8px',
                fontSize: '0.75rem',
                color: 'var(--SideNav-color)',
                transition: 'color 0.2s ease-in-out',
                '& .MuiTab-iconWrapper': {
                  fontSize: '16px',
                  color: 'var(--SideNav-color)',
                },
              },
              '& .Mui-selected': {
                fontWeight: 'bold',
                color: 'var(--SideNav-color) !important',
                '& .MuiTab-iconWrapper': {
                  color: 'var(--SideNav-color)',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'grey.800',
                height: '2px',
                borderRadius: 0,
              },
            }}
          >
            <Tab label="Info" />
            <Tab label="Pins" />
            {/* <Tab label="Files" /> */}
            {/* <Tab label="Links" /> */}
          </Tabs>
        </Box>

        <ScrollableContent>
          {tabValue === 0 && (
            <>
              <SectionTitle>Main info</SectionTitle>
              <List disablePadding>
                <InfoItem>
                  <ListItemIcon>
                    <Iconify icon="mdi:account" width="20" />
                  </ListItemIcon>
                  <ListItemText primary="Creator" />
                  <InfoValue>
                    {activeTab?.type === 'channel'
                      ? `${activeTabInfo?.createdBy?.firstName} ${activeTabInfo?.createdBy?.lastName}`
                      : (() => {
                          if (activeTabInfo?.sender?.id === userInfo?.id) {
                            return `${activeTabInfo?.receiver?.firstName} ${activeTabInfo?.receiver?.lastName}`;
                          }
                          return `${activeTabInfo?.sender?.firstName} ${activeTabInfo?.sender?.lastName}`;
                        })()}
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <ListItemIcon>
                    <Iconify icon="mdi:calendar" width="20" />
                  </ListItemIcon>
                  <ListItemText primary="Date of creation" />
                  <InfoValue>{dayjs(activeTabInfo?.createdAt).format('DD MMM YYYY')}</InfoValue>
                </InfoItem>
                {/* <InfoItem>
                <ListItemIcon>
                  <Iconify icon="mdi:circle-outline" width="20" />
                </ListItemIcon>
                <ListItemText primary="Status" />
                <StatusChip label="Active" size="small" />
              </InfoItem> */}
                {/* <InfoItem>
                <ListItemIcon>
                  <Iconify icon="mdi:tag-outline" width="20" />
                </ListItemIcon>
                <ListItemText primary="Tags" />
                <CountChip label="13 >" size="small" />
              </InfoItem>
              <InfoItem>
                <ListItemIcon>
                  <Iconify icon="mdi:check-circle-outline" width="20" />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
                <CountChip label="4 >" size="small" />
              </InfoItem> */}
              </List>

              {/* <SectionTitle>Linked threads</SectionTitle>
                        <List disablePadding>
                            <ThreadItem>
                                <ListItemIcon>
                                    <Iconify icon="mdi:pound" width="20" />
                                </ListItemIcon>
                                <ListItemText primary="Front-end" />
                                <CountChip label="4" size="small" />
                            </ThreadItem>
                            <ThreadItem>
                                <ListItemIcon>
                                    <Iconify icon="mdi:pound" width="20" />
                                </ListItemIcon>
                                <ListItemText primary="UI-kit design standards" />
                            </ThreadItem>
                        </List>

                        <SectionTitle>Thread activity</SectionTitle>
                        <ActivityContainer>
                            {activityData.map((active, index) => (
                                <ActivityDot key={index} active={active} />
                            ))}
                        </ActivityContainer> */}

              {activeTab?.type === 'channel' && (
                <>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <SectionTitle>
                      Members
                      <Typography component="span" color="text.secondary" sx={{ ml: 1, fontSize: '14px' }}>
                        {activeTabInfo?.members?.length}
                      </Typography>
                    </SectionTitle>
                    <Stack direction="row">
                      <Iconify
                        icon="mdi:plus"
                        width="20"
                        style={{ marginRight: '8px', cursor: 'pointer' }}
                        onClick={() => setOpenAddMemberDialog(true)}
                      />
                      {/* <Iconify icon="mdi:view-grid-outline" width="20" style={{ marginRight: '8px' }} /> */}
                      {/* <Iconify icon="mdi:format-list-bulleted" width="20" /> */}
                    </Stack>
                  </Stack>
                  <List disablePadding>
                    {activeTabInfo?.members?.map((member, index) => (
                      <MemberItem key={index}>
                        <AvatarWithActiveStatus
                          src={member?.User?.profileImage}
                          alt={member?.User?.firstName}
                          sx={{ width: 36, height: 36 }}
                          status={member?.User?.chatStatus === 'ONLINE'}
                        />

                        <MemberInfo>
                          <MemberName>
                            {member?.User?.firstName} {member?.User?.lastName}
                          </MemberName>
                        </MemberInfo>
                        <RoleChip label={member?.role} role={member?.role} size="small" />
                      </MemberItem>
                    ))}
                  </List>
                </>
              )}
            </>
          )}
          {tabValue === 1 && <PinMessage />}
        </ScrollableContent>
      </Stack>
      {openAddMemberDialog && (
        <AddMemberToChannel open={openAddMemberDialog} onClose={() => setOpenAddMemberDialog(false)} />
      )}
    </>
  );
};
