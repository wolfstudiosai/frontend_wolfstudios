import { Avatar, Box, Divider, FormControl, IconButton, Input, InputAdornment, Stack } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { Iconify } from "/src/components/iconify/iconify";
import { ChatContext } from "/src/contexts/chat";
import useWebSocket from '/src/hooks/use-web-socket';
import useAuth from '/src/hooks/useAuth';

export const MessageForm = ({ sx = {} }) => {
    const [messageContent, setMessageContent] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);

    const { activeReceiver } = useContext(ChatContext);
    const { userInfo } = useAuth();

    const { sendMessage } = useWebSocket(userInfo.id);
    const attachmentRef = useRef(null);

    const handleFileSelect = (event) => {
        if (event.target.files?.length) {
            setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
        }
    };

    const handleRemoveFile = (indexToRemove) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    };

    const handleSendMessage = () => {
        if (!messageContent.trim()) return;

        const newMessage = {
            sender_id: userInfo?.id,
            receiver_id: activeReceiver?.id,
            content: messageContent,
        };

        sendMessage(newMessage);
        setMessageContent("");
    }

    return (
        <Stack sx={{ ...sx, }}>
            {
                selectedFiles.length > 0 && (
                    <>
                        <Stack direction='row' gap={0.6} sx={{ flexWrap: 'wrap', p: 1 }}>
                            {
                                selectedFiles?.map((file, index) => (
                                    <Box key={index} sx={{ width: '120px', height: '120px', position: 'relative' }}>
                                        <Box component='img' src={URL.createObjectURL(file)} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0.5 }} />
                                        <IconButton size='small' sx={{ position: 'absolute', top: 3, right: 3, backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '50%', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' } }} onClick={() => handleRemoveFile(index)}>
                                            <Iconify icon='mingcute:close-fill' sx={{ color: '#fff', width: '16px', height: '16px' }} />
                                        </IconButton>
                                    </Box>
                                ))
                            }
                        </Stack>
                        <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                    </>
                )
            }
            <FormControl variant="standard" sx={{ width: '100%' }}>
                <Input
                    fullWidth
                    placeholder='Type a message...'
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <Avatar src={userInfo?.profile_pic} alt={userInfo?.name} sx={{ width: '30px', height: '30px' }} />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end" sx={{ display: 'flex', gap: 0.2 }}>
                            <IconButton size='small' sx={{ borderRadius: '50%' }} onClick={() => attachmentRef?.current?.click()}>
                                <Iconify icon='mage:attachment' sx={{ color: 'grey.800' }} />
                            </IconButton>
                            <IconButton size='small' sx={{ borderRadius: '50%' }}>
                                <Iconify icon='material-symbols-light:add-reaction-outline' sx={{ color: 'grey.800' }} />
                            </IconButton>
                            <IconButton size='small' sx={{ borderRadius: '50%', ...((messageContent.length > 0 || selectedFiles.length > 0) && { backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main' } }) }} onClick={handleSendMessage}>
                                <Iconify icon='mingcute:arrow-up-fill' sx={{ color: (messageContent.length > 0 || selectedFiles.length > 0) ? '#fff' : 'grey.800' }} />
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 0, pb: 1, borderRadius: 0 }}
                />
            </FormControl>
            <input
                ref={attachmentRef}
                type="file"
                style={{ display: "none" }}
                id="file-upload"
                onChange={handleFileSelect}
                multiple
            />
        </Stack>
    )
}