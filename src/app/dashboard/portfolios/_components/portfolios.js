'use client';

import * as React from 'react';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { FilterButton } from '@/components/core/filter-button';
import { StatusFilterPopover } from '@/components/core/filters/StatusFilterPopover';
import { RefreshPlugin } from '@/components/core/plugins/RefreshPlugin';
import { DataTable } from '@/components/data-table/data-table';
import PageLoader from '@/components/PageLoader/PageLoader';

import { getPortfolios } from '../_lib/action';

export default function Portfolios() {
  const [portfolios, setPortfolios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });
  const [totalPortfolios, setTotalPortfolios] = React.useState(0);
  const [status, setStatus] = React.useState('');

  const fetchList = async () => {
    try {
      setLoading(true);
      // const response = await getPortfolios({
      //   page: pagination.pageNo,
      //   rowsPerPage: pagination.limit,
      //   status: status
      // });
      const response = getPortfolios();
      if (response.success) {
        setLoading(false);
        setPortfolios(response.data);
        setTotalPortfolios(response.totalPortfolios);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchList();
  }, [pagination, status]);

  const columns = [
    {
      formatter: (row) => (
        <Link href={`/dashboard/portfolios/add-portfolio?id=${row.id}`}>
          <IconButton>
            <PencilSimpleIcon />
          </IconButton>
        </Link>
      ),
      name: 'Actions', // Custom column for actions
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.title}
        </Typography>
      ),
      name: 'Name', // 'Name' column from original table
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.type}
        </Typography>
      ),
      name: 'Type', // 'Type' column from original table
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.sessions}
        </Typography>
      ),
      name: 'Sessions', // 'sessions' column from original table
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.model}
        </Typography>
      ),
      name: 'Model', // 'model' column from original table
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.days_location}
        </Typography>
      ),
      name: 'Days Location', // 'days_location' column from original table
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.producer}
        </Typography>
      ),
      name: 'Producer', // 'producer' column from original table
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.production_studio}
        </Typography>
      ),
      name: 'Production Studio', // 'production_studio' column from original table
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.location}
        </Typography>
      ),
      name: 'Location', // 'location' column from original table
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.talent}
        </Typography>
      ),
      name: 'Talent', // 'talent' column from original table
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.creation_10_images_services_provide}
        </Typography>
      ),
      name: 'Images Services', // 'creation_10_images_services_provide' column from original table
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.brand}
        </Typography>
      ),
      name: 'Brand', // 'brand' column from original table
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.deliverables}
        </Typography>
      ),
      name: 'Deliverables', // 'deliverables' column from original table
    },
    {
      formatter: (row) => <Chip label={row.status} size="small" variant="outlined" />,
      name: 'Status', // 'status' column from original table
    },
  ];

  return (
    <Stack spacing={4}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Portfolios</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link legacyBehavior href="/dashboard/portfolios/add-portfolio">
            <a>
              <Button startIcon={<PlusIcon />} variant="contained">
                Add
              </Button>
            </a>
          </Link>
        </Box>
      </Stack>
      <PageLoader loading={loading} error={null}>
        <Card>
          <Box sx={{ overflowX: 'auto' }}>
            <DataTable
              isPagination={true}
              totalRecords={totalPortfolios}
              rowsPerPageOptions={pagination.limit}
              pageNo={pagination.pageNo}
              columns={columns}
              rows={portfolios}
              uniqueRowId="id"
              selectionMode="none"
              leftItems={
                <>
                  <FilterButton
                    displayValue={status}
                    label="Status"
                    onFilterApply={(value) => setStatus(value)}
                    onFilterDelete={() => setStatus('')}
                    popover={<StatusFilterPopover />}
                    value={status}
                  />
                  <RefreshPlugin onClick={fetchList} />
                </>
              }
              onRowsPerPageChange={(pageNumber, rowsPerPage) =>
                setPagination({ pageNo: pageNumber, limit: rowsPerPage })
              }
              onPageChange={(newPageNumber) => setPagination({ ...pagination, pageNo: newPageNumber })}
            />
            {!portfolios?.length ? (
              <Box sx={{ p: 3 }}>
                <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                  No portfolios found
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Card>
      </PageLoader>
    </Stack>
  );
}
