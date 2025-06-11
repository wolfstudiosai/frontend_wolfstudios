import { Box } from "@mui/material";
import Image from "next/image";
import AttachFile from "@mui/icons-material/AttachFile";
import { dateFormatter } from "/src/utils/date-formatter";

export const getProductionColumns = ({ anchorEl, setImageToShow, handleUploadModalOpen }) => {
    return [
        { field: 'ProjectTitle', headerName: 'Project Title', width: 280, editable: true },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            editable: true,
            valueGetter: (value, row) =>
                row.PortfolioCategoriesPortfolios?.map((item) => item.PortfolioCategories.Name).join(', '),
        },
        {
            field: 'Imagefield',
            headerName: 'Image',
            width: 180,
            renderCell: (params) =>
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
                    {params.row.Imagefield?.map((imageUrl, index) => <Image
                        key={index}
                        src={imageUrl}
                        alt="Production"
                        width={30}
                        height={30}
                        style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={(event) => {
                            anchorEl.current = event.currentTarget;
                            setImageToShow(imageUrl);
                        }}
                    />)}
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
        },
        { field: 'VideoLink', headerName: 'Video URL', width: 200, editable: true },
        {
            field: 'Date',
            headerName: 'Date',
            width: 150,
            editable: true,
            valueGetter: (value, row) => dateFormatter(value),
        },
        { field: 'Projectshortdescription', headerName: 'Short Description', width: 200, editable: true },
        { field: 'Projectsinglepagefulldescription', headerName: 'Full Description', width: 300, editable: true },
        {
            field: 'state',
            headerName: 'State',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row.ByStatesPortfolios?.map((item) => item.ByStates.Name).join(', '),
        },
        {
            field: 'partner_hq',
            headerName: 'Partner HQ',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row.PartnerHQPortfolios?.map((item) => item.PartnerHQ.Name).join(', '),
        },
        // { field: 'user_id', headerName: 'User ID', width: 150, editable: true },
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
