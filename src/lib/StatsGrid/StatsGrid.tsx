import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { FaUserDoctor ,FaPersonCane } from "react-icons/fa6";
import { PiFirstAidKitFill } from "react-icons/pi";
import classes from './StatsGrid.module.css';
import OperationIcon from '@/components/icon/OperationIcon';



const icons = {
  doctor: FaUserDoctor,
  operation: OperationIcon,
  appointment: PiFirstAidKitFill,
  patient: FaPersonCane,
};

const data = [
  { title: 'Appointments', icon: 'appointment', value: '213' },
  { title: 'New Patients', icon: 'patient', value: '104'},
  { title: 'Operations', icon: 'operation', value: '24'},
  { title: 'Our Doctors', icon: 'doctor', value: '109'},
] as const;

export default function StatsGrid() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];


    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
              <div className="flex flex-col items-center justify-center h-full">
          <div className="flex justify-center items-center">
        <Icon className={classes.icon} size="3.5rem" />
        <Text size="md" className={classes.title}>
            {stat.title}
          </Text>
          </div>
         <Text className={classes.value}>{stat.value}</Text>
         </div>
    </Paper>

    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  );
}