import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const expenseData = [
  {
    name: "John Doe",
    expenseType: "Travel",
    stackholder: "Logistics Partner",
    partnerHQ: "New York HQ",
    paymentDate: "2022-01-01",
  },
  {
    name: "Jane Smith",
    expenseType: "Marketing",
    stackholder: "Media Partner",
    partnerHQ: "London HQ",
    paymentDate: "2022-02-10",
  },
  {
    name: "Michael Brown",
    expenseType: "Consulting",
    stackholder: "Advisory Group",
    partnerHQ: "Toronto HQ",
    paymentDate: "2022-03-15",
  },
  {
    name: "Emily Johnson",
    expenseType: "Supplies",
    stackholder: "Office Supplier",
    partnerHQ: "Sydney HQ",
    paymentDate: "2022-04-12",
  },
  {
    name: "Robert Davis",
    expenseType: "Software License",
    stackholder: "Tech Vendor",
    partnerHQ: "San Francisco HQ",
    paymentDate: "2022-05-20",
  },
  {
    name: "Olivia Wilson",
    expenseType: "Training",
    stackholder: "HR Partner",
    partnerHQ: "Berlin HQ",
    paymentDate: "2022-06-08",
  },
  {
    name: "David Miller",
    expenseType: "Maintenance",
    stackholder: "Facility Partner",
    partnerHQ: "Chicago HQ",
    paymentDate: "2022-07-19",
  },
  {
    name: "Sophia Martinez",
    expenseType: "Advertising",
    stackholder: "Creative Agency",
    partnerHQ: "Los Angeles HQ",
    paymentDate: "2022-08-25",
  },
  {
    name: "James Anderson",
    expenseType: "Event",
    stackholder: "Event Organizer",
    partnerHQ: "Paris HQ",
    paymentDate: "2022-09-30",
  },
  {
    name: "Ava Thompson",
    expenseType: "Research",
    stackholder: "Analytics Firm",
    partnerHQ: "Tokyo HQ",
    paymentDate: "2022-10-18",
  },
];


export const ExpenseTable = () => {
    return (
    <Box>
        <Typography variant="h4">Expense Table</Typography>
        <TableContainer sx={{mt: 2}}>
            <Table size="small" stickyHeader sx={{ border: 1, borderColor: "divider" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Expense Type</TableCell>
                        <TableCell>Stackholder</TableCell>
                        <TableCell>Partner HQ</TableCell>
                        <TableCell>Payment Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenseData.map((expense, index) => (
                        <TableRow key={index}>
                            <TableCell>{expense.name}</TableCell>
                            <TableCell>{expense.expenseType}</TableCell>
                            <TableCell>{expense.stackholder}</TableCell>
                            <TableCell>{expense.partnerHQ}</TableCell>
                            <TableCell>{expense.paymentDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
    )
};

    