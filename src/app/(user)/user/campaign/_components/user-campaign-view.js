"use client";

import React from "react";
import { Box, Avatar, Chip, Button, Typography } from "@mui/material";
import { DataTable } from "/src/components/data-table/data-table";
import { useCampaignList } from "../../../../../services/campaign/useCampaignList";
import PageLoader from "../../../../../components/loaders/PageLoader";
import { CampaignRightPanel } from "../../../../(public)/campaign/_components/campaign-right-panel";

export const UserCampaignView = () => {
  const { isLoading, data } = useCampaignList();
  const [selectedCampaign, setSelectedCampaign] = React.useState(null);
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
      name: "Campaign Name",
      field: "name",
      width: 250,
      formatter: (row) => <Typography fontWeight={500}>{row.name}</Typography>,
    },
    {
      name: "Start Date",
      field: "startDate",
      width: 150,
    },
    {
      name: "Status",
      field: "campaignStatus",
      width: 150,
      formatter: (row) => (
        <Chip
          label={row.campaignStatus}
          color={row.campaignStatus === "ACTIVE" ? "primary" : "warning"}
          size="small"
        />
      ),
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
              setSelectedCampaign(row);
              setOpenRightPanel(true);
            }}
          >
            View
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <PageLoader isLoading={isLoading}>
      <Box>
        <Typography variant="h4" fontWeight={500} sx={{ mb: 2 }}>
          My Campaigns
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
      </Box>

      {openRightPanel && (
        <CampaignRightPanel
          onClose={() => setOpenRightPanel(false)}
          open={openRightPanel ? true : false}
          id={selectedCampaign?.id}
          view={'QUICK'}
        />
      )}
    </PageLoader>
  );
}