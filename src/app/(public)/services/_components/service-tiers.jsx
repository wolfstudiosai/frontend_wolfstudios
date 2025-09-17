import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const data = [
  { id: 1, category: 'Meta', amount: 1500 },
  { id: 2, category: 'Instagram', amount: 1500 },
  { id: 3, category: 'Facebook', amount: 1500 },
  { id: 4, category: 'Tiktok', amount: 1500 },
  { id: 5, category: 'Youtube', amount: 1500 },
];

export const ServiceTiers = ({ selectedTier, setSelectedTier }) => {

  const handleSelect = (row) => {
    setSelectedTier(prev => prev.some((item) => item.id === row.id) ? prev.filter((item) => item.id !== row.id) : [...prev, row]);
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, mt: 5, borderRadius: 0 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell >
              <strong>Platform</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Price ($)</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedTier.some((item) => item.id === row.id)}
                  onChange={() => handleSelect(row)}
                />
              </TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
