"use client";

import React, { useState } from "react";
import { IconLock, IconChevronDown } from "@tabler/icons-react";
import {
  Button,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Input,
  FileButton,
  Select,
  Loader,
  Combobox,
  Chip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useApiClient } from "@/utils/trpc/Trpc";
import { notifications } from "@mantine/notifications";

export interface AuthenticationFormProps {
  noShadow?: boolean;
  noPadding?: boolean;
  noSubmit?: boolean;
  style?: React.CSSProperties;
}

export function UserForm({
  noShadow,
  noPadding,
  noSubmit,
  style,
}: AuthenticationFormProps) {
  const [formType, setFormType] = useState<"register" | "login">("register");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [staffMembers, setStaffMembers] = useState<any[]>([]);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      staffID: "",
      username: "",
      password: "",
      role: "",
      confirmPassword: "",
      image: "",
      _2fa: true,
    },
  });

  const {
    mutateAsync,
    isError: addUsererror,
    isSuccess: addUsersuccess,
  } = useApiClient.manageUsers.addUser.useMutation();

  const {
    data: staffdata,
    isError,
    isLoading,
    isFetching,
  } = useApiClient.manageStaff.getStaff.useQuery({});
  console.log("staffdata", staffdata);

  const utils = useApiClient.useUtils();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!form.values.role) {
        throw new Error("Role field is required");
      }
      if (
        formType === "register" &&
        form.values.password !== form.values.confirmPassword
      ) {
        throw new Error("Passwords do not match");
      }
      if (!selectedStaffId) {
        throw new Error("A staff member must be selected");
      }

      // Call the API to add the user
      const response = await mutateAsync({
        staffID: selectedStaffId,
        password: form.values.password,
        username: form.values.username,
        //@ts-ignore
        role: form.values.role,
        twoFactorEnabled: form.values._2fa,
        //@ts-ignore
      });

      notifications.show({
        title: "User Added",
        message: `${response.data.username} User has been added successfully`,
        color: "teal",
      });

      // Reset form and loading state
      form.reset();

      setLoading(false);
      setUsers((prevUsers) => [...prevUsers, response]);
    } catch (error) {
      // Handle errors from API call
      setError(
        "Failed to save user data.Make sure required data provided, Please try again.",
      );

      setLoading(false);
    }
  };
  console.log("add user error", addUsererror);

  const toggleFormType = () => {
    setFormType((current) => (current === "register" ? "login" : "register"));
    setError(null);
  };

  const updateStaffMembers = (staffdata) => {
    if (staffdata) {
      const updatedStaffMembers = staffdata.data.map((staff) => ({
        value: staff.id,
        label: `${staff.firstName} ${staff.lastName}`,
      }));
      console.log("updated StaffMember", updatedStaffMembers);
      return updatedStaffMembers;
    } else {
      return [];
    }
  };

  const staffMembersselect = updateStaffMembers(staffdata);

  return (
    <Paper
      p={noPadding ? 0 : "lg"}
      shadow={noShadow ? "none" : "sm"}
      style={{
        ...style,
        position: "relative",
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
        <Group grow>
          <TextInput
            data-autofocus
            required
            placeholder="User name"
            label="User Name"
            {...form.getInputProps("username")}
          />
          <Select
            label="Select Staff Member"
            placeholder="Select Staff Member"
            required
            disabled={isFetching}
            value={selectedStaffId}
            onChange={(value) => setSelectedStaffId(value)}
            data={staffMembersselect}
            rightSection={
              isFetching ? (
                <Loader size={18} type={"dots"} />
              ) : (
                <Combobox.Chevron />
              )
            }
          />
        </Group>

        <Group grow>
          <Input.Wrapper label="Role" className="mt-5" required>
            <Input
              component="select"
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
              pointer
              {...form.getInputProps("role")}
            >
              <option value=" ">Select Role</option>
              <option value="ROOTUSER">Root User</option>
              <option value="ADMIN">Admin</option>
              <option value="DOCTOR">Doctor</option>
              <option value="NURSE">Nurse</option>
              <option value="GUEST">Guest</option>
            </Input>
          </Input.Wrapper>
        </Group>

        <PasswordInput
          mt="md"
          required
          placeholder="Password"
          label="Password"
          leftSection={<IconLock size={16} stroke={1.5} />}
          {...form.getInputProps("password")}
        />

        {formType === "register" && (
          <PasswordInput
            mt="md"
            required
            label="Confirm Password"
            placeholder="Confirm password"
            leftSection={<IconLock size={16} stroke={1.5} />}
            {...form.getInputProps("confirmPassword")}
          />
        )}

        {error && (
          <Text c="red" size="sm" mt="sm">
            {error}
          </Text>
        )}
        <Input.Wrapper label="Role" className="mt-5" required>
          <Chip
            classNames={{
              root: "w-full",
            }}
            {...form.getInputProps("_2fa", {
              type: "checkbox",
            })}
          >
            {form.values._2fa
              ? "2 Factor Authentication Enabled"
              : "2 Factor Authentication  Disabled"}
          </Chip>
        </Input.Wrapper>

        <Group justify="space-between" mt="xl">
          <Button color="blue" type="submit">
            Save
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
