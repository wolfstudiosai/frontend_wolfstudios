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
import { useContext, useEffect, useState } from "react";
import useAuth from '/src/hooks/useAuth';
import { chatApi } from "../../utils/api";
import { ChatContext } from "/src/contexts/chat";

export default function SidebarChatProfiles({ isOpen }) {
    const { userInfo, isLogin } = useAuth();
    const [directChannels, setDirectChannels] = useState([]);
    const router = useRouter();
    const { setActiveTab } = useContext(ChatContext);

    const getDirectChannel = async () => {
        try {
            const workspace = userInfo?.workspaces.find((workspace) => workspace.slug === "chat");
            const response = await chatApi.get(`/workspaces/${workspace.id}`);
            setDirectChannels(response?.data?.data?.DirectChannels);
        } catch (error) {
            console.log(error);
        }
    }

    const getStatusColor = (status) => {
        return status === "ONLINE" ? "#4caf50" : "#9e9e9e"
    }

    const handleDirectChannel = (channel) => {
        setActiveTab({ type: 'direct', id: channel.id });
        router.push(`/workspace/chat`);
    }

    useEffect(() => {
        if (isLogin) {
            getDirectChannel();
        }
    }, [isLogin]);

    return (
        <>
            {directChannels?.length > 0 ? (
                <List
                    dense
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isOpen ? 0 : 0.5,
                        minHeight: 200,
                        overflowY: 'auto',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}>
                    {directChannels.map((channel, index) => {
                        const user = channel?.Sender?.id === userInfo?.id ? channel?.Receiver : channel?.Sender;
                        const lastMessage = channel?.DirectMessages?.at(-1);
                        return (
                            <ListItem
                                key={index}
                                title={user.firstName + " " + user.lastName}
                                onClick={() => handleDirectChannel(channel)}
                                sx={{
                                    p: isOpen ? 0.5 : 1,
                                    gap: isOpen ? 1 : 0,
                                    borderRadius: 1,
                                    justifyContent: isOpen ? "flex-start" : "center",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            >
                                <ListItemAvatar>
                                    <Badge
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
                                            <Avatar src={user.profileImage} alt={user.firstName + " " + user.lastName} sx={{ width: isOpen ? 30 : 25, height: isOpen ? 30 : 25 }} />
                                            <Circle
                                                sx={{
                                                    position: "absolute",
                                                    bottom: isOpen ? 0 : -2,
                                                    right: 0,
                                                    width: 8,
                                                    height: 8,
                                                    color: getStatusColor(user.chatStatus),
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
                                                        fontWeight: 500,
                                                        color: "text.primary",
                                                    }}
                                                >
                                                    {user.firstName} {user.lastName}
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
                                                    }}
                                                >
                                                    {lastMessage?.senderId === userInfo?.id ? 'You: ' : ''}
                                                    {lastMessage?.deletedAt ? (
                                                        <span style={{ color: 'gray', fontStyle: 'italic' }}>This message was deleted</span>
                                                    ) : (
                                                        lastMessage?.content
                                                    )}
                                                </Typography>
                                            }
                                            sx={{ ml: 1 }}
                                        />
                                    )}
                                </Collapse>
                            </ListItem>
                        )
                    })}
                </List>
            ) : (
                <></>
            )}
        </>
    )
}
