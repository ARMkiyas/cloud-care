"use client";
import React, { useState } from "react";
import {
  Table,
  Badge,
  ActionIcon,
  TextInput,
  Text,
  Button,
  Select,
  HoverCard,
  Pagination,
  Skeleton,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import { ButtonAdd } from "@/components/ButtonAdd/ButtonAdd";
import { IconSearch } from "@tabler/icons-react";
import { useApiClient } from "@/utils/trpc/Trpc";
import { modals } from "@mantine/modals";
import { MdLockReset } from "react-icons/md";
import { notifications } from "@mantine/notifications";
import { UserDataType } from "@/utils/types";
import { useSession } from "next-auth/react";

const ITEMS_PER_PAGE = 15;

type UserRoles = "ROOTUSER" | "ADMIN" | "GUEST" | "DOCTOR" | "NURSE";
const roleOptions: { label: string; value: UserRoles }[] = [
  { label: "Root User", value: "ROOTUSER" },
  { label: "Admin", value: "ADMIN" },
  { label: "Guest", value: "GUEST" },
  { label: "Doctor", value: "DOCTOR" },
  { label: "Nurse", value: "NURSE" },
];

interface RowData extends UserDataType {}

const TableSort = ({}) => {
  const { data: sessiondata } = useSession();

  const {
    mutateAsync: updateAsync,
    isError: userUpdateError,
    isSuccess: userUpdateSuccess,
  } = useApiClient.manageUsers.updateUser.useMutation({
    onSettled(data, error, variables, context) {
      utils.manageUsers.getUsers.invalidate();
    },
  });

  const [activePage, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 700);
  const utils = useApiClient.useUtils();
  const {
    data: userdata,
    refetch: userRefetch,
    isFetching: userDataFeteching,
    isLoading: userLoading,
  } = useApiClient.manageUsers.getUsers.useQuery(
    {
      limit: ITEMS_PER_PAGE,
      page: activePage,
      name: debouncedSearch,
      email: debouncedSearch,
      phone: debouncedSearch,
      username: debouncedSearch,
      role: roleOptions.find(
        (role) => role.value === debouncedSearch.toLocaleUpperCase(),
      )?.value,
    },
    {
      staleTime: 1000 * 60 * 5,
    },
  );

  const {
    mutateAsync: deleteAsync,
    isError: userdeleteerror,
    isSuccess: userdeletesucess,
  } = useApiClient.manageUsers.deleteUser.useMutation({
    onSettled(data, variables, context) {
      utils.manageUsers.getUsers.invalidate();
    },
  });

  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<RowData | null>(null);

  const openUpdateModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      centered: true,
      hidden: !sessiondata?.user?.Permissions.includes("USERS_EDIT"),
      children: (
        <Text size="sm">
          Are you Sure you want to edit this? Please click one of these buttons
          to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        handleSave();
        console.log("Confirmed");
      },
    });

  const openDeleteModal = (deleteUserId: string) =>
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      hidden: !sessiondata?.user?.Permissions.includes("USERS_DELETE"),
      children: (
        <Text size="sm">Are you sure you want to delete this user?</Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },

      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        deletey(deleteUserId);
        console.log("Confirmed");
      },
    });

  const toggleEditing = (userId: string) => {
    if (!sessiondata?.user?.Permissions.includes("USERS_EDIT")) return;

    setEditingRow(editingRow === userId ? null : userId);
    // Reset edited data when toggling editing
    setEditedData(
      editingRow === userId
        ? null
        : userdata?.data.find((user) => user.id === userId),
    );
  };

  const deletey = async (userId: string) => {
    const id = notifications.show({
      title: "Deleting",
      message: "Deleting the user Account....",
      autoClose: false,
      withCloseButton: false,
      loading: true,
    });
    try {
      const deleteuserdata = await deleteAsync({ userid: userId });
      if (userdata.data.length <= 1 && activePage !== 1) {
        (pre) => pre - 1;
      }
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  const handleFieldChange = (field: keyof RowData, value: string) => {
    // Update edited data when any field changes
    if (editedData) {
      console.log("editedData", editedData);
      if (field === "role") {
        setEditedData({
          ...editedData,
          role: { ...editedData.role, role: value as UserRoles },
        });
      } else if (field === "twoFactorEnabled") {
        setEditedData({
          ...editedData,
          twoFactorEnabled: !!(value === "true"),
        });
      } else {
        setEditedData({ ...editedData, [field]: value });
      }
    } else {
      console.log("editedDataeelase", editedData);
      // If editedData is null, create a new object with the updated field
      const updatedUser = userdata?.data.find((user) => user.id === editingRow);
      const newData = updatedUser
        ? { ...updatedUser, [field]: value }
        : { [field]: value };
      setEditedData(newData as RowData);
    }
  };

  const handleSave = async () => {
    const id = notifications.show({
      title: "Updating",
      message: `Updating the ${editedData.username} Account....`,
      autoClose: false,
      withCloseButton: false,
      loading: true,
    });
    try {
      if (editedData && editedData.id) {
        // Send the payload to the API for updating the user
        const updatedUserData = await updateAsync({
          userid: editedData.id,
          username: editedData.username,
          email: editedData.email,
          phone: editedData.phone,
          role: editedData.role.role,
          twoFactorEnabled: editedData.twoFactorEnabled,
        });

        // Reset editing after successful save
        setEditingRow(null);
        setEditedData(null);

        notifications.update({
          id,
          title: "Deleted",
          message: `${editedData.username} Account Updated successfully`,
          loading: false,
          autoClose: 5000,
          withCloseButton: true,
          color: "green",
        });
      }
    } catch (error) {
      notifications.update({
        id,
        title: "Error",
        message: `Error while Updating the ${editedData.username} Account`,
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    } finally {
      // Close all modals after saving
      modals.closeAll();
    }
  };

  const handlePasswordReset = async (userId: string, username: string) => {
    const id = notifications.show({
      title: "Requesting Password reset",
      message: `Requesting Password reset for the ${username} Account....`,
      autoClose: false,
      withCloseButton: false,
      loading: true,
    });
    try {
      // Send the password reset request
      const result = await updateAsync({ userid: userId, pwdreet: true });
      notifications.update({
        id,
        title: "Password reset request sent successfully",
        message: `Password reset request sent successfully for the ${username} Account`,
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        color: "green",
      });
    } catch (error) {
      notifications.update({
        id,
        title: "Error",
        message: `Unable to request Password reset for the ${username} Account`,
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    }
  };

  const TableItmeSkeletons = () => {
    return [...Array.from(Array(ITEMS_PER_PAGE).keys())].map((i) => (
      <Table.Tr key={i}>
        <Table.Td>
          <Skeleton height={28} radius="sm" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={28} radius="sm" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={28} radius="sm" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={28} radius="sm" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={28} radius="sm" />
        </Table.Td>

        <Table.Td>
          <Skeleton height={28} radius="sm" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={28} radius="sm" />
        </Table.Td>
      </Table.Tr>
    ));
  };

  return (
    <div className="space-y-3">
      {sessiondata?.user?.Permissions.includes("APPOINTMENTS_WRITE") && (
        <ButtonAdd />
      )}

      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table.ScrollContainer minWidth={500}>
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>User Name</Table.Th>
              <Table.Th className="text-center">2FA</Table.Th>
              <Table.Th className="text-center">Role</Table.Th>
              {(sessiondata?.user?.Permissions.includes("USERS_EDIT") ||
                sessiondata?.user?.Permissions.includes("USERS_DELETE")) && (
                <Table.Th>Action</Table.Th>
              )}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {userLoading
              ? TableItmeSkeletons()
              : userdata?.data?.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>{user.name}</Table.Td>
                    <Table.Td>
                      {editingRow === user.id ? (
                        <TextInput
                          value={editedData?.email}
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
                          value={editedData?.phone}
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
                    <Table.Td className="text-center">
                      {editingRow === user.id ? (
                        <Select
                          data={["true", "false"]}
                          value={
                            String(editedData?.twoFactorEnabled) ||
                            String(user.twoFactorEnabled)
                          }
                          onChange={(value) =>
                            handleFieldChange("twoFactorEnabled", value)
                          }
                        />
                      ) : (
                        <Badge
                          variant="dot"
                          color={user.twoFactorEnabled ? "green" : "red"}
                        >
                          {String(user.twoFactorEnabled)}
                        </Badge>
                      )}
                    </Table.Td>
                    <Table.Td className="text-center">
                      {editingRow === user.id ? (
                        <Select
                          data={roleOptions}
                          value={editedData?.role.role || user.role.role}
                          onChange={(value) =>
                            handleFieldChange("role", value as string)
                          }
                        />
                      ) : (
                        <Badge variant="light" color="cyan">
                          {user.role.role}
                        </Badge>
                      )}
                    </Table.Td>

                    <Table.Td>
                      {editingRow === user?.id ? (
                        <div className="flex items-center justify-center">
                          <Button onClick={openUpdateModal}>Update</Button>
                          <ActionIcon
                            variant="transparent"
                            onClick={() => {
                              setEditingRow(null);
                              setEditedData(null);
                            }}
                          >
                            <IconX />
                          </ActionIcon>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          {sessiondata?.user?.Permissions.includes(
                            "STAFF_EDIT",
                          ) && (
                            <>
                              <ActionIcon
                                color="green"
                                onClick={() => toggleEditing(user.id)}
                              >
                                <IconEdit size="1rem" />
                              </ActionIcon>
                              <HoverCard shadow="md">
                                <HoverCard.Target>
                                  <ActionIcon
                                    color="blue"
                                    onClick={() =>
                                      handlePasswordReset(
                                        user.id,
                                        user.username,
                                      )
                                    }
                                  >
                                    <MdLockReset size="1.4rem" />
                                  </ActionIcon>
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                  <Text size="xs">Reset Password</Text>
                                </HoverCard.Dropdown>
                              </HoverCard>
                            </>
                          )}

                          {sessiondata?.user?.Permissions?.includes(
                            "USERS_DELETE",
                          ) && (
                            <ActionIcon
                              color="red"
                              onClick={() => openDeleteModal(user.id)}
                            >
                              <IconTrash size="1rem" />
                            </ActionIcon>
                          )}
                        </div>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
          </Table.Tbody>

          <Table.Tfoot>
            <Table.Tr>
              <Table.Td colSpan={3}>
                <Skeleton
                  visible={userLoading}
                  className="flex items-center justify-start"
                >
                  <span>
                    showing{" "}
                    {activePage === 1 ? 1 : (activePage - 1) * ITEMS_PER_PAGE} -{" "}
                    {userdata?.pagenation.total > ITEMS_PER_PAGE
                      ? userdata?.pagenation.pages * ITEMS_PER_PAGE
                      : userdata?.pagenation.total}{" "}
                    of {userdata?.pagenation.total} records
                  </span>
                </Skeleton>
              </Table.Td>
              <Table.Td colSpan={4}>
                <Skeleton
                  visible={userLoading}
                  className="flex items-center justify-end"
                >
                  <Pagination
                    total={Math.ceil(
                      userdata?.pagenation.total / ITEMS_PER_PAGE,
                    )}
                    value={activePage}
                    onChange={setPage}
                    mt="sm"
                  />
                </Skeleton>
              </Table.Td>
            </Table.Tr>
          </Table.Tfoot>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};
export default TableSort;
