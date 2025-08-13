import React, { useMemo } from 'react';
import Image from 'next/image';
import AttachFile from '@mui/icons-material/AttachFile';
import { Box } from '@mui/material';

import DateEditCell from '/src/components/data-table/date-edit-cell';
import { dateFormatter } from '/src/utils/date-formatter';
import { MultipleTextInputEditCell } from '/src/components/data-table/multiple-text-input-edit';
import SelectEditCell from '/src/components/data-table/select-edit-cell';

import {
  renderAutoCompleteCell,
  renderAutoCompleteEditCell,
} from '../../../../components/data-table/render-auto-complete-edit-cell';
import {
  getCityListAsync,
  getProductListAsync,
  getRetailPartnerListAsync,
  getStakeHolderListAsync,
} from '../../../../actions/common.actions';
import { getContentListAsync } from '../../../(private)/all-content/_lib/all-content.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { getProductionListAsync } from '../../production/_lib/production.actions';
import { getSpaceListAsync } from '../../spaces/_lib/space.actions';
import { campaignProgressStatus } from '/src/app/(public)/campaign/_lib/campaign.constants';
import { formatCompactNumber } from '/src/utils/helper';

export const useCampaignColumns = (anchorEl, visibleColumns, setMediaToShow, handleUploadModalOpen) => {
  const [autocompleteFocus, setAutocompleteFocus] = React.useState({
    currentItem: '',
    prevItems: [],
  });

  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState({
    contentHQ: [],
    stakeholders: [],
    proposedPartners: [],
    retailPartners: [],
    retailPartners2: [],
    retailPartners3: [],
    spaces: [],
    productionHQ: [],
    products: [],
  });
  // --------------- Fetch Prerequisites Data -------------------
  const fetchFunctionsMap = {
    contentHQ: getContentListAsync,
    stakeholders: getCityListAsync,
    proposedPartners: getPartnerListAsync,
    retailPartners: getPartnerListAsync,
    retailPartners2: getPartnerListAsync,
    retailPartners3: getPartnerListAsync,
    spaces: getSpaceListAsync,
    productionHQ: getProductionListAsync,
    products: getProductListAsync,
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

  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Name', width: 280, editable: true },
      {
        field: 'campaignStatus',
        headerName: 'Campaign Status',
        width: 150,
        editable: true,
        valueFormatter: (value) => value.toLowerCase().charAt(0).toUpperCase() + value.toLowerCase().slice(1),
        renderEditCell: (params) => <SelectEditCell {...params} options={campaignProgressStatus} />,
      },
      {
        field: 'notes',
        headerName: 'Notes',
        width: 200,
        editable: true,
      },
      {
        field: 'campaignDescription',
        headerName: 'Description',
        width: 200,
        editable: true,
      },
      {
        field: 'client',
        headerName: 'Client',
        width: 150,
        editable: true,
      },
      {
        field: 'guidelines',
        headerName: 'Guidelines',
        width: 200,
        editable: true,
      },
      {
        field: 'thumbnailImage',
        headerName: 'Thumbnail Image',
        width: 150,
        renderCell: (params) => {
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
              {params.row?.thumbnailImage?.length > 0 && params?.row?.thumbnailImage?.[0] && (
                <Image
                  src={params?.row?.thumbnailImage?.[0]}
                  alt="Campaign Image"
                  width={22}
                  height={22}
                  style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                  onClick={(event) => {
                    anchorEl.current = event.currentTarget;
                    setMediaToShow({
                      type: 'image',
                      url: params?.row?.thumbnailImage?.[0],
                    });
                  }}
                />
              )}

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
      {
        field: 'imageInspirationGallery',
        headerName: 'Image Inspiration Gallery',
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
              {params?.row?.imageInspirationGallery?.length > 0 &&
                params?.row?.imageInspirationGallery?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt="Image Inspiration Gallery"
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
      {
        field: 'videoInspirationGallery',
        headerName: 'Video Inspiration Gallery',
        width: 200,
        editable: false,
        renderCell: (params) => (
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
            {params?.row?.videoInspirationGallery?.length > 0 &&
              params?.row?.videoInspirationGallery?.map((video, index) => (
                <Box
                  key={index}
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
                      url: video,
                    });
                  }}
                >
                  <video
                    src={video}
                    controls={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}

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
          </Box>
        ),
      },
      {
        field: 'budget',
        headerName: 'Budget',
        width: 200,
        editable: true,
        valueFormatter: (value) => formatCompactNumber(value),
      },
      {
        field: 'productExpense',
        headerName: 'Product Expense',
        width: 150,
        editable: true,
        valueFormatter: (value) => formatCompactNumber(value),
      },
      {
        field: 'campaignROI',
        headerName: 'Campaign ROI',
        width: 150,
        editable: true,
        valueFormatter: (value) => formatCompactNumber(value),
      },
      {
        field: 'totalExpense',
        headerName: 'Total Expense',
        width: 200,
        editable: true,
        valueFormatter: (value) => formatCompactNumber(value),
      },
      {
        field: 'totalContentEngagement',
        headerName: 'Total Content Engagement',
        width: 200,
        editable: true,
        valueFormatter: (value) => formatCompactNumber(value),
      },
      {
        field: 'campaignGoals',
        headerName: 'Goals',
        width: 300,
        editable: true,
        valueFormatter: (value) => value.join(', '),
        renderEditCell: (params) => <MultipleTextInputEditCell {...params} />,
      },
      // Content HQ
      {
        field: 'contentHQ',
        headerName: 'Content HQ',
        width: 300,
        editable: true,
        renderCell: (params) => renderAutoCompleteCell(params.value),
        renderEditCell: renderAutoCompleteEditCell({
          name: 'contentHQ',
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
          defaultOptions: autoCompleteOptions.contentHQ,
          onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
          multiple: true,
        }),
      },
      // Stakeholders
      {
        field: 'stakeholders',
        headerName: 'Stakeholders',
        width: 300,
        editable: true,
        renderCell: (params) => renderAutoCompleteCell(params.value),
        renderEditCell: renderAutoCompleteEditCell({
          name: 'stakeholders',
          fetchOptions: async (debounceValue) => {
            const paging = { page: 1, rowsPerPage: 20 };
            const res = await getStakeHolderListAsync(paging, debounceValue);
            return (
              res?.data?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            );
          },
          defaultOptions: autoCompleteOptions.stakeholders,
          onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
          multiple: true,
        }),
      },
      // Proposed Partners
      {
        field: 'proposedPartners',
        headerName: 'Proposed Partners',
        width: 300,
        editable: true,
        renderCell: (params) => renderAutoCompleteCell(params.value),
        renderEditCell: renderAutoCompleteEditCell({
          name: 'proposedPartners',
          fetchOptions: async (debounceValue) => {
            const paging = { page: 1, rowsPerPage: 20 };
            const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
            const res = await getPartnerListAsync(paging, filters, 'and');
            return (
              res?.data?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            );
          },
          defaultOptions: autoCompleteOptions.proposedPartners,
          onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
          multiple: true,
        }),
      },
      // Retail Partners
      {
        field: 'retailPartners',
        headerName: 'Retail Partners',
        width: 300,
        editable: true,
        renderCell: (params) => renderAutoCompleteCell(params.value),
        renderEditCell: renderAutoCompleteEditCell({
          name: 'retailPartners',
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
          defaultOptions: autoCompleteOptions.retailPartners,
          onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
          multiple: true,
        }),
      },
      // Reatail Partners 2
      {
        field: 'retailPartners2',
        headerName: 'Retail Partners 2',
        width: 300,
        editable: true,
        renderCell: (params) => renderAutoCompleteCell(params.value),
        renderEditCell: renderAutoCompleteEditCell({
          name: 'retailPartners2',
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
          defaultOptions: autoCompleteOptions.retailPartners2,
          onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
          multiple: true,
        }),
      },
      // Reatail Partners 3
      {
        field: 'retailPartners3',
        headerName: 'Retail Partners 3',
        width: 300,
        editable: true,
        renderCell: (params) => renderAutoCompleteCell(params.value),
        renderEditCell: renderAutoCompleteEditCell({
          name: 'retailPartners3',
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
          defaultOptions: autoCompleteOptions.retailPartners3,
          onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
          multiple: true,
        }),
      },
      // Contributed Partners
      {
        field: 'contributedPartners',
        headerName: 'Contributed Partners',
        width: 300,
        editable: true,
        renderCell: (params) => renderAutoCompleteCell(params.value),
        renderEditCell: renderAutoCompleteEditCell({
          name: 'contributedPartners',
          fetchOptions: async (debounceValue) => {
            const paging = { page: 1, rowsPerPage: 20 };
            const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
            const res = await getPartnerListAsync(paging, filters, 'and');
            return (
              res?.data?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            );
          },
          defaultOptions: autoCompleteOptions.retailPartners3,
          onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
          multiple: true,
        }),
      },
      // Production HQ
      {
        field: 'productionHQ',
        headerName: 'Production HQ',
        width: 300,
        editable: true,
        renderCell: (params) => renderAutoCompleteCell(params.value),
        renderEditCell: renderAutoCompleteEditCell({
          name: 'productionHQ',
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
          defaultOptions: autoCompleteOptions.productionHQ,
          onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
          multiple: true,
        }),
      },
      // Products
      {
        field: 'products',
        headerName: 'Product',
        width: 300,
        editable: true,
        renderCell: (params) => renderAutoCompleteCell(params.value),
        renderEditCell: renderAutoCompleteEditCell({
          name: 'products',
          fetchOptions: async (debounceValue) => {
            const paging = { page: 1, rowsPerPage: 20 };
            const res = await getProductListAsync(paging, debounceValue);
            return (
              res?.data?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            );
          },
          defaultOptions: autoCompleteOptions.products,
          onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
          multiple: true,
        }),
      },
      // Spaces
      {
        field: 'spaces',

        headerName: 'Spaces',
        width: 300,
        editable: true,
        renderCell: (params) => renderAutoCompleteCell(params.value),
        renderEditCell: renderAutoCompleteEditCell({
          name: 'spaces',
          fetchOptions: async (debounceValue) => {
            const paging = { page: 1, rowsPerPage: 20 };
            const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
            const res = await getSpaceListAsync(paging, filters, 'and');
            return (
              res?.data?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            );
          },
          defaultOptions: autoCompleteOptions.spaces,
          onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
          multiple: true,
        }),
      },
      {
        field: 'startDate',
        headerName: 'Start Date',
        width: 180,
        editable: true,
        valueGetter: (value, row) => dateFormatter(row.startDate, 'YYYY-MM-DD'),
        renderEditCell: (params) => <DateEditCell {...params} format="YYYY-MM-DD" />,
      },
      {
        field: 'endDate',
        headerName: 'End Date',
        width: 180,
        editable: true,
        valueGetter: (value, row) => dateFormatter(row.endDate, 'YYYY-MM-DD'),
        renderEditCell: (params) => <DateEditCell {...params} format="YYYY-MM-DD" />,
      },
    ],
    [anchorEl, setMediaToShow, handleUploadModalOpen]
  );

  const visibleFields = useMemo(
    () =>
      columns.filter((col) =>
        visibleColumns?.some(
          (visibleCol) => visibleCol.columnName.charAt(0).toLowerCase() + visibleCol.columnName.slice(1) === col.field
        )
      ),
    [columns, visibleColumns]
  );

  return visibleFields;
};
