import { Stack } from "@mui/material";
import { useContext } from "react";
import { UserProfile } from "../dms/_components/user-profile";
import { ActivityConversation } from "./_components/activity-conversation";
import { ThreadList } from "./_components/thread-list";
import { ChatContext } from "/src/contexts/chat";

export const ActivityView = () => {
    const { activeProfile } = useContext(ChatContext);

    return (
        <Stack direction='row' sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, width: '100%', }}>
            <ThreadList />
            <ActivityConversation />
            {activeProfile && <UserProfile />}
        </Stack>
    )
}