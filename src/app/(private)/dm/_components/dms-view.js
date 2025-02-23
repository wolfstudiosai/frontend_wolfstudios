"use client";

import { Stack } from "@mui/material";
import { useMessageToolbar } from "../_lib/use-message-toolbar";
import { Conversation } from "./conversation";
import { ThreadConversation } from "./thread-conversation";
import { UserList } from "./user-list";

export const DMsView = () => {
    const { showThreadConversation, openThreadConversation, closeThreadConversation } = useMessageToolbar();

    return (
        <Stack direction='row' sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, width: '100%', }}>
            <UserList />
            <Conversation showThreadConversation={showThreadConversation} openThreadConversation={openThreadConversation} />
            {showThreadConversation && <ThreadConversation closeThreadConversation={closeThreadConversation} />}
        </Stack>
    )
}