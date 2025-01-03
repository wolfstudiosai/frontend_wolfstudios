import { pxToRem } from '@/utils/utils';
import {
  Box,
  Card,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Iconify } from '@/components/iconify/iconify';

export const ConversionRate = () => {
  const rows = [
    { year: '2024', customer: '3000', trend: '20', revenue: '124' },
    { year: '2023', customer: '3000', trend: '20', revenue: '124' },
    { year: '2022', customer: '3000', trend: '20', revenue: '124' },
    { year: '2021', customer: '3000', trend: '20', revenue: '124' },
    { year: '2020', customer: '3000', trend: '20', revenue: '124' },
  ];

  return (
    <Card sx={{ padding: { xs: 3, md: 4 } }}>
      <Grid container>
        <Grid item size={{ xs: 12, md: 8 }}>
          <Typography color="primary" sx={{ fontWeight: 500, fontSize: pxToRem(24) }}>
            Conversion Rate
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell align="right">Customers</TableCell>
                  <TableCell align="right">Trend</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell component="th" scope="row">
                      {row.year}
                    </TableCell>
                    <TableCell align="right">{row.customer}</TableCell>
                    <TableCell align="right">{row.trend}</TableCell>
                    <TableCell align="right">{row.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: pxToRem(24) }}>
              32,456
            </Typography>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: pxToRem(24) }}>
              Regular Customers
            </Typography>
            <IconText icon="mdi:arrow-drop-up" text="vs Last Year: 32,456" />
          </Box>
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
          profit
        </Grid>
      </Grid>
    </Card>
  );
};

const IconText = ({ icon, text }) => {
  return (
    <Stack direction="row" spacing={1}>
      <Iconify icon={icon} width={24} height={24} color="secondary" />
      <Typography variant="body2" color="secondary">
        {text}
      </Typography>
    </Stack>
  );
};
