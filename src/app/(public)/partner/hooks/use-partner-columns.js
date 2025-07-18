import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import AttachFile from "@mui/icons-material/AttachFile";
import { formatCompactNumber } from "../../../../utils/helper";
import { MultiSelectEditCell } from '/src/components/data-table/multi-select-edit-cell';
import { profileStatus } from '/src/app/(public)/partner/_lib/partner.constants';
import SelectEditCell from '/src/components/data-table/select-edit-cell';
import { platformDeliverables, platforms } from "../_lib/partner.constants";
import { MultipleTextInputEditCell } from '/src/components/data-table/multiple-text-input-edit';
import DateEditCell from '/src/components/data-table/date-edit-cell';
import { dateFormatter } from '/src/utils/date-formatter';
import { getCaseStudyListAsync, getCityListAsync, getCountryListAsync, getDestinationListAsync, getProductListAsync, getRetailPartnerListAsync, getStakeHolderListAsync, getStateListAsync, getTagListAsync } from "../../../../lib/common.actions";
import { getContentListAsync } from "../../../(private)/all-content/_lib/all-content.actions";
import { getProductionListAsync } from "../../production/_lib/production.action";
import { getPortfolioListAsync } from "../../portfolio/_lib/portfolio.actions";
import { renderAutoCompleteCell, renderAutoCompleteEditCell } from "../../../../components/data-table/render-auto-complete-edit-cell";
import { getCampaignListAsync } from "../../campaign/_lib/campaign.actions";

