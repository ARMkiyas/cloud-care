'use client';

import {
  ActionIcon,
  Group,
  Paper,
  PaperProps,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import dynamic from 'next/dynamic';
import { IconDotsVertical } from '@tabler/icons-react';
import { Surface } from '@/components/dash_AnaliticalComponets';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type RevenueChartProps = PaperProps;

const RevenueChart = ({ ...others }: RevenueChartProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const series = [
    {
      name: 'Patients 2023',
      data: [145, 105, 225, 110, 150, 120, 95,130],
      
    },
    {
      name: 'Patients 2022',
      data: [50, 98, 85, 40, 105, 100, 42,50],
    },
  ];

  const options: any = {
    chart: {
      height: 350,
      type: 'area',
      fontFamily: 'Open Sans, sans-serif',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2023-01-01T00:00:00.000Z',
        '2023-03-01T01:30:00.000Z',
        '2023-05-01T02:30:00.000Z',
        '2023-06-01T03:30:00.000Z',
        '2023-09-01T04:30:00.000Z',
        '2023-012-01T05:30:00.000Z',
        '2024-01-01T06:30:00.000Z',
      ],
      labels: {
        style: {
          colors: colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
    colors: [
      theme.colors.green[6],
      theme.colors.yellow[4],
    ],
    legend: {
      labels: {
        colors: [colorScheme === 'dark' ? theme.white : theme.black],
      },
    },
  };

  return (
    <Surface component={Paper} {...others}>
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600}>
          Hospital Survey
        </Text>
        <ActionIcon variant="subtle">
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Group>
      {/*@ts-ignore*/}
      <Chart
        options={options}
        series={series}
        type="area"
        height={350}
        width={'100%'}
      />
    </Surface>
  );
};

export default RevenueChart;