'use client';

import path from 'path';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { dateFormatter } from '@/utils/date-formatter';
import { Delete } from '@mui/icons-material';
import { ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { PageContainer } from '@/components/container/PageContainer';
import { FilterButton } from '@/components/core/filter-button';
import { StatusFilterPopover } from '@/components/core/filters/StatusFilterPopover';
import { RefreshPlugin } from '@/components/core/plugins/RefreshPlugin';
import { DataTable } from '@/components/data-table/data-table';
import { DeleteConfirmationPopover } from '@/components/dialog/delete-confirmation-popover';
import PageLoader from '@/components/PageLoader/PageLoader';

import { deleteCampaignAsync, getCampaignListAsync } from './_lib/campaign.actions';

export default function Page() {
  const router = useRouter();
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [status, setStatus] = React.useState('');
  async function fetchList() {
    try {
      setLoading(true);
      const response = await getCampaignListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
        status: status,
      });
      if (response.success) {
        setUsers(response.data);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    const response = await deleteCampaignAsync([id]);
    if (response.success) {
      fetchList();
    }
  };

  React.useEffect(() => {
    fetchList();
  }, [pagination, status]);

  const columns = [
    {
      formatter: (row) => (
        <Stack direction="row">
          <IconButton size="small" title="Edit" onClick={() => router.push(paths.dashboard.edit_campaign(row.slug))}>
            <PencilSimpleIcon />
          </IconButton>
          <DeleteConfirmationPopover
            onDelete={() => handleDelete(row.id)}
            title={`Want to delete the campaign "${row.name}"?`}
          />
        </Stack>
      ),
      name: 'Actions',
      // hideName: true,
      // align: 'right',
    },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Link
            color="inherit"
            component={RouterLink}
            href={paths.dashboard.customers.details('1')}
            sx={{ whiteSpace: 'nowrap' }}
            variant="subtitle2"
          >
            {row.name}
          </Link>
        </Stack>
      ),
      name: 'Name',
    },
    {
      formatter(row) {
        return dateFormatter(row.start_date);
      },
      name: 'Start Date',
    },
    {
      formatter(row) {
        return dateFormatter(row.end_date);
      },
      name: 'End Date',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.partner_expense}
        </Typography>
      ),
      name: 'Partner Expense',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.partner_expense}
        </Typography>
      ),
      name: 'Partner Expense',
    },
    {
      formatter(row) {
        return dayjs(row.createdAt).format('MMM D, YYYY h:mm A');
      },
      name: 'Created at',
    },
    {
      formatter: (row) => {
        return <Chip label={row.status} size="small" variant="outlined" />;
      },
      name: 'Status',
    },
  ];

  return (
    <PageContainer>
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Campaigns</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<PlusIcon />}
              variant="contained"
              onClick={() => router.push(paths.dashboard.create_campaign)}
            >
              Add
            </Button>
          </Box>
        </Stack>
        <PageLoader loading={loading} error={null}>
          <Card>
            <Box sx={{ overflowX: 'auto' }}>
              <React.Fragment>
                <DataTable
                  isPagination={true}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={pagination.limit}
                  pageNo={pagination.pageNo}
                  columns={columns}
                  rows={users}
                  uniqueRowId="id"
                  selectionMode="multiple"
                  leftItems={
                    <>
                      <FilterButton
                        displayValue={status}
                        label="Status"
                        onFilterApply={(value) => {
                          setStatus(value);
                        }}
                        onFilterDelete={() => {
                          handlePhoneChange();
                        }}
                        popover={
                          <StatusFilterPopover
                            options={[
                              { value: '', label: 'All' },
                              { value: 'PENDING', label: 'Pending' },
                              { value: 'APPROVED', label: 'Approved' },
                              { value: 'REJECTED', label: 'Rejected' },
                              { value: 'COMPLETED', label: 'Completed' },
                            ]}
                          />
                        }
                        value={status}
                      />
                      <RefreshPlugin onClick={fetchList} />
                    </>
                  }
                  rightItems={<></>}
                  onRowsPerPageChange={(pageNumber, rowsPerPage) =>
                    setPagination({ pageNo: pageNumber, limit: rowsPerPage })
                  }
                  onPageChange={(newPageNumber) => setPagination({ ...pagination, pageNo: newPageNumber })}
                  onSelection={(selectedRows) => setSelectedRows?.(selectedRows)}
                />
                {!users?.length ? (
                  <Box sx={{ p: 3 }}>
                    <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                      No data found
                    </Typography>
                  </Box>
                ) : null}
              </React.Fragment>
            </Box>
          </Card>
        </PageLoader>
      </Stack>
    </PageContainer>
  );
}
