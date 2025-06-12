import { dateFormatter } from '/src/utils/date-formatter';
import DateEditCell from '/src/components/data-table/date-edit-cell';
import { Box } from '@mui/material';
import Image from 'next/image';
import AttachFile from "@mui/icons-material/AttachFile";

export const getPortfolioColumns = (anchorEl, setImageToShow, handleUploadModalOpen) => {
    return [
        { field: 'projectTitle', headerName: 'Project Title', width: 280, editable: true },
        {
            field: 'imagefield', headerName: 'Image', width: 150, renderCell: (params) => {
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
                    {params.row.imagefield.length > 0 && params.row.imagefield.map((item, index) => <Image
                        key={index}
                        src={item}
                        alt="Image"
                        width={30}
                        height={30}
                        style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={(event) => {
                            anchorEl.current = event.currentTarget;
                            setImageToShow(item);
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
            }
        },
        { field: 'videoLink', headerName: 'Video URL', width: 200, editable: true },
        // { field: 'hero_image', headerName: 'Hero Image', width: 150, editable: true },
        // { field: 'field_image', headerName: 'Field Image', width: 150, editable: true },
        // { field: 'thumbnail', headerName: 'Thumbnail', width: 150, editable: true },
        // { field: 'vertical_gallery_images', headerName: 'Vertical Gallery Images', width: 200, editable: true },
        // { field: 'horizontal_gallery_images', headerName: 'Horizontal Gallery Images', width: 200, editable: true },
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            editable: true,
            renderEditCell: (params) => <DateEditCell {...params} />,
        },
        {
            field: 'portfolioCategories',
            headerName: 'Category',
            width: 150,
            editable: true,
            valueGetter: (value, row) =>
                row?.portfolioCategories?.map((item) => item?.label).join(', '),
        },
        { field: 'shortDescription', headerName: 'Short Description', width: 200, editable: true },
        { field: 'fullDescription', headerName: 'Full Description', width: 300, editable: true },
        {
            field: 'state',
            headerName: 'State',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row?.states?.map((item) => item?.label).join(', '),
        },
        {
            field: 'partner_hq',
            headerName: 'Partner HQ',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row?.partnerHQ?.map((item) => item?.label).join(', '),
        },
        // { field: 'user_id', headerName: 'User ID', width: 150, editable: true },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 180,
            editable: true,
            valueGetter: (value, row) => dateFormatter(row?.created_at),
        },
    ];
}