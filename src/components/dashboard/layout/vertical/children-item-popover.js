import { Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, styled } from '@mui/material';
import { useContext } from 'react';
import { CountChip } from '/src/app/(private)/chat2/components/custom-component';
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

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: 4,
    margin: "2px 8px",
    padding: "4px 8px",
    "&.Mui-selected": {
        backgroundColor: "#e9e9e9",
    },
}));

const TagChip = styled(Chip)(({ theme }) => ({
    height: 18,
    fontSize: 10,
    backgroundColor: "#e0c3fc",
    color: "#8e44ad",
    marginLeft: theme.spacing(1),
}));

export const ChildrenItemPopover = ({ open, onClose, anchorRef, title }) => {
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
            slotProps={{
                paper: {
                    sx: {
                        ml: 8,
                        mt: 5,
                        boxShadow: 3,
                    },
                }
            }}
        >
            <List dense disablePadding>
                {
                    [
                        {
                            label: 'Assistant',
                            icon: 'mingcute:ai-line',
                            count: 0,
                            tag: 'NEW'
                        },
                        {
                            label: 'Drafts',
                            icon: 'mdi:file-document-outline',
                            count: 0,
                            tag: null
                        },
                        {
                            label: 'Saved items',
                            icon: 'mdi:bookmark-outline',
                            count: 0,
                            tag: null
                        },
                        {
                            label: 'Inbox',
                            icon: 'mynaui:envelope',
                            count: 8,
                            tag: null
                        },
                        {
                            label: 'Direct messages',
                            icon: 'flowbite:message-dots-outline',
                            count: 1,
                            tag: null
                        },
                    ].map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <StyledListItemButton>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <Iconify icon={item.icon} />
                                </ListItemIcon>
                                <ListItemText primary={item.label} sx={{
                                    margin: 0,
                                    "& .MuiTypography-root": {
                                        fontSize: 14,
                                    }
                                }} />
                                {item.tag && <TagChip label={item.tag} size="small" />}
                                {item.count > 0 && <CountChip label={item.count} size="small" />}
                            </StyledListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Popover>
    );
};