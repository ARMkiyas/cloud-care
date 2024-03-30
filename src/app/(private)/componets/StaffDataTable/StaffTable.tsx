"use client";
import {
  MantineReactTable,
  type MRT_ColumnDef,
  MRT_Row,
  type MRT_RowVirtualizer,
  useMantineReactTable,
} from "mantine-react-table";
import React, { useCallback, useMemo, useRef, UIEvent } from "react";

import type { TStaffGet } from "@/server/api/ApiTypeFactory";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useApiClient } from "@/utils/trpc/Trpc";
import { TStaffTypes } from "@/utils/types";
import {
  IconCodePlus,
  IconCopyPlus,
  IconEdit,
  IconTrash,
  IconUserPlus,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

type staffType = TStaffGet["data"][0];

const PAGE_SIZE = 10;

type TstaffTableProps = {
  type: TStaffTypes;
};

export default function StaffTable({ type }: TstaffTableProps) {
  const {
    data: staffData,
    isLoading: staffGetLoading,
    isFetching: staffGetFetching,
    fetchNextPage: staffNextPage,
  } = useApiClient.manageStaff.getStaff.useInfiniteQuery(
    {
      limit: PAGE_SIZE,
      staffType: type === "all-staffs" ? undefined : type,
    },
    {
      getNextPageParam: (lastPage, allPages) => lastPage.pagenation.nextCursor,
    },
  );

  const utils = useApiClient.useUtils();

  const flatStaffData = useMemo(
    () => staffData?.pages.flatMap((page) => page.data) ?? [],
    [staffData],
  );

  const columns = useMemo<MRT_ColumnDef<staffType>[]>(
    () => [
      {
        accessorFn: (row) => `${row.title} ${row.firstName} ${row.lastName}`,
        header: "Name",
        Cell: ({ renderedCellValue, row }) => (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Avatar src={row.original.image} radius="xl" />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },

      {
        accessorKey: "idNumber",
        header: "Worker Id",
      },

      {
        accessorFn: (row) => row.NIC || row.Passport,
        header: "ID(NIC/Passport)",
      },

      {
        accessorKey: "email",
        header: "EmailAddress",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorFn: (row) =>
          row.admin
            ? row.admin.department
            : row.doctor
            ? type === "doctors"
              ? row.doctor.specialization.split("_").join(" ")
              : row.doctor.departments.split("_").join(" ")
            : row.nurse && row.nurse.departments.split("_").join(" "),
        header: `${
          type === "all-staffs" || type === "admins" || type === "nurses"
            ? "Department"
            : type === "doctors" && "Specialization"
        }`,
      },
      {
        id: "jobTitle",
        accessorFn: (row) =>
          row.admin && row.admin.jobTitle.split("_").join(" "),
        header: "Job Title",
      },
    ],
    [],
  );

  const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const totalFetched = flatStaffData.length;
  const totalDBRowCount = staffData?.pages[0].pagenation.total;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !staffGetFetching &&
          totalFetched < totalDBRowCount
        ) {
          staffNextPage();
        }
      }
    },
    [staffNextPage, staffGetFetching, totalFetched, totalDBRowCount],
  );

  const { mutateAsync: deleteStaff, isLoading } =
    useApiClient.manageStaff.deleteStaff.useMutation({
      onSuccess: () => {
        utils.manageStaff.getStaff.invalidate();
      },
    });

  const deleteStaffHandler = async (staffId: string) => {
    const id = notifications.show({
      title: "Deleting",
      message: "Deleting the user Account....",
      autoClose: false,
      withCloseButton: false,
      loading: true,
    });

    try {
      const deleteuserdata = await deleteStaff({ staffID: staffId });
      // utils.manageUsers.getUsers.invalidate();
      notifications.update({
        id,
        title: "Deleted",
        message: "User Account deleted successfully",
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        color: "green",
      });
    } catch (error) {
      notifications.update({
        id,
        title: "Error",
        message: "Error while deleting the User Account",
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    }
  };

  const openDeleteConfirmModal = (row: MRT_Row<staffType>) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this user?",

      children: (
        <Text>
          Are you sure you want to delete {row.original.title}
          {"."}
          {row.original.firstName} {row.original.lastName}? This action cannot
          be undone.
        </Text>
      ),

      labels: { confirm: "Delete", cancel: "Cancel" },

      confirmProps: { color: "red" },

      onConfirm: () => deleteStaffHandler(row.original.id),
    });

  const table = useMantineReactTable({
    columns,
    data: flatStaffData,
    enablePagination: false,
    enableRowVirtualization: true,
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 10 },
    mantineToolbarAlertBannerProps: {
      color: "red",
      children: "Error loading data",
    },
    mantineTableContainerProps: {
      ref: tableContainerRef, //get access to the table container element
      style: { maxHeight: "600px" }, //give the table a max height
      onScroll: (
        event: UIEvent<HTMLDivElement>, //add an event listener to the table container element
      ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
    },
    enableRowActions: true,
    renderDetailPanel: ({ row }) => (
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "16px",
          padding: "16px",
        }}
      >
        <Avatar src={row.original.image} radius="xl" size={"xl"} />

        <Box>
          <Title>{`${row.original.title}.${row.original.firstName} ${row.original.lastName}`}</Title>
          <Text>&quot;{row.original.NIC}&quot;</Text>
        </Box>
      </Box>
    ),
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit size={14} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Delete">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash size={14} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),

    state: {
      isLoading: staffGetLoading,
      showProgressBars: staffGetFetching,
    },
    initialState: {
      columnVisibility: {
        jobTitle: !!(type === "admins"),
      },
    },
  });

  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
}
