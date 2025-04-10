import { Stack } from "@mui/material";
import { MessageForm } from "../../dms/_components/message-form";
import { ScrollableContent } from "./custom-component";
import { Message } from "./message";
import { Topbar } from "./topbar";

export const Content = () => {
    return (
        <Stack direction='column' gap={1} sx={{ width: '50%', height: 'calc(100vh - 94px)', borderRight: '1px solid', borderColor: 'divider' }}>
            <Topbar />
            <ScrollableContent>
                <Message />
                <Message />
                <Message />
                <Message />
            </ScrollableContent>
            <MessageForm sx={{ p: 2 }} />
        </Stack>
    )
}