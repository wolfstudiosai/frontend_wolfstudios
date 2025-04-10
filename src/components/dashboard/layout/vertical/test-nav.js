"use client"

import {
    BarChart,
    ChevronRight,
    Description,
    HelpOutline,
    Home,
    Mail, Notifications,
    People,
    Settings
} from "@mui/icons-material"
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Tooltip,
    styled
} from "@mui/material"
import Link from "next/link"
import { useState } from "react"

const navItems = [
    {
        icon: <Home fontSize="small" />,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: <People fontSize="small" />,
        label: "Users",
        href: "/users",
        children: [
            { label: "All Users", href: "/users" },
            { label: "Add User", href: "/users/add" },
            { label: "User Groups", href: "/users/groups" },
        ],
    },
    {
        icon: <Description fontSize="small" />,
        label: "Documents",
        href: "/documents",
        children: [
            { label: "All Documents", href: "/documents" },
            { label: "Create Document", href: "/documents/create" },
            { label: "Archived", href: "/documents/archived" },
        ],
    },
    {
        icon: <Mail fontSize="small" />,
        label: "Messages",
        href: "/messages",
    },
    {
        icon: <Notifications fontSize="small" />,
        label: "Notifications",
        href: "/notifications",
    },
    {
        icon: <BarChart fontSize="small" />,
        label: "Analytics",
        href: "/analytics",
        children: [
            { label: "Overview", href: "/analytics" },
            { label: "Reports", href: "/analytics/reports" },
            { label: "Statistics", href: "/analytics/statistics" },
        ],
    },
    {
        icon: <Settings fontSize="small" />,
        label: "Settings",
        href: "/settings",
    },
    {
        icon: <HelpOutline fontSize="small" />,
        label: "Help",
        href: "/help",
    },
]

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    justifyContent: "center",
    padding: theme.spacing(1.25),
    minWidth: 0,
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}))

const NavItem = ({ item }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    return (
        <Box
            position="relative"
            sx={{
                // This makes the hover area include the popper
                '&:hover .child-popper': {
                    display: 'block',
                }
            }}
        >
            <Tooltip title={
                <Box display="flex" alignItems="center">
                    {item.label}
                    {item.children && <ChevronRight fontSize="small" sx={{ opacity: 0.6, ml: 0.5 }} />}
                </Box>
            } placement="right">
                <Link href={item.href} passHref legacyBehavior>
                    <StyledListItemButton
                        component="a"
                        onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
                    >
                        <ListItemIcon sx={{ minWidth: 0, color: "inherit" }}>
                            {item.icon}
                        </ListItemIcon>
                    </StyledListItemButton>
                </Link>
            </Tooltip>

            {item.children && (
                <Box
                    className="child-popper"
                    sx={{
                        display: open ? 'block' : 'none',
                        position: 'absolute',
                        left: '100%',
                        top: 0,
                        ml: 1,
                        zIndex: 1200,
                    }}
                    onMouseEnter={() => setAnchorEl(anchorEl)}
                    onMouseLeave={() => setAnchorEl(null)}
                >
                    <Paper elevation={3} sx={{ minWidth: 180 }}>
                        <List dense>
                            {item.children.map((child, index) => (
                                <Link key={index} href={child.href} passHref legacyBehavior>
                                    <ListItem disablePadding component="a">
                                        <ListItemButton sx={{ px: 2, py: 1 }}>
                                            <ListItemText primary={child.label} primaryTypographyProps={{ fontSize: 14 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Paper>
                </Box>
            )}
        </Box>
    )
}

export function MiniNavbar() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 48,
                height: "100vh",
                borderRight: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
                py: 2,
            }}
        >
            <List sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ width: "auto" }}>
                        <NavItem item={item} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}