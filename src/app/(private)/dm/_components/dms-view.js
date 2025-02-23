"use client";

import { Stack } from "@mui/material";
import { useContext } from "react";
import { ChatContext } from "../context";
import { Conversation } from "./conversation";
import { ThreadConversation } from "./thread-conversation";
import { UserList } from "./user-list";

export const DMsView = () => {
    const { activeThread } = useContext(ChatContext);

    return (
        <Stack direction='row' sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, width: '100%', }}>
            <UserList />
            <Conversation />
            {activeThread && <ThreadConversation />}
        </Stack>
    )
}