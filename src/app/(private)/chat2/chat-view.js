import { Stack } from "@mui/material";
import { Content } from "./components/content";
import { LeftSidebar } from "./components/left-sidebar";
import { RightSidebar } from "./components/right-sidebar";

export const ChatView = () => {

    return (
        <Stack direction='row' sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, width: '100%', }}>
            <LeftSidebar />
            <Content />
            <RightSidebar />
        </Stack>
    )
}