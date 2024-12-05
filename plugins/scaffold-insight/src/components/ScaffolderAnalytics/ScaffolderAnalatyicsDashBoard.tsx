import React, { useState } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Container,
  useTheme,
  GlobalStyles,
  Button,
  Card,
  CardContent,
  ButtonGroup,
} from '@mui/material';
import { useAsync } from 'react-use';
import { ScaffolderTask } from '@backstage/plugin-scaffolder-react';
import { useApi } from '@backstage/core-plugin-api';
import { scaffolderAnalyticsApiRef } from '../../api/api';
import { OverviewCard } from '../Cards/OverviewCard';
import { TimeSavedChart } from '../Cards/TimeSavedChart';
import QuickStats from '../Cards/QuickStats';
import { RecentTemplatesTable } from '../Cards/RecentTemplatesTable';

export interface Efficiency {
  value?: string;
  unit?: string;
  impact?: string;
}

export const AnalyticsDashBoard = () => {
  const theme = useTheme();
  const templatDashboardApi = useApi(scaffolderAnalyticsApiRef);

  const [filterByOwnership, setFilterByOwnership] = useState<'all' | 'owned'>(
    'all',
  );
  const [limit, setLimit] = useState<number | undefined>(undefined);

  const { value, loading, error } = useAsync(async () => {
    return await templatDashboardApi.listTasks({
      filterByOwnership,
      limit,
    });
  }, [templatDashboardApi, filterByOwnership, limit]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={80} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 4,
            textAlign: 'center',
            backgroundColor: theme.palette.error.light,
          }}
        >
          <Typography color="error" variant="h5">
            Error Loading Tasks
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {error instanceof Error
              ? error.message
              : 'An unknown error occurred'}
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (!value || value.tasks.length === 0) {
    return (
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5">No Tasks Found</Typography>
        </Paper>
      </Container>
    );
  }

  const successfulTasks = value.tasks.filter(task => task.status !== 'failed');

  const totalTimeSaved = successfulTasks.reduce(
    (acc: number, task: ScaffolderTask) => {
      const efficiencyBoost: Efficiency = task?.spec?.templateInfo?.entity
        ?.metadata['efficiency-boost'] as Efficiency;
      return (
        acc + (efficiencyBoost?.value ? parseInt(efficiencyBoost.value) : 0)
      );
    },
    0,
  );

  const chartData = value.tasks.map(task => {
    const efficiencyBoost: Efficiency = task?.spec?.templateInfo?.entity
      ?.metadata['efficiency-boost'] as Efficiency;
    return {
      name: task?.spec?.templateInfo?.entity?.metadata.name,
      timeSaved: efficiencyBoost || { value: '0', unit: 'minutes', impact: '' },
    };
  });

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
          },
        }}
      />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <OverviewCard totalTimeSaved={totalTimeSaved} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TimeSavedChart chartData={chartData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box gap={1}>
              <QuickStats
                totalTasks={value.tasks.length}
                successfulTasks={successfulTasks.length}
              />
              {/* Card Control */}
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {/* Ownership Button Group */}
                    <ButtonGroup color="primary" aria-label="Ownership filter">
                      <Button
                        variant={
                          filterByOwnership === 'all' ? 'contained' : 'outlined'
                        }
                        onClick={() => setFilterByOwnership('all')}
                      >
                        All
                      </Button>
                      <Button
                        variant={
                          filterByOwnership === 'owned'
                            ? 'contained'
                            : 'outlined'
                        }
                        onClick={() => setFilterByOwnership('owned')}
                      >
                        Owned
                      </Button>
                    </ButtonGroup>
                    {/* Limit Button Group */}
                    <ButtonGroup
                      color="secondary"
                      aria-label="Task limit filter"
                    >
                      <Button
                        variant={limit === 20 ? 'contained' : 'outlined'}
                        onClick={() => setLimit(20)}
                      >
                        20
                      </Button>
                      <Button
                        variant={limit === undefined ? 'contained' : 'outlined'}
                        onClick={() => setLimit(undefined)}
                      >
                        All
                      </Button>
                    </ButtonGroup>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <RecentTemplatesTable tasks={value.tasks} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
