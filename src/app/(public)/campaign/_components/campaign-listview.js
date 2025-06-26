'use client';

import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { alpha, Button, Checkbox, FormControlLabel, FormGroup, IconButton, Popover, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import {
  createCampaignAsync,
  deleteCampaignBulkAsync,
  getCampaignListAsync,
  getCampaignViews,
  getSingleCampaignView,
  updateCampaignView,
  updateCampaignAsync
} from '../_lib/campaign.actions';

import AddIcon from '@mui/icons-material/Add';
import { getCampaignColumns } from '../_utils/get-campaign-columns';
import Image from 'next/image';
import { MediaUploader } from '/src/components/uploaders/media-uploader';
import { defaultCampaign } from '../_lib/campaign.types';
import { toast } from 'sonner';
import TableFilterBuilder from '/src/components/common/table-filter-builder';
import TableView from '/src/components/common/table-view';
import TableSortBuilder from '/src/components/common/table-sort-builder';
import TableReorderIcon from '@mui/icons-material/Reorder';
import { useTheme } from '@mui/material/styles';
import { useSearchParams } from 'next/navigation';
import { Iconify } from '/src/components/iconify/iconify';

export const CampaignListView = () => {
  const theme = useTheme();
  const anchorEl = React.useRef(null);
  const [anchorElHide, setAnchorElHide] = React.useState(null);
  const [imageToShow, setImageToShow] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleUploadModalOpen = (data) => {
    setOpen(true);
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
      const response = await updateCampaignAsync(updatedRow.id, { ...updatedRow, campaignImage: images });
      if (response.success) {
        toast.success('Campaign updated successfully');
        fetchList();
        setOpen(false);
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
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const view = searchParams.get('view');
  const [selectedView, setSelectedView] = React.useState(null);

  // filter
  const [metaData, setMetaData] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [filtersLoaded, setFiltersLoaded] = React.useState(false);
  const [gate, setGate] = React.useState('and');
  const [sort, setSort] = React.useState([]);

  // table columns
  const allColumns = React.useMemo(() => {
    const columns = metaData.map(obj => {
      const key = Object.keys(obj)[0];
      return {
        label: obj[key].label,
        columnName: key,
        type: obj[key].type,
        depth: obj[key].depth
      };
    });
    return columns;
  }, [metaData]);

  const [visibleColumns, setVisibleColumns] = React.useState(allColumns);
  const [searchColumns, setSearchColumns] = React.useState(allColumns);
  const columns = React.useMemo(() => getCampaignColumns(anchorEl, setImageToShow, handleUploadModalOpen, visibleColumns), [visibleColumns]);

  async function fetchList(props) {
    const filter = props ? props : filters;
    try {
      setLoading(true);
      const response = await getCampaignListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      }, filter, gate);

      if (response?.success) {
        if (view) {
          setMetaData(response.meta);
        } else {
          setRecords(response.data.map((row) => defaultCampaign(row)) || []);
          setTotalRecords(response.totalRecords);
          setMetaData(response.meta);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateView(props) {
    console.log(sort)
    const viewFilters = props.filters ? props.filters : filters;
    const viewSort = props.sort ? props.sort : sort;
    const data = {
      label: selectedView?.meta?.label,
      description: selectedView?.meta?.description,
      table: selectedView?.meta?.table,
      isPublic: selectedView?.meta?.isPublic,
      columns: selectedView?.meta?.columns,
      gate,
      filters: viewFilters,
      sort: viewSort,
      groups: selectedView?.meta?.groups
    }
    const result = await updateCampaignView(view, data);
    return result;
  }

  // ******************************data grid handler starts*********************

  const handlePaginationModelChange = (newPaginationModel) => {
    const { page, pageSize } = newPaginationModel;
    setPagination({ pageNo: page + 1, limit: pageSize });
  };

  const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

    const isTemporaryId = typeof newRow.id === 'string' && newRow.id.startsWith('temp_');

    if (isTemporaryId) {
      if (!newRow.name) {
        toast.error("Please enter name");
        return newRow;
      }

      if (!newRow.status) {
        toast.error("Please select campaign status");
        return newRow;
      }

      if (!newRow.notes) {
        toast.error("Please enter notes");
        return newRow;
      }

      if (!newRow.description) {
        toast.error("Please enter description");
        return newRow;
      }

      if (!newRow.client) {
        toast.error("Please enter client");
        return newRow;
      }

      if (!newRow.guidelines) {
        toast.error("Please enter guidelines");
        return newRow;
      }

      await createCampaignAsync(newRow);
      fetchList();
    } else {
      const finalData = {
        ...newRow,
      };

      const imageFields = ['campaignImage'];
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

      const arrayFields = ['contentHQ', 'stakeholders', 'retailPartners', 'proposedPartners', 'spaces'];
      for (const field of arrayFields) {
        const value = newRow[field];
        if (value.length > 0) {
          const arrOfStr = value.map((item) => item.value);
          finalData[field] = arrOfStr;
        }
      }

      if (finalData.goals && typeof finalData.goals === 'string') {
        finalData.goals = finalData.goals.split(',').map((item) => item.trim());
      }
      await updateCampaignAsync(newRow.id, finalData);
      fetchList();
    }

    return newRow;
  }, []);

  const handleRowSelection = (newRowSelectionModel) => {
    const selectedData = newRowSelectionModel.map((id) => records.find((row) => row.id === id));
    setSelectedRows(selectedData);
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log({ children: error.message, severity: 'error' });
  }, []);


  // ******************************data grid handler ends*********************

  const handleAddNewItem = () => {
    const tempId = `temp_${Date.now()}`;
    const newRecord = { ...defaultCampaign(), id: tempId };
    setRecords([newRecord, ...records]);
  };

  const handleDelete = async () => {
    fetchList();
  };

  // get single view
  const getSingleView = async (viewId) => {
    try {
      setLoading(true);
      const res = await getSingleCampaignView(viewId);
      if (res.success) {
        setRecords(res.data.data.map((row) => defaultCampaign(row)) || []);
        setSelectedView(res.data);
        setFilters(res.data.meta?.filters || []);
        setGate(res.data.meta?.gate || 'and');
        setSort(res.data.meta?.sort || []);
        setFiltersLoaded(true);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

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

    if (tab === 'campaign' && view) {
      const data = {
        columns: newVisibleColumns.map((c) => c.columnName),
        label: selectedView?.meta?.label,
        description: selectedView?.meta?.description,
        table: selectedView?.meta?.table,
        isPublic: selectedView?.meta?.isPublic,
        gate,
        filters,
        sort: selectedView?.meta?.sort,
        groups: selectedView?.meta?.groups
      };

      const res = await updateCampaignView(view, data);
      if (res.success) {
        getSingleView(view);
      }
    }
  }

  // handle Column Search
  const handleColumnSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchColumns(allColumns.filter((col) => col.label.toLowerCase().includes(searchValue)));
  }

  // run when pagination, filters, gate, filtersLoaded change
  React.useEffect(() => {
    fetchList();
  }, []);

  // run when view change
  React.useEffect(() => {
    setPagination(prev => ({ ...prev, pageNo: 1 }));

    if (view) {
      getSingleView(view);
      setFiltersLoaded(false);
    } else {
      setSelectedView(null);
      setFilters([]);
      setGate('and');
      setSort([]);
      setVisibleColumns(allColumns);
      setFiltersLoaded(true);
      fetchList()
    }
  }, [searchParams]);

  // run when allColumns change
  React.useEffect(() => {
    if (allColumns.length > 0 && visibleColumns.length === 0) {
      setSearchColumns(allColumns);
      setVisibleColumns(allColumns);
    }
  }, [allColumns]);

  // run when selectedView and metaData change
  React.useEffect(() => {
    if (selectedView && metaData.length > 0) {
      const selectedColumnNames = selectedView.meta?.columns || [];
      const filteredColumns = allColumns.filter((col) =>
        selectedColumnNames.includes(col.columnName)
      );
      setVisibleColumns(filteredColumns);
    }
  }, [metaData, selectedView, allColumns]);

  // run when viewsLoading change
  React.useEffect(() => {
    const fetchViews = async () => {
      setViewsLoading(true);
      const res = await getCampaignViews();
      if (res.success) {
        setViews(res.data);
      }
      setViewsLoading(false);
    }
    fetchViews();
  }, []);

  return (
    <PageContainer>
      <Card sx={{ borderRadius: 0, minHeight: 'calc(100vh - 150px)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ padding: '5px 10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              startIcon={<TableReorderIcon />}
              variant="text"
              size="small"
              onClick={() => setShowView(prev => !prev)}
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
              updateView={updateView}
              fetchList={fetchList}
              getSingleView={getSingleView}
            />

            <Button
              startIcon={<Iconify icon="eva:grid-outline" width={16} height={16} />}
              variant="text"
              size="small"
            >
              Group
            </Button>

            <TableSortBuilder
              allColumns={allColumns}
              sort={sort}
              setSort={setSort}
              updateView={updateView}
              fetchList={fetchList}
              getSingleView={getSingleView}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <IconButton onClick={handleAddNewItem}>
              <AddIcon />
            </IconButton>
            <Box>
              <RefreshPlugin onClick={fetchList} />
            </Box>
            <DeleteConfirmationPasswordPopover
              title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}
              onDelete={handleDelete}
              passwordInput
              id={selectedRows.map((row) => row.id)}
              deleteFn={deleteCampaignBulkAsync}
              disabled={selectedRows.length === 0} />
          </Box>
        </Box>

        <Box display='flex' justifyContent='center' alignItems='start'>
          {/* View */}
          <TableView
            views={views}
            showView={showView}
            setViews={setViews}
            setShowView={setShowView}
            setSort={setSort}
            setFilters={setFilters}
            columns={allColumns}
            selectedView={selectedView}
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
            <Image
              src={imageToShow}
              alt="Preview"
              width={300}
              height={300}
              style={{ borderRadius: 8 }}
            />
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
        <Box sx={{ width: 250, maxHeight: 350, overflowY: 'auto', scrollbarWidth: 'thin' }}>
          <Box sx={{ p: 1.5, position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'background.paper' }}>
            <TextField
              fullWidth
              placeholder="Find fields..."
              variant="outlined"
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
              onChange={(e) => handleColumnSearch(e)}
            />
          </Box>
          <FormGroup sx={{ gap: 0.5, p: 1 }}>
            {searchColumns?.map((col) => {
              return <FormControlLabel
                key={col.field}
                control={<Checkbox
                  checked={visibleColumns.some((c) => c.columnName === col.columnName)}
                  onChange={e => handleColumnChange(e, col)}
                />}
                label={col.label}
              />
            })}
          </FormGroup>
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