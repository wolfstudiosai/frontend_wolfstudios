'use client';

import { getSpeficiLengthString } from '@/helper/common';
import { Card, FormControl, InputBase, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { getNeedsApprovalNavItemsAsync } from '../_lib/action';


export function NeedOfferApprovalSideNav({ handleClickNeedsOffer }) {
    const [navItems, setNavItems] = React.useState([]); // Unfiltered items
    const [filteredNavItems, setFilteredNavItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState("All");
    const [searchTerm, setSearchTerm] = React.useState("");

    async function getNeedsApprovalNavitems() {
        try {
            setLoading(true)
            const response = await getNeedsApprovalNavItemsAsync();
            if (response.success) {
                setNavItems(response.data);
                setFilteredNavItems(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (searchText, searchStatus) => {
        const statusFiltered = searchStatus === "all" ? navItems : navItems.filter((item) => item.revo_status === status);

        const searchFiltered = searchText === "" ? statusFiltered : statusFiltered.filter((item) => {
            return item.name.toLowerCase().includes(searchText.toLowerCase());
        });

        setFilteredNavItems(searchFiltered);
    };


    React.useEffect(() => {
        getNeedsApprovalNavitems();
    }, []);


    React.useEffect(() => {
        handleSearch(searchTerm, status);
    }, [status, searchTerm]);

    React.useEffect(() => {
        if (navItems.length === 0) return
        handleClickNeedsOffer(navItems[0])
    }, [navItems])


    return (
        <Card sx={{
            flex: '0 0 auto',
            flexDirection: { xs: 'column-reverse', md: 'column' },
            padding: { xs: '16px 0', md: '16px 0' },
            position: { md: 'sticky' },
            top: '64px',
            width: { xs: '100%', md: '240px' },
            height: { xs: '100%', md: '750px' },
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-track': {
                background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#000  ',
                borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: 'var(--mui-palette-action-selected)',
            },
        }}>

            <Stack
                component="ul"
                spacing={1}
                sx={{ listStyle: 'none', m: 0, p: '4px 12px', }}
            >
                <FormControl fullWidth >
                    <InputLabel>Search by status</InputLabel>
                    <Select
                        name="status"
                        id="status"
                        value={status}
                        label="Status"
                        onChange={(event) => setStatus(event.target.value)}
                        size="small"
                        placeholder="Search by status"
                    >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"needs_approval"}>Needs Approval</MenuItem>
                        <MenuItem value={"do_not_contact"}>Do Not Contact</MenuItem>
                        <MenuItem value={"needs_offer"}>Needs Offer</MenuItem>
                    </Select>
                </FormControl>
                <Paper
                    component="form"
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <InputBase
                        sx={{ border: '1px solid var(--mui-palette-divider)' }}
                        placeholder="Search by name"
                        inputProps={{ 'aria-label': 'Search by name' }}
                        onChange={(e) => { setSearchTerm(e.target.value) }}
                    />
                </Paper>
                {filteredNavItems.map((item) => (
                    <NavItem data={item} key={item.id} handleClickNeedsOffer={handleClickNeedsOffer} disabled={loading} />
                ))}
            </Stack>
        </Card>
    );
}

function NavItem({ data, handleClickNeedsOffer, disabled }) {
    const { avatar, name } = data
    let active
    return (
        <Box component="li" sx={{ userSelect: 'none' }}>
            <Box
                onClick={() => { handleClickNeedsOffer(data) }}
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    color: 'var(--mui-palette-text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    flex: '0 0 auto',
                    gap: 1,
                    p: '6px 16px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    ...(disabled && { color: 'var(--mui-palette-text-disabled)', cursor: 'not-allowed' }),
                    ...(active && { bgcolor: 'var(--mui-palette-action-selected)', color: 'var(--mui-palette-text-primary)' }),
                    '&:hover': {
                        ...(!active &&
                            !disabled && { bgcolor: 'var(--mui-palette-action-hover)', color: 'var(---mui-palette-text-primary)' }),
                    },
                }}
                tabIndex={0}
            >
                {avatar ? (
                    <Box component={"img"} alt="avatar" src={avatar} sx={{ flex: '0 0 auto', height: '24px', width: '24px', borderRadius: '50%' }}>

                    </Box>
                ) : null}
                <Box sx={{ flex: '1 1 auto' }}>
                    <Typography
                        component="span"
                        sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
                    >
                        {getSpeficiLengthString(name, 20)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
