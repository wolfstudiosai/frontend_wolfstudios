"use client"

import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Badge,
    Typography,
    Box,
    Collapse,
} from "@mui/material"
import { Circle } from "@mui/icons-material"
import { useRouter } from "next/navigation";

const data = [
    {
        name: "John Doe",
        image: "/placeholder.svg?height=40&width=40",
        status: "Online",
        unreadMessage: 2,
        lastMessage: "Hello, how are you?",
    },
    {
        name: "Jane Smith",
        image: "/placeholder.svg?height=40&width=40",
        status: "Offline",
        unreadMessage: 5,
        lastMessage: "See you tomorrow!",
    },
    {
        name: "Mike Johnson",
        image: "/placeholder.svg?height=40&width=40",
        status: "Online",
        unreadMessage: 1,
        lastMessage: "Thanks for the help",
    },
    {
        name: "Emily Davis",
        image: "/placeholder.svg?height=40&width=40",
        status: "Online",
        unreadMessage: 3,
        lastMessage: "Got it, thanks!",
    },
    {
        name: "Robert Brown",
        image: "/placeholder.svg?height=40&width=40",
        status: "Away",
        unreadMessage: 0,
        lastMessage: "I'll be right back.",
    },
    {
        name: "Olivia Wilson",
        image: "/placeholder.svg?height=40&width=40",
        status: "Offline",
        unreadMessage: 7,
        lastMessage: "Don't forget our meeting.",
    },
    {
        name: "David Miller",
        image: "/placeholder.svg?height=40&width=40",
        status: "Online",
        unreadMessage: 4,
        lastMessage: "Can you review this?",
    },
    {
        name: "Sophia Martinez",
        image: "/placeholder.svg?height=40&width=40",
        status: "Online",
        unreadMessage: 0,
        lastMessage: "Talk soon!",
    },
];

export default function SidebarChatProfiles({ isOpen }) {
    const router = useRouter();
    const getStatusColor = (status) => {
        return status === "Online" ? "#4caf50" : "#9e9e9e"
    }

    return (
        <>
            {data?.length > 0 ? (
                <List sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isOpen ? 0 : 0.5,
                    minHeight: 240,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}>
                    {data.map((user, index) => (
                        <ListItem
                            key={index}
                            title={user.name}
                            onClick={() => router.push(`/workspace/chat`)}
                            sx={{
                                px: 1,
                                py: 1.5,
                                borderRadius: 1,
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "action.hover",
                                },
                            }}
                        >
                            <ListItemAvatar>
                                <Badge
                                    badgeContent={user.unreadMessage}
                                    color="error"
                                    invisible={user.unreadMessage === 0}
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            fontSize: "0.75rem",
                                            minWidth: "18px",
                                            height: "18px",
                                        },
                                    }}
                                >
                                    <Box sx={{ position: "relative" }}>
                                        <Avatar src={user.image} alt={user.name} sx={{ width: isOpen ? 30 : 25, height: isOpen ? 30 : 25 }} />
                                        <Circle
                                            sx={{
                                                position: "absolute",
                                                bottom: isOpen ? 0 : -2,
                                                right: 0,
                                                width: 8,
                                                height: 8,
                                                color: getStatusColor(user.status),
                                                backgroundColor: "white",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    </Box>
                                </Badge>
                            </ListItemAvatar>

                            <Collapse in={isOpen} orientation="horizontal">
                                {isOpen && (
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: user.unreadMessage > 0 ? 600 : 400,
                                                    color: "text.primary",
                                                }}
                                            >
                                                {user.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "text.secondary",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "200px",
                                                    fontWeight: user.unreadMessage > 0 ? 500 : 400,
                                                }}
                                            >
                                                {user.lastMessage}
                                            </Typography>
                                        }
                                        sx={{ ml: 1 }}
                                    />
                                )}
                            </Collapse>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <></>
            )}
        </>
    )
}
