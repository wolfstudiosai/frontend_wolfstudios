'use client';

import React from 'react';
import { Box, IconButton, TextField, Typography, Popover, Paper, FormControl, FormControlLabel, Radio, RadioGroup, Button, Divider, Stack, Drawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Iconify } from '/src/components/iconify/iconify';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';
import { useMediaQuery } from '@mui/material';

export default function TableView({ views, setViews, selectedView, showView, setShowView }) {
    // drawer
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const [drawerOpen, setDrawerOpen] = useState(showView);

    const router = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    const [anchorEl, setAnchorEl] = useState(null);
    const [viewAnchorEl, setViewAnchorEl] = useState(null);

    // favorite view
    const favoriteViews = views.filter((view) => view.favorite);
    const personalViews = views.filter((view) => view.editPermission === 'personal');

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickView = (view) => {
        router.push(`?tab=${tab}&view=${view.name}`);
    };

    const handleCreateView = (values) => {
        setAnchorEl(null);
        setViews([...views, {
            name: values.name,
            editPermission: values.editPermission,
            filters: [],
            sort: { field: 'name', order: 'asc' },
        }]);
    };

    useEffect(() => {
        if (!isLargeScreen && showView) {
            setDrawerOpen(true);
        }
    }, [isLargeScreen, showView]);


    const renderViewSidebar = () => {
        return (
            <Box width="100%" bgcolor='background.paper' px={1.5}>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography fontWeight={500} sx={{ fontSize: "14px", color: "text.secondary" }}>My Views</Typography>
                    <IconButton onClick={handleOpen}>
                        <AddIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => router.push(`?tab=${tab}`)}
                    sx={{
                        p: 1,
                        mb: 1,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' },
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Iconify icon="tabler:table" width={18} height={18} />
                        <Typography variant="body2" fontWeight={500}>Default View</Typography>
                    </Box>
                </Box>

                {/* Favorite Views */}
                {favoriteViews.length > 0 && (
                    <Box>
                        <Typography fontWeight={500} sx={{ fontSize: "14px", color: "text.secondary", mb: 1 }}>Favorite Views</Typography>
                        <Stack>
                            {favoriteViews.map((view, index) => (
                                <SingleView
                                    key={index}
                                    view={view}
                                    handleClickView={handleClickView}
                                    selectedView={selectedView}
                                    setViewAnchorEl={setViewAnchorEl}
                                />
                            ))}
                        </Stack>
                    </Box>
                )}

                <Divider sx={{ my: 1 }} />

                {/* Personal Views */}
                {personalViews.length > 0 && (
                    <><Box>
                        <Typography fontWeight={500} sx={{ fontSize: "14px", color: "text.secondary", mb: 1 }}>Personal Views</Typography>
                        <Stack>
                            {personalViews.map((view, index) => (
                                <SingleView
                                    key={index}
                                    view={view}
                                    handleClickView={handleClickView}
                                    selectedView={selectedView}
                                    setViewAnchorEl={setViewAnchorEl}
                                />
                            ))}
                        </Stack>
                    </Box>
                        <Divider sx={{ my: 1 }} /></>
                )}


                {/* All Views */}
                <Box>
                    <Typography fontWeight={500} sx={{ fontSize: "14px", color: "text.secondary", mb: 1 }}>All Views</Typography>
                    <Stack>
                        {views.map((view, index) => (
                            <SingleView
                                key={index}
                                view={view}
                                handleClickView={handleClickView}
                                selectedView={selectedView}
                                setViewAnchorEl={setViewAnchorEl}
                            />
                        ))}
                    </Stack>
                </Box>
            </Box>
        )
    }

    return (
        <>
            {showView && (isLargeScreen ? (
                <Box width={250} bgcolor="background.paper">
                    {renderViewSidebar()}
                </Box>
            ) : (
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => {
                        setDrawerOpen(false);
                        setShowView(false);
                    }}
                >
                    <Box width={250} pt={1}>
                        {renderViewSidebar()}
                    </Box>
                </Drawer>
            ))}



            {/* View Popover */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{
                    sx: {
                        width: 400,
                    },
                }}
            >
                <Paper sx={{ p: 0 }}>
                    <Formik
                        initialValues={{
                            name: '',
                            editPermission: 'collaborative',
                        }}
                        onSubmit={handleCreateView}
                    >
                        {({ values, handleChange, isSubmitting }) => (
                            <Form>
                                {/* Header */}
                                <Box sx={{ p: 1.5 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Name"
                                        size="small"
                                        name="name"
                                        variant="outlined"
                                        value={values.name}
                                        onChange={handleChange}
                                        placeholder="Enter view name"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                                    />
                                </Box>

                                {/* Content */}
                                <Box sx={{ p: 1.5 }}>
                                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, fontSize: "0.95rem" }}>
                                        Who can edit
                                    </Typography>

                                    <FormControl component="fieldset" fullWidth>
                                        <RadioGroup
                                            row
                                            name="editPermission"
                                            value={values.editPermission}
                                            onChange={handleChange}
                                            sx={{ justifyContent: "space-between" }}
                                        >
                                            <FormControlLabel
                                                value="collaborative"
                                                control={<Radio size="small" sx={{ color: "#1976d2" }} />}
                                                label={
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                        <PeopleIcon fontSize="small" sx={{ color: "#666" }} />
                                                        <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                                            Collaborative
                                                        </Typography>
                                                    </Box>
                                                }
                                                sx={{ mx: 0, gap: 0.5 }}
                                            />
                                            <FormControlLabel
                                                value="personal"
                                                control={<Radio size="small" />}
                                                label={
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                        <PersonIcon fontSize="small" sx={{ color: "#666" }} />
                                                        <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                                            Personal
                                                        </Typography>
                                                    </Box>
                                                }
                                                sx={{ mx: 0, gap: 0.5 }}
                                            />
                                            <FormControlLabel
                                                value="locked"
                                                control={<Radio size="small" />}
                                                label={
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                        <LockIcon fontSize="small" sx={{ color: "#666" }} />
                                                        <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                                            Locked
                                                        </Typography>
                                                    </Box>
                                                }
                                                sx={{ mx: 0, gap: 0.5 }}
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontSize: "0.8rem", color: "#666" }}>
                                        {values.editPermission === 'collaborative' && (
                                            <>
                                                All collaborators can edit the configuration
                                            </>
                                        )}
                                        {values.editPermission === 'personal' && (
                                            <>
                                                Only you can edit the configuration
                                            </>
                                        )}
                                        {values.editPermission === 'locked' && (
                                            <>
                                                No one can edit the configuration
                                            </>
                                        )}
                                    </Typography>
                                </Box>

                                <Divider />

                                {/* Actions */}
                                <Box
                                    sx={{ px: 3, py: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
                                >
                                    <Button
                                        onClick={() => setViewAnchorEl(null)}
                                        variant="text"
                                        color="inherit"
                                        sx={{ textTransform: "none", color: "#666", fontSize: "0.875rem" }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        disabled={isSubmitting || !values.name || !values.editPermission}
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Popover>

            {/* View Action Popover */}
            <Popover
                open={Boolean(viewAnchorEl)}
                anchorEl={viewAnchorEl}
                onClose={() => setViewAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{
                    sx: {
                        width: 250,
                    },
                }}
            >
                <Paper sx={{ p: 1.5 }}>
                    <Button
                        startIcon={<Iconify className="hover-icon" icon="line-md:star" width={18} height={18} />}
                        fullWidth
                        variant="text"
                        size="small"
                        sx={{ justifyContent: "flex-start" }}
                    >
                        Add to "My Favorite"
                    </Button>

                    <Divider sx={{ my: 1.5 }} />

                    <Stack spacing={1}>
                        <Button startIcon={<EditIcon />} fullWidth variant="text" size="small" color='none' sx={{ justifyContent: "flex-start" }}>
                            Rename View
                        </Button>
                        <Button startIcon={<ContentCopyIcon />} fullWidth variant="text" size="small" color='none' sx={{ justifyContent: "flex-start" }}>
                            Duplicate View
                        </Button>
                        <Button startIcon={<DeleteIcon />} fullWidth variant="text" size="small" color="error" sx={{ justifyContent: "flex-start" }}>
                            Delete View
                        </Button>
                    </Stack>
                </Paper>
            </Popover>
        </>
    );
}


const SingleView = ({ view, handleClickView, selectedView, setViewAnchorEl }) => {
    const theme = useTheme();
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => handleClickView(view)}
            sx={{
                p: 1,
                cursor: 'pointer',
                bgcolor: selectedView?.name === view.name ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                '&:hover': { bgcolor: selectedView?.name === view.name ? alpha(theme.palette.primary.main, 0.2) : 'action.hover' },
                '& .hover-icon': { display: 'none' },
                '&:hover .hover-icon': { display: 'inline-flex' },
                '&:hover .default-icon': { display: 'none' },
                '&:hover .action-hover-icon': { display: 'inline-flex' },
            }}
        >
            <Box display="flex" alignItems="center" gap={1}>
                <Iconify className="default-icon" icon="tabler:table" width={18} height={18} sx={{ color: 'primary.main' }} />
                <Iconify className="hover-icon" icon="line-md:star" width={18} height={18} sx={{ color: 'yellow' }} />

                <Typography variant="body2" fontWeight={500}>
                    {view.name}
                </Typography>
                {view.editPermission === 'locked' && <LockIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
            </Box>
            <Iconify
                onClick={(e) => {
                    e.stopPropagation();
                    setViewAnchorEl(e.currentTarget);
                }}
                className="action-hover-icon"
                icon="iconamoon:arrow-down-2-light"
                width={18}
                height={18}
                sx={{ display: 'none', alignItems: 'center', justifyContent: 'center' }}
            />
        </Box>
    );
}