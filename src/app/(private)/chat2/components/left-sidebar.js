import { Avatar, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { devNull } from "os";
import { useState } from "react";
import { CreateChannelDialog } from "./create-channel-dialog";
import { CountChip, MemberInfo, MemberItem, MemberName, MemberRole, ScrollableContent } from "./custom-component";
import { Iconify } from "/src/components/iconify/iconify";


// Members data
const members = [
    { name: "Daniel Anderson", role: "Design", avatar: "/placeholder.svg?height=40&width=40" },
    {
        name: "Andrew Miller",
        role: "Management",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Product owner",
    },
    { name: "William Johnson", role: "Design", avatar: "/placeholder.svg?height=40&width=40", title: "UX/UI designer" },
    { name: "Emily Davis", role: "Development", avatar: "/placeholder.svg?height=40&width=40", title: "Frontend dev" },
]

// Update the SidebarHeader to be sticky
const SidebarHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 10,
}))

// Update the SectionHeader to be sticky
const SectionHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
    position: "sticky",
    top: 0,
    zIndex: 5,
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: 13,
    fontWeight: 500,
    color: "#666",
}))

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: 4,
    margin: "2px 8px",
    padding: "4px 8px",
    "&.Mui-selected": {
        backgroundColor: "#e9e9e9",
    },
}))

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    minWidth: 36,
}))

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    margin: 0,
    "& .MuiTypography-root": {
        fontSize: 14,
    },
}))

const TagChip = styled(Chip)(({ theme }) => ({
    height: 18,
    fontSize: 10,
    backgroundColor: "#e0c3fc",
    color: "#8e44ad",
    marginLeft: theme.spacing(1),
}));

export const LeftSidebar = () => {
    const [openCreateChannelDialog, setOpenCreateChannelDialog] = useState(false);

    const [openSections, setOpenSections] = useState({
        favorites: true,
        channels: true,
        directMessages: true,
    })

    const handleToggle = (section) => {
        setOpenSections({
            ...openSections,
            [section]: !openSections[section],
        })
    }

    return (
        <>
            <Stack direction='column' gap={1} sx={{ width: '25%', height: '100%', px: 1, py: 2, borderRight: '1px solid', borderColor: 'divider' }}>

                <Stack direction='column' sx={{ height: 'calc(100vh - 126px)', overfolow: 'hidden' }}>
                    <SidebarHeader>
                        <Typography variant="h6" fontWeight={600}>
                            Conceptzilla
                        </Typography>
                        <IconButton size="small">
                            <Iconify icon="mdi:magnify" />
                        </IconButton>
                    </SidebarHeader>
                    <ScrollableContent>
                        <List dense disablePadding>
                            {
                                [
                                    {
                                        label: 'Assistant',
                                        icon: 'mingcute:ai-line',
                                        count: 0,
                                        tag: 'NEW'
                                    },
                                    {
                                        label: 'Drafts',
                                        icon: 'mdi:file-document-outline',
                                        count: 0,
                                        tag: devNull
                                    },
                                    {
                                        label: 'Saved items',
                                        icon: 'mdi:bookmark-outline',
                                        count: 0,
                                        tag: null
                                    },
                                    {
                                        label: 'Inbox',
                                        icon: 'mynaui:envelope',
                                        count: 8,
                                        tag: null
                                    },
                                    {
                                        label: 'Direct messages',
                                        icon: 'flowbite:message-dots-outline',
                                        count: 1,
                                        tag: null
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
                                ))
                            }
                        </List>

                        <SectionHeader>
                            <SectionTitle>Favorites</SectionTitle>
                            <IconButton size="small" onClick={() => handleToggle("favorites")}>
                                {openSections.favorites ? <Iconify icon="mdi:chevron-up" /> : <Iconify icon="mdi:chevron-down" />}
                            </IconButton>
                        </SectionHeader>

                        <Collapse in={openSections.favorites} timeout="auto" unmountOnExit>
                            <List dense disablePadding>
                                {
                                    [
                                        {
                                            label: 'Sophia Wilson',
                                            icon: 'mdi:account',
                                            count: 2,
                                            tag: null
                                        },
                                        {
                                            label: 'Front-end',
                                            icon: 'mdi:pound',
                                            count: 4,
                                            tag: null
                                        }
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
                                    ))
                                }
                            </List>
                        </Collapse>

                        <SectionHeader>
                            <SectionTitle>Channels</SectionTitle>
                            <Box display="flex">
                                <IconButton size="small" onClick={() => setOpenCreateChannelDialog(true)}>
                                    <Iconify icon="mdi:plus" />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleToggle("channels")}>
                                    {openSections.channels ? <Iconify icon="mdi:chevron-up" /> : <Iconify icon="mdi:chevron-down" />}
                                </IconButton>
                            </Box>
                        </SectionHeader>

                        <Collapse in={openSections.channels} timeout="auto" unmountOnExit>
                            <List dense disablePadding>
                                {
                                    [
                                        {
                                            label: 'General',
                                            icon: 'mdi:fire',
                                            count: 1,
                                            tag: null
                                        },
                                        {
                                            label: 'Front-end',
                                            icon: 'mdi:pound',
                                            count: 4,
                                            tag: null
                                        }
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
                                    ))
                                }

                                <ListItem disablePadding>
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
                                </ListItem>
                            </List>
                        </Collapse>

                        <SectionHeader>
                            <SectionTitle>Direct Messages</SectionTitle>
                            <Box display="flex">
                                <IconButton size="small" onClick={() => handleToggle("directMessages")}>
                                    {openSections.directMessages ? <Iconify icon="mdi:chevron-up" /> : <Iconify icon="mdi:chevron-down" />}
                                </IconButton>
                            </Box>
                        </SectionHeader>

                        <Collapse in={openSections.directMessages} timeout="auto" unmountOnExit>
                            <List disablePadding sx={{ pl: 1.8 }}>
                                {members.map((member, index) => (
                                    <MemberItem key={index}>
                                        <Avatar src={member.avatar} alt={member.name} sx={{ width: 36, height: 36 }} />
                                        <MemberInfo>
                                            <MemberName>{member.name}</MemberName>
                                            {member.title && <MemberRole>{member.title}</MemberRole>}
                                        </MemberInfo>
                                    </MemberItem>
                                ))}
                            </List>
                        </Collapse>
                    </ScrollableContent>
                </Stack>
            </Stack>
            {
                openCreateChannelDialog && (
                    <CreateChannelDialog
                        open={openCreateChannelDialog}
                        onClose={() => setOpenCreateChannelDialog(false)}
                    />
                )
            }
        </>
    )
}