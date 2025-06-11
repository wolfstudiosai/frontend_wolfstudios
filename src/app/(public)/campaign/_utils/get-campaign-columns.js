
import { Box } from '@mui/material';
import Image from 'next/image';
import AttachFile from "@mui/icons-material/AttachFile";
import { dateFormatter } from '/src/utils/date-formatter';
import { formatCompactNumber } from '/src/utils/helper';

export const getCampaignColumns = () => {
    return [
        { field: 'Name', headerName: 'Name', width: 280, editable: true },
        { field: 'CampaignStatus', headerName: 'Campaign Status', width: 150, editable: true },
        {
            field: "CampaignImage", headerName: "Campaign Image", width: 150, renderCell: (params) => {
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
                        {params.row.CampaignImage.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt="Campaign Image"
                                width={30}
                                height={30}
                                style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={(event) => {
                                    anchorEl.current = event.currentTarget;
                                    setImageToShow(image);
                                }}
                            />
                        ))}

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
            field: 'Budget',
            headerName: 'Budget',
            width: 200, editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.Budget)
        },
        {
            field: 'ProductExpense',
            headerName: 'Product Expense',
            width: 150,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.ProductExpense)
        },
        {
            field: 'CampaignROI',
            headerName: 'Campaign ROI',
            width: 150,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.CampaignROI)
        },
        {
            field: 'Client',
            headerName: 'Client',
            width: 150,
            editable: true
        },
        {
            field: 'TotalExpense',
            headerName: 'Total Expense',
            width: 200,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.TotalExpense)
        },
        {
            field: 'TotalContentEngagement',
            headerName: 'Total Revenue',
            width: 200,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.TotalContentEngagement)
        },
        {
            field: 'CampaignGoals',
            headerName: 'Campaign Goals',
            width: 200,
            editable: true,
            valueGetter: (value, row) => row.CampaignGoals.join(', ')
        },
        {
            field: 'StartDate',
            headerName: 'Created At',
            width: 180,
            editable: false,
            valueGetter: (value, row) => dateFormatter(value),
        },
    ];
}
