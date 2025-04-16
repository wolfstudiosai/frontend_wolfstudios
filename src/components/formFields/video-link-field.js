import { Box, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Iconify } from "../iconify/iconify";
import { isVideoContent, pxToRem } from "/src/utils/helper";

export const VideoLinkField = ({ name, value, setFieldValue }) => {
    const [url, setUrl] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (isVideoContent(url)) {
                if (url.trim() && !value.includes(url.trim())) {
                    setFieldValue(name, [...value, url.trim()]);
                }
            }
            setUrl('');
        }
    };

    const handleAddUrl = () => {
        if (isVideoContent(url)) {
            if (url.trim() && !value.includes(url.trim())) {
                setFieldValue(name, [...value, url.trim()]);
            }
        }
        setUrl('');
    };

    const handleRemoveFile = (item) => {
        if (isVideoContent(item)) {
            setFieldValue(name, value.filter((url) => url !== item));
        }
    };

    return (
        <>
            <TextField
                value={url || ''}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleAddUrl()} edge="end">
                                <Iconify icon="ic:round-plus" width={24} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap', mt: 2 }}>
                {value.map((item, index) => (
                    <Box key={index} sx={{ width: '49.5%', position: 'relative' }}>
                        <Box
                            component="video"
                            src={item}
                            controls
                            autoPlay
                            loop
                            muted
                            playsInline
                            sx={{
                                height: pxToRem(500),
                                width: '100%',
                                objectFit: 'contain',
                                borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                                border: '1px solid var(--mui-palette-divider)',
                            }}
                        />
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                color: '#fff',
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                borderRadius: '50%',
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
                            }}
                            onClick={() => handleRemoveFile(item)}
                        >
                            <Iconify icon="ic:round-close" width={18} height={18} />
                        </IconButton>
                    </Box>
                ))}
            </Stack>
        </>
    )
}