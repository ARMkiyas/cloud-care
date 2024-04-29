"use client";
import {
  MantineReactTable,
  type MRT_ColumnDef,
  MRT_Row,
  type MRT_RowVirtualizer,
  useMantineReactTable,
} from "mantine-react-table";
import React, { useCallback, useMemo, useRef, UIEvent, useState } from "react";

import type { TStaffGet } from "@/server/api/ApiTypeFactory";
import {
  ActionIcon,
  Avatar,
  Badge,
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
import AddStaffModal, { editFormValue, TformValue } from "../AddStaffModal";
import { useDisclosure } from "@mantine/hooks";
import {
  TadminDepartment,
  TDoctorSpecialization,
  TMedicalDepartments,
} from "@/utils/comonDatas";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

type staffType = TStaffGet["data"][0];

// const PAGE_SIZE = 16;

type TstaffTableProps = {
  type: TStaffTypes;
};

export default function StaffTable({ type }: TstaffTableProps) {
  const { data: sessiondata } = useSession();

  const {
    data: staffData,
    isLoading: staffGetLoading,
    isFetching: staffGetFetching,
    fetchNextPage: staffNextPage,
  } = useApiClient.manageStaff.getStaff.useInfiniteQuery(
    {
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
            ? row.admin?.department
            : row?.doctor
            ? type === "doctors"
              ? row.doctor?.specialization.split("_").join(" ")
              : row.doctor?.departments.split("_").join(" ")
            : row.nurse
            ? row.nurse?.departments.split("_").join(" ")
            : row.OtherStaffs?.departments.split("_").join(" "),
        header: `${
          type === "all-staffs" ||
          type === "admins" ||
          type === "nurses" ||
          type === "others"
            ? "Department"
            : type === "doctors" && "Specialization"
        }`,
      },
      {
        id: "jobTitle",
        accessorFn: (row) =>
          row.admin
            ? row.admin?.jobTitle.split("_").join(" ")
            : row.OtherStaffs?.jobTitle.split("_").join(" "),
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

      hidden: !sessiondata?.user?.Permissions.includes("STAFF_DELETE"),

      onConfirm: () => deleteStaffHandler(row.original.id),
    });

  type editDataType = {
    opened: boolean;
    editdata: editFormValue;
    open: (data: editFormValue) => void;
    close: () => void;
  };

  const [editModel, setEditModel] = useState<editDataType | null>({
    opened: false,
    editdata: null,
    open: (data) =>
      setEditModel((prev) => ({ ...prev, editdata: data, opened: true })),
    close: () =>
      setEditModel((prev) => ({ ...prev, editdata: null, opened: false })),
  });

  const EditBtnHandler = (editData: staffType) => {
    const {
      NIC,
      OtherStaffs,
      Passport,
      admin,
      dateOfBirth,
      doctor,
      image,
      nurse,
      id,
      ...newdata
    } = editData;

    const editabledata: editFormValue["data"] = {
      ...newdata,
      idType: editData?.NIC ? "NIC" : "Passport",
      GovtId: editData?.NIC ? editData.NIC : editData?.Passport,
      dob: editData?.dateOfBirth,
      ...(editData?.doctor
        ? {
            staffType: "doctor",
            department: editData?.doctor?.departments as TMedicalDepartments,
            DoctorSpecialization: editData?.doctor
              .specialization as TDoctorSpecialization,
          }
        : editData.admin
        ? {
            staffType: "admin",
            department: editData?.admin.department as TadminDepartment,
            jobtitle: editData?.admin?.jobTitle,
          }
        : editData.nurse
        ? {
            staffType: "nurse",
            department: editData?.nurse?.departments as TMedicalDepartments,
          }
        : {
            staffType: "others",
            department: editData.OtherStaffs
              ?.departments as TMedicalDepartments,
            jobtitle: editData?.OtherStaffs?.jobTitle,
          }),
      gender: editData.gender === "male" ? "Male" : "Female",
    };

    console.log(editabledata);
    editModel.open({
      id: editData.id,
      data: editabledata,
    });
  };

  const table = useMantineReactTable({
    columns,
    data: flatStaffData,
    enableBottomToolbar: false,
    enableColumnResizing: true,
    enablePagination: false,
    enableRowVirtualization: true,
    enableRowNumbers: true,
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 12 },
    columnVirtualizerOptions: { overscan: 6 },

    mantineToolbarAlertBannerProps: {
      color: "red",
      children: "Error loading data",
    },
    mantineTableContainerProps: {
      ref: tableContainerRef, //get access to the table container element
      style: { maxHeight: "800px", minHeight: "800px" }, //give the table a max height
      // onScroll: (
      //   event: UIEvent<HTMLDivElement>, //add an event listener to the table container element
      // ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
    },
    enableRowActions:
      sessiondata?.user?.Permissions.includes("STAFF_EDIT") ||
      sessiondata?.user?.Permissions.includes("STAFF_DELETE"),
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
        <Avatar src={row?.original?.image} radius="xl" size={"xl"} />

        <Box>
          {}
          <div className="flex items-center space-x-1">
            <Badge color="green" variant="filled">
              {row.original?.doctor
                ? "Doctor"
                : row.original?.admin
                ? row.original?.admin.jobTitle.split("_").join(" ")
                : row.original.nurse
                ? "Nurse"
                : row.original?.OtherStaffs?.jobTitle.split("_").join(" ")}
            </Badge>
            {row.original?.doctor && (
              <Badge color="blue" variant="filled">
                {row.original.doctor?.specialization.split("_").join(" ")}
              </Badge>
            )}
          </div>
          <Title>
            {`${row.original?.title}.${row.original?.firstName} ${row.original?.lastName}`}
          </Title>
          <Text>Worker ID : {row.original.idNumber}</Text>
          {row.original.NIC && <Text>NIC : {row.original.NIC}</Text>}
          {row.original?.Passport && (
            <Text>Passport : {row.original?.Passport}</Text>
          )}
          <Text>
            {" "}
            Date Of Birth :{" "}
            {dayjs(row.original.dateOfBirth)
              .format("DD/MM/YYYY")
              .toString()}{" "}
          </Text>
          <Text>Email : {row.original.email}</Text>
          <Text>Phone : {row.original.phone}</Text>
          <Text>
            Department :{" "}
            {row.original.doctor?.departments.split("_").join(" ") ||
              row.original.admin?.department.split("_").join(" ") ||
              row.original.nurse?.departments.split("_").join(" ") ||
              row.original.OtherStaffs?.departments.split("_").join(" ")}
          </Text>
          {row.original.doctor?.specialization && (
            <Text>
              Specialization :{" "}
              {row.original.doctor?.specialization.split("_").join(" ")}
            </Text>
          )}
        </Box>
      </Box>
    ),
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        {sessiondata?.user?.Permissions.includes("STAFF_EDIT") && (
          <Tooltip label="Edit">
            <ActionIcon onClick={() => EditBtnHandler(row.original)}>
              <IconEdit size={14} />
            </ActionIcon>
          </Tooltip>
        )}
        {sessiondata?.user?.Permissions.includes("STAFF_EDIT") && (
          <Tooltip label="Delete">
            <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
              <IconTrash size={14} />
            </ActionIcon>
          </Tooltip>
        )}
      </Flex>
    ),

    state: {
      isLoading: staffGetLoading,
      showProgressBars: staffGetFetching,
    },
    initialState: {
      columnVisibility: {
        jobTitle: !!(type === "admins") || !!(type === "others"),
      },
    },
  });

  return (
    <>
      {sessiondata?.user?.Permissions.includes("STAFF_EDIT") && (
        <AddStaffModal {...editModel} edit={true} />
      )}

      {sessiondata?.user?.Permissions.includes("STAFF_READ") && (
        <MantineReactTable table={table} />
      )}
    </>
  );
}
