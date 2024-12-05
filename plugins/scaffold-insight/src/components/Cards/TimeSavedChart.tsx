import React from 'react';
import { Card, CardContent, Box, Typography, Divider } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import {BarChartOutlined} from '@material-ui/icons'

import { Efficiency } from '../ScaffolderAnalytics/ScaffolderAnalatyicsDashBoard';

export const TimeSavedChart = ({
  chartData,
}: {
  chartData: { name: string | undefined; timeSaved: Efficiency }[];
}) => (
  <Card elevation={3}>
    <CardContent>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <BarChartOutlined />
        <Typography variant="h6">Time Saved per Template</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box height={300}>
        <BarChart
          xAxis={[
            { scaleType: 'band', data: chartData.map(item => item.name) },
          ]}
          series={[
            {
              data: chartData.map(item =>
                parseInt(item.timeSaved.value || '0'),
              ),
            },
          ]}
          width={700}
          height={300}
        />
      </Box>
    </CardContent>
  </Card>
);
