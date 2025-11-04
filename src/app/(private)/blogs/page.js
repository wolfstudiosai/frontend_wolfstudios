'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { Avatar, Switch } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { toast } from 'sonner';

import { paths } from '/src/paths';
import { dayjs } from '/src/lib/dayjs';
import { useDebounce } from '/src/hooks/use-debounce';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { DataTable } from '/src/components/data-table/data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';

import { deleteBlogAsync } from './_lib/blog.actions';
import { useAllBlogs } from '/src/services/blog/useAllBlogs';

const blogData = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=400',
    title: 'The Future of Web Development',
    content:
      'Web development is rapidly evolving with frameworks like Next.js, React Server Components, and AI-driven automation reshaping how we build modern applications...',
    published: true,
    featured: true,
    createdAt: '2025-10-22T10:35:00Z',
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1522204502304-953d4e2c3b93?w=400',
    title: 'Understanding Prisma ORM',
    content:
      'Prisma has revolutionized database interaction in Node.js by offering a type-safe, auto-generated query builder that makes working with SQL databases a breeze...',
    published: true,
    featured: false,
    createdAt: '2025-09-15T14:20:00Z',
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1581091012184-7dbe61a7a6c1?w=400',
    title: 'Building Scalable APIs with Express and TypeScript',
    content:
      'Express.js remains one of the most popular Node.js frameworks. Combined with TypeScript and Prisma, it provides a powerful and maintainable API architecture...',
    published: false,
    featured: false,
    createdAt: '2025-08-02T09:00:00Z',
  },
  {
    id: '4',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
    title: 'UI/UX Best Practices for Modern Dashboards',
    content:
      'Designing dashboards involves balancing usability, aesthetics, and data visualization. Learn how to create intuitive admin dashboards using Material UI and React...',
    published: true,
    featured: true,
    createdAt: '2025-07-18T18:45:00Z',
  },
  {
    id: '5',
    thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400',
    title: 'A Beginner’s Guide to Server Components',
    content:
      'React Server Components (RSC) are transforming the way we fetch and render data. This guide explains how to use them efficiently in Next.js 14 projects...',
    published: false,
    featured: true,
    createdAt: '2025-06-30T12:10:00Z',
  },
];

export default function Page({}) {
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const debounceSearch = useDebounce(searchValue, 500);
  const [blogs, setBlogs] = React.useState(blogData);

  const { users, totalRecords, isLoading, mutate } = useAllBlogs({
    page: pagination.pageNo,
    rowsPerPage: pagination.limit,
    search: debounceSearch,
  });

  const onDelete = () => {
    mutate(); // Revalidate the data after deletion
  };

  const handleTogglePublished = async (id, newValue) => {
    try {
      // Optimistic UI update
      setBlogs((prev) => prev.map((blog) => (blog.id === id ? { ...blog, published: newValue } : blog)));

      // Optional: send API request to update status
      // const res = await fetch(`/api/blogs/${id}/publish`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ published: newValue }),
      // });

      // if (!res.ok) {
      //   throw new Error("Failed to update publish status");
      // }

      toast.success(`Blog ${newValue ? 'published' : 'unpublished'} successfully!`);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while updating publish status');

      // Revert optimistic update
      setBlogs((prev) => prev.map((blog) => (blog.id === id ? { ...blog, published: !newValue } : blog)));
    }
  };

  const handleToggleFeatured = async (id, newValue) => {
    try {
      // Optimistic UI update
      setBlogs((prev) => prev.map((blog) => (blog.id === id ? { ...blog, featured: newValue } : blog)));

      // Optional: send API request to update status
      //   const res = await fetch(`/api/blogs/${id}/feature`, {
      //     method: 'PATCH',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ featured: newValue }),
      //   });

      //   if (!res.ok) {
      //     throw new Error('Failed to update featured status');
      //   }

      toast.success(`Blog ${newValue ? 'marked as featured' : 'removed from featured'}!`);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while updating featured status');

      // Revert optimistic update
      setBlogs((prev) => prev.map((blog) => (blog.id === id ? { ...blog, featured: !newValue } : blog)));
    }
  };

  const columns = [
    // 1️⃣ Actions
    {
      formatter: (row) => (
        <Stack direction="row">
          <IconButton onClick={() => handleOpenModal(row)}>
            <PencilSimpleIcon />
          </IconButton>
        </Stack>
      ),
      name: 'Actions',
    },

    // 2️⃣ Thumbnail
    {
      formatter: (row) => (
        <Avatar
          src={row.thumbnail || '/default-thumbnail.png'}
          alt={row.title}
          variant="rounded"
          sx={{ width: 60, height: 60 }}
        />
      ),
      name: 'Thumbnail',
    },

    // 3️⃣ Title paths.dashboard.blogs.details(row.id)
    {
      formatter: (row) => (
        <Link href={'/'} style={{ textDecoration: 'none' }}>
          <Typography variant="subtitle2" color="text.primary">
            {row.title}
          </Typography>
        </Link>
      ),
      name: 'Title',
    },

    // 4️⃣ Partial Content
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 300 }}>
          {row.content?.length > 80 ? `${row.content.slice(0, 80)}...` : row.content}
        </Typography>
      ),
      name: 'Content',
    },

    // 5️⃣ Published Switch
    {
      formatter: (row) => (
        <Stack direction="row" justifyContent="center">
          <Switch
            checked={row.published}
            onChange={() => handleTogglePublished(row.id, !row.published)}
            color="primary"
          />
        </Stack>
      ),
      name: 'Published',
    },

    // 6️⃣ Featured Switch
    {
      formatter: (row) => (
        <Stack direction="row" justifyContent="center">
          <Switch
            checked={row.featured}
            onChange={() => handleToggleFeatured(row.id, !row.featured)}
            color="secondary"
          />
        </Stack>
      ),
      name: 'Featured',
    },

    // 7️⃣ Created at
    {
      formatter: (row) => dayjs(row.createdAt).format('MMM D, YYYY h:mm A'),
      name: 'Created at',
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Blogs</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button LinkComponent={RouterLink} href="/blogs/add" startIcon={<PlusIcon />} variant="contained">
              Add
            </Button>
          </Box>
        </Stack>
        <Card>
          <Box sx={{ overflowX: 'auto' }}>
            <React.Fragment>
              <DataTable
                loading={isLoading}
                isPagination={true}
                totalRecords={totalRecords}
                rowsPerPageOptions={pagination.limit}
                pageNo={pagination.pageNo}
                columns={columns}
                rows={blogs}
                uniqueRowId="id"
                selectionMode="multiple"
                leftItems={
                  <>
                    <TextField
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search blog..."
                    />
                    <RefreshPlugin onClick={mutate} />
                  </>
                }
                rightItems={
                  <>
                    <DeleteConfirmationPasswordPopover
                      title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}
                      id={selectedRows.map((row) => row.id)}
                      onDelete={onDelete}
                      deleteFn={deleteBlogAsync}
                      passwordInput
                      disabled={selectedRows.length === 0}
                    />
                  </>
                }
                onRowsPerPageChange={(pageNumber, rowsPerPage) =>
                  setPagination({ pageNo: pageNumber, limit: rowsPerPage })
                }
                onPageChange={(newPageNumber) => setPagination({ ...pagination, pageNo: newPageNumber })}
                onSelection={(selectedRows) => setSelectedRows?.(selectedRows)}
              />
              {!users?.length && !isLoading ? (
                <Box sx={{ p: 3 }}>
                  <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                    No customers found
                  </Typography>
                </Box>
              ) : null}
            </React.Fragment>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}
