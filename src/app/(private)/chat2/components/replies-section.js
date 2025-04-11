import { IconButton, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { MessageForm } from "../../dms/_components/message-form";
import { ScrollableContent } from "./custom-component";
import { Message } from "./message";
import { Iconify } from "/src/components/iconify/iconify";
import { ChatContext } from "/src/contexts/chat";

export const RepliesSection = () => {
    const { handleReplies } = useContext(ChatContext);
    return (
        <Stack direction='column' sx={{ width: '25%', height: 'calc(100vh - 94px)', overfolow: 'hidden' }}>
            <Stack direction='row' gap={1} alignItems='center' justifyContent='space-between' sx={{ px: 1, py: 0.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography sx={{ fontWeight: 'medium', fontSize: '1rem' }}>Replies</Typography>
                <IconButton onClick={() => handleReplies(null)}>
                    <Iconify icon="mingcute:close-fill" />
                </IconButton>
            </Stack>
            <ScrollableContent>
                <Message isReplied={false} />
                <Message isReplied={false} />
                <Message isReplied={false} />
                <Message isReplied={false} />
            </ScrollableContent>
            <MessageForm sx={{ p: 2 }} />
        </Stack>
    )
}