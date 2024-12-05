import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

const QuickStats = ({
  totalTasks,
  successfulTasks,
}: {
  totalTasks: number;
  successfulTasks: number;
}) => (
  <Card elevation={3}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Quick Stats
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Total Tasks</Typography>
          <Typography fontWeight="bold">{totalTasks}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Successful Tasks</Typography>
          <Typography fontWeight="bold">{successfulTasks}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default QuickStats;
