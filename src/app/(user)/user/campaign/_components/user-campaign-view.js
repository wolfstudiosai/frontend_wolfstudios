"use client";

import React from "react";
import { Box, Avatar, Chip, Typography } from "@mui/material";
import { DataTable } from "/src/components/data-table/data-table";

// Sample campaign data
const campaigns = [
  {
    id: 1,
    name: "Summer Fashion Campaign",
    image: "/images/campaign1.jpg",
    startDate: "2025-11-20",
    status: "Accepted",
  },
  {
    id: 2,
    name: "Fitness Influencer Campaign",
    image: "/images/campaign2.jpg",
    startDate: "2025-11-25",
    status: "Pending",
  },
  {
    id: 3,
    name: "Tech Gadget Launch",
    image: "/images/campaign3.jpg",
    startDate: "2025-12-01",
    status: "Accepted",
  },
  {
    id: 4,
    name: "Tech Gadget Launch",
    image: "/images/campaign4.jpg",
    startDate: "2025-12-01",
    status: "Accepted",
  },
  {
    id: 5,
    name: "Tech Gadget Launch",
    image: "/images/campaign6.jpg",
    startDate: "2025-12-01",
    status: "Accepted",
  },
];

// Define columns for DataTable
const columns = [
  {
    name: "Image",
    field: "image",
    width: 100,
    formatter: (row) => (
      <Avatar src={row.image} variant="rounded" sx={{ width: 40, height: 40 }} />
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
    field: "status",
    width: 150,
    formatter: (row) => (
      <Chip
        label={row.status}
        color={row.status === "Accepted" ? "success" : "warning"}
        size="small"
      />
    ),
  },
];

export const UserCampaignView = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={500} sx={{ mb: 1 }}>
        My Campaigns
      </Typography>
      <DataTable
        columns={columns}
        rows={campaigns}
        uniqueRowId={(row) => row.id}
        selectionMode="none"
        hover
        isPagination={true}
        pageNo={1}
        totalRecords={campaigns.length}
        rowsPerPage={5}
      />
    </Box>
  );
}