import { Stack } from "@mui/material";
import { useContext } from "react";
import { Content } from "./components/content";
import { LeftSidebar } from "./components/left-sidebar";
import { RepliesSection } from "./components/replies-section";
import { RightSidebar } from "./components/right-sidebar";
import { ChatContext } from "/src/contexts/chat";

export const ChatView = () => {
    const { replies } = useContext(ChatContext)
    return (
        <Stack direction='row' sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, width: '100%', }}>
            <LeftSidebar />
            <Content />
            {
                replies ? <RepliesSection /> : <RightSidebar />
            }
        </Stack>
    )
}