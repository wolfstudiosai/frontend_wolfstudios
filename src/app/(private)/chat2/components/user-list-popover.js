import { Autocomplete, Avatar, Box, IconButton, Popover, Stack, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { Iconify } from "/src/components/iconify/iconify";
import { ChatContext } from "/src/contexts/chat";

const users = [
    {
        id: 1,
        name: 'Elvis Presley',
        profile_pic: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'
    },
    {
        id: 2,
        name: 'Paul McCartney',
        profile_pic: 'https://www.svgrepo.com/show/382095/female-avatar-girl-face-woman-user-4.svg'
    }
]

export const UserListPopover = ({ open, onClose, anchorRef, title }) => {
    const { handleSelectedUser } = useContext(ChatContext);

    const handleChange = (event, newValue) => {
        handleSelectedUser(newValue);
        onClose();
    }

    return (
        <Popover
            open={open}
            onClose={onClose}
            anchorEl={anchorRef.current}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <Box sx={{ p: 2, width: 300 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        {title}
                    </Typography>
                    <IconButton onClick={onClose} >
                        <Iconify icon="mingcute:close-line" />
                    </IconButton>
                </Stack>

                <Autocomplete
                    id="user-selection-field"
                    fullWidth
                    options={users}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    onChange={handleChange}
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <Box
                                key={key}
                                component="li"
                                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                {...optionProps}
                            >
                                <Avatar src={option.profile_pic} alt={option.name} sx={{ width: 30, height: 30, mr: 2 }} />
                                {option.name}
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choose User"
                            slotProps={{
                                htmlInput: {
                                    ...params.inputProps,
                                    autoComplete: 'select-user',
                                },
                            }}
                        />
                    )}
                    sx={{ mb: 2 }}
                />
            </Box>
        </Popover>
    );
};