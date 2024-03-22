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
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm({
    initialValues: {
      staffID: "",
      username: "",
      password: "",
      role: "",
      confirmPassword: "",
      image: "",
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
        twoFactorEnabled: false,
        //@ts-ignore
        image: files[0] || undefined,
      });

      notifications.show({
        title: "User Added",
        message: `${response.data.username} User has been added successfully`,
        color: "teal",
      });

      // Reset form and loading state
      form.reset();
      setFiles([]);
      setLoading(false);
      setUsers((prevUsers) => [...prevUsers, response]);
    } catch (error) {
      // Handle errors from API call
      setError("Failed to save user data. Please try again.");

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

  console.log("staffMembers:", updateStaffMembers(staffdata));

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
        <Group justify="center">
          <FileButton
            onChange={setFiles}
            accept="image/png,image/jpeg"
            multiple
          >
            {(props) => <Button {...props}>Upload Profile</Button>}
          </FileButton>
        </Group>

        {files.length > 0 && (
          <Text size="sm" mt="sm">
            Picked files:
          </Text>
        )}

        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>

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
              mt="md"
              {...form.getInputProps("role")}
            >
              <option value=" ">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="ROOTUSER">Root User</option>
              <option value="STAFF">Staff</option>
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

        <Group justify="space-between" mt="xl">
          <Button color="blue" type="submit">
            Save
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
