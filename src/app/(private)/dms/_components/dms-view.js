"use client";

import { Stack } from "@mui/material";
import { useContext } from "react";
import { Conversation } from "./conversation";
import { ThreadConversation } from "./thread-conversation";
import { UserList } from "./user-list";
import { UserProfile } from "./user-profile";
import { ChatContext } from "/src/contexts/chat";

export const DMsView = () => {
    const { activeThread, activeProfile } = useContext(ChatContext);

    return (
        <Stack direction='row' sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, width: '100%', }}>
            <UserList />
            <Conversation />
            {activeThread && <ThreadConversation />}
            {activeProfile && <UserProfile />}
        </Stack>
    )
}