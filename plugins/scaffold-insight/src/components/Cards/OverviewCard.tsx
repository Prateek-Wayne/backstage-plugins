import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {TimelapseOutlined} from '@material-ui/icons'

export const OverviewCard = ({
  totalTimeSaved,
}: {
  totalTimeSaved: number;
}) => (
  <Card
    elevation={4}
    sx={{
      background: `linear-gradient(135deg, #1976d2 0%, #1565c0 100%)`,
      color: '#fff',
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" gap={2}>
        <TimelapseOutlined fontSize="large" />
        <Box>
          <Typography variant="h4" gutterBottom>
            Efficiency Dashboard
          </Typography>
          <Typography variant="h6">
            Total Time Saved: {totalTimeSaved} minutes
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);
