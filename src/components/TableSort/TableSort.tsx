"use client";
import React, { useState } from "react";
import {
  Table,
  Badge,
  ActionIcon,
  TextInput,
  Text,
  Button,
  Modal,
  Notification,Select,rem,HoverCard,Pagination
} from "@mantine/core";
import { randomId } from '@mantine/hooks';
import { IconEdit, IconTrash, IconLockOpen } from "@tabler/icons-react";
import { ButtonAdd } from "@/components/ButtonAdd/ButtonAdd";
import { IconSearch } from "@tabler/icons-react";
import { useApiClient } from "@/utils/trpc/Trpc";
import { extend } from "dayjs";
import { modals } from '@mantine/modals';
import { FaCheckCircle } from "react-icons/fa";
import { MdLockReset } from "react-icons/md";




type UserRoles = "ROOTUSER" | "ADMIN" | "GUEST" | "DOCTOR" | "NURSE" | "STAFF";

type users = {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  role: {
    id: number;
    role: UserRoles;
  };
  twoFactorEnabled: boolean;
  staffid: string;
  _count: {
    Log: number;
  };
};

interface RowData extends users {}

const ITEMS_PER_PAGE = 10;

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const data = chunk(
  Array(30)
    .fill(0)
    .map((_, index) => ({ id: index, name: randomId() })),
  ITEMS_PER_PAGE
);

function filterData(data: RowData[], search: string, tableRefect?: any) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.keys(item).some((key) => {
      if (typeof item[key] === "string") {
        return item[key].toLowerCase().includes(query);
      } else if (typeof item[key] === "object" && "role" in item[key]) {
        return item[key].role.toLowerCase().includes(query);
      }
      return false;
    }),
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string },
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      const valueA = a[sortBy] as string; // Type assertion
      const valueB = b[sortBy] as string; // Type assertion

      if (payload.reversed) {
        return valueB.localeCompare(valueA);
      }

      return valueA.localeCompare(valueB);
    }),
    payload.search,
  );
}

