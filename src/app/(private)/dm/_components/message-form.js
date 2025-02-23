import { Avatar, Box, Divider, FormControl, IconButton, Input, InputAdornment, Stack } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { ChatContext } from "../context";
import { Iconify } from "/src/components/iconify/iconify";

export const MessageForm = ({ sx = {} }) => {
    const [newMessage, setNewMessage] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);

    const attachmentRef = useRef(null);

    const { handleAddMessage, loggedInUser } = useContext(ChatContext);

    const handleFileSelect = (event) => {
        if (event.target.files?.length) {
            setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
        }
    };

    const handleRemoveFile = (indexToRemove) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    };

    return (
        <Stack sx={{ ...sx }}>
            {
                selectedFiles.length > 0 && (
                    <>
                        <Stack direction='row' gap={0.6} sx={{ flexWrap: 'wrap' }}>
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
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <Avatar src={loggedInUser?.profile_image} alt={loggedInUser?.name} sx={{ width: '30px', height: '30px' }} />
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
                            <IconButton size='small' sx={{ borderRadius: '50%', ...((newMessage.length > 0 || selectedFiles.length > 0) && { backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main' } }) }} onClick={handleAddMessage}>
                                <Iconify icon='mingcute:arrow-up-fill' sx={{ color: (newMessage.length > 0 || selectedFiles.length > 0) ? '#fff' : 'grey.800' }} />
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