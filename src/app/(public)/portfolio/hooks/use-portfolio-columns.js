import DateEditCell from '/src/components/data-table/date-edit-cell';
import { Box } from '@mui/material';
import Image from 'next/image';
import AttachFile from "@mui/icons-material/AttachFile";
import Link from 'next/link';
import React from 'react';
import { useMemo } from 'react';
import { getStateListAsync, getCountryListAsync, getCaseStudyListAsync } from '../../../../lib/common.actions';
import { renderAutoCompleteCell, renderAutoCompleteEditCell } from '/src/components/data-table/render-auto-complete-edit-cell';
import { getPortfolioCategoryListAsync } from '../_lib/portfolio.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';

export const usePortfolioColumns = (anchorEl, visibleColumns, setMediaToShow, handleUploadModalOpen) => {
    const [autocompleteFocus, setAutocompleteFocus] = React.useState({
        currentItem: '',
        prevItems: [],
    });

    const [autoCompleteOptions, setAutoCompleteOptions] = React.useState({
        portfolioCategories: [],
        partnerHQ: [],
        states: [],
        countries: [],
        caseStudies: [],
    });

    // --------------- Fetch Prerequisites Data -------------------
    const fetchFunctionsMap = {
        countries: getCountryListAsync,
        states: getStateListAsync,
        portfolioCategories: getPortfolioCategoryListAsync,
        partnerHQ: getPartnerListAsync,
        caseStudies: getCaseStudyListAsync,
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
                        label: item.name,
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

    const columns = useMemo(() => [
        { field: 'projectTitle', headerName: 'Project Title', width: 280, editable: true },
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
        {
            field: 'imageField',
            headerName: 'Image Field',
            width: 150,
            renderCell: (params) => {
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
                    {params.row.imageField.length > 0 && params.row.imageField.map((item, index) => <Image
                        key={index}
                        src={item}
                        alt="Image"
                        width={22}
                        height={22}
                        style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={(event) => {
                            anchorEl.current = event.currentTarget;
                            setMediaToShow({
                                type: 'image',
                                url: item,
                            });
                        }}
                    />)}

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
        {
            field: 'videoLink',
            headerName: 'Video URL',
            width: 200,
            editable: false,
            renderCell: (params) => {
                return (<Box
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
                    {params.row.videoLink &&
                        <Box
                            sx={{
                                cursor: 'pointer',
                                gap: 0.5,
                                width: 22,
                                height: 22,
                            }}
                            onClick={(event) => {
                                anchorEl.current = event.currentTarget;
                                setMediaToShow({
                                    type: 'video',
                                    url: params.row.videoLink[0],
                                });
                            }}
                        >
                            <video
                                src={params.row.videoLink[0]}
                                controls={false}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    }

                    <AttachFile
                        className="attach-icon"
                        titleAccess="Attach"
                        onClick={() => handleUploadModalOpen(params.row, params.field, false)}
                        sx={{
                            fontSize: 18,
                            cursor: 'pointer',
                            display: 'none',
                        }}
                    />
                </Box>)
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
                    position: 'relative',
                    '&:hover .attach-icon': {
                        display: 'inline-block',
                    },
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
                            setMediaToShow({
                                type: 'image',
                                url: item,
                            });
                        }}
                    />)}

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
                    position: 'relative',
                    '&:hover .attach-icon': {
                        display: 'inline-block',
                    },
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
                            setMediaToShow({
                                type: 'image',
                                url: item,
                            });
                        }}
                    />)}

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
                    position: 'relative',
                    '&:hover .attach-icon': {
                        display: 'inline-block',
                    },
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
                            setMediaToShow({
                                type: 'image',
                                url: item,
                            });
                        }}
                    />)}

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
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            editable: true,
            renderEditCell: (params) => <DateEditCell {...params} />,
        },
        { field: 'projectShortDescription', headerName: 'Short Description', width: 200, editable: true },
        { field: 'projectSinglePageFullDescription', headerName: 'Full Description', width: 300, editable: true },
        {
            field: "portfolioCategories",
            headerName: "Portfolio Category",
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const response = await getPortfolioCategoryListAsync(paging, filters);
                    return response.data;
                },
                defaultOptions: autoCompleteOptions.portfolioCategories,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                name: 'portfolioCategories',
                multiple: true,
            }),
        },
        {
            field: "partnerHQ",
            headerName: "Partner HQ",
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const response = await getPartnerListAsync(paging, filters);
                    return response.data;
                },
                defaultOptions: autoCompleteOptions.partnerHQ,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                name: 'partnerHQ',
                multiple: true,
            }),
        },
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
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: autoCompleteOptions.states,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                name: 'states',
                multiple: true,
            })
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getCountryListAsync(paging, filters, 'and');
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: autoCompleteOptions.countries,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                name: 'country',
                multiple: true,
            })
        },
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
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: autoCompleteOptions.caseStudies,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                name: 'caseStudies',
                multiple: true,
            })
        },
    ], [anchorEl, setMediaToShow, handleUploadModalOpen])

    const visibleFields = useMemo(() =>
        columns.filter(col =>
            visibleColumns?.some(
                visibleCol =>
                    visibleCol.columnName.charAt(0).toLowerCase() + visibleCol.columnName.slice(1) === col.field
            )
        ), [columns, visibleColumns]
    );

    return visibleFields;
}