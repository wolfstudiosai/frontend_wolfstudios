"use client"

import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { DataTable } from "/src/components/data-table/data-table";

// Sample my-content data
const myContent = [
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
    startDate: "2025-12-05",
    status: "Rejected",
  },
];

export const UserMyContentView = () => {

  // Define columns for DataTable
  const columns = [
    {
      name: "Image",
      field: "image",
      width: 10,
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
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={500} sx={{ mb: 1 }}>
        My Content
      </Typography>

      <DataTable
        columns={columns}
        rows={myContent}
        uniqueRowId={(row) => row.id}
        selectionMode="none"
        hover
        isPagination={true}
        pageNo={1}
        totalRecords={myContent.length}
        rowsPerPage={5}
      />
    </Box>
  )
}