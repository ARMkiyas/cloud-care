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
//import { DataTable } from 'mantine-datatable';
import { IconDotsVertical } from '@tabler/icons-react';
import { ErrorAlert, Surface } from '@/components';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type DieasesSummaryProps = PaperProps;

const DieasesSummary = ({ ...others }: DieasesSummaryProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const series=[
    {
      name:'malaria',
      data:15
    },{
      name:'tuberculosis',
      data:55
    },{
      name:'pneumonia',
      data:41,
    },{
      name:'diabets',
      data:44
    }
  ];

 

  const options: any = {
    chart: { type: 'donut', fontFamily: 'Open Sans, sans-serif' },
    legend: { show: true,
      position:'bottom',
      fontSize:'12px',
      labels: {
        colors: colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
      } 
    },
    dataLabels: { enabled: false },
    tooltip: { enabled: false },
    states: {
      hover: { filter: { type: 'lighten', value: 0.5 } },
      active: { filter: { type: 'none', value: 0 } },
    },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '50%',
          thickness:'50',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '12px',
              fontWeight: '400',
              color:
                colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
            },
          },
        },
      },
    },
    colors: [
      theme.colors.yellow[3],
      theme.colors.cyan[2],
      theme.colors.blue[3],
      theme.colors.pink[2]
    ],
    labels: series.map(item => item.name)
  };

  const chartSeries = series.map(item => item.data);

  return (
    <Surface component={Paper} {...others}>
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600}>
          Disease Summary
        </Text>
        <ActionIcon variant="subtle">
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Group>
      {/*@ts-ignore*/}
      <Chart
        options={options}
        series={chartSeries}
        type="donut"
        height={250}
        width={'100%'}
      />
    </Surface>
  );
};

export default DieasesSummary;