export const usePartnerColumns = (anchorEl, setMediaToShow, handleUploadModalOpen, visibleColumns) => {
    const [autocompleteFocus, setAutocompleteFocus] = React.useState({
        currentItem: '',
        prevItems: [],
    });

    const [autoCompleteOptions, setAutoCompleteOptions] = React.useState({
        profileCategory: [],
        countries: [],
        states: [],
        cities: [],
        contentHQ: [],
        productionHQ: [],
        productionHQ2: [],
        portfolios: [],
        stakeholders: [],
        retailPartners: [],
        caseStudies: [],
        tags: [],
        destinations: [],
        products: [],
        contributedCampaigns: [],
        proposedCampaigns: [],
    });

    // --------------- Fetch Prerequisites Data -------------------
    const fetchFunctionsMap = {
        profileCategory: '',
        countries: getCountryListAsync,
        states: getStateListAsync,
        cities: getCityListAsync,
        contentHQ: getContentListAsync,
        productionHQ: getProductionListAsync,
        productionHQ2: getProductionListAsync,
        portfolios: getPortfolioListAsync,
        stakeholders: getStakeHolderListAsync,
        retailPartners: getRetailPartnerListAsync,
        caseStudies: getCaseStudyListAsync,
        tags: getTagListAsync,
        destinations: getDestinationListAsync,
        products: getProductListAsync,
        contributedCampaigns: () => getCampaignListAsync({ page: 1, rowsPerPage: 100 }),
        proposedCampaigns: () => getCampaignListAsync({ page: 1, rowsPerPage: 100 }),
    };

    React.useEffect(() => {
        const fetchData = async () => {
            if (!autocompleteFocus?.currentItem) return;
            const { currentItem, prevItems } = autocompleteFocus;

            if (prevItems.includes(currentItem)) return;
            const fetchFunction = fetchFunctionsMap[currentItem];
            if (!fetchFunction) return;

            try {
                const response = await fetchFunction({ page: 1, rowsPerPage: 100 });
                if (response?.success) {
                    const options = response.data.map((item) => ({
                        value: item.id,
                        label: item.name || item.projectTitle,
                    }));

                    setAutoCompleteOptions((prevState) => ({
                        ...prevState,
                        [currentItem]: options,
                    }));

                    setAutocompleteFocus((prevState) => ({
                        currentItem: '',
                        prevItems: [...prevState.prevItems, currentItem],
                    }));
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [autocompleteFocus]);

    const columns = [
        { field: 'name', headerName: 'Name', width: 280, editable: true },
        {
            field: 'thumbnailImage', headerName: 'Thumbnail Image', width: 150, renderCell: (params) => {
                return <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    '&:hover .attach-icon': {
                        display: 'inline-block',
                    },
                }}>
                    {Array.isArray(params.row.thumbnailImage) && params.row.thumbnailImage.length > 0 && params.row.thumbnailImage[0] && <Image
                        src={params.row.thumbnailImage[0]}
                        alt="Image"
                        width={22}
                        height={22}
                        style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={(event) => {
                            anchorEl.current = event.currentTarget;
                            setMediaToShow({
                                type: 'image',
                                url: params.row.thumbnailImage[0],
                            });
                        }}
                    />}

                    <AttachFile
                        className="attach-icon"
                        titleAccess="Attach"
                        onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                        sx={{
                            fontSize: 18,
                            cursor: 'pointer',
                            display: 'none',
                        }}
                    />
                </Box>
            }
        },
        // Media Kit
        {
            field: 'mediaKit',
            headerName: 'Media Kit',
            width: 200,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            gap: 0.5,
                            alignItems: 'center',
                            position: 'relative',
                            '&:hover .attach-icon': {
                                display: 'inline-block',
                            },
                        }}
                    >
                        {params?.row?.mediaKit?.length > 0 &&
                            params?.row?.mediaKit?.map((image, index) => (
                                <Image
                                    key={index + image}
                                    src={image}
                                    alt="media kit image"
                                    width={22}
                                    height={22}
                                    style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                    onClick={(event) => {
                                        anchorEl.current = event.currentTarget;
                                        setMediaToShow({
                                            type: 'image',
                                            url: image,
                                        });
                                    }}
                                />
                            ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            },
        },
        // partnerGallery
        {
            field: 'partnerGallery',
            headerName: 'Partner Gallery',
            width: 200,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            gap: 0.5,
                            alignItems: 'center',
                            position: 'relative',
                            '&:hover .attach-icon': {
                                display: 'inline-block',
                            },
                        }}
                    >
                        {params?.row?.partnerGallery?.length > 0 &&
                            params?.row?.partnerGallery?.map((image, index) => (
                                <Image
                                    key={index + image}
                                    src={image}
                                    alt="partner gallery image"
                                    width={22}
                                    height={22}
                                    style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                    onClick={(event) => {
                                        anchorEl.current = event.currentTarget;
                                        setMediaToShow({
                                            type: 'image',
                                            url: image,
                                        });
                                    }}
                                />
                            ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            },
        },
        // receipts
        {
            field: 'receipts',
            headerName: 'Receipts',
            width: 200,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            gap: 0.5,
                            alignItems: 'center',
                            position: 'relative',
                            '&:hover .attach-icon': {
                                display: 'inline-block',
                            },
                        }}
                    >
                        {params?.row?.receipts?.length > 0 &&
                            params?.row?.receipts?.map((image, index) => (
                                <Image
                                    key={index + image}
                                    src={image}
                                    alt="receipts image"
                                    width={22}
                                    height={22}
                                    style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                    onClick={(event) => {
                                        anchorEl.current = event.currentTarget;
                                        setMediaToShow({
                                            type: 'image',
                                            url: image,
                                        });
                                    }}
                                />
                            ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            },
        },
        // contracts
        {
            field: 'contracts',
            headerName: 'Contracts',
            width: 200,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            gap: 0.5,
                            alignItems: 'center',
                            position: 'relative',
                            '&:hover .attach-icon': {
                                display: 'inline-block',
                            },
                        }}
                    >
                        {params?.row?.contracts?.length > 0 &&
                            params?.row?.contracts?.map((image, index) => (
                                <Image
                                    key={index + image}
                                    src={image}
                                    alt="contracts image"
                                    width={22}
                                    height={22}
                                    style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                    onClick={(event) => {
                                        anchorEl.current = event.currentTarget;
                                        setMediaToShow({
                                            type: 'image',
                                            url: image,
                                        });
                                    }}
                                />
                            ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            },
        },
        // email
        { field: 'email', headerName: 'Email', width: 250, editable: true },
        // totalROI
        { field: 'totalROI', headerName: 'Total ROI', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // totalExpense
        { field: 'totalExpense', headerName: 'Total Expense', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // shippingFBAFeeGiftedPartners
        { field: 'shippingFBAFeeGiftedPartners', headerName: 'Shipping Fee FBA', width: 220, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // paypalFee
        { field: 'paypalFee', headerName: 'Paypal Fee', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // amazonReferralFee
        { field: 'amazonReferralFee', headerName: 'Amazon Referral Fee', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // instagram
        { field: 'instagram', headerName: 'Instagram', width: 200, editable: true },
        // profileStatus
        {
            field: 'profileStatus',
            headerName: 'Profile Status',
            width: 300,
            editable: true,
            renderCell: (params) => params.row.profileStatus.join(', '),
            renderEditCell: (params) => <MultiSelectEditCell {...params} options={profileStatus} />
        },
        // linkedinConnections
        { field: 'linkedinConnections', headerName: 'LinkedIn Connections', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // snapchatFollowing
        { field: 'snapchatFollowing', headerName: 'Snapchat Following', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // youtubeFollowing
        { field: 'youtubeFollowing', headerName: 'Youtube Following', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // xFollowing
        { field: 'xFollowing', headerName: 'X Following', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // pinterestFollowing
        { field: 'pinterestFollowing', headerName: 'Pinterest Following', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // tiktokFollowing
        { field: 'tiktokFollowing', headerName: 'Tiktok Following', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // facebookFollowing
        { field: 'facebookFollowing', headerName: 'Facebook Following', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // instagramFollowing
        { field: 'instagramFollowing', headerName: 'Instagram Following', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // website
        { field: 'website', headerName: 'Website', width: 250, editable: true },
        // medium
        { field: 'medium', headerName: 'Medium', width: 200, editable: true },
        // soundcloud
        { field: 'soundcloud', headerName: 'SoundCloud', width: 200, editable: true },
        // spotify
        { field: 'spotify', headerName: 'Spotify', width: 200, editable: true },
        // openToGifting
        {
            field: 'openToGifting',
            headerName: 'Open to Gifting',
            width: 150,
            editable: true,
            renderCell: (params) => params.row.openToGifting ? 'Yes' : 'No',
            renderEditCell: (params) => <SelectEditCell {...params} options={[{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }]} />,
        },
        // mailingAddress
        { field: 'mailingAddress', headerName: 'Mailing Address', width: 300, editable: true },
        // previousCollabExpense
        { field: 'previousCollabExpense', headerName: 'Previous Collab Expense', width: 220, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // totalProductCOGExpense
        { field: 'totalProductCOGExpense', headerName: 'Total Product COG Expense', width: 220, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // shippingExpense
        { field: 'shippingExpense', headerName: 'Shipping Expense', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // oneOffExpense
        { field: 'oneOffExpense', headerName: 'One Off Expense', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // currentStatus
        {
            field: 'currentStatus', headerName: 'Current Status', width: 300,
            editable: true,
            renderCell: (params) => params.row.profileStatus.join(', '),
            renderEditCell: (params) => <MultiSelectEditCell {...params} options={profileStatus} />
        },
        // occupation
        { field: 'occupation', headerName: 'Occupation', width: 200, editable: true },
        // paymentLink
        { field: 'paymentLink', headerName: 'Payment Link', width: 250, editable: true },
        // client
        { field: 'client', headerName: 'Client', width: 200, editable: true },
        // notes
        { field: 'notes', headerName: 'Notes', width: 300, editable: true },
        // facebook
        { field: 'facebook', headerName: 'Facebook', width: 250, editable: true },
        // linkedin
        { field: 'linkedin', headerName: 'LinkedIn', width: 250, editable: true },
        // phone
        { field: 'phone', headerName: 'Phone', width: 200, editable: true },
        // pinterest
        { field: 'pinterest', headerName: 'Pinterest', width: 250, editable: true },
        // podcast
        { field: 'podcast', headerName: 'Podcast', width: 200, editable: true },
        // partner360Rate
        { field: 'partner360Rate', headerName: 'Partner 360 Rate', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // snapchat
        { field: 'snapchat', headerName: 'Snapchat', width: 200, editable: true },
        // twitch
        { field: 'twitch', headerName: 'Twitch', width: 200, editable: true },
        // x
        { field: 'x', headerName: 'X', width: 200, editable: true },
        // tiktok
        { field: 'tiktok', headerName: 'Tiktok', width: 200, editable: true },
        // youtube
        { field: 'youtube', headerName: 'Youtube', width: 200, editable: true },
        // journeyStep
        { field: 'journeyStep', headerName: 'Journey Step', width: 200, editable: true },
        // hourlyRate
        { field: 'hourlyRate', headerName: 'Hourly Rate', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // bookingLink
        { field: 'bookingLink', headerName: 'Booking Link', width: 250, editable: true },
        // refusalReason
        { field: 'refusalReason', headerName: 'Refusal Reason', width: 250, editable: true },
        // revoAmazonOrderConfirmationNumber
        { field: 'revoAmazonOrderConfirmationNumber', headerName: 'Amazon Order No.', width: 250, editable: true },
        // amazonReviewLink
        { field: 'amazonReviewLink', headerName: 'Amazon Review Link', width: 250, editable: true },
        // amazonReviewCupper
        { field: 'amazonReviewCupper', headerName: 'Amazon Review Cupper', width: 250, editable: true },
        // amazonReviewThePill
        { field: 'amazonReviewThePill', headerName: 'Amazon Review The Pill', width: 250, editable: true },
        // amazonStorefront
        { field: 'amazonStorefront', headerName: 'Amazon Storefront', width: 250, editable: true },
        // deliverables
        { field: 'deliverables', headerName: 'Deliverables', width: 250, editable: true },
        // googleDriveFiles
        { field: 'googleDriveFiles', headerName: 'Google Drive Files', width: 250, editable: true },
        // revoIGPost
        { field: 'revoIGPost', headerName: 'REVO IG Post', width: 200, editable: true },
        // partnerIGRate
        { field: 'partnerIGRate', headerName: 'Partner IG Rate', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // partnerTTRate
        { field: 'partnerTTRate', headerName: 'Partner TT Rate', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // partnerYTRate
        { field: 'partnerYTRate', headerName: 'Partner YT Rate', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // amountPaid
        { field: 'amountPaid', headerName: 'Amount Paid', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // totalContributedEngagementByContent
        { field: 'totalContributedEngagementByContent', headerName: 'Total Engagement', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // totalAudience
        { field: 'totalAudience', headerName: 'Total Audience', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // partnerPostViews
        { field: 'partnerPostViews', headerName: 'Partner Post Views', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // platformDeliverables
        {
            field: 'platformDeliverables',
            headerName: 'Platform Deliverables',
            width: 300,
            editable: true,
            renderCell: (params) => params.row.platformDeliverables.join(', '),
            renderEditCell: (params) => <MultiSelectEditCell {...params} options={platformDeliverables} />
        },
        // platforms
        {
            field: 'platforms', headerName: 'Platforms', width: 300,
            editable: true,
            renderCell: (params) => params.row.platforms.join(', '),
            renderEditCell: (params) => <MultiSelectEditCell {...params} options={platforms} />
        },
        // revosOffer
        { field: 'revosOffer', headerName: 'REVO Offer', width: 200, editable: true },
        // remainingCredits
        { field: 'remainingCredits', headerName: 'Remaining Credits', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // ttPost
        { field: 'ttPost', headerName: 'TT Post', width: 200, editable: true },
        // ugcPaymentStatus
        { field: 'ugcPaymentStatus', headerName: 'UGC Payment Status', width: 200, editable: true },
        // ugcRetainerAmount
        { field: 'ugcRetainerAmount', headerName: 'UGC Retainer Amount', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // ugcTikTokLink
        { field: 'ugcTikTokLink', headerName: 'UGC TikTok Link', width: 250, editable: true },
        // revoUGCArmyTTUsernamePW
        { field: 'revoUGCArmyTTUsernameAndPW', headerName: 'REVO UGC TT Username/PW', width: 250, editable: true },
        // whatsApp
        { field: 'whatsApp', headerName: 'WhatsApp', width: 200, editable: true },
        // ytPost
        { field: 'ytPost', headerName: 'YT Post', width: 200, editable: true },
        // partnerPostViews
        { field: 'partnerPostViews', headerName: 'Partner Post Views', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // sourcedFrom
        {
            field: 'sourcedFrom',
            headerName: 'Sourced From',
            width: 250,
            editable: true,
            renderCell: (params) => params.row.sourcedFrom.join(', '),
            renderEditCell: (params) => <MultipleTextInputEditCell {...params} />
        },
        // estimatedTaxes
        { field: 'estimatedTaxes', headerName: 'Estimated Taxes', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // fbaXLevanta
        { field: 'fbaXLevanta', headerName: 'FBA x Levanta', width: 180, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // levantaAffiliateFee
        { field: 'levantaAffiliateFee', headerName: 'Levanta Affiliate Fee', width: 200, editable: true },
        // amazonOrderTotal
        { field: 'amazonOrderTotal', headerName: 'Amazon Order Total', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // amazonTax
        { field: 'amazonTax', headerName: 'Amazon Tax', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // amazonKickback
        { field: 'amazonKickback', headerName: 'Amazon Kickback', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // monthSourced
        {
            field: 'monthSourced',
            headerName: 'Month Sourced',
            width: 180,
            editable: true,
            valueGetter: (value, row) => dateFormatter(row.monthSourced, 'MMMM-YYYY'),
            renderEditCell: (params) => <DateEditCell {...params} format="MMMM-YYYY" />
        },
        // secondPaymentDate
        {
            field: 'secondPaymentDate',
            headerName: 'Second Payment Date',
            width: 200,
            editable: true,
            valueGetter: (value, row) => dateFormatter(row.secondPaymentDate, 'YYYY-MM-DD'),
            renderEditCell: (params) => <DateEditCell {...params} format="YYYY-MM-DD" />
        },
        // clientStatus
        {
            field: 'clientStatus',
            headerName: 'Client Status',
            width: 200,
            editable: true,
            renderCell: (params) => params.row.clientStatus,
            renderEditCell: (params) => <SelectEditCell {...params} options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]} />
        },
        // affiliatePlatform
        {
            field: 'affiliatePlatform',
            headerName: 'Affiliate Platform',
            width: 200,
            editable: true,
            renderCell: (params) => params.row.affiliatePlatform.join(', '),
            renderEditCell: (params) => <MultipleTextInputEditCell {...params} />
        },
        // ageBracket
        {
            field: 'ageBracket',
            headerName: 'Age Bracket',
            width: 200,
            editable: true,
            renderCell: (params) => params.row.ageBracket.join(', '),
            renderEditCell: (params) => <MultipleTextInputEditCell {...params} />
        },
        // linktree
        { field: 'linktree', headerName: 'Linktree', width: 200, editable: true },
        // partnerUGCRate
        { field: 'partnerUGCRate', headerName: 'Partner UGC Rate', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // auditedJan2025
        {
            field: 'auditedJan2025',
            headerName: 'Audited Jan 2025',
            width: 200,
            editable: true,
            renderCell: (params) => params.row.auditedJan2025 ? 'Yes' : 'No',
            renderEditCell: (params) => <SelectEditCell {...params} options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]} />
        },
        // auditedJune2025
        {
            field: 'auditedJune2025',
            headerName: 'Audited June 2025',
            width: 200,
            editable: true,
            renderCell: (params) => params.row.auditedJune2025 ? 'Yes' : 'No',
            renderEditCell: (params) => <SelectEditCell {...params} options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]} />
        },
        // revoCounteroffer
        { field: 'revosCounteroffer', headerName: 'REVO Counter Offer', width: 200, editable: true },
        // openToWhitelisting
        {
            field: 'openToWhitelisting',
            headerName: 'Open to Whitelisting',
            width: 200,
            editable: true,
            renderCell: (params) => params.row.openToWhitelisting ? 'Yes' : 'No',
            renderEditCell: (params) => <SelectEditCell {...params} options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]} />
        },
        // levantaID
        { field: 'levantaID', headerName: 'Levanta ID', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // impactID
        { field: 'impactID', headerName: 'Impact ID', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // shareasaleID
        { field: 'shareasaleID', headerName: 'Shareasale ID', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // conversionsBundleCupper
        {
            field: 'conversionsBundleCupper',
            headerName: 'Conversions - Bundle Cupper',
            width: 250,
            type: 'number',
            editable: true,
        },
        // conversionsMassageGun
        {
            field: 'conversionsMassageGun',
            headerName: 'Conversions - Massage Gun',
            width: 250,
            type: 'number',
            editable: true,
        },
        // conversionsCupper
        { field: 'conversionsCupper', headerName: 'Conversions - Cupper', width: 200, type: 'number', editable: true },
        // conversionsOils
        { field: 'conversionsOils', headerName: 'Conversions - Oils', width: 200, type: 'number', editable: true },
        // conversionsWalkingPad
        {
            field: 'conversionsWalkingPad',
            headerName: 'Conversions - Walking Pad',
            width: 250,
            type: 'number',
            editable: true,
        },
        // amazonReviewWalkingPadPro
        { field: 'amazonReviewWalkingPadPro', headerName: 'Amazon Review - WP Pro', width: 250, editable: true },
        // amazonReviewWalkingPadStandard
        { field: 'amazonReviewWalkingPadStandard', headerName: 'Amazon Review - WP Standard', width: 250, editable: true },
        // amazonReviewOil
        { field: 'amazonReviewOil', headerName: 'Amazon Review - Oil', width: 200, editable: true },
        // amazonReviewSoothingCream
        { field: 'amazonReviewSoothingCream', headerName: 'Amazon Review - Cream', width: 250, editable: true },
        // amazonReviewBeautyWand
        { field: 'amazonReviewBeautyWand', headerName: 'Amazon Review - Beauty Wand', width: 250, editable: true },
        // stakeholders
        {
            field: 'stakeholders',
            headerName: 'Stakeholders',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getStakeHolderListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'stakeholders',
                defaultOptions: autoCompleteOptions.stakeholders,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // content-HQ
        {
            field: 'contentHQ',
            headerName: 'Content HQ',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getContentListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'contentHQ',
                defaultOptions: autoCompleteOptions.contentHQ,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // profileCategory
        // {
        //     field: 'profileCategory',
        //     headerName: 'Profile Category',
        //     width: 300,
        //     editable: true,
        //     renderCell: (params) => renderAutoCompleteCell(params.value),
        //     renderEditCell: renderAutoCompleteEditCell({
        //         fetchOptions: async (debounceValue) => {
        //             const paging = { page: 1, rowsPerPage: 20 };
        //             const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
        //             const res = await getContentListAsync(paging, filters, 'and');
        //             return (
        //                 res?.data?.map((item) => ({
        //                     label: item.name,
        //                     value: item.id,
        //                 })) || []
        //             );
        //         },
        //         name: 'profileCategory',
        //         defaultOptions: autoCompleteOptions.profileCategory,
        //         onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
        //         multiple: true,
        //     }),
        // },
        // portfolios
        {
            field: 'portfolios',
            headerName: 'Portfolios',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getPortfolioListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'portfolios',
                defaultOptions: autoCompleteOptions.portfolios,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // states
        {
            field: 'states',
            headerName: 'States',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getStateListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'states',
                defaultOptions: autoCompleteOptions.states,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // cities
        {
            field: 'cities',
            headerName: 'Cities',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getCityListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'cities',
                defaultOptions: autoCompleteOptions.cities,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // caseStudies
        {
            field: 'caseStudies',
            headerName: 'Case Studies',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getCaseStudyListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'caseStudies',
                defaultOptions: autoCompleteOptions.caseStudies,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // productionHQ
        {
            field: 'productionHQ',
            headerName: 'Production HQ',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getProductionListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'productionHQ',
                defaultOptions: autoCompleteOptions.productionHQ,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // products
        {
            field: 'products',
            headerName: 'Products',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getProductListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'products',
                defaultOptions: autoCompleteOptions.products,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // contributed Campaigns
        {
            field: 'contributedCampaigns',
            headerName: 'Contributed Campaigns',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getCampaignListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'contributedCampaigns',
                defaultOptions: autoCompleteOptions.contributedCampaigns,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // countries
        {
            field: 'countries',
            headerName: 'Countries',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getCountryListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'countries',
                defaultOptions: autoCompleteOptions.countries,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // tags
        {
            field: 'tags',
            headerName: 'Tags',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getTagListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'tags',
                defaultOptions: autoCompleteOptions.tags,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // retailPartners
        {
            field: 'retailPartners',
            headerName: 'Retail Partners',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getRetailPartnerListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'retailPartners',
                defaultOptions: autoCompleteOptions.retailPartners,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // destinations
        {
            field: 'destinations',
            headerName: 'Destinations',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getDestinationListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'destinations',
                defaultOptions: autoCompleteOptions.destinations,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // proposedCampaigns
        {
            field: 'proposedCampaigns',
            headerName: 'Proposed Campaigns',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getCampaignListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'proposedCampaigns',
                defaultOptions: autoCompleteOptions.proposedCampaigns,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // productionHQ2
        {
            field: 'productionHQ2',
            headerName: 'Production HQ2',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getProductionListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'productionHQ2',
                defaultOptions: autoCompleteOptions.productionHQ2,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
    ];

    const visibleFields = columns.filter(col => visibleColumns.some(visibleCol => visibleCol.columnName.charAt(0).toLowerCase() + visibleCol.columnName.slice(1) === col.field));

    return visibleFields;
}