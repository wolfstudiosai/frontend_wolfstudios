'use client';

import * as React from 'react';
import { Box, Card } from '@mui/material';

import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import PageLoader from '/src/components/loaders/PageLoader';

import { createPartnerAsync, getPartnerListAsync, updatePartnerAsync } from '../_lib/partner.actions';
import { defaultPartner } from '../_lib/partner.types';
import { ManagePartnerRightPanel } from './manage-partner-right-panel';
import { dateFormatter } from '/src/utils/date-formatter';

export const PartnerListView = () => {
  // table columns
  const columns = [
    { field: 'name', headerName: 'Name', width: 280, editable: true },
    // { field: 'ageBracket', headerName: 'Age Bracket', width: 200, editable: true },
    // {
    //   field: 'city',
    //   headerName: 'City',
    //   width: 150,
    //   editable: true,
    //   valueGetter: (value, row) => row.ByCityPartnerHQ?.map((item) => item.ByCities?.Name).join(', '),
    // },
    // {
    //   field: 'state',
    //   headerName: 'State',
    //   width: 150,
    //   editable: true,
    //   valueGetter: (value, row) => row.ByStatesPartnerHQ?.map((item) => item.ByStates?.Name).join(', '),
    // },
    // {
    //   field: 'country',
    //   headerName: 'Country',
    //   width: 150,
    //   editable: true,
    //   valueGetter: (value, row) => row.ByCountryPartnerHQ?.map((item) => item.ByCountry?.Name).join(', '),
    // },
    { field: 'email', headerName: 'Email', width: 250, editable: true },
    { field: 'journeyStep', headerName: 'Journey Step', width: 200, editable: true },
    { field: 'notes', headerName: 'Notes', width: 300, editable: true },
    { field: 'hourlyRate', headerName: 'Hourly Rate', width: 150, editable: true },
    { field: 'bookingLink', headerName: 'Booking Link', width: 250, editable: true },
    { field: 'linkedinConnections', headerName: 'LinkedIn Connections', width: 200, editable: true },
    { field: 'website', headerName: 'Website', width: 250, editable: true },
    { field: 'medium', headerName: 'Medium', width: 200, editable: true },
    { field: 'soundcloud', headerName: 'SoundCloud', width: 200, editable: true },
    { field: 'spotify', headerName: 'Spotify', width: 200, editable: true },
    { field: 'opentoGifting', headerName: 'Open to Gifting', width: 200, editable: true },
    { field: 'occupation', headerName: 'Occupation', width: 200, editable: true },
    { field: 'client', headerName: 'Client', width: 200, editable: true },
    { field: 'linkedin', headerName: 'LinkedIn', width: 250, editable: true },
    { field: 'mailingAddress', headerName: 'Mailing Address', width: 300, editable: true },
    { field: 'phone', headerName: 'Phone', width: 200, editable: true },
    { field: 'podcast', headerName: 'Podcast', width: 200, editable: true },
    { field: 'refusalReason', headerName: 'Refusal Reason', width: 250, editable: true },
    { field: 'revoAmazonOrderConfirmationNumber', headerName: 'Amazon Order No.', width: 250, editable: true },
    { field: 'amazonReviewLink', headerName: 'Amazon Review Link', width: 250, editable: true },
    { field: 'deliverables', headerName: 'Deliverables', width: 250, editable: true },
    { field: 'googleDriveFiles', headerName: 'Google Drive Files', width: 250, editable: true },
    { field: 'revoIGPost', headerName: 'REVO IG Post', width: 200, editable: true },
    { field: 'partnerIGRate', headerName: 'Partner IG Rate', width: 200, editable: true },
    { field: 'partnerTTRate', headerName: 'Partner TT Rate', width: 200, editable: true },
    { field: 'partnerYTRate', headerName: 'Partner YT Rate', width: 200, editable: true },
    { field: 'amountPaid', headerName: 'Amount Paid', width: 150, editable: true },
    { field: 'totalContributedEngagementByContent', headerName: 'Total Engagement', width: 200, editable: true },
    { field: 'totalAudience', headerName: 'Total Audience', width: 200, editable: true },
    { field: 'previousCollabExpense', headerName: 'Previous Collab Expense', width: 220, editable: true },
    { field: 'revoOffer', headerName: 'REVO Offer', width: 200, editable: true },
    { field: 'remainingCredits', headerName: 'Remaining Credits', width: 200, type: 'number', editable: true },
    { field: 'ttPost', headerName: 'TT Post', width: 200, editable: true },
    { field: 'totalROI', headerName: 'Total ROI', width: 150, editable: true },
    { field: 'ugcPaymentStatus', headerName: 'UGC Payment Status', width: 200, editable: true },
    { field: 'ugcRetainerAmount', headerName: 'UGC Retainer Amount', width: 200, type: 'number', editable: true },
    { field: 'ugcTikTokLink', headerName: 'UGC TikTok Link', width: 250, editable: true },
    { field: 'revoUGCArmyTTUsernamePW', headerName: 'REVO UGC TT Username/PW', width: 250, editable: true },
    { field: 'whatsApp', headerName: 'WhatsApp', width: 200, editable: true },
    { field: 'ytPost', headerName: 'YT Post', width: 200, editable: true },
    { field: 'partnerPostViews', headerName: 'Partner Post Views', width: 200, type: 'number', editable: true },
    { field: 'estimatedTaxes', headerName: 'Estimated Taxes', width: 200, editable: true },
    { field: 'fbaXLevanta', headerName: 'FBA x Levanta', width: 180, type: 'number', editable: true },
    { field: 'shippingFBAFeeGiftedPartners', headerName: 'Shipping Fee FBA', width: 220, editable: true },
    { field: 'levantaAffiliateFee', headerName: 'Levanta Affiliate Fee', width: 200, editable: true },
    { field: 'paypalFee', headerName: 'Paypal Fee', width: 150, editable: true },
    { field: 'shippingExpense', headerName: 'Shipping Expense', width: 200, editable: true },
    { field: 'amazonReferralFee', headerName: 'Amazon Referral Fee', width: 200, editable: true },
    { field: 'amazonOrderTotal', headerName: 'Amazon Order Total', width: 200, editable: true },
    { field: 'amazonTax', headerName: 'Amazon Tax', width: 150, editable: true },
    { field: 'amazonKickback', headerName: 'Amazon Kickback', width: 200, editable: true },
    { field: 'monthSourced', headerName: 'Month Sourced', width: 180, editable: true },
    { field: 'secondPaymentDate', headerName: 'Second Payment Date', width: 200, editable: true },
    { field: 'clientStatus', headerName: 'Client Status', width: 200, editable: true },
    { field: 'linktree', headerName: 'Linktree', width: 200, editable: true },
    { field: 'partnerUGCRate', headerName: 'Partner UGC Rate', width: 200, editable: true },
    { field: 'partner360Rate', headerName: 'Partner 360 Rate', width: 200, editable: true },
    { field: 'revoCounteroffer', headerName: 'REVO Counteroffer', width: 200, editable: true },
    { field: 'opentoWhitelisting', headerName: 'Open to Whitelisting', width: 200, editable: true },
    {
      field: 'conversionsBundleCupper',
      headerName: 'Conversions - Bundle Cupper',
      width: 250,
      type: 'number',
      editable: true,
    },
    {
      field: 'conversionsMassageGun',
      headerName: 'Conversions - Massage Gun',
      width: 250,
      type: 'number',
      editable: true,
    },
    { field: 'conversionsCupper', headerName: 'Conversions - Cupper', width: 200, type: 'number', editable: true },
    { field: 'conversionsOils', headerName: 'Conversions - Oils', width: 200, type: 'number', editable: true },
    {
      field: 'conversionsWalkingPad',
      headerName: 'Conversions - Walking Pad',
      width: 250,
      type: 'number',
      editable: true,
    },
    { field: 'amazonReviewWalkingPadPro', headerName: 'Amazon Review - WP Pro', width: 250, editable: true },
    { field: 'amazonReviewWalkingPadStandard', headerName: 'Amazon Review - WP Standard', width: 250, editable: true },
    { field: 'amazonReviewOil', headerName: 'Amazon Review - Oil', width: 200, editable: true },
    { field: 'amazonReviewSoothingCream', headerName: 'Amazon Review - Cream', width: 250, editable: true },
    { field: 'amazonReviewBeautyWand', headerName: 'Amazon Review - Beauty Wand', width: 250, editable: true },
    { field: 'paymentLink', headerName: 'Payment Link', width: 250, editable: true },
    // { field: 'totalExpense', headerName: 'Total Expense', width: 200, type: 'number', editable: true },
    // { field: 'totalProductCOGExpense', headerName: 'Product COG Expense', width: 250, type: 'number', editable: true },
  ];

  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [filteredValue, setFilteredValue] = React.useState(columns.map((col) => col.field));
  const [openDetails, setOpenDetails] = React.useState(null);

  async function fetchList() {
    try {
      setLoading(true);
      const response = await getPartnerListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      });
      if (response.success) {
        setRecords(response.data);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // ******************************data grid handler starts*********************

  const handlePaginationModelChange = (newPaginationModel) => {
    const { page, pageSize } = newPaginationModel;
    setPagination({ pageNo: page + 1, limit: pageSize });
  };

  const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;
    if (newRow.id) {
      await updatePartnerAsync(newRow);
    } else {
      const { id, ...rest } = newRow;
      await createPartnerAsync(null, rest);
      fetchList();
    }
    return newRow;
  }, []);

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log({ children: error.message, severity: 'error' });
  }, []);

  // ******************************data grid handler ends*********************

  const visibleColumns = columns.filter((col) => filteredValue.includes(col.field));

  React.useEffect(() => {
    const storedHiddenColumns = localStorage.getItem('hiddenColumns');
    if (storedHiddenColumns) {
      setFilteredValue(JSON.parse(storedHiddenColumns));
    }
  }, []);

  React.useEffect(() => {
    fetchList();
  }, [pagination]);

  return (
    <PageContainer>
      <PageLoader loading={loading}>
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Box>
              <RefreshPlugin onClick={fetchList} />
            </Box>
          </Box>

          <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
            <EditableDataTable
              columns={visibleColumns}
              rows={records?.map((row) => defaultPartner(row)) || []}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              loading={loading}
              rowCount={totalRecords}
              pageSizeOptions={[10, 20, 30]}
              paginationModel={{ page: pagination.pageNo - 1, pageSize: pagination.limit }}
              onPageChange={handlePaginationModelChange}
            />
          </Box>
        </Card>
        <ManagePartnerRightPanel
          open={openDetails ? true : false}
          onClose={() => setOpenDetails(null)}
          data={openDetails}
          fetchList={fetchList}
        />
      </PageLoader>
    </PageContainer>
  );
};
