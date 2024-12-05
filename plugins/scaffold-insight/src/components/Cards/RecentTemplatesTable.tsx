import React from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Divider,
  Box,
  Chip,
} from '@mui/material';
import {ListOutlined} from '@material-ui/icons';
import { ScaffolderTask } from '@backstage/plugin-scaffolder-react';

interface Efficiency {
  value?: string;
  unit?: string;
  impact?: string;
}

export const RecentTemplatesTable = ({
  tasks,
}: {
  tasks: ScaffolderTask[];
}) => {
  const getStatusChip = (status: string) => (
    <Chip
      label={status}
      color={status === 'failed' ? 'error' : 'success'}
      sx={{
        fontWeight: 'bold',
        borderRadius: 2,
        textTransform: 'uppercase',
      }}
    />
  );

  return (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <ListOutlined />
          <Typography variant="h6">Recent Templates Used</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Template Name</TableCell>
                <TableCell>Time Saved</TableCell>
                <TableCell>Impact</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map(task => {
                const efficiencyBoost: Efficiency = task?.spec?.templateInfo
                  ?.entity?.metadata?.['efficiency-boost'] as Efficiency;
                return (
                  <TableRow
                    key={task.id}
                    hover
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={task?.spec?.user?.entity?.spec.profile?.picture}
                          sx={{ mr: 2 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" />
                          <Typography variant="body2" color="text.secondary">
                            {task?.spec?.user?.entity?.spec.profile?.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {task.spec.templateInfo?.entity?.metadata?.name}
                    </TableCell>
                    <TableCell>
                      {task.status !== 'failed'
                        ? `${efficiencyBoost?.value || 0} minutes`
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {task.status !== 'failed'
                        ? efficiencyBoost?.impact
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{getStatusChip(task.status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
