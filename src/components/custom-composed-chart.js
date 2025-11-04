import React from "react";
import {
  ComposedChart,
  Bar,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/material";
import { NoSsr } from "@mui/material";

const CombinedChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
        <NoSsr fallback={<Box sx={{ height: '400px' }} />}>
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Bar chart */}
          <Bar dataKey="value" barSize={40} fill="#413ea0" name="Bar Value" />

          {/* Scatter chart */}
          <Scatter dataKey="scatterVal" fill="#ff7300" name="Scatter Value" />
        </ComposedChart>
        </NoSsr>
      </ResponsiveContainer>
);

export default CombinedChart;
