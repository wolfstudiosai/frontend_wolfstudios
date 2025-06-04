import Image from "next/image";
import Box from "@mui/material/Box";
import AttachFile from "@mui/icons-material/AttachFile";

export const getPartnerColumns = ({ anchorEl, setImageToShow, setOpenImageUploadDialog }) => {
    return [
        { field: 'name', headerName: 'Name', width: 280, editable: true },
        {
            field: 'profileImage',
            headerName: 'Image',
            width: 180,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                const imageArray = params.row.profileImage;
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            '&:hover .attach-icon': {
                                display: 'inline-block',
                            },
                        }}
                    >
                        {imageArray.length > 0 && (
                            imageArray.map(imageUrl => <Image
                                key={imageUrl}
                                src={imageUrl}
                                alt="Partner"
                                width={30}
                                height={30}
                                style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={(event) => {
                                    anchorEl.current = event.currentTarget;
                                    setImageToShow(imageUrl);
                                }}
                            />)
                        )}
                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => setOpenImageUploadDialog(true)}
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
        { field: 'email', headerName: 'Email', width: 250, editable: true },
        { field: 'journeyStep', headerName: 'Journey Step', width: 200, editable: true },
        { field: 'notes', headerName: 'Notes', width: 300, editable: true },
        { field: 'hourlyRate', headerName: 'Hourly Rate', width: 150, editable: true },
        { field: 'bookingLink', headerName: 'Booking Link', width: 250, editable: true },
        { field: 'linkedinConnections', headerName: 'LinkedIn Connections', width: 200, editable: true },
        { field: 'website', headerName: 'Website', width: 250, editable: true },
        { field: 'medium', headerName: 'Medium', width: 200, editable: true },
        { field: 'soundcloud', headerName: 'SoundCloud', width: 200, editable: true },
        { field: 'spotify', headerName: 'Spotify', width: 200, editable: true },
        { field: 'opentoGifting', headerName: 'Open to Gifting', width: 200, editable: true },
        { field: 'occupation', headerName: 'Occupation', width: 200, editable: true },
        { field: 'client', headerName: 'Client', width: 200, editable: true },
        { field: 'linkedin', headerName: 'LinkedIn', width: 250, editable: true },
        { field: 'mailingAddress', headerName: 'Mailing Address', width: 300, editable: true },
        { field: 'phone', headerName: 'Phone', width: 200, editable: true },
        { field: 'podcast', headerName: 'Podcast', width: 200, editable: true },
        { field: 'refusalReason', headerName: 'Refusal Reason', width: 250, editable: true },
        { field: 'revoAmazonOrderConfirmationNumber', headerName: 'Amazon Order No.', width: 250, editable: true },
        { field: 'amazonReviewLink', headerName: 'Amazon Review Link', width: 250, editable: true },
        { field: 'deliverables', headerName: 'Deliverables', width: 250, editable: true },
        { field: 'googleDriveFiles', headerName: 'Google Drive Files', width: 250, editable: true },
        { field: 'revoIGPost', headerName: 'REVO IG Post', width: 200, editable: true },
        { field: 'partnerIGRate', headerName: 'Partner IG Rate', width: 200, editable: true },
        { field: 'partnerTTRate', headerName: 'Partner TT Rate', width: 200, editable: true },
        { field: 'partnerYTRate', headerName: 'Partner YT Rate', width: 200, editable: true },
        { field: 'amountPaid', headerName: 'Amount Paid', width: 150, editable: true },
        { field: 'totalContributedEngagementByContent', headerName: 'Total Engagement', width: 200, editable: true },
        { field: 'totalAudience', headerName: 'Total Audience', width: 200, editable: true },
        { field: 'previousCollabExpense', headerName: 'Previous Collab Expense', width: 220, editable: true },
        { field: 'revoOffer', headerName: 'REVO Offer', width: 200, editable: true },
        { field: 'remainingCredits', headerName: 'Remaining Credits', width: 200, type: 'number', editable: true },
        { field: 'ttPost', headerName: 'TT Post', width: 200, editable: true },
        { field: 'totalROI', headerName: 'Total ROI', width: 150, editable: true },
        { field: 'ugcPaymentStatus', headerName: 'UGC Payment Status', width: 200, editable: true },
        { field: 'ugcRetainerAmount', headerName: 'UGC Retainer Amount', width: 200, type: 'number', editable: true },
        { field: 'ugcTikTokLink', headerName: 'UGC TikTok Link', width: 250, editable: true },
        { field: 'revoUGCArmyTTUsernamePW', headerName: 'REVO UGC TT Username/PW', width: 250, editable: true },
        { field: 'whatsApp', headerName: 'WhatsApp', width: 200, editable: true },
        { field: 'ytPost', headerName: 'YT Post', width: 200, editable: true },
        { field: 'partnerPostViews', headerName: 'Partner Post Views', width: 200, type: 'number', editable: true },
        { field: 'estimatedTaxes', headerName: 'Estimated Taxes', width: 200, editable: true },
        { field: 'fbaXLevanta', headerName: 'FBA x Levanta', width: 180, type: 'number', editable: true },
        { field: 'shippingFBAFeeGiftedPartners', headerName: 'Shipping Fee FBA', width: 220, editable: true },
        { field: 'levantaAffiliateFee', headerName: 'Levanta Affiliate Fee', width: 200, editable: true },
        { field: 'paypalFee', headerName: 'Paypal Fee', width: 150, editable: true },
        { field: 'shippingExpense', headerName: 'Shipping Expense', width: 200, editable: true },
        { field: 'amazonReferralFee', headerName: 'Amazon Referral Fee', width: 200, editable: true },
        { field: 'amazonOrderTotal', headerName: 'Amazon Order Total', width: 200, editable: true },
        { field: 'amazonTax', headerName: 'Amazon Tax', width: 150, editable: true },
        { field: 'amazonKickback', headerName: 'Amazon Kickback', width: 200, editable: true },
        { field: 'monthSourced', headerName: 'Month Sourced', width: 180, editable: true },
        { field: 'secondPaymentDate', headerName: 'Second Payment Date', width: 200, editable: true },
        { field: 'clientStatus', headerName: 'Client Status', width: 200, editable: true },
        { field: 'linktree', headerName: 'Linktree', width: 200, editable: true },
        { field: 'partnerUGCRate', headerName: 'Partner UGC Rate', width: 200, editable: true },
        { field: 'partner360Rate', headerName: 'Partner 360 Rate', width: 200, editable: true },
        { field: 'revoCounteroffer', headerName: 'REVO Counteroffer', width: 200, editable: true },
        { field: 'opentoWhitelisting', headerName: 'Open to Whitelisting', width: 200, editable: true },
        {
            field: 'conversionsBundleCupper',
            headerName: 'Conversions - Bundle Cupper',
            width: 250,
            type: 'number',
            editable: true,
        },
        {
            field: 'conversionsMassageGun',
            headerName: 'Conversions - Massage Gun',
            width: 250,
            type: 'number',
            editable: true,
        },
        { field: 'conversionsCupper', headerName: 'Conversions - Cupper', width: 200, type: 'number', editable: true },
        { field: 'conversionsOils', headerName: 'Conversions - Oils', width: 200, type: 'number', editable: true },
        {
            field: 'conversionsWalkingPad',
            headerName: 'Conversions - Walking Pad',
            width: 250,
            type: 'number',
            editable: true,
        },
        { field: 'amazonReviewWalkingPadPro', headerName: 'Amazon Review - WP Pro', width: 250, editable: true },
        { field: 'amazonReviewWalkingPadStandard', headerName: 'Amazon Review - WP Standard', width: 250, editable: true },
        { field: 'amazonReviewOil', headerName: 'Amazon Review - Oil', width: 200, editable: true },
        { field: 'amazonReviewSoothingCream', headerName: 'Amazon Review - Cream', width: 250, editable: true },
        { field: 'amazonReviewBeautyWand', headerName: 'Amazon Review - Beauty Wand', width: 250, editable: true },
        { field: 'paymentLink', headerName: 'Payment Link', width: 250, editable: true },
    ];
}