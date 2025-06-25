import DateEditCell from '/src/components/data-table/date-edit-cell';
import { Box } from '@mui/material';
import Image from 'next/image';
import AttachFile from "@mui/icons-material/AttachFile";
import Link from 'next/link';

export const getPortfolioColumns = (anchorEl, setImageToShow, handleUploadModalOpen, visibleColumns) => {
    const columns = [
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
                        width={22}
                        height={22}
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
        {
            field: 'videoLink',
            headerName: 'Video URL',
            width: 200,
            editable: false,
            renderCell: (params) => <Box as={Link} sx={{ cursor: 'pointer' }} href={params.row.videoLink} target="_blank" rel="noopener noreferrer">{params.row.videoLink}
            </Box>
        },
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
            valueGetter: (value, row) => {
                return row?.portfolioCategories?.map((item) => item?.label).join(', ');
            }
        },
        {
            field: 'singlePageHeroImage',
            headerName: 'Single Page Hero Image',
            width: 150,
            renderCell: (params) => {
                return <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    width: '100%',
                    height: '100%',
                }}>
                    {params.row.singlePageHeroImage.length > 0 && params.row.singlePageHeroImage.map((item, index) => <Image
                        key={index}
                        src={item}
                        alt="Image"
                        width={22}
                        height={22}
                        style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={(event) => {
                            anchorEl.current = event.currentTarget;
                            setImageToShow(item);
                        }}
                    />)}
                </Box>
            }
        },
        {
            field: 'thumbnailImage',
            headerName: 'Thumbnail Image',
            width: 150,
            renderCell: (params) => {
                return <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    width: '100%',
                    height: '100%',
                }}>
                    {params.row.thumbnailImage.length > 0 && params.row.thumbnailImage.map((item, index) => <Image
                        key={index}
                        src={item}
                        alt="Image"
                        width={22}
                        height={22}
                        style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={(event) => {
                            anchorEl.current = event.currentTarget;
                            setImageToShow(item);
                        }}
                    />)}
                </Box>
            }
        },
        {
            field: 'verticalImageGallery',
            headerName: 'Vertical Image Gallery',
            width: 150,
            renderCell: (params) => {
                return <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    width: '100%',
                    height: '100%',
                }}>
                    {params.row.verticalImageGallery.length > 0 && params.row.verticalImageGallery.map((item, index) => <Image
                        key={index}
                        src={item}
                        alt="Image"
                        width={22}
                        height={22}
                        style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={(event) => {
                            anchorEl.current = event.currentTarget;
                            setImageToShow(item);
                        }}
                    />)}
                </Box>
            }
        },
        {
            field: 'horizontalImageGallery',
            headerName: 'Horizontal Image Gallery',
            width: 150,
            renderCell: (params) => {
                return <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    width: '100%',
                    height: '100%',
                }}>
                    {params.row.horizontalImageGallery.length > 0 && params.row.horizontalImageGallery.map((item, index) => <Image
                        key={index}
                        src={item}
                        alt="Image"
                        width={22}
                        height={22}
                        style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={(event) => {
                            anchorEl.current = event.currentTarget;
                            setImageToShow(item);
                        }}
                    />)}
                </Box>
            }
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
            field: 'countries',
            headerName: 'Countries',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row?.countries?.map((item) => item?.label).join(', '),
        },
        {
            field: 'partner_hq',
            headerName: 'Partner HQ',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row?.partnerHQ?.map((item) => item?.label).join(', '),
        },
        // { field: 'user_id', headerName: 'User ID', width: 150, editable: true },
    ];

    const hiddenFields = columns.filter(col => !visibleColumns.some(visibleCol => visibleCol.columnName.charAt(0).toLowerCase() + visibleCol.columnName.slice(1) === col.field));

    const visibleFields = columns.filter(col => visibleColumns.some(visibleCol => visibleCol.columnName.charAt(0).toLowerCase() + visibleCol.columnName.slice(1) === col.field));

    return visibleFields;
}