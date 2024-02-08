'use client';

import {
  Button,
  Container,
  Grid,
  Group,
  Paper,
  PaperProps,
  Stack,
  Text,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import {
  DieasesSummary,
  RevenueChart,
  StatsGrid,
  TotalBooking,
} from '@/components'
import Link from 'next/link';
import { PATH_TASKS } from '@/routes';
import { useFetchData } from '@/hooks';
import { TableScrollArea } from '@/lib/TableScrollArea/TableScrollArea';

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
  style: { height: '100%' },
};

function Page() {
  const {
    data: projectsData,
    error: projectsError,
    loading: projectsLoading,
  } = useFetchData('/mocks/Projects.json');
  const {
    data: statsData,
    error: statsError,
    loading: statsLoading,
  } = useFetchData('/mocks/StatsGrid.json');

  return (
    <>
  
      <Container fluid>
        <Stack gap="lg">
          <StatsGrid/>
          <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
            <Grid.Col>
              <RevenueChart {...PAPER_PROPS} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TotalBooking {...PAPER_PROPS} />
            </Grid.Col>
            <Grid.Col span={6}>
              <DieasesSummary {...PAPER_PROPS} />
            </Grid.Col>
            <Grid.Col>
              <Paper {...PAPER_PROPS}>
                <Group justify="space-between" mb="md">
                  <Text size="lg" fw={600}>
                    Appointment Activity
                  </Text>
                </Group>
                <TableScrollArea/>
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </>
  );
}

export default Page;