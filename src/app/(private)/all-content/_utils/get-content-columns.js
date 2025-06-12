import DateEditCell from '/src/components/data-table/date-edit-cell';
import { dateFormatter } from '/src/utils/date-formatter';

export const getContentColumns = () => {
    return [
        { field: 'name', headerName: 'Name', width: 280, editable: true },
        {
            field: 'postQuality',
            headerName: 'Posting Quality',
            width: 150,
            editable: true,
            valueGetter: (value, row) => value,
        },
        { field: 'googleDriveFiles', headerName: 'Google Drive Files', width: 200, editable: true },
        { field: 'playbookLink', headerName: 'Playbook Link', width: 200, editable: true },
        { field: 'assetStatus', headerName: 'Asset Status', width: 120, editable: true },
        {
            field: 'monthUploaded',
            headerName: 'Month Uploaded',
            width: 150,
            editable: true,
            renderEditCell: (params) => <DateEditCell {...params} format="MMMM YYYY" />
        },

        // Pinterest
        { field: 'revoPinterest', headerName: 'Pinterest Status', width: 150, editable: true },
        { field: 'pinAccountsUsed', headerName: 'Pinterest Accounts Used', width: 200, editable: true },
        { field: 'creatorStatus', headerName: 'Creator Status', width: 150, editable: true },
        { field: 'revoInstagram', headerName: 'Instagram Status', width: 150, editable: true },
        { field: 'pinterest_TotalPinClicks', headerName: 'Pinterest Pin Clicks', type: 'number', width: 150, editable: true },
        { field: 'pinterest_TotalViews', headerName: 'Pinterest Views', type: 'number', width: 150, editable: true },

        // Instagram
        { field: 'ig_TotalLikes', headerName: 'Instagram Likes', type: 'number', width: 150, editable: true },
        { field: 'ig_TotalComments', headerName: 'Instagram Comments', type: 'number', width: 150, editable: true },
        { field: 'ig_TotalShares', headerName: 'Instagram Shares', type: 'number', width: 150, editable: true },
        { field: 'ig_TotalViews', headerName: 'Instagram Views', type: 'number', width: 150, editable: true },
        { field: 'ig_SocialSetsUsed', headerName: 'Instagram Social Sets Used', width: 200, editable: true },
        { field: 'partner_IGLink', headerName: 'Partner Instagram Link', width: 200, editable: true },

        // TikTok
        { field: 'revo_TikTok', headerName: 'TikTok Status', width: 150, editable: false },
        { field: 'revo_TTViews', headerName: 'TikTok REVO Views', type: 'number', width: 150, editable: true },
        { field: 'tikTokAccountsused', headerName: 'TikTok Accounts Used', width: 200, editable: true },
        { field: 'partner_TikTokLink', headerName: 'Partner TikTok Link', width: 200, editable: true },
        { field: 'partner_TTLikes', headerName: 'Partner TikTok Likes', type: 'number', width: 150, editable: true },
        { field: 'partner_TTComments', headerName: 'Partner TikTok Comments', type: 'number', width: 150, editable: true },
        { field: 'partner_TTShares', headerName: 'Partner TikTok Shares', type: 'number', width: 150, editable: true },
        { field: 'partner_TTViews', headerName: 'Partner TikTok Views', type: 'number', width: 150, editable: true },
        { field: 'partner_TTSaves', headerName: 'Partner TikTok Saves', type: 'number', width: 150, editable: true },
        {
            field: 'ttDummyAccountsUsed',
            headerName: 'TikTok Dummy Account Used',
            width: 200,
            editable: true,
            valueGetter: (value, row) => row,
        },

        // YouTube
        { field: 'yt_AccountsUsed', headerName: 'YouTube Account Used', width: 200, editable: true },
        { field: 'partner_YTLink', headerName: 'Partner YouTube Link', width: 200, editable: true },
        { field: 'yt_PartnerTotalLikes', headerName: 'Partner YouTube Likes', type: 'number', width: 150, editable: true },
        {
            field: 'yt_PartnerTotalComments',
            headerName: 'Partner YouTube Comments',
            type: 'number',
            width: 150,
            editable: true,
        },
        { field: 'yt_PartnerTotalViews', headerName: 'Partner YouTube Views', type: 'number', width: 150, editable: true },
        { field: 'yt_PartnerTotalSaves', headerName: 'Partner YouTube Saves', type: 'number', width: 150, editable: true },
        { field: 'revo_ClubRevoYoutube', headerName: 'Club REVO YouTube Status', width: 200, editable: true },
        { field: 'revo_Youtube', headerName: 'YouTube REVO Status', width: 200, editable: true },
        { field: 'yt_ClubREVOTotalLikes', headerName: 'YouTube Club REVO Likes', type: 'number', width: 150, editable: true },
        {
            field: 'yt_ClubREVOTotalViews',
            headerName: 'YouTube Club REVO Views',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'yt_REVOMADICTotalLikes',
            headerName: 'YouTube REVOMADIC Likes',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'yt_REVOMADICTotalComments',
            headerName: 'YouTube REVOMADIC Comments',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'yt_REVOMADICTotalShares',
            headerName: 'YouTube REVOMADIC Shares',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'yt_REVOMADICTotalViews',
            headerName: 'YouTube REVOMADIC Views',
            type: 'number',
            width: 150,
            editable: true,
        },

        // Other Fields
        { field: 'upPromoteConversion', headerName: 'Uppromote Conversion', type: 'number', width: 150, editable: true },
        { field: 'postingStatus', headerName: 'Posting Status', width: 150, editable: false },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 180,
            editable: true,
            valueGetter: (value, row) => dateFormatter(value),
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            width: 180,
            editable: true,
            valueGetter: (value, row) => dateFormatter(value),
        },
    ];
}