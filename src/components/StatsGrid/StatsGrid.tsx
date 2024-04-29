"use client";

import { Group, Paper, SimpleGrid, Skeleton, Text } from "@mantine/core";
import { FaUserDoctor, FaPersonCane } from "react-icons/fa6";
import { PiFirstAidKitFill } from "react-icons/pi";
import classes from "./StatsGrid.module.css";
import OperationIcon from "@/components/icon/OperationIcon";
import { useApiClient } from "@/utils/trpc/Trpc";

const icons = {
  doctor: FaUserDoctor,
  operation: OperationIcon,
  appointment: PiFirstAidKitFill,
  patient: FaPersonCane,
};

const Tempdata = [
  { title: "Appointments", icon: "appointment" },
  { title: "New Patients", icon: "patient" },
  { title: "Operations", icon: "operation" },
  { title: "Our Doctors", icon: "doctor" },
] as const;

export default function StatsGrid() {
  const { data, isLoading } = useApiClient.dashdata.StatsGridData.useQuery();

  const statsLoading = Tempdata.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} shadow="xs">
        <div className="flex h-full">
          <div className="flex flex-row items-center justify-center">
            <Icon className={classes.icon} size="3.5rem" />
          </div>
          <div className="flex flex-col">
            <Text size="md" className={classes.title}>
              {stat.title}
            </Text>
            <Text className={classes.value}>
              <Skeleton className="w-full h-9" />
            </Text>
          </div>
        </div>
      </Paper>
    );
  });

  const statsData = data?.data?.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} shadow="xs">
        <div className="flex h-full">
          <div className="flex flex-row items-center justify-center">
            <Icon className={classes.icon} size="3.5rem" />
          </div>
          <div className="flex flex-col">
            <Text size="md" className={classes.title}>
              {stat.title}
            </Text>
            <Text className={classes.value}>{stat.value}</Text>
          </div>
        </div>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} className={classes.grid}>
        {isLoading ? statsLoading : statsData}
      </SimpleGrid>
    </div>
  );
}
