'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import TableReorderIcon from '@mui/icons-material/Reorder';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Popover,
  TextField,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { toast } from 'sonner';

import TableFilterBuilder from '/src/components/common/table-filter-builder';
import TableView from '/src/components/common/table-view';
import TableSortBuilder from '/src/components/common/table-sort-builder';
import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';
import { MediaUploader } from '/src/components/uploaders/media-uploader';

import {
  createPartnerAsync,
  createPartnerView,
  deletePartnerAsync,
  getPartnerListAsync,
  getPartnerViews,
  getSinglePartnerView,
  updatePartnerAsync,
  updatePartnerView,
} from '../_lib/partner.actions';
import { defaultPartner } from '../_lib/partner.types';
import { usePartnerColumns } from '../hooks/use-partner-columns';
import useSWR from 'swr';
import { convertArrayObjIntoArrOfStr } from '../../../../utils/convertRelationArrays';

export const PartnerListView = () => {
  const theme = useTheme();
  const router = useRouter();
  const anchorEl = React.useRef(null);
  const [anchorElHide, setAnchorElHide] = React.useState(null);
  const singleImageField = ['thumbnailImage'];
  const [isImageUploadOpen, setIsImageUploadOpen] = React.useState(false);
  const [mediaToShow, setMediaToShow] = React.useState({
    type: '',
    url: '',
  });
  const [imageUpdatedField, setImageUpdatedField] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const viewId = searchParams.get('view');

  const handleUploadModalOpen = (data, field, uploadOpen) => {
    setOpen(true);
    setUpdatedRow(data);
    setImageUpdatedField(field);
    setIsImageUploadOpen(uploadOpen);
  };

  const handleClosePopover = () => {
    anchorEl.current = null;
    setMediaToShow({
      type: '',
      url: '',
    });
  };

  const handleClosePopoverHide = () => {
    setAnchorElHide(null);
    setNewVisibleColumns(visibleColumns);
    setSearchColumns(allColumns);
  };

  // update partner after images uploaded
  const handleUploadImage = async (images) => {
    try {
      const finalData = convertArrayObjIntoArrOfStr(updatedRow, [
        'stakeholders',
        'contentHQ',
        'profileCategory',
        'portfolios',
        'states',
        'cities',
        'services',
        'caseStudies',
        'productionHQ',
        'products',
        'contributedCampaigns',
        'countries',
        'tags',
        'retailPartners',
        'destinations',
        'proposedCampaigns',
        'productionHQ2',
      ]);

      if (singleImageField.includes(imageUpdatedField)) {
        finalData[imageUpdatedField] = images[0];
      } else {
        finalData[imageUpdatedField] = [...finalData[imageUpdatedField], ...images];
        for (const key of singleImageField) {
          finalData[key] = Array.isArray(finalData[key]) ? finalData[key][0] : finalData[key];
        }
      }

      const response = await updatePartnerAsync(finalData);
      if (response.success) {
        setOpen(false);
        getSingleView(viewId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      getSingleView(viewId);
    }
  };


  // Partner data handler
  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [updatedRow, setUpdatedRow] = React.useState(null);

  // View
  const [showView, setShowView] = React.useState(false);
  const [views, setViews] = React.useState([]);
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
  const [newVisibleColumns, setNewVisibleColumns] = React.useState([]);
  const [searchColumns, setSearchColumns] = React.useState([]);
  const columns = usePartnerColumns(anchorEl, setMediaToShow, handleUploadModalOpen, visibleColumns);

  // SWR
  const {
    data: partners,
    error: partnersError,
    isLoading: isPartnersLoading,
  } = useSWR(['partnerList', { page: 1, rowsPerPage: 20 }], ([, params]) => getPartnerListAsync(params));

  const {
    data: viewsData,
    isLoading: viewsLoading,
    error: viewsError,
    mutate: mutateViews,
  } = useSWR('partnerViews', getPartnerViews);

  // get single view
  const getSingleView = async (viewId, paginationProps) => {
    try {
      setLoading(true);
      const viewPagination = paginationProps ? paginationProps : pagination;
      const res = await getSinglePartnerView(viewId, viewPagination);
      if (res.success) {
        setRecords(res.data.data.map((row) => defaultPartner(row)) || []);
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
    const result = await updatePartnerView(viewId, data);
    return result;
  }
  // ******************************data grid handler starts*********************

  const handlePaginationModelChange = (newPaginationModel) => {
    const { page, pageSize } = newPaginationModel;
    const newPagination = { pageNo: page + 1, limit: pageSize };
    setPagination(newPagination);
    if (viewId) {
      getSingleView(viewId, newPagination);
    }
  };

  // update or create partner
  const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

    const isTemporaryId = typeof newRow.id === 'string' && newRow.id.startsWith('temp_');

    if (isTemporaryId) {
      if (!newRow.name) {
        toast.error('Please enter name');
        return newRow;
      }

      const res = await createPartnerAsync(newRow);
      if (res.success) {
        getSingleView(viewId);
      }
    } else {
      const finalData = convertArrayObjIntoArrOfStr(newRow, [
        'stakeholders',
        'contentHQ',
        'profileCategory',
        'portfolios',
        'states',
        'cities',
        'services',
        'caseStudies',
        'productionHQ',
        'products',
        'contributedCampaigns',
        'countries',
        'tags',
        'retailPartners',
        'destinations',
        'proposedCampaigns',
        'productionHQ2',
      ]);

      const numberFields = [
        'totalROI',
        'totalExpense',
        'shippingFBAFeeGiftedPartners',
        'paypalFee',
        'amazonReferralFee',
        'linkedinConnections',
        'youtubeFollowing',
        'snapchatFollowing',
        'xFollowing',
        'pinterestFollowing',
        'tiktokFollowing',
        'facebookFollowing',
        'instagramFollowing',
        'previousCollabExpense',
        'totalProductCOGExpense',
        'shippingExpense',
        'oneOffExpense',
        'partner360Rate',
        'partnerIGRate',
        'partnerTTRate',
        'partnerYTRate',
        'amountPaid',
        'totalContributedEngagementByContent',
        'totalAudience',
        'remainingCredits',
        'ugcRetainerAmount',
        'partnerPostViews',
        'estimatedTaxes',
        'fbaXLevanta',
        'amazonOrderTotal',
        'amazonTax',
        'amazonKickback',
        'hourlyRate',
        'partnerUGCRate',
        'levantaID',
        'impactID',
        'shareasaleID'
      ];

      numberFields.forEach((field) => {
        finalData[field] = Number(finalData[field]) || 0;
      });

      finalData.thumbnailImage = Array.isArray(finalData.thumbnailImage)
        ? finalData.thumbnailImage[0]
        : finalData.thumbnailImage;
      const res = await updatePartnerAsync(finalData);
      if (res.success) {
        getSingleView(viewId);
      }
    }

    return newRow;
  }, [viewId]);

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log({ children: error.message, severity: 'error' });
  }, []);

  // ******************************data grid handler ends*********************

  const handleRowSelection = (newRowSelectionModel) => {
    const selectedData = newRowSelectionModel.map((id) => records.find((row) => row.id === id));
    setSelectedRows(selectedData);
  };

  // new column added
  const handleAddNewItem = () => {
    const tempId = `temp_${Date.now()}`;
    const newPartner = { ...defaultPartner(), id: tempId };

    setRecords((prev) => [newPartner, ...prev]);
  };

  // Column delete
  const handleDelete = async () => getSingleView(viewId);

  // handle column change
  const handleColumnChange = async (e, col) => {
    let columns = [...newVisibleColumns];
    if (e.target.checked) {
      const exists = columns.some((c) => c.columnName === col.columnName);
      if (exists) return;
      columns = [...columns, col];
    } else {
      columns = columns.filter((c) => c.columnName !== col.columnName);
    }
    setNewVisibleColumns(columns);
  };

  // handle Column Search
  const handleColumnSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchColumns(allColumns.filter((col) => col.label.toLowerCase().includes(searchValue)));
  };

  // handle show all columns
  const showAllColumns = async () => {
    const newVisibleColumns = allColumns;
    setNewVisibleColumns(newVisibleColumns);
  };

  // handle hide all columns
  const hideAllColumns = async () => {
    const newVisibleColumns = visibleColumns.filter((col) => col.columnName === 'id');
    setNewVisibleColumns(newVisibleColumns);
  };

  const handleSaveColumns = async () => {
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

      const res = await updatePartnerView(viewId, data);
      if (res.success) {
        getSingleView(viewId);
        handleClosePopoverHide();
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

      // set meta data
      setMetaData(partners.meta);
      const columns = partners.meta.map((obj) => {
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
      setViews(viewsData.data);

      if (viewsData.success) {
        const firstView = viewsData.data?.find((view) => view?.id === viewId) || viewsData.data[0];
        await getSingleView(firstView?.id, pagination);

        if (!viewId) {
          router.push(`?tab=partner&view=${firstView?.id}`);
        }
      } else {
        const payload = {
          label: 'Default View',
          description: 'Default View',
          table: 'PARTNER',
          gate: 'and',
          isPublic: true,
          filters: [],
          columns: columns.map((col) => col.columnName),
          sort: [],
          groups: [],
        };

        const res = await createPartnerView(payload);

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
          router.push(`?tab=partner&view=${res.data.id}`);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Watch for URL viewId change
  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageNo: 1 }));
    if (searchParams.get('tab') !== 'partner') return;
    if (!isPartnersLoading && !viewsLoading) {
      initialize();
    }
  }, [viewId, isPartnersLoading, viewsLoading]);


  // update visible columns
  React.useEffect(() => {
    if (allColumns.length === 0) return;
    if (viewId && selectedViewData) {
      const selectedColumnNames = selectedViewData.meta?.columns || [];
      const filtered = allColumns.filter((col) => selectedColumnNames.includes(col.columnName));

      setVisibleColumns(filtered);
      setNewVisibleColumns(filtered);
    } else {
      setVisibleColumns(allColumns);
      setNewVisibleColumns(allColumns);
    }
    setSearchColumns(allColumns);
  }, [viewId, selectedViewData, allColumns]);


  React.useEffect(() => {
    if (selectedViewId) {
      getSingleView(selectedViewId, pagination);
    }
  }, [selectedViewId]);

  return (
    <PageContainer>
      <Card sx={{ borderRadius: 0, minHeight: 'calc(100vh - 100px)' }}>
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

          <Box display="flex" alignItems="center">
            <IconButton onClick={handleAddNewItem}>
              <AddIcon />
            </IconButton>
            <RefreshPlugin onClick={() => getSingleView(viewId)} />
            <DeleteConfirmationPasswordPopover
              title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}
              onDelete={handleDelete}
              passwordInput
              id={selectedRows.map((row) => row.id)[0]}
              disabled={selectedRows.length === 0}
              deleteFn={deletePartnerAsync}
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
          {mediaToShow?.type === 'image' && (
            <Image src={mediaToShow?.url} alt="Preview" width={300} height={300} style={{ borderRadius: 8 }} />
          )}
          {mediaToShow?.type === 'video' && (
            <video src={mediaToShow?.url} controls style={{ height: 300, width: 300, borderRadius: 8 }} />
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
                        checked={newVisibleColumns.some((c) => c.columnName === col.columnName)}
                        onChange={(e) => handleColumnChange(e, col)}
                      />
                    }
                    label={col.label}
                  />
                );
              })}
          </FormGroup>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button variant="outlined" size="small" onClick={hideAllColumns}>
                Hide all
              </Button>
              <Button variant="outlined" size="small" onClick={showAllColumns}>
                Show all
              </Button>
            </Box>
            <Button variant="contained" size="small" onClick={handleSaveColumns}>
              Save
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* Image upload dialog */}
      <MediaUploader
        open={open}
        onClose={() => setOpen(false)}
        onSave={(paths) => handleUploadImage([...paths])}
        multiple={!singleImageField.includes(imageUpdatedField)}
        hideVideoUploader={isImageUploadOpen}
        hideImageUploader={!isImageUploadOpen}
        folderName="partner-HQ"
      />
    </PageContainer>
  );
};
