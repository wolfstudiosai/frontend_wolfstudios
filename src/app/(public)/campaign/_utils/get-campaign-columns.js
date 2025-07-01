
import { Box } from '@mui/material';
import Image from 'next/image';
import AttachFile from "@mui/icons-material/AttachFile";
import { dateFormatter } from '/src/utils/date-formatter';
import { formatCompactNumber } from '/src/utils/helper';
import Link from 'next/link';
import DateEditCell from '/src/components/data-table/date-edit-cell';
import SelectEditCell from '/src/components/data-table/select-edit-cell';
import { campaignProgressStatus } from '/src/app/(public)/campaign/_lib/campaign.constants';

export const getCampaignColumns = (anchorEl, setImageToShow, handleUploadModalOpen, visibleColumns) => {
    const columns = [
        { field: 'name', headerName: 'Name', width: 280, editable: true },
        {
            field: 'campaignStatus',
            headerName: 'Campaign Status',
            width: 150,
            editable: true,
            renderEditCell: (params) => <SelectEditCell
                {...params}
                options={campaignProgressStatus}
                label="Campaign Status"
            />
        },
        {
            field: "campaignImage", headerName: "Campaign Image", width: 150, renderCell: (params) => {
                return (
                    <Box sx={{
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
                        {params.row.campaignImage.length > 0 && <Image
                            src={params.row.campaignImage}
                            alt="Campaign Image"
                            width={22}
                            height={22}
                            style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                            onClick={(event) => {
                                anchorEl.current = event.currentTarget;
                                setImageToShow(params.row.campaignImage);
                            }}
                        />}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            }
        },
        {
            field: "notes",
            headerName: "Notes",
            width: 200,
            editable: true,
        },
        {
            field: "campaignDescription",
            headerName: "Description",
            width: 200,
            editable: true,
        },
        {
            field: 'client',
            headerName: 'Client',
            width: 150,
            editable: true
        },
        {
            field: 'guidelines',
            headerName: 'Guidelines',
            width: 200,
            editable: true
        },
        {
            field: 'budget',
            headerName: 'Budget',
            width: 200, editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.budget)
        },
        {
            field: 'productExpense',
            headerName: 'Product Expense',
            width: 150,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.productExpense)
        },
        {
            field: 'imageInspirationGallery',
            headerName: 'Image Inspiration Gallery',
            width: 200,
            editable: true,
            renderCell: (params) => <Box sx={{ width: '100%', height: '100%', display: 'flex', gap: 0.5, alignItems: 'center' }}>
                {params.row.imageInspirationGallery.length > 0 && params.row.imageInspirationGallery.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt="Image Inspiration Gallery"
                        width={22}
                        height={22}
                        style={{ objectFit: 'cover', borderRadius: '2px' }}
                    />
                ))}
            </Box>
        },
        {
            field: 'videoInspirationGallery',
            headerName: 'Video Inspiration Gallery',
            width: 200,
            editable: false,
            renderCell: (params) => <Box sx={{ width: '100%', height: '100%', display: 'flex', gap: 0.5, alignItems: 'center' }}>
                {params.row.videoInspirationGallery.length > 0 && params.row.videoInspirationGallery.map((video, index) => (
                    <Box key={index} as={Link} href={video} target="_blank" sx={{ cursor: 'pointer' }}>Link</Box>
                ))}
            </Box>

        },
        {
            field: 'campaignROI',
            headerName: 'Campaign ROI',
            width: 150,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.campaignROI)
        },
        {
            field: 'totalExpense',
            headerName: 'Total Expense',
            width: 200,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.totalExpense)
        },
        {
            field: 'totalContentEngagement',
            headerName: 'Total Content Engagement',
            width: 200,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.totalContentEngagement)
        },
        {
            field: 'campaignGoals',
            headerName: 'Goals',
            width: 200,
            editable: false,
        },
        {
            field: 'contentHQ',
            headerName: 'Content HQ',
            width: 200,
            editable: false,
            valueGetter: (value, row) => row?.contentHQ?.map((content) => content?.label).join(', ')
        },
        {
            field: 'proposedPartners',
            headerName: 'Proposed Partners',
            width: 200,
            editable: false,
            valueGetter: (value, row) => row?.proposedPartners?.map((partner) => partner?.label).join(', ')
        },
        {
            field: 'stakeholders',
            headerName: 'Stakeholders',
            width: 200,
            editable: false,
            valueGetter: (value, row) => row?.stakeholders?.map((stakeholder) => stakeholder?.label).join(', ')
        },
        {
            field: 'retailPartners',
            headerName: 'Retail Partners',
            width: 200,
            editable: false,
            valueGetter: (value, row) => row?.retailPartners?.map((partner) => partner?.label).join(', ')
        },
        {
            field: 'spaces',
            headerName: 'Spaces',
            width: 180,
            editable: false,
            valueGetter: (value, row) => row?.spaces?.map((space) => space?.label).join(', ')
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            width: 180,
            editable: true,
            valueGetter: (value, row) => dateFormatter(row.startDate, 'YYYY-MM-DD'),
            renderEditCell: (params) => <DateEditCell {...params} format="YYYY-MM-DD" />
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            width: 180,
            editable: true,
            valueGetter: (value, row) => dateFormatter(row.endDate, 'YYYY-MM-DD'),
            renderEditCell: (params) => <DateEditCell {...params} format="YYYY-MM-DD" />
        },
    ]

    // const hiddenFields = columns.filter(col => !visibleColumns.some(visibleCol => visibleCol.columnName.charAt(0).toLowerCase() + visibleCol.columnName.slice(1) === col.field));

    const visibleFields = columns.filter(col => visibleColumns.some(visibleCol => visibleCol.columnName.charAt(0).toLowerCase() + visibleCol.columnName.slice(1) === col.field));

    return visibleFields;
}
