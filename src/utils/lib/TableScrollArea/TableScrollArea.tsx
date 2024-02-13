import cx from 'clsx';
import { useState } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from './TableScrollArea.module.css';

const data = [
  {
    name: 'Athena Weissnat',
    email: 'Elouise.Prohaska@yahoo.com',
    date:'10/01/2023',
    visitTime:'09:15-09:45am',
    doctor:'Dr. Jayalath',
    conditions: 'MumpsStageII',
  },
  {
    name: 'Deangelo Runolfsson',
    email: 'Kadin_Trantow87@yahoo.com',
    date:'10/01/2023',
    visitTime:'10:35-11:45am',
    doctor:'Dr. Thisara Jayakodi',
    conditions: 'Depression',
  },
  {
    name: 'Danny Carter',
    email: 'Marina3@hotmail.com',
    date:'10/01/2023',
    visitTime:'11.05-11-20am',
    doctor:'Dr. Ariyasena',
    conditions: 'Arthirtis',
  },
  {
    name: 'Trace Tremblay PhD',
    email: 'Antonina.Pouros@yahoo.com',
    date:'11/01/2023',
    visitTime:'10:15-10:45am',
    doctor:'Dr. Kumara Jayakodi',
    conditions: 'Fracture',
  },
  {
    name: 'Derek Dibbert',
    email: 'Abagail29@hotmail.com',
    date:'11/01/2023',
    visitTime:'11:50-12:20pm',
    doctor:'Dr. M Fazal',
    conditions: 'Depression',
  },
  {
    name: 'Viola Bernhard',
    email: 'Jamie23@hotmail.com',
    date:'12/01/2023',
    visitTime:'09:16-10.00am',
    doctor:'Dr. Jayalath',
    conditions: 'MumpsStageII',
  },
  {
    name: 'Austin Jacobi',
    email: 'Genesis42@yahoo.com',
    date:'12/01/2023',
    visitTime:'10:00-10.20am',
    doctor:'Dr. Jayalath',
    conditions: 'MumpsStageII',
  },
  {
    name: 'Hershel Mosciski',
    email: 'Idella.Stehr28@yahoo.com',
    date:'13/01/2023',
    visitTime:'8:50-09:10am',
    doctor:'Dr. Hirunika',
    conditions: 'Acne',
  },
  {
    name: 'Mylene Ebert',
    email: 'Hildegard17@hotmail.com',
    date:'13/01/2023',
    visitTime:'09:15-09:45am',
    doctor:'Dr. Jayalath',
    conditions: 'Cancer',
  },
  {
    name: 'Lou Trantow',
    email: 'Hillard.Barrows1@hotmail.com',
    date:'14/01/2023',
    visitTime:'12.00-12.20pm',
    doctor:'Dr. Amaradew',
    conditions: 'Blood Cancer',
  },
  
  ];

export function TableScrollArea() {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.date}</Table.Td>
      <Table.Td>{row.visitTime}</Table.Td>
      <Table.Td>{row.doctor}</Table.Td>
      <Table.Td>{row.conditions}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Visit Time</Table.Th>
            <Table.Th>Doctor</Table.Th>
            <Table.Th>Conditions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}