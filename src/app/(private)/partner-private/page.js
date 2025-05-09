'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { PageContainer } from '/src/components/container/PageContainer';
import { FilterButton } from '/src/components/core/filter-button';
import { StatusFilterPopover } from '/src/components/core/filters/StatusFilterPopover';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { DataTable } from '/src/components/data-table/data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import PageLoader from '/src/components/loaders/PageLoader';
import { dayjs } from '/src/lib/dayjs';
import { dateFormatter } from '/src/utils/date-formatter';
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

import { paths } from '/src/paths';

import { deleteCampaignAsync, getCampaignListAsync } from './_lib/partner-private.actions';

export default function Page() {
  const router = useRouter();
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
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
  const handleDelete = async (password) => {
    const idsToDelete = [];
    selectedRows.forEach((row) => {
      idsToDelete.push(row.id);
    });
    const response = await deleteCampaignAsync(idsToDelete);
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
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <IconButton size="small" title="Edit" onClick={() => router.push(paths.private.partner + '/' + row.slug)}>
            <PencilSimpleIcon />
          </IconButton>
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
            href={paths.dashboard.partner + '/' + row.slug}
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
            <Typography variant="h4">Partner HQ</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<PlusIcon />}
              variant="contained"
              onClick={() => router.push(paths.dashboard.create_partner)}
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
                  rightItems={
                    <>
                      <DeleteConfirmationPasswordPopover title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}  onDelete={(password) => handleDelete(password)}  passwordInput disabled={selectedRows.length === 0} />
                    </>
                  }
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
