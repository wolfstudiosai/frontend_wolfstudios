"use client";

import { Stack } from "@mui/material";
import { useContext } from "react";
import { Conversation } from "../dms/_components/conversation";
import { ThreadConversation } from "../dms/_components/thread-conversation";
import { UserProfile } from "../dms/_components/user-profile";
import { ChannelList } from "./components/channel-list";
import { ChatContext } from "/src/contexts/chat";

const ChannelView = () => {
    const { activeThread, activeProfile } = useContext(ChatContext);

    return (
        <Stack direction='row' sx={{ height: 'calc(100vh - 100px)', mt: '6px', border: '1px solid', borderColor: 'divider', borderRadius: 1, width: '100%', }}>
            <ChannelList />
            <Conversation page="channel" />
            {activeThread && <ThreadConversation />}
            {activeProfile && <UserProfile />}
        </Stack>
    );
};

export default ChannelView;