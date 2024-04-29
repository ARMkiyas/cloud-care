"use client";

import cx from "clsx";
import { useState } from "react";
import { Table, ScrollArea } from "@mantine/core";
import classes from "./TableScrollArea.module.css";
import { useApiClient } from "@/utils/trpc/Trpc";
import dayjs from "dayjs";

export function TableScrollArea() {
  const { data: appdata } = useApiClient.appointment.getAppointments.useQuery({
    limit: 10,
  });

  const [scrolled, setScrolled] = useState(false);

  const rows = appdata?.data.map((row, index) => (
    <Table.Tr key={row.appointmentDate.toString() + "index"}>
      <Table.Td>{`${row.patient.title} ${row.patient.firstName} ${row.patient.lastName}`}</Table.Td>
      <Table.Td>{row.referenceid}</Table.Td>
      <Table.Td>{dayjs(row.appointmentDate).format("DD/MM/YYYY")}</Table.Td>
      <Table.Td>{dayjs(row.appointmentstart).format("HH:MM A")}</Table.Td>
      <Table.Td>{`${row.doctor.staff.title} ${row.doctor.staff.firstName} ${row.doctor.staff.lastName}`}</Table.Td>
      <Table.Td>{row.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={700}>
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Th>Patient name</Table.Th>
            <Table.Th>Reference Id</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Visit Time</Table.Th>
            <Table.Th>Doctor</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
