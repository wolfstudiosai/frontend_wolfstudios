"use client"

import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { DataTable } from "/src/components/data-table/data-table";
import { useContentList } from "/src/services/content/useContentList";
import { AllContentRightPanel } from "../../../../(private)/all-content/_component/all-content-right-panel";
import PageLoader from "../../../../../components/loaders/PageLoader";

export const UserMyContentView = () => {
  const { isLoading, data } = useContentList();
  const [selectedContent, setSelectedContent] = React.useState(null);
  const [openRightPanel, setOpenRightPanel] = React.useState(false);

  // Define columns for DataTable
  const columns = [
    {
      name: "Image",
      field: "thumbnailImage",
      width: 10,
      formatter: (row) => (
        <Avatar src={row.thumbnailImage} variant="rounded" sx={{ width: 40, height: 40 }} />
      ),
    },
    {
      name: "Content Name",
      field: "name",
      width: 250,
      formatter: (row) => <Typography fontWeight={500}>{row.name}</Typography>,
    },
    {
      name: "Comment",
      field: "partnerIGTotalComments",
      width: 150,
      formatter: (row) => <Typography fontWeight={500}>{row.partnerIGTotalComments}</Typography>,
    },
    {
      name: "Like",
      field: "partnerIGTotalLikes",
      width: 150,
      formatter: (row) => <Typography fontWeight={500}>{row.partnerIGTotalLikes}</Typography>,
    },
    {
      name: "Share",
      field: "partnerIGTotalShares",
      width: 150,
      formatter: (row) => <Typography fontWeight={500}>{row.partnerIGTotalShares}</Typography>,
    },
    {
      name: "Views",
      field: "partnerIGTotalViews",
      width: 150,
      formatter: (row) => <Typography fontWeight={500}>{row.partnerIGTotalViews}</Typography>,
    },
    {
      name: "Actions",
      field: "actions",
      width: 150,
      formatter: (row) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              setSelectedContent(row);
              setOpenRightPanel(true);
            }}
          >
            View
          </Button>
        </Box>
      ),
    }
  ];

  return (
    <PageLoader isLoading={isLoading}>
      <Box>
        <Typography variant="h4" fontWeight={500} sx={{ mb: 2 }}>
          My Content
        </Typography>

        <DataTable
          columns={columns}
          rows={data}
          uniqueRowId={(row) => row.id}
          selectionMode="none"
          hover
          isPagination={false}
          pageNo={1}
          totalRecords={data?.length}
          rowsPerPage={5}
        />

        {openRightPanel && (
          <AllContentRightPanel
            onClose={() => setOpenRightPanel(false)}
            open={openRightPanel}
            id={selectedContent?.id}
            view={'QUICK'}
          />
        )}
      </Box>
    </PageLoader>
  )
}