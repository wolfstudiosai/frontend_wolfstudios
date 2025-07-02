'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import TableReorderIcon from '@mui/icons-material/Reorder';
import { alpha, Button, Checkbox, FormControlLabel, FormGroup, IconButton, Popover, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { toast } from 'sonner';

import TableFilterBuilder from '/src/components/common/table-filter-builder';
import TableSortBuilder from '/src/components/common/table-sort-builder';
import TableView from '/src/components/common/table-view';
import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';
import { MediaUploader } from '/src/components/uploaders/media-uploader';

import {
  createCampaignAsync,
  createCampaignView,
  deleteCampaignBulkAsync,
  getCampaignListAsync,
  getCampaignViews,
  getSingleCampaignView,
  updateCampaignAsync,
  updateCampaignView,
} from '../_lib/campaign.actions';
import { defaultCampaign } from '../_lib/campaign.types';
import { getCampaignColumns } from '../_utils/get-campaign-columns';

export const CampaignListView = () => {
  const theme = useTheme();
  const router = useRouter();
  const anchorEl = React.useRef(null);
  const [anchorElHide, setAnchorElHide] = React.useState(null);
  const [imageToShow, setImageToShow] = React.useState(null);
  const [imageUpdatedField, setImageUpdatedField] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const viewId = searchParams.get('view');

  const handleUploadModalOpen = (data, field) => {
    setOpen(true);
    setImageUpdatedField(field);
    setUpdatedRow(data);
  };

  const handleClosePopover = () => {
    anchorEl.current = null;
    setImageToShow(null);
  };

  const handleClosePopoverHide = () => {
    setAnchorElHide(null);
    setSearchColumns(allColumns);
  };

  // handle upload image
  const handleUploadImage = async (images) => {
    try {
      const finalData = {
        ...updatedRow,
      };

      const arrayFields = [
        'contentHQ',
        'stakeholders',
        'retailPartners',
        'proposedPartners',
        'contributedPartners',
        'spaces',
        'productionHQ',
        'products',
        'retailPartners2',
        'retailPartners3',
      ];

      for (const field of arrayFields) {
        const value = updatedRow[field];
        if (value.length > 0) {
          const arrOfStr = value.map((item) => item.value);
          finalData[field] = arrOfStr;
        }
      }

      if (finalData.campaignGoals && typeof finalData.campaignGoals === 'string') {
        finalData.campaignGoals = finalData.campaignGoals.split(',').map((item) => item.trim());
      }

      console.log({ ...finalData, [imageUpdatedField]: images });

      const response = await updateCampaignAsync(updatedRow.id, { ...finalData, [imageUpdatedField]: images });
      if (response.success) {
        toast.success('Campaign updated successfully');
        setOpen(false);
        getSingleView(viewId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [updatedRow, setUpdatedRow] = React.useState(null);

  // View
  const [showView, setShowView] = React.useState(false);
  const [views, setViews] = React.useState([]);
  const [viewsLoading, setViewsLoading] = React.useState(false);
  const [selectedViewId, setSelectedViewId] = React.useState(null);
  const [selectedViewData, setSelectedViewData] = React.useState(null);

  // filter
  const [metaData, setMetaData] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [gate, setGate] = React.useState('and');
  const [sort, setSort] = React.useState([]);

  // table columns
  const [allColumns, setAllColumns] = React.useState([]);
  const [visibleColumns, setVisibleColumns] = React.useState([]);
  const [searchColumns, setSearchColumns] = React.useState([]);
  const columns = React.useMemo(
    () => getCampaignColumns(anchorEl, setImageToShow, handleUploadModalOpen, visibleColumns),
    [visibleColumns]
  );

  // get single view
  const getSingleView = async (viewId, paginationProps) => {
    try {
      setLoading(true);
      const viewPagination = paginationProps ? paginationProps : pagination;
      const res = await getSingleCampaignView(viewId, viewPagination);

      if (res.success) {
        console.log(res.data.data);
        setRecords(res.data.data.map((row) => defaultCampaign(row)) || []);
        setTotalRecords(res.data.count);
        setSelectedViewData(res.data);
        setFilters(res.data.meta?.filters || []);
        setGate(res.data.meta?.gate || 'and');
        setSort(res.data.meta?.sort || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function updateView(props) {
    const viewFilters = props.filters ? props.filters : filters;
    const viewSort = props.sort ? props.sort : sort;
    const data = {
      label: selectedViewData?.meta?.label,
      description: selectedViewData?.meta?.description,
      table: selectedViewData?.meta?.table,
      isPublic: selectedViewData?.meta?.isPublic,
      columns: selectedViewData?.meta?.columns,
      gate,
      filters: viewFilters,
      sort: viewSort,
      groups: selectedViewData?.meta?.groups,
    };
    const result = await updateCampaignView(viewId, data);
    return result;
  }

  // ******************************data grid handler starts*********************

  // handle pagination model change
  const handlePaginationModelChange = (newPaginationModel) => {
    const { page, pageSize } = newPaginationModel;
    const newPagination = { pageNo: page + 1, limit: pageSize };
    setPagination(newPagination);
    if (viewId) {
      getSingleView(viewId, newPagination);
    }
  };

  // process row update
  const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

    const isTemporaryId = typeof newRow.id === 'string' && newRow.id.startsWith('temp_');

    if (isTemporaryId) {
      if (!newRow.name) {
        toast.error('Please enter name');
        return newRow;
      }

      if (!newRow.campaignStatus) {
        toast.error('Please select campaign status');
        return newRow;
      }

      if (!newRow.notes) {
        toast.error('Please enter notes');
        return newRow;
      }

      if (!newRow.campaignDescription) {
        toast.error('Please enter description');
        return newRow;
      }

      if (!newRow.client) {
        toast.error('Please enter client');
        return newRow;
      }

      if (!newRow.guidelines) {
        toast.error('Please enter guidelines');
        return newRow;
      }

      await createCampaignAsync(newRow);
      getSingleView(viewId);
    } else {
      const finalData = {
        ...newRow,
      };

      const imageFields = ['campaignImage', 'imageInspirationGallery'];
      for (const field of imageFields) {
        const value = newRow[field];
        if (value instanceof File) {
          const res = await imageUploader(
            [
              {
                file: value,
                fileName: value.name.split('.').slice(0, -1).join('.'),
                fileType: value.type.split('/')[1],
              },
            ],
            'campaigns'
          );

          finalData[field] = res;
        } else if (typeof value === 'string') {
          finalData[field] = [value];
        }
      }

      const arrayFields = [
        'contentHQ',
        'stakeholders',
        'retailPartners',
        'proposedPartners',
        'contributedPartners',
        'spaces',
        'productionHQ',
        'products',
        'retailPartners2',
        'retailPartners3',
      ];

      // process array fields
      for (const field of arrayFields) {
        const value = newRow[field];
        if (value.length > 0) {
          const arrOfStr = value.map((item) => item.value);
          finalData[field] = arrOfStr;
        }
      }

      const numericFields = ['totalContentEngagement', 'budget', 'totalExpense', 'campaignROI', 'productExpense'];
      for (const field of numericFields) {
        const value = newRow[field];
        if (value) {
          finalData[field] = Number(value);
        }
      }

      if (finalData.campaignGoals && typeof finalData.campaignGoals === 'string') {
        finalData.campaignGoals = finalData.campaignGoals.split(',').map((item) => item.trim());
      }

      await updateCampaignAsync(newRow.id, finalData);
      getSingleView(viewId);
    }

    return newRow;
  }, []);

  // handle row selection
  const handleRowSelection = (newRowSelectionModel) => {
    const selectedData = newRowSelectionModel.map((id) => records.find((row) => row.id === id));
    setSelectedRows(selectedData);
  };

  // handle process row update error
  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log({ children: error.message, severity: 'error' });
  }, []);

  // ******************************data grid handler ends*********************

  // handle add new item
  const handleAddNewItem = () => {
    const tempId = `temp_${Date.now()}`;
    const newRecord = { ...defaultCampaign(), id: tempId };
    setRecords([newRecord, ...records]);
  };

  // handle row delete
  const handleDelete = async () => {
    getSingleView(viewId);
  };

  // Column handler
  // handle column change
  const handleColumnChange = async (e, col) => {
    let newVisibleColumns = [];
    if (e.target.checked) {
      // Add column
      const exists = visibleColumns.some((c) => c.columnName === col.columnName);
      if (exists) return;
      newVisibleColumns = [...visibleColumns, col];
    } else {
      // Remove column
      newVisibleColumns = visibleColumns.filter((c) => c.columnName !== col.columnName);
    }
    setVisibleColumns(newVisibleColumns);

    if (viewId) {
      const data = {
        columns: newVisibleColumns.map((c) => c.columnName),
        label: selectedViewData?.meta?.label,
        description: selectedViewData?.meta?.description,
        table: selectedViewData?.meta?.table,
        isPublic: selectedViewData?.meta?.isPublic,
        gate,
        filters,
        sort,
        groups: selectedViewData?.meta?.groups,
      };

      const res = await updateCampaignView(viewId, data);
      if (res.success) {
        getSingleView(viewId);
      }
    }
  };

  // handle Column Search
  const handleColumnSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchColumns(allColumns.filter((col) => col.label.toLowerCase().includes(searchValue)));
  };

  // handle show all columns
  const showAllColumns = async () => {
    const newVisibleColumns = allColumns;
    setVisibleColumns(newVisibleColumns);

    if (viewId) {
      const data = {
        columns: allColumns.map((c) => c.columnName),
        label: selectedViewData?.meta?.label,
        description: selectedViewData?.meta?.description,
        table: selectedViewData?.meta?.table,
        isPublic: selectedViewData?.meta?.isPublic,
        gate,
        filters,
        sort,
        groups: selectedViewData?.meta?.groups,
      };

      const res = await updateCampaignView(viewId, data);
      if (res.success) {
        getSingleView(viewId);
      }
    }
  };

  // handle hide all columns
  const hideAllColumns = async () => {
    const newVisibleColumns = visibleColumns.filter((col) => col.columnName === 'id');
    setVisibleColumns(newVisibleColumns);

    if (viewId) {
      const data = {
        columns: ['id'],
        label: selectedViewData?.meta?.label,
        description: selectedViewData?.meta?.description,
        table: selectedViewData?.meta?.table,
        isPublic: selectedViewData?.meta?.isPublic,
        gate,
        filters,
        sort,
        groups: selectedViewData?.meta?.groups,
      };

      const res = await updateCampaignView(viewId, data);
      if (res.success) {
        getSingleView(viewId);
      }
    }
  };

  // FILTERS
  // handle filter apply
  const handleFilterApply = async () => {
    if (viewId) {
      updateView({ filters }).then(() => {
        getSingleView(viewId);
      });
    }
  };

  // handle remove filter condition
  const handleRemoveFilterCondition = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
    if (viewId) {
      updateView({ filters: newFilters }).then(() => {
        getSingleView(viewId);
      });
    }
  };

  // handle clear filters
  const handleClearFilters = () => {
    setFilters([]);
    if (viewId) {
      updateView({ filters: [] }).then(() => {
        getSingleView(viewId);
      });
    }
  };

  // initialize
  const initialize = async () => {
    try {
      setLoading(true);
      const campaigns = await getCampaignListAsync({
        page: 1,
        rowsPerPage: 1,
      });

      // set meta data
      setMetaData(campaigns.meta);
      const columns = campaigns.meta.map((obj) => {
        const key = Object.keys(obj)[0];
        return {
          label: obj[key].label,
          columnName: key,
          type: obj[key].type,
          depth: obj[key].depth,
        };
      });

      setAllColumns(columns);

      // set views
      const viewsData = await getCampaignViews();
      setViews(viewsData.data);
      if (viewsData.success) {
        const firstView = viewsData.data?.find((view) => view?.id === viewId) || viewsData.data[0];
        await getSingleView(firstView?.id, pagination);
        if (!viewId) {
          const currentTab = searchParams.get('tab') || 'campaign';
          router.push(`?tab=${currentTab}&view=${firstView?.id}`);
        }
      } else {
        const payload = {
          label: 'Default View',
          description: 'Default View',
          table: 'CAMPAIGN',
          gate: 'and',
          isPublic: true,
          filters: [],
          columns: columns.map((col) => col.columnName),
          sort: [],
          groups: [],
        };

        const res = await createCampaignView(payload);

        if (res.success) {
          const createViewData = res?.data;
          setViews([
            {
              id: createViewData?.id,
              table: createViewData?.table,
              isPublic: createViewData?.isPublic,
              label: createViewData?.label,
              description: createViewData?.description,
              CreatedByUser: {},
              createdAt: createViewData?.createdAt,
            },
          ]);
          await getSingleView(res.data.id, pagination);
          router.push(`?tab=campaign&view=${res.data.id}`);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // update visible columns
  React.useEffect(() => {
    if (allColumns.length === 0) return;
    if (viewId && selectedViewData) {
      const selectedColumnNames = selectedViewData.meta?.columns || [];
      const filtered = allColumns.filter((col) => selectedColumnNames.includes(col.columnName));
      setVisibleColumns(filtered);
    } else {
      setVisibleColumns(allColumns);
    }
    setSearchColumns(allColumns);
  }, [viewId, selectedViewData, allColumns]);

  // Watch for URL viewId change
  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageNo: 1 }));
    initialize();
  }, []);

  React.useEffect(() => {
    if (selectedViewId) {
      getSingleView(selectedViewId, pagination);
    }
  }, [selectedViewId]);

  return (
    <PageContainer>
      <Card sx={{ borderRadius: 0, minHeight: 'calc(100vh - 150px)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ padding: '5px 10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              startIcon={<TableReorderIcon />}
              variant="text"
              size="small"
              onClick={() => setShowView((prev) => !prev)}
              sx={{ bgcolor: showView ? alpha(theme.palette.primary.main, 0.08) : 'background.paper' }}
            >
              View
            </Button>

            <Button
              startIcon={<Iconify icon="eva:eye-off-outline" width={16} height={16} />}
              variant="text"
              size="small"
              onClick={(e) => setAnchorElHide(e.currentTarget)}
            >
              Hide Fields
            </Button>

            <TableFilterBuilder
              metaData={metaData}
              filters={filters}
              gate={gate}
              setFilters={setFilters}
              setGate={setGate}
              handleFilterApply={handleFilterApply}
              handleRemoveFilterCondition={handleRemoveFilterCondition}
              handleClearFilters={handleClearFilters}
              loading={loading}
            />

            <Button startIcon={<Iconify icon="eva:grid-outline" width={16} height={16} />} variant="text" size="small">
              Group
            </Button>

            <TableSortBuilder
              allColumns={allColumns}
              sort={sort}
              setSort={setSort}
              updateView={updateView}
              getSingleView={getSingleView}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <IconButton onClick={handleAddNewItem}>
              <AddIcon />
            </IconButton>
            <Box>
              <RefreshPlugin onClick={() => getSingleView(viewId)} />
            </Box>
            <DeleteConfirmationPasswordPopover
              title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}
              onDelete={handleDelete}
              passwordInput
              id={selectedRows.map((row) => row.id)}
              deleteFn={deleteCampaignBulkAsync}
              disabled={selectedRows.length === 0}
            />
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="start">
          {/* View */}
          <TableView
            views={views}
            showView={showView}
            setViews={setViews}
            setShowView={setShowView}
            setSort={setSort}
            setFilters={setFilters}
            setPagination={setPagination}
            columns={allColumns}
            selectedView={selectedViewData}
            setSelectedViewId={setSelectedViewId}
            viewsLoading={viewsLoading}
          />

          {/* Table */}
          <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
            <EditableDataTable
              columns={columns}
              rows={records}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              loading={loading}
              rowCount={totalRecords}
              checkboxSelection
              pageSizeOptions={[20, 30, 50]}
              paginationModel={{ page: pagination.pageNo - 1, pageSize: pagination.limit }}
              onPageChange={handlePaginationModelChange}
              onRowSelectionModelChange={handleRowSelection}
            />
          </Box>
        </Box>
      </Card>

      {/* Image upload popover */}
      <Popover
        open={Boolean(anchorEl.current)}
        anchorEl={anchorEl.current}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableAutoFocus
        disableEnforceFocus
        disablePortal
      >
        <Box sx={{ p: 1.5 }}>
          {imageToShow && (
            <Image src={imageToShow} alt="Preview" width={300} height={300} style={{ borderRadius: 8 }} />
          )}
        </Box>
      </Popover>

      {/* Hide fields popover */}
      <Popover
        id="hide-fields-popover"
        open={Boolean(anchorElHide)}
        anchorEl={anchorElHide}
        onClose={handleClosePopoverHide}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableAutoFocus
        disableEnforceFocus
        disablePortal
      >
        <Box sx={{ width: 250 }}>
          <Box sx={{ p: 1.5, backgroundColor: 'background.paper' }}>
            <TextField
              fullWidth
              placeholder="Find fields..."
              variant="outlined"
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
              onChange={(e) => handleColumnSearch(e)}
            />
          </Box>
          <FormGroup
            sx={{
              gap: 0.5,
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 'auto',
              flexWrap: 'nowrap',
              maxHeight: 250,
              overflowY: 'auto',
              scrollbarWidth: 'thin',
            }}
          >
            {searchColumns
              .filter((col) => col.columnName !== 'id')
              ?.map((col) => {
                return (
                  <FormControlLabel
                    key={col.field}
                    control={
                      <Checkbox
                        checked={visibleColumns.some((c) => c.columnName === col.columnName)}
                        onChange={(e) => handleColumnChange(e, col)}
                      />
                    }
                    label={col.label}
                  />
                );
              })}
          </FormGroup>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <Button variant="outlined" size="small" onClick={hideAllColumns}>
              Hide all
            </Button>
            <Button variant="contained" size="small" onClick={showAllColumns}>
              Show all
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* Image upload dialog */}
      <MediaUploader
        open={open}
        onClose={() => setOpen(false)}
        onSave={(paths) => handleUploadImage([...paths])}
        multiple
        hideVideoUploader={true}
        folderName="partner-HQ"
      />
    </PageContainer>
  );
};
