'use client';

import React from "react";
import { Box } from "@mui/material";
import { ExpenseTable } from "./_components/expense-table";
import { ExpenseProduct } from "./_components/expense-product";
import { ExpensesProduction } from "./_components/expenses-production";
import { ExpenseCampaign } from "./_components/expense-campaign";

export default function ExpenseOverview() {
    return (
        <Box display="flex" flexDirection="column" gap={5}>
            <ExpenseTable />
            <ExpenseProduct />
            <ExpensesProduction />
            <ExpenseCampaign />
        </Box>
    );
}