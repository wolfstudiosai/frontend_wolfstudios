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
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Iconify } from '@/components/iconify/iconify';

export const ConversionRate = () => {
  const rows = [
    { year: '2024', customer: '3000', trend: '20', revenue: '124' },
    { year: '2023', customer: '3000', trend: '20', revenue: '124' },
  ];
  const profits = [
    { year: '2024', percent: '65', revenue: '124' },
    { year: '2023', percent: '65', revenue: '124' },
    { year: '2022', percent: '65', revenue: '124' },
    { year: '2021', percent: '65', revenue: '124' },
  ];

  return (
    <Card sx={{ padding: { xs: 3, md: 4 } }}>
      <Grid container>
        <Grid item size={{ xs: 12, md: 8 }}>
          <Stack direction="row" spacing={3} justifyContent={'center'} alignItems={'center'}>
            <Box>
              <Typography color="primary" sx={{ fontWeight: 500, fontSize: pxToRem(24) }}>
                Conversion Rate
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Year</TableCell>
                      <TableCell>Customers</TableCell>
                      <TableCell>Trend</TableCell>
                      <TableCell>Revenue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.year}>
                        <TableCell component="th" scope="row">
                          {row.year}
                        </TableCell>
                        <TableCell>{row.customer}</TableCell>
                        <TableCell>{row.trend}%</TableCell>
                        <TableCell>${row.revenue}K</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box>
              <Typography color="primary" sx={{ fontWeight: 500, fontSize: pxToRem(24) }}>
                32,456
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Regular Customers
              </Typography>
              <IconText icon="mdi:arrow-drop-up" text="32,456" />
            </Box>
            <Box>
              <Typography color="primary" sx={{ fontWeight: 500, fontSize: pxToRem(24) }}>
                32,456
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Regular Customers
              </Typography>
              <IconText icon="mdi:arrow-drop-up" text="32,456" />
            </Box>
          </Stack>
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Grid container spacing={1}>
            {profits.map((profit) => (
              <Grid key={profit.year} item size={{ xs: 6 }}>
                <ProfitCard data={profit} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

const IconText = ({ icon, text }) => {
  return (
    <Stack direction="row">
      <Iconify icon={icon} width={24} height={24} color="success" />
      <Typography variant="body2" color="primary">
        {text}
      </Typography>
    </Stack>
  );
};

const ProfitCard = ({ data }) => {
  return (
    <Box sx={{ p: 1, boxShadow: 'var(--mui-shadows-16)', borderRadius: 1 }}>
      <Stack direction="row" alignItems={'center'}>
        <Typography variant="body2">Profit {data.year}</Typography>
        <IconText icon="mdi:arrow-drop-up" text={`${data.percent}%`} />
      </Stack>
      <Typography color="primary" sx={{ fontWeight: 500, fontSize: pxToRem(20) }}>
        ${data.year}K
      </Typography>
    </Box>
  );
};
