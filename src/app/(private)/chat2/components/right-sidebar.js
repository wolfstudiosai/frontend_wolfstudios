"use client";

import {
    Avatar,
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
    Typography
} from "@mui/material";
import { useState } from "react";
import { CountChip, MemberInfo, MemberItem, MemberName, MemberRole, ScrollableContent } from "./custom-component";
import { Iconify } from "/src/components/iconify/iconify";

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "16px",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
}))

const InfoItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(0.5, 0),
    "& .MuiListItemIcon-root": {
        minWidth: "36px",
    },
}))

const InfoValue = styled(Typography)(({ theme }) => ({
    marginLeft: "auto",
    color: "#666",
}))

const StatusChip = styled(Chip)(({ theme }) => ({
    backgroundColor: "#e6f4e6",
    color: "#4a9d4a",
    marginLeft: "auto",
    fontSize: "12px",
    height: "24px",
}))

const ThreadItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(0.5, 0),
    "& .MuiListItemIcon-root": {
        minWidth: "36px",
    },
}))

const ActivityContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "2px",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
}))

const ActivityDot = styled(Box, {
    shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
    width: "8px",
    height: "8px",
    borderRadius: 2,
    backgroundColor: active ? "#4a9d4a" : "#e9e9e9",
}))

const RoleChip = styled(Chip, {
    shouldForwardProp: (prop) => prop !== "role",
})(({ role }) => {
    const colors = {
        Design: { bg: "#e9f0e9", color: "#4a9d4a" },
        Management: { bg: "#f0e9e9", color: "#9d4a4a" },
        Development: { bg: "#e9e9f0", color: "#4a4a9d" },
    }

    return {
        backgroundColor: colors[role]?.bg || "#e9e9e9",
        color: colors[role]?.color || "#666",
        marginLeft: "auto",
        fontSize: "12px",
        height: "24px",
    }
})

export const RightSidebar = () => {
    const [tabValue, setTabValue] = useState(0)

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    // Activity data - true for active, false for inactive
    const activityData = [
        false,
        true,
        true,
        false,
        false,
        true,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]

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

    return (
        <Stack direction='column' sx={{ width: '25%', height: 'calc(100vh - 102px)', overfolow: 'hidden', px: 2, py: 1 }}>
            <Box
                sx={{
                    position: "sticky",
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
                            color: "var(--SideNav-color)",
                            transition: 'color 0.2s ease-in-out',
                            '& .MuiTab-iconWrapper': {
                                fontSize: '16px',
                                color: "var(--SideNav-color)",
                            },
                        },
                        '& .Mui-selected': {
                            fontWeight: 'bold',
                            color: 'var(--SideNav-color) !important',
                            '& .MuiTab-iconWrapper': {
                                color: "var(--SideNav-color)",
                            },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: "grey.800",
                            height: '2px',
                            borderRadius: 0,
                        },
                    }}
                >
                    <Tab label="Info" />
                    <Tab label="Pins" />
                    <Tab label="Files" />
                    <Tab label="Links" />
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
                                <InfoValue>Andrew M.</InfoValue>
                            </InfoItem>
                            <InfoItem>
                                <ListItemIcon>
                                    <Iconify icon="mdi:calendar" width="20" />
                                </ListItemIcon>
                                <ListItemText primary="Date of creation" />
                                <InfoValue>28 May</InfoValue>
                            </InfoItem>
                            <InfoItem>
                                <ListItemIcon>
                                    <Iconify icon="mdi:circle-outline" width="20" />
                                </ListItemIcon>
                                <ListItemText primary="Status" />
                                <StatusChip label="Active" size="small" />
                            </InfoItem>
                            <InfoItem>
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
                            </InfoItem>
                        </List>

                        <SectionTitle>Linked threads</SectionTitle>
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
                        </ActivityContainer>

                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <SectionTitle>
                                Members
                                <Typography component="span" color="text.secondary" sx={{ ml: 1, fontSize: "14px" }}>
                                    9
                                </Typography>
                            </SectionTitle>
                            <Stack direction='row'>
                                <Iconify icon="mdi:plus" width="20" style={{ marginRight: "8px" }} />
                                <Iconify icon="mdi:view-grid-outline" width="20" style={{ marginRight: "8px" }} />
                                <Iconify icon="mdi:format-list-bulleted" width="20" />
                            </Stack>
                        </Stack>
                        <List disablePadding>
                            {members.map((member, index) => (
                                <MemberItem key={index}>
                                    <Avatar src={member.avatar} alt={member.name} sx={{ width: 36, height: 36 }} />
                                    <MemberInfo>
                                        <MemberName>{member.name}</MemberName>
                                        {member.title && <MemberRole>{member.title}</MemberRole>}
                                    </MemberInfo>
                                    <RoleChip label={member.role} role={member.role} size="small" />
                                </MemberItem>
                            ))}
                        </List>
                    </>
                )}
            </ScrollableContent>
        </Stack>
    )
}