const TableSort = ({}) => {
  const {
    mutateAsync: updateAsync,
    isError: userUpdateError,
    isSuccess: userUpdateSuccess,
  } = useApiClient.manageUsers.updateUser.useMutation();

  const {
    "0": userdata,
    "1": {
      isError: usererror,
      isLoading: userloading,
      isFetching: userfetching,
      refetch:userRefetch,
    },
  } = useApiClient.manageUsers.getUsers.useSuspenseQuery({});
  const handleRefetch = async () => {
    try {
      await userRefetch();
    } catch (error) {
      console.error("Error refetching user data:", error);
    }
  };

  const {
    mutateAsync: deleteAsync,
    isError: userdeleteerror,
    isSuccess: userdeletesucess,
  } = useApiClient.manageUsers.deleteUser.useMutation();

  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(userdata.data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<RowData | null>(null);
  const checkIcon = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <FaCheckCircle style={{ width: rem(70), height: rem(70), color: "teal" }} />
    </div>
  );
  const [activePage, setPage] = useState(1);
 
  const openUpdateModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    centered: true,
    children: (
      <Text size="sm">
        Are you Sure you want to edit this? Please click
        one of these buttons to proceed.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: ()=> {handleSave();console.log('Confirmed')},
  });

  const openPasswordRQ=()=>modals.open({
    title:'A password reset requet sent successfully',
    centered:true,
    children: (
      <>
      {checkIcon}       
      </>
    ),
  });

  const openDeleteModal = () =>
  modals.openConfirmModal({
    title: 'Delete your profile',
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete this user? 
      </Text>
    ),
    labels: { confirm: 'Delete account', cancel: "No don't delete it" },
    confirmProps: { color: 'red' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => {deletey(deleteUserId);
          console.log('Confirmed');
  }
  });
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const [showNotification, setShowNotification] = useState(false);

  // Function to open the delete modal and set the user id
  const handleOpenDeleteModal = (userId: string) => {
    setDeleteUserId(userId);
    openDeleteModal();
  };


  const toggleEditing = (userId: string) => {
    setEditingRow(editingRow === userId ? null : userId);
    // Reset edited data when toggling editing
    setEditedData(
      editingRow === userId
        ? null
        : userdata.data.find((user) => user.id === userId),
    );
  };

  const deletey = async (userId: string) => {
    try {
      const deleteuserdata = await deleteAsync({ userid: userId });
      console.log(deleteuserdata);

      // Update table data after deletion
      const updatedData = sortedData.filter((user) => user.id !== userId);
      setSortedData(updatedData);

      // Close the delete modal
      //closeDeleteModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(userdata.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      }),
    );
  };

  const handleFieldChange = (field: keyof RowData, value: string) => {
    // Update edited data when any field changes
    if (editedData) {
      if (field === "role") {
        setEditedData({
          ...editedData,
          role: { ...editedData.role, role: value as UserRoles },
        });
      } else {
        setEditedData({ ...editedData, [field]: value });
      }
    } else {
      // If editedData is null, create a new object with the updated field
      const updatedUser = userdata.data.find((user) => user.id === editingRow);
      const newData = updatedUser
        ? { ...updatedUser, [field]: value }
        : { [field]: value };
      setEditedData(newData as RowData);
    }
  };

  const handleSave = async () => {
    try {
      if (editedData && editedData.id) {
        // Construct the payload for updating the user
        const payload = {
          userid: editedData.id,
          username: editedData.username,
          email: editedData.email,
          phone: editedData.phone,
          role:editedData.role.role,
        };

        // Send the payload to the API for updating the user
        const updatedUserData = await updateAsync(payload);

        console.log("Updated user data:", updatedUserData);

        // Update table data
        const updatedData = sortedData.map((user) => {
          if (user.id === editedData.id) {
            return {
              ...user,
              email: editedData.email,
              phone: editedData.phone,
              username: editedData.username,
              role: editedData.role,
            };
          }
          return user;
        });
        setSortedData(updatedData);
        

        // Reset editing after successful save
        setEditingRow(null);
        setEditedData(null);
        handleRefetch();
        
      }
    } catch (error) {
      console.error("Error updating user:", userUpdateError);
    }finally {
      // Close all modals after saving
      modals.closeAll();
    }
    
  };

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(userdata.data, { sortBy: field, reversed, search }));
  };

  const handlePasswordReset = async (userId: string) => {
    try {
      // Send the password reset request
      const result = await updateAsync({ userid: userId, pwdreet: true });

      // Handle successful response
      console.log("Password reset request sent successfully:", result);
      openPasswordRQ();
    } catch (error) {
      // Handle error
      console.error("Error sending password reset request:", error);
    }
  };

  const roleOptions: { label: string; value: UserRoles }[] = [
    { label: "Root User", value: "ROOTUSER" },
    { label: "Admin", value: "ADMIN" },
    { label: "Guest", value: "GUEST" },
    { label: "Doctor", value: "DOCTOR" },
    { label: "Nurse", value: "NURSE" },
    { label: "Staff", value: "STAFF" },
  ];
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <ButtonAdd />
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>User Name</Table.Th>
            <Table.Th>Role</Table.Th>

            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedData.slice((activePage - 1) * ITEMS_PER_PAGE, activePage * ITEMS_PER_PAGE).map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.name}</Table.Td>
              <Table.Td>
                {editingRow === user.id ? (
                  <TextInput
                    value={editedData?.email || user.email}
                    onChange={(event) =>
                      handleFieldChange("email", event.target.value)
                    }
                  />
                ) : (
                  <Text>{user.email}</Text>
                )}
              </Table.Td>
              <Table.Td>
                {editingRow === user.id ? (
                  <TextInput
                    value={editedData?.phone || user.phone}
                    onChange={(event) =>
                      handleFieldChange("phone", event.target.value)
                    }
                  />
                ) : (
                  <Text>{user.phone}</Text>
                )}
              </Table.Td>
              <Table.Td>
                {editingRow === user.id ? (
                  <TextInput
                    value={editedData?.username || user.username}
                    onChange={(event) =>
                      handleFieldChange("username", event.target.value)
                    }
                  />
                ) : (
                  <Text>{user.username}</Text>
                )}
              </Table.Td>
              <Table.Td>
                {editingRow === user.id ? (
              <Select
              data={roleOptions}
              value={editedData?.role.role || user.role.role}
              onChange={(value) =>
                handleFieldChange("role", value as string)
              }
            />
                ) : (
                  <Text>{user.role.role}</Text>
                )}
              </Table.Td>

              <Table.Td>
                {editingRow === user.id ? (
                    <Button onClick={openUpdateModal}>Update</Button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ActionIcon
                      color="green"
                      onClick={() => toggleEditing(user.id)}
                    >
                      <IconEdit size="1rem" />
                    </ActionIcon>
                   <ActionIcon
                      color="red"
                      onClick={() => handleOpenDeleteModal(user.id)}
                    >
                      
                      <IconTrash size="1rem" />
                </ActionIcon>
                <HoverCard shadow="md">
                 <HoverCard.Target>
                    <ActionIcon
                      color="blue"
                      onClick={() => handlePasswordReset(user.id)}
                    >
                      <MdLockReset size="1.4rem"/>
                    </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Text size="xs">Reset Password</Text>
                    </HoverCard.Dropdown>
                    </HoverCard>
                  </div>
                )}
                
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <div className="grid place-content-center absolute inset-x-0 bottom-10">
      <Pagination total={Math.ceil(sortedData.length / ITEMS_PER_PAGE)} value={activePage} onChange={handlePageChange} mt="sm" />
      </div>
    </>
  );
};
export default TableSort;
