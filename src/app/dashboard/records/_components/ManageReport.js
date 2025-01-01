"use client";
import CustomAccordion from "@/components/core/accordion/CustomAccordion";
import PageLoader from "@/components/PageLoader/PageLoader";
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { createRecordAsync, getRecord, updateUserData } from "../_lib/actions";
import { defaultRecord } from "../_lib/types";

export const ManageReport = ({ id }) => {
    const isUpdated = Boolean(id);
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
        setValues
    } = useFormik({
        initialValues: defaultRecord,
        validate: (values) => {
            const errors = {};
            // Add validation logic here if needed
            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            const res = isUpdated ? await updateUserData({
                id: data.id,
                role: values.role,
                is_deleted: false,
                status: values.status,
                contact_number: values.contact_number
            }) : await createRecordAsync(values);
            if (res.success) {
                router.push("/dashboard/records");
            }
            setLoading(false);
        },
    });

    async function fetchRecordData() {
        setLoading(true);
        try {
            const response = await getRecord(id);
            setValues(response.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            return null;
        } finally {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        if (isUpdated) {
            fetchRecordData();
        }
    }, [])

    return (
        <PageLoader loading={loading} error={null}>

            <form onSubmit={handleSubmit}>
                {/* Basic Info */}
                <CustomAccordion
                    title="Basic Information"
                    pannelId="basic_info"
                    isLight
                    expanded
                >
                    <Grid container spacing={2}>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Title</InputLabel>
                                <OutlinedInput
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Campaign</InputLabel>
                                <OutlinedInput
                                    name="campaign"
                                    value={values.campaign}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Product</InputLabel>
                                <OutlinedInput
                                    name="product"
                                    value={values.product}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Stakeholder</InputLabel>
                                <OutlinedInput
                                    name="stakeholder"
                                    value={values.stakeholder}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Posting Quality</InputLabel>
                                <Select
                                    name="posting_quality"
                                    value={values.posting_quality}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="LOW">Low</MenuItem>
                                    <MenuItem value="MEDIUM">Medium</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Google Drive Files</InputLabel>
                                <OutlinedInput
                                    name="google_drive_files"
                                    value={values.google_drive_files}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Playbook Link</InputLabel>
                                <OutlinedInput
                                    name="playbook_link"
                                    value={values.playbook_link}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Uppromote Conversion</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="uppromote_conversion"
                                    value={values.uppromote_conversion}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Asset Status</InputLabel>
                                <Select
                                    name="asset_status"
                                    value={values.asset_status}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="ACTIVE">Active</MenuItem>
                                    <MenuItem value="INACTIVE">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Month Uploaded</InputLabel>
                                <OutlinedInput
                                    name="month_uploaded"
                                    value={values.month_uploaded}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Creator Status</InputLabel>
                                <Select
                                    name="creator_status"
                                    value={values.creator_status}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="ACTIVE">Active</MenuItem>
                                    <MenuItem value="INACTIVE">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Profile</InputLabel>
                                <OutlinedInput
                                    name="profile"
                                    value={values.profile}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Posting Status</InputLabel>
                                <Select
                                    name="asset_status"
                                    value={values.asset_status}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="POSTED">Posted</MenuItem>
                                    <MenuItem value="Not_POSTED">Not Posted</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner HQ</InputLabel>
                                <OutlinedInput
                                    name="partner_HQ"
                                    value={values.partner_HQ}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Portfolio</InputLabel>
                                <OutlinedInput
                                    name="portfolio"
                                    value={values.portfolio}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Contributed Engagement</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="contributed_engagement"
                                    value={values.contributed_engagement}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Tags</InputLabel>
                                <Select
                                    name="by_tags"
                                    value={values.by_tags}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="POSTED">Tag 1</MenuItem>
                                    <MenuItem value="Not_POSTED">Tag 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>City</InputLabel>
                                <OutlinedInput
                                    name="by_city"
                                    value={values.by_city}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Internet Search</InputLabel>
                                <OutlinedInput
                                    name="all_internet_search"
                                    value={values.all_internet_search}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </CustomAccordion>

                {/* Pinterest */}
                <CustomAccordion
                    title="Pinterest"
                    pannelId="pinterest"
                    isLight
                    sx={{ marginTop: 2 }}
                >
                    <Grid container spacing={2}>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>REVO Pinterest</InputLabel>
                                <Select
                                    name="REVO_pinterest"
                                    value={values.REVO_pinterest}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="POSTED">Posted</MenuItem>
                                    <MenuItem value="NOT_POSTED">Not Posted</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Pinterest Accounts Used</InputLabel>
                                <OutlinedInput
                                    name="PIN_accounts_used"
                                    value={values.PIN_accounts_used}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Pinterest PIN Click</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="pinterest_PIN_click"
                                    value={values.pinterest_PIN_click}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Pinterest View</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="pinterest_view"
                                    value={values.pinterest_view}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </CustomAccordion>

                {/* Instagram */}
                <CustomAccordion
                    title="Instagram"
                    pannelId="instagram"
                    isLight
                    sx={{ marginTop: 2 }}
                >
                    <Grid container spacing={2}>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>REVO Instagram</InputLabel>
                                <Select
                                    name="REVO_instagram"
                                    value={values.REVO_instagram}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="POSTED">Posted</MenuItem>
                                    <MenuItem value="NOT_POSTED">Not Posted</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Instagram Likes</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="IG_like"
                                    value={values.IG_like}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Instagram Comments</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="IG_comment"
                                    value={values.IG_comment}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Instagram Shares</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="IG_share"
                                    value={values.IG_share}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Instagram Views</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="IG_view"
                                    value={values.IG_view}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>IG Social Sets Used</InputLabel>
                                <OutlinedInput
                                    name="IG_social_sets_used"
                                    value={values.IG_social_sets_used}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner IG Link</InputLabel>
                                <OutlinedInput
                                    name="partner_IG_link"
                                    value={values.partner_IG_link}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </CustomAccordion>


                {/* Twitter */}
                <CustomAccordion
                    title="Twitter"
                    pannelId="twitter"
                    isLight
                    sx={{ marginTop: 2 }}
                >
                    <Grid container spacing={2}>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>REVO Twitter</InputLabel>
                                <Select
                                    name="REVO_twitter"
                                    value={values.REVO_twitter}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="POSTED">Posted</MenuItem>
                                    <MenuItem value="NOT_POSTED">Not Posted</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CustomAccordion>

                {/* TikTok */}
                <CustomAccordion
                    title="TikTok"
                    pannelId="tiktok"
                    isLight
                    sx={{ marginTop: 2 }}
                >
                    <Grid container spacing={2}>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>REVO TikTok</InputLabel>
                                <Select
                                    name="REVO_tiktok"
                                    value={values.REVO_tiktok}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="POSTED">Posted</MenuItem>
                                    <MenuItem value="NOT_POSTED">Not Posted</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>REVO TT View</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="REVO_TT_view"
                                    value={values.REVO_TT_view}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>TikTok Accounts Used</InputLabel>
                                <OutlinedInput
                                    name="tiktok_accounts_used"
                                    value={values.tiktok_accounts_used}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner TikTok Link</InputLabel>
                                <OutlinedInput
                                    name="partner_tiktok_link"
                                    value={values.partner_tiktok_link}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner TT Likes</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="partner_TT_like"
                                    value={values.partner_TT_like}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner TT Comments</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="partner_TT_comment"
                                    value={values.partner_TT_comment}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner TT Shares</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="partner_TT_share"
                                    value={values.partner_TT_share}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner TT Views</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="partner_TT_view"
                                    value={values.partner_TT_view}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner TT Saves</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="partner_TT_save"
                                    value={values.partner_TT_save}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>TT Dummy Account Used</InputLabel>
                                <Select
                                    name="TT_dummy_account_used"
                                    value={values.TT_dummy_account_used}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="FALSE">False</MenuItem>
                                    <MenuItem value="TRUE">True</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CustomAccordion>

                {/* Youtube */}
                <CustomAccordion
                    title="YouTube"
                    pannelId="youtube"
                    isLight
                    sx={{ marginTop: 2 }}
                >
                    <Grid container spacing={2}>
                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>YT Account Used</InputLabel>
                                <Select
                                    name="YT_account_used"
                                    value={values.YT_account_used}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="POSTED">Posted</MenuItem>
                                    <MenuItem value="NOT_POSTED">Not Posted</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner YT Link</InputLabel>
                                <OutlinedInput
                                    name="partner_YT_link"
                                    value={values.partner_YT_link}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner YT Likes</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="partner_YT_like"
                                    value={values.partner_YT_like}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner YT Comments</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="partner_YT_comment"
                                    value={values.partner_YT_comment}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner YT Views</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="partner_YT_view"
                                    value={values.partner_YT_view}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Partner YT Saves</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="partner_YT_save"
                                    value={values.partner_YT_save}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>REVO ClubRevo YouTube</InputLabel>
                                <Select
                                    name="REVO_clubrevo_youtube"
                                    value={values.REVO_clubrevo_youtube}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="POSTED">Posted</MenuItem>
                                    <MenuItem value="NOT_POSTED">Not Posted</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>REVO YouTube</InputLabel>
                                <Select
                                    name="REVO_youtube"
                                    value={values.REVO_youtube}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="POSTED">Posted</MenuItem>
                                    <MenuItem value="NOT_POSTED">Not Posted</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>YT ClubRevo Likes</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="YT_clubrevo_like"
                                    value={values.YT_clubrevo_like}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>YT ClubRevo Views</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="YT_clubrevo_view"
                                    value={values.YT_clubrevo_view}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>YT REVOMADIC Likes</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="YT_REVOMADIC_like"
                                    value={values.YT_REVOMADIC_like}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>YT REVOMADIC Comments</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="YT_REVOMADIC_comment"
                                    value={values.YT_REVOMADIC_comment}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>YT REVOMADIC Shares</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="YT_REVOMADIC_share"
                                    value={values.YT_REVOMADIC_share}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>YT REVOMADIC Views</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    name="YT_REVOMADIC_view"
                                    value={values.YT_REVOMADIC_view}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </CustomAccordion>

                {/* Submission Button */}
                <Stack
                    direction={"row"}
                    width={"100%"}
                    sx={{ marginTop: 2 }}
                >
                    <Button
                        variant="contained"
                        type={loading ? "button" : "submit"}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        Create
                    </Button>
                </Stack>
            </form>
        </PageLoader>
    );
};
