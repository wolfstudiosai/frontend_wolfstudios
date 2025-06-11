
import { Box } from '@mui/material';
import Image from 'next/image';
import AttachFile from "@mui/icons-material/AttachFile";
import { dateFormatter } from '/src/utils/date-formatter';
import { formatCompactNumber } from '/src/utils/helper';

export const getCampaignColumns = (anchorEl, setImageToShow, handleUploadModalOpen) => {
    return [
        { field: 'name', headerName: 'Name', width: 280, editable: true },
        { field: 'status', headerName: 'Campaign Status', width: 150, editable: true },
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
                            width={30}
                            height={30}
                            style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
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
            field: "description",
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
            headerName: 'Total Revenue',
            width: 200,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.totalContentEngagement)
        },
        {
            field: 'goals',
            headerName: 'Campaign Goals',
            width: 200,
            editable: true,
        },
        {
            field: 'startDate',
            headerName: 'Created At',
            width: 180,
            editable: false,
            valueGetter: (value, row) => dateFormatter(row?.startDate),
        },
    ];
}
