'use client';

import React from 'react';
import { Box, IconButton, TextField, Typography, Popover, Paper, FormControl, FormControlLabel, Radio, RadioGroup, Button, Divider, Stack, Drawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Iconify } from '/src/components/iconify/iconify';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { createCampaignView, deleteCampaignView, updateCampaignView } from '/src/app/(public)/campaign/_lib/campaign.actions';
import { CampaignListViewSkelton } from '../../app/(public)/campaign/_components/campaign-list-view-skelton';
import { toast } from 'sonner';

export default function TableView({
    views,
    setViews,
    columns,
    selectedView,
    setFilters,
    setSort,
    showView,
    setShowView,
    setPagination,
    viewsLoading,
}) {
    // drawer
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const [drawerOpen, setDrawerOpen] = useState(showView);
    const router = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    const [anchorEl, setAnchorEl] = useState(null);

    // Personal view
    const personalViews = views?.filter((view) => !view.isPublic);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickView = (view) => {
        setPagination({ pageNo: 1, limit: 20 });
        router.push(`?tab=${tab}&view=${view.id}`);
    };

    const handleCreateView = async (values) => {
        const defaultColumns = columns.map((col) => col.columnName);
        const data = {
            label: values.name,
            description: "",
            table: tab.toUpperCase(),
            gate: "and",
            isPublic: values.editPermission === 'personal' ? false : true,
            filters: [],
            columns: defaultColumns,
            sort: [],
            groups: []
        }
        const res = await createCampaignView(data);
        if (res.success) {
            setAnchorEl(null);
            setViews([...views, res.data]);
        }
    };

    useEffect(() => {
        if (!isLargeScreen && showView) {
            setDrawerOpen(true);
        }
    }, [isLargeScreen, showView]);


    const renderViewSidebar = () => {
        return (
            <Box width={220} bgcolor='background.paper' px={1.5}>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography fontWeight={500} sx={{ fontSize: "14px", color: "text.secondary" }}>My Views</Typography>
                    <IconButton onClick={handleOpen}>
                        <AddIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                {/* <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => {
                        setFilters([]);
                        setSort([]);
                        setPagination({ pageNo: 1, limit: 20 });
                        router.push(`?tab=${tab}`);
                    }}
                    sx={{
                        p: 0.5,
                        mb: 1,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' },
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Iconify icon="tabler:table" width={18} height={18} />
                        <Typography variant="body2" fontWeight={500}>Default View</Typography>
                    </Box>
                </Box> */}

                <Divider sx={{ my: 1 }} />

                {/* Personal Views */}
                {personalViews?.length > 0 && (
                    <><Box>
                        <Typography fontWeight={500} sx={{ fontSize: "14px", color: "text.secondary", mb: 1 }}>Personal Views</Typography>
                        <Stack>
                            {personalViews?.map((view, index) => (
                                <SingleView
                                    key={index}
                                    view={view}
                                    handleClickView={handleClickView}
                                    selectedView={selectedView}
                                    views={views}
                                    setViews={setViews}
                                    setFilters={setFilters}
                                    setSort={setSort}
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
                        {views?.map((view, index) => (
                            <SingleView
                                key={index}
                                view={view}
                                handleClickView={handleClickView}
                                selectedView={selectedView}
                                views={views}
                                setViews={setViews}
                                setFilters={setFilters}
                                setSort={setSort}
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
                <Box width={220} bgcolor="background.paper">
                    {viewsLoading ? (
                        <CampaignListViewSkelton />
                    ) : (
                        renderViewSidebar()
                    )}
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
                    <Box width={220} pt={1}>
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
                                            sx={{ gap: 3 }}
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
                                            {/* <FormControlLabel
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
                                            /> */}
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
                                        onClick={() => setAnchorEl(null)}
                                        variant="text"
                                        color="inherit"
                                        sx={{ textTransform: "none", fontSize: "0.875rem" }}
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
                                        {isSubmitting ? 'Creating...' : 'Create'}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Popover>
        </>
    );
}


const SingleView = ({ view, handleClickView, selectedView, setFilters, setSort, setPagination, views, setViews }) => {
    const theme = useTheme();
    const router = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    const [viewAnchorEl, setViewAnchorEl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [viewLabel, setViewLabel] = useState(view.label);
    const [isRenaming, setIsRenaming] = useState(false);

    const handleDeleteView = async () => {
        setLoading(true);
        setViewAnchorEl(null);
        const res = await deleteCampaignView(view.id);
        if (res.success) {
            setViews(views.filter((v) => v.id !== view.id));
            setLoading(false);
            setFilters([]);
            setSort([]);
            router.push(`?tab=${tab}`)
        }
    }

    const handleRenameView = async (e) => {
        e.preventDefault();
        console.log(viewLabel);
        if (viewLabel.trim() === view.label || viewLabel.trim() === '') {
            setIsRenaming(false);
            setViewLabel(view.label);
            return;
        }
        setLoading(true);
        setIsRenaming(false);
        setViewLabel(viewLabel.trim());
        const res = await updateCampaignView(view.id, { label: viewLabel });
        if (res.success) {
            setViews(views.map((v) => v.id === view.id ? { ...v, label: viewLabel } : v));
            setLoading(false);
            toast.success('View renamed successfully');
        }
    }

    return (
        <>
            {isRenaming ? (
                <form onSubmit={handleRenameView}>
                    <TextField
                        value={viewLabel}
                        onChange={(e) => setViewLabel(e.target.value)}
                        onBlur={handleRenameView}
                        size="small"
                        variant="outlined"
                        sx={{ width: '100%', '& .MuiInputBase-root': { p: 0.5, borderRadius: 0 } }}
                    />
                </form>
            ) : (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => handleClickView(view)}
                    sx={{
                        p: 0.5,
                        cursor: 'pointer',
                        bgcolor: selectedView?.meta?.id === view.id ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                        '&:hover': { bgcolor: selectedView?.meta?.id === view.id ? alpha(theme.palette.primary.main, 0.2) : 'action.hover' },
                        '&:hover .action-hover-icon': { display: 'inline-flex' },
                    }}
                >
                    <Box sx={{ width: '100%' }} display="flex" alignItems="center" gap={1}>
                        <Iconify icon="tabler:table" width={18} height={18} sx={{ color: 'primary.main' }} />

                        <Box sx={{ flex: 1, minWidth: 0, gap: 1 }} display="flex" alignItems="center" justifyContent="space-between">
                            <Typography
                                variant="body2"
                                fontWeight={500}
                                title={view.label}
                                sx={{
                                    flex: 1,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                {view.label}
                            </Typography>
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
                    </Box>
                </Box>)}
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

                    <Stack>
                        <Button
                            onClick={() => {
                                setIsRenaming(true)
                                setViewAnchorEl(null)
                            }}
                            startIcon={<EditIcon />}
                            fullWidth
                            variant="text"
                            size="small"
                            color='none'
                            sx={{ justifyContent: "flex-start" }}>
                            Rename View
                        </Button>

                        <Button
                            // onClick={() => {
                            //     setIsRenaming(true)
                            //     setViewAnchorEl(null)
                            // }}
                            startIcon={<ContentCopyIcon />}
                            fullWidth
                            variant="text"
                            size="small"
                            color='none'
                            sx={{ justifyContent: "flex-start" }}>
                            Duplicate View
                        </Button>

                        <Button
                            disabled={loading}
                            startIcon={<DeleteIcon />}
                            fullWidth
                            variant="text"
                            size="small"
                            color="error"
                            sx={{ justifyContent: "flex-start" }}
                            onClick={() => handleDeleteView(view)}>
                            Delete View
                        </Button>
                    </Stack>
                </Paper>
            </Popover>
        </>
    );